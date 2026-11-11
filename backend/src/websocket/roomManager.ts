// Shared room state. index.ts and messageService.ts must both use THESE maps.
export const RoomClientMap = new Map<string, Set<string>>(); // roomId -> clientIds
export const ClientRoomMap = new Map<string, string>();      // clientId -> roomId

export function leaveRoom(clientId: string) {
    const roomId = ClientRoomMap.get(clientId);
    if (!roomId) return;

    const members = RoomClientMap.get(roomId);
    members?.delete(clientId);

    if (members?.size === 0) {
        RoomClientMap.delete(roomId);
    }

    ClientRoomMap.delete(clientId);
}

export function joinRoom(clientId: string, roomId: string) {
    // handles reconnecting and switching rooms
    leaveRoom(clientId);

    let members = RoomClientMap.get(roomId);
    if (!members) {
        members = new Set<string>();
        RoomClientMap.set(roomId, members);
    }

    members.add(clientId);
    ClientRoomMap.set(clientId, roomId);
}
