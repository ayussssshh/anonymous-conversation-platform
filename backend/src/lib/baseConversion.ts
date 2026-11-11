

export function B10toB32(decimal: string): string {
    return Number(decimal).toString(36).toUpperCase();
}

export function B32toB10(encoded: string): string {
    return parseInt(encoded, 36).toString();
}