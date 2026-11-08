// websocket/index.ts

import { Server } from "node:http";
import { WebSocketServer } from "ws";

export function initializeWebSocket(server: Server) {

    const wss = new WebSocketServer({
        server,
        path: "/ws"
    });

    wss.on("connection", (ws, request) => {

        console.log("Client connected");

        ws.send("Welcome to Anoyt");

        ws.on("message", (data) => {
            console.log(data.toString());
        });

        ws.on("close", () => {
            console.log("Client disconnected");
        });

    });

}