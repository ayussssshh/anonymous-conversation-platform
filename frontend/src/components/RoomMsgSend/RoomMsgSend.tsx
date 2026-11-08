import { useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import "./RoomMsgSend.css";

interface SendMsgProps {
    onSend: (text: string) => void;
}

export default function SendMsg({ onSend }: SendMsgProps) {
    const [text, setText] = useState("");

    function submit() {
        const trimmed = text.trim();
        if (!trimmed) return;

        onSend(trimmed);
        setText("");
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        submit();
    }

    // Enter sends, Shift+Enter makes a new line
    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    }

    return (
        <div className="sendmsg">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="sendmsg-input"
                    placeholder="Send a message"
                    rows={1}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button className="sendmsg-button" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
}
