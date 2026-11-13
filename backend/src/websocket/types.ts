export interface Message {
    type: "MESSAGE"
    username: string;
    message: string;
    timestamp: number;
}
