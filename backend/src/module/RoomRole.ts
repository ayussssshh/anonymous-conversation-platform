import {createHmac} from "./UserIdentification.js"

type RoomRole = "member" | "moderator";

export function assignRoomPayload(participantId: string, assignedRoom: string, RoomRole: RoomRole): string {

    const issuedAt: number = Math.floor(Date.now() / 1000);
    const expiresAt: number = issuedAt + 60 * 60 * 24 * 30;

    const payload = `${participantId}.${assignedRoom}.${RoomRole}.${issuedAt}.${expiresAt}`;

    const signature = createHmac(payload);

    return `${payload}.${signature}`;

}

