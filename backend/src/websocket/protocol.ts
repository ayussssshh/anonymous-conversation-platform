// protocol.ts
//
// The WIRE FORMAT of the WebSocket layer: what travels over the socket, and
// the constants both sides (server + frontend) agree on.
//
// Rules for this file:
//   - no state, no sockets, no database, no Node imports
//   - the only logic allowed is parsing and encoding messages
//   - keep it dependency-free so the frontend can import the same file
//
// Architecture rules (users, tabs, rooms) live in WEBSOCKET_ARCHITECTURE.md.

/* ────────────────────────── Handshake ────────────────────────── */

// The client connects to:  ws://host:3000/room/?roomId=1A
// The credential cookie is sent automatically by the browser.
export const WS_PATH = "/room/";
export const ROOM_ID_PARAM = "roomId";

/* ─────────────────────────── Limits ──────────────────────────── */

export const MAX_MESSAGE_LENGTH = 2000; // characters in one chat message
export const MAX_PAYLOAD_BYTES = 16 * 1024; // pass to new WebSocketServer({ maxPayload })
export const HEARTBEAT_INTERVAL_MS = 30_000;
export const MAX_CONNECTIONS_PER_USER = 5;

/* ───────────────────────── Close codes ───────────────────────── */

// A close code is the number the server (or client) sends when it closes the
// socket. 1000-1999 are defined by the WebSocket standard.
// 4000-4999 are free for our own use. (4001 is reserved, currently unused.)
export const CloseCode = {
  Normal: 1000, // user left on purpose
  GoingAway: 1001, // tab closed or server shutting down
  Unauthorized: 1008, // missing or invalid credential
  ServerError: 1011, // unexpected server failure
  RoomNotFound: 4002, // roomId missing or no such room
  TooManyConnections: 4003, // user is over MAX_CONNECTIONS_PER_USER
} as const;

// Same name for the type: CloseCode is "any one of the numbers above".
export type CloseCode = (typeof CloseCode)[keyof typeof CloseCode];

/* ────────────────────────── Error codes ───────────────────────── */

// Sent inside an ERROR message. The frontend reacts to the code,
// not to the human text.
export const ErrorCode = {
  InvalidJson: "INVALID_JSON", // frame was not valid JSON
  InvalidMessage: "INVALID_MESSAGE", // JSON ok, but wrong shape
  UnknownType: "UNKNOWN_TYPE", // "type" is not one we know
  EmptyMessage: "EMPTY_MESSAGE", // chat message is blank
  MessageTooLong: "MESSAGE_TOO_LONG",
  RateLimited: "RATE_LIMITED", // sending too fast
  Internal: "INTERNAL", // our bug, not the client's fault
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

// Default human-readable text for each code.
export const ERROR_TEXT: Record<ErrorCode, string> = {
  INVALID_JSON: "Message must be valid JSON.",
  INVALID_MESSAGE: "Message has the wrong shape.",
  UNKNOWN_TYPE: "Unknown message type.",
  EMPTY_MESSAGE: "Message is empty.",
  MESSAGE_TOO_LONG: `Message is longer than ${MAX_MESSAGE_LENGTH} characters.`,
  RATE_LIMITED: "You are sending messages too fast.",
  INTERNAL: "Something went wrong on the server.",
};

/* ───────────────── Client -> Server messages ─────────────────── */

// Every message is a JSON object with a "type" field. The "type" tells the
// receiver which shape the rest of the object has.

export const ClientMessageType = {
  Message: "MESSAGE",
} as const;

// The user sends a chat message to the room they are connected to.
// The room is not in the message: it was chosen by ?roomId= at connect time.
export type ClientChatMessage = {
  type: typeof ClientMessageType.Message;
  message: string;
};

// "ClientMessage" = anything the client is allowed to send.
// To add a new kind later (e.g. typing), add it to this union.
export type ClientMessage = ClientChatMessage;

/* ───────────────── Server -> Client messages ─────────────────── */

export const ServerMessageType = {
  Welcome: "WELCOME",
  Message: "MESSAGE",
  UserJoined: "USER_JOINED",
  UserLeft: "USER_LEFT",
  Error: "ERROR",
} as const;

// Sent once, right after the connection is accepted and joined to the room.
// Tells this tab who it is, so the UI can style its own messages.
export type WelcomeMessage = {
  type: typeof ServerMessageType.Welcome;
  roomId: string;
  username: string; // this user's username (same in every tab)
  online: number; // unique users in the room right now
};

// A chat message, broadcast to everyone in the room (including the sender).
export type BroadcastMessage = {
  type: typeof ServerMessageType.Message;
  id: string; // unique per message (React keys, future history/dedupe)
  username: string;
  message: string;
  timestamp: number; // milliseconds since epoch, set by the SERVER
};

// A user's FIRST connection in the room opened.
export type UserJoinedMessage = {
  type: typeof ServerMessageType.UserJoined;
  username: string;
  online: number;
};

// A user's LAST connection in the room closed.
export type UserLeftMessage = {
  type: typeof ServerMessageType.UserLeft;
  username: string;
  online: number;
};

// Something the client did was rejected. Never fails silently.
export type ErrorMessage = {
  type: typeof ServerMessageType.Error;
  code: ErrorCode;
  message: string;
};

// "ServerMessage" = anything the server may send. Because every member has a
// different literal "type", TypeScript narrows it for you:
//   if (msg.type === "MESSAGE") { msg.username  // <- known to exist here }
export type ServerMessage =
  | WelcomeMessage
  | BroadcastMessage
  | UserJoinedMessage
  | UserLeftMessage
  | ErrorMessage;

/* ──────────────────── Parsing (client -> server) ──────────────── */

// Parsing never throws. It returns either the typed message or an error
// code, so the router can answer with an ERROR frame and a log line.
export type ParseResult =
  | { ok: true; msg: ClientMessage }
  | { ok: false; code: ErrorCode };

function fail(code: ErrorCode): ParseResult {
  return { ok: false, code };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// "raw" is the frame text. The router should turn the ws Buffer into a
// string first (data.toString()) and reject binary frames before calling this.
export function parseClientMessage(raw: string): ParseResult {
  let data: unknown; // "unknown" = we know nothing yet, must check everything
  try {
    data = JSON.parse(raw);
  } catch {
    return fail(ErrorCode.InvalidJson);
  }

  if (!isRecord(data) || typeof data.type !== "string") {
    return fail(ErrorCode.InvalidMessage);
  }

  switch (data.type) {
    case ClientMessageType.Message: {
      if (typeof data.message !== "string") {
        return fail(ErrorCode.InvalidMessage);
      }
      const message = data.message.trim();
      if (message.length === 0) return fail(ErrorCode.EmptyMessage);
      if (message.length > MAX_MESSAGE_LENGTH) {
        return fail(ErrorCode.MessageTooLong);
      }
      return { ok: true, msg: { type: ClientMessageType.Message, message } };
    }
    default:
      return fail(ErrorCode.UnknownType);
  }
}

/* ──────────────────── Encoding (server -> client) ─────────────── */

// The ONLY place that turns a ServerMessage into text, so nothing is
// sent that does not match one of the types above.
export function encodeServerMessage(msg: ServerMessage): string {
  return JSON.stringify(msg);
}

// Shortcut for building an ERROR message from a code.
export function makeError(code: ErrorCode): ErrorMessage {
  return {
    type: ServerMessageType.Error,
    code,
    message: ERROR_TEXT[code],
  };
}
