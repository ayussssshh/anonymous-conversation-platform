import WebSocket from "ws"

export const clients = new Map<string, WebSocket>()

export function addClient(id: string, socket: WebSocket) {

    clients.set(id, socket)

}

export function removeClient(id: string) {

    clients.delete(id)

}

