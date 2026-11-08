import "./ChatMsg.css";

interface ChatMsgProps {
    message: string;
    username: string;
    timestamp: number;
}

export default function ChatMsg({ message, username, timestamp }: ChatMsgProps) {
    const time = new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="msg-block">
            <div className="msg-header">
                <span className="msg-username">{username}</span>
                <span className="msg-timestamp">{time}</span>
            </div>
            <p className="msg-content">{message}</p>
        </div>
    );
}
