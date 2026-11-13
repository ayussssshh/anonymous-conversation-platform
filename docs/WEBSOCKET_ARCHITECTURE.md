# WebSocket Architecture

Status: draft

This file holds the **rules** of the WebSocket layer: who a user is, what a connection is, how rooms work. The **wire format** (message shapes, validation) lives in `protocol.ts`. Don't duplicate one in the other.

---

## 1. Terms

- **User**: an anonymous participant, identified by the signed `userCredential` cookie. One user = one browser profile.
- **Connection**: one WebSocket. One per tab / page load. A user can have many.
- **Room**: a chat room, identified by `roomId`.

---

## 2. Decisions

1. **Identity is the cookie.** The `userId` is read from the credential once, at the handshake, and stored on the `Connection`. It is never re-read from the cookie afterwards.
2. **A user may have multiple tabs**, all with the same identity (same `userId`, same username).
3. **Tabs may be in different rooms.** The same user can be in room A in one tab and room B in another. The same room in two tabs is also allowed.
4. **No kicking.** A new connection never closes an existing one.
5. **A connection is in exactly one room**, chosen at connect time via `?roomId=`. To change rooms, open a new connection.

---

## 3. Connection lifecycle

1. Client opens `ws://<host>:3000/room/?roomId=<id>`. The browser sends the cookie automatically.
2. Server verifies the credential and gets `userId`. On failure: close `1008`.
3. Server checks that `roomId` is present and the room exists. On failure: close `4002`.
4. Server checks the per-user connection cap. On failure: close `4003`.
5. Server creates the `Connection`, registers it, adds it to the room, and starts tracking its heartbeat.
6. Message loop: parse JSON, validate, dispatch to a handler by `type`. Every failure sends an `ERROR` frame and logs a warning; nothing is dropped silently.
7. On close (the `close` event, the only place cleanup happens): remove from the room, remove from the registry, announce "left" only if it was the user's last connection in that room.

---

## 4. State

All state lives in one registry module. Nothing else holds sockets.

```ts
connections: Map<connId, Connection>             // every live socket
userConnections: Map<userId, Set<Connection>>    // all tabs of one user
rooms: Map<roomId, Set<Connection>>              // who receives broadcasts

type Connection = {
  id: string;        // unique per socket
  userId: string;    // from the credential
  username: string; // stable per user
  roomId: string;
  socket: WebSocket;
  isAlive: boolean;  // heartbeat flag
};
```

State is in memory: it is lost on restart and works for a single server process only.

---

## 5. Rules

**Identity and usernames**
- The username is looked up or created once per connection and stored on the `Connection`. All tabs of a user show the same name.

**Rooms and broadcasts**
- A broadcast goes to every open connection in the room, including the sender's own tabs.
- Before sending, check `socket.readyState === OPEN`.

**Presence**
- Presence counts unique users, not sockets: `new Set([...room].map(c => c.userId)).size`.
- "Joined" is announced when a user's first connection in a room opens. "Left" is announced when their last one closes.

**Limits** (proposed defaults, adjust freely)
- Max connections per user: 5.
- Max message length: 2000 characters.
- Max websocket payload: set `maxPayload` on the server.
- Rate limit per **user** across all their tabs, not per socket.

**Heartbeat**
- One `setInterval` for the whole server, every 30 seconds.
- Mark each socket not alive, send `ping`. A `pong` marks it alive. A socket still not alive on the next round is `terminate()`d.
- Cleanup runs in the `close` handler, so normal and terminated sockets take the same path.

**Errors**
- Handlers never fail silently. Failure means an `ERROR` frame to the client plus a log line with the reason.
- The router wraps dispatch in a try/catch so a bad message cannot crash the server.
- Every socket has an `error` handler.

---

## 6. Close codes

| Code | Meaning | Client should |
|------|---------|---------------|
| 1000 | Normal (user left) | Not reconnect |
| 1001 | Going away (tab closed, server shutdown) | Reconnect if the server shut down |
| 1006 | Abnormal (network drop, no close frame) | Reconnect with backoff |
| 1008 | Unauthorized (bad or missing credential) | Get a new session, then retry once |
| 1011 | Server error | Reconnect with backoff |
| 4001 | Reserved (unused) | n/a |
| 4002 | Room not found | Show a message, go back to the room list |
| 4003 | Too many connections | Show a message, do not reconnect |

---

## 7. Logging

- Use the pino logger. No `console.log`.
- One child logger per connection: `logger.child({ connId, userId, roomId })`.
- **info**: connected, joined, left, closed (with code and reason).
- **debug**: each incoming frame (type and size, never the content).
- **warn**: rejected messages, with the reason.
- **error**: exceptions.
- Never log the credential.

---

## 8. Folder layout

```
websocket/
├── index.ts       wiring only: create the server, call handleConnection
├── connection.ts  one connection's lifecycle
├── auth.ts        cookie from the handshake, verifyCredential, userId
├── protocol.ts    wire format: message types, validation, constants
├── router.ts      parse, validate, dispatch by type
├── handlers/      one file per message type
├── registry.ts    the state in section 4
├── heartbeat.ts   the interval in section 5
└── send.ts        sendTo, broadcastToRoom, sendError
```

---

## 9. Open questions

- Are messages stored, or ephemeral? If stored: history on join.
- Private rooms: how is access granted (invite code or link), and where is it checked?
- Moderator actions for v1 (kick, close room, delete message)?
- Room cleanup: when does an empty room expire?
