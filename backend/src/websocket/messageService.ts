import WebSocket from "ws";
import { RoomClientMap } from "./roomManager.js";
import {clients} from "./connection.js"

export function broadcastmsg(
    roomId: string,
    message: object
) {

    const roomClients = RoomClientMap.get(roomId);

    if (!roomClients) return;

    const payload = JSON.stringify(message);

    for (const clientId of roomClients) {

        const socket = clients.get(clientId);

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(payload);
        }

        console.log(payload)
    }
}