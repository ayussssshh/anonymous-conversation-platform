// websocket/heartbeat.ts
import { WebSocketServer, WebSocket } from "ws";

const INTERVAL_MS = 30_000;
const alive = new WeakMap<WebSocket, boolean>();

export function trackHeartbeat(socket: WebSocket) {
  alive.set(socket, true);
  socket.on("pong", () => alive.set(socket, true));
}

export function startHeartbeat(wss: WebSocketServer) {
  const timer = setInterval(() => {
    for (const socket of wss.clients) {
      if (alive.get(socket) === false) {
        socket.terminate(); // fires "close", so your cleanup runs
        continue;
      }
      alive.set(socket, false);
      socket.ping();
    }
  }, INTERVAL_MS);

  wss.on("close", () => clearInterval(timer));
}