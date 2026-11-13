import { randomBytes } from "node:crypto";
import {
    mapUserIdtoUsername,
    getUsernamebyUID
} from "../repositories/usersRepositores.js";

const ALPHABET =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function generateUsername(): string {
    let result = "";

    while (result.length < 8) {
        for (const byte of randomBytes(16)) {
            if (byte >= 248) continue;

            result += ALPHABET[byte % 62];

            if (result.length === 8) break;
        }
    }

    return result;
}



export async function setUsername(userId: string)  {

    let username: string = await getUsernamebyUID(userId) ?? ""

    if(!username){
        username = await mapUserIdtoUsername(userId, generateUsername())
    }

    return username

}
