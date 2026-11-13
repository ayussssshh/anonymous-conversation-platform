import { Server } from "node:http";
import { WebSocketServer } from "ws";
import { handleConnection } from "./connection.js";
import { startHeartbeat } from "./heartbeat.js";


export function initializeWebSocket(server: Server) {

    const wss = new WebSocketServer({
        server,
        path: "/room/"
    });

    startHeartbeat(wss)

    wss.on("connection", (socket, request) => {

        const url = new URL(request.url!, "http://localhost");

        const roomId = url.searchParams.get("roomId");

        handleConnection(socket, request);
        console.log(roomId);
    });

}
