import { IncomingMessage } from "node:http";
import { verifyCredential} from "../module/UserIdentification.js";
import { parseCookie } from "cookie";


export function WSauth(request: IncomingMessage){
    const cookie = parseCookie(request.headers.cookie ?? "");

    const userCredential = cookie.userCredential;

    if (!userCredential) return null;

    const userId = verifyCredential(userCredential);

    return userId;
}
