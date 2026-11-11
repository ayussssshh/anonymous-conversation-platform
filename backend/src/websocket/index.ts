import { Server } from "node:http";
import { WebSocketServer } from "ws";
import { parseCookie } from "cookie";
import { clients, addClient, removeClient } from "./connectionManager.js";
import { ClientRoomMap, joinRoom, leaveRoom } from "./roomManager.js";
import { broadcastmsg } from "./messageService.js";

export function initializeWebSocket(server: Server) {

    const wss = new WebSocketServer({
        server,
        path: "/ws"
    });

    wss.on("connection", (socket, request) => {

        const cookies = parseCookie(request.headers.cookie ?? "");
        const userCredential = cookies.userCredential;

        if (!userCredential) {
            socket.close(1008, "Unauthorized");
            return;
        }

        // One live socket per user: a reconnect / second tab replaces the old one.
        const old = clients.get(userCredential);
        addClient(userCredential, socket);
        if (old && old !== socket) {
            old.close(1000, "Replaced by new connection");
        }

        socket.on("message", (data) => {

            // ignore anything coming from a socket that has been replaced
            if (clients.get(userCredential) !== socket) return;

            try {
                const message = JSON.parse(data.toString());

                switch (message.type) {

                    case "INTIAL_MESSAGE": {
                        const roomId = message.roomId;

                        if (typeof roomId !== "string" || !roomId) return;

                        joinRoom(userCredential, roomId);
                        console.log("Joined room:", roomId);
                        break;
                    }

                    case "MESSAGE": {
                        const roomId = ClientRoomMap.get(userCredential);

                        if (!roomId) return;

                        if (typeof message.message !== "string" || !message.message.trim()) return;

                        // TODO: look the username up from userCredential on the server
                        // instead of trusting the client (never broadcast the credential itself).
                        const username =
                            typeof message.username === "string" && message.username.trim()
                                ? message.username.trim().slice(0, 32)
                                : "anonymous";

                        broadcastmsg(roomId, {
                            type: "MESSAGE",
                            username,
                            message: message.message.slice(0, 2000),
                            timestamp: Date.now(), // server-side, not client-supplied
                        });
                        break;
                    }
                }

            } catch (error) {
                console.error("Invalid WebSocket message:", error);
            }
        });

        socket.on("close", () => {

            // A stale socket closing must not remove the newer connection.
            if (clients.get(userCredential) !== socket) return;

            leaveRoom(userCredential);
            removeClient(userCredential);
        });

    });
}
