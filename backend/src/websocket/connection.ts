import WebSocket from "ws";
import { IncomingMessage } from "node:http";
import { verifyCredential } from "../module/UserIdentification.js";
import { parseCookie } from "cookie";
import { trackHeartbeat } from "./heartbeat.js";
import { WSauth } from "./auth.js";

 

export function handleConnection(socket: WebSocket, request: IncomingMessage) {

    const userID: string = WSauth(request) ?? ""

    if (!userID) return // do systamatic response for invalid cred

    trackHeartbeat(socket)


}


