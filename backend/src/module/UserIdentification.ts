import "dotenv/config";
import crypto from "node:crypto";



const HMAC_SECRET = process.env.ANON_ID_SECRET ?? "";

if (HMAC_SECRET === "") {
    throw new Error("ANON_ID_SECRET is not configured");
}

export function createHmac(payload: string): string {
    return crypto
        .createHmac("sha256", HMAC_SECRET)
        .update(payload)
        .digest("base64url");
}

function generateParticipantId(): string {
    return crypto.randomBytes(16).toString("hex");
}

export function createCredential(): string {
    const participantId: string = generateParticipantId();

    const issuedAt: number = Math.floor(Date.now() / 1000);
    const expiresAt: number = issuedAt + 60 * 60 * 24 * 30;

    const payload = `${participantId}.${issuedAt}.${expiresAt}`;

    const signature = createHmac(payload);

    return `${payload}.${signature}`;
}

export function verifyCredential(
    credential: string
): string | null {
    const parts = credential.split(".");

    if (parts.length !== 4) {
        return null;
    }

    const [
        participantId,
        issuedAtString,
        expiresAtString,
        signature
    ] = parts;

    const expiresAt = Number(expiresAtString);

    if (!Number.isFinite(expiresAt)) {
        return null;
    }

    const payload =
        `${participantId}.${issuedAtString}.${expiresAtString}`;

    const expectedSignature = createHmac(payload);

    const received = Buffer.from(signature);
    const expected = Buffer.from(expectedSignature);

    if (received.length !== expected.length) {
        return null;
    }

    if (!crypto.timingSafeEqual(received, expected)) {
        return null;
    }

    const now = Math.floor(Date.now() / 1000);

    if (now >= expiresAt) {
        return null;
    }

    return participantId;
}


