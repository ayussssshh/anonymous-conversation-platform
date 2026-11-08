"use client";

import { useEffect, useRef, useState } from "react";
import RoomTopBar from "../../components/RoomTopBar/RoomTopBar";
import SendMsg from "../../components/RoomMsgSend/RoomMsgSend";
import ChatMsg from "../../components/ChatMsg/ChatMsg";
import "./RoomChatPage.css";

interface Message {
    username: string;
    message: string;
    timestamp: number;
}

export default function RoomChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const listRef = useRef<HTMLElement>(null);

    // Adds a message to the list.
    // Later: call this from the websocket's onmessage handler.
    function addMessage(msg: Message) {
        setMessages(prev => [...prev, msg]);
    }

    // Called when the user presses Send.
    function handleSend(text: string) {
        const msg: Message = {
            username: "me", // TODO: use the real logged-in username
            message: text,
            timestamp: Date.now(),
        };

        // TODO (websocket): send `msg` to the server here, e.g. socket.send(JSON.stringify(msg))
        // For now it is added locally so you can see it on screen.
        addMessage(msg);
    }

    // TODO (websocket): open the connection here
    // useEffect(() => {
    //     const socket = new WebSocket("ws://localhost:8080");
    //     socket.onmessage = (event) => addMessage(JSON.parse(event.data));
    //     return () => socket.close();
    // }, []);

    // Keep the view scrolled to the newest message.
    useEffect(() => {
        const el = listRef.current;
        if (!el) return;
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, [messages]);

    // Match the page to the area that is actually visible
    // (shrinks when the mobile keyboard opens, grows back when it closes).
    useEffect(() => {
        const vv = window.visualViewport;
        if (!vv) return;

        const root = document.documentElement;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden"; // stop the page itself from scrolling

        const update = () => {
            root.style.setProperty("--vv-height", `${vv.height}px`);
            root.style.setProperty("--vv-top", `${vv.offsetTop}px`);

            // keep the latest message visible when the keyboard opens/closes
            const el = listRef.current;
            if (el) el.scrollTop = el.scrollHeight;
        };

        update();
        vv.addEventListener("resize", update);
        vv.addEventListener("scroll", update);

        return () => {
            vv.removeEventListener("resize", update);
            vv.removeEventListener("scroll", update);
            root.style.removeProperty("--vv-height");
            root.style.removeProperty("--vv-top");
            document.body.style.overflow = prevOverflow;
        };
    }, []);

    return (
        <div className="room-chat-page">
            <RoomTopBar roomName="Room1" activeUser={18} />

            <main className="chat-messages" ref={listRef}>
                {messages.length === 0 && (
                    <p className="chat-empty">No messages yet. Say something.</p>
                )}

                {messages.map((msg, i) => (
                    <ChatMsg
                        key={`${msg.timestamp}-${i}`}
                        username={msg.username}
                        message={msg.message}
                        timestamp={msg.timestamp}
                    />
                ))}
            </main>

            <SendMsg onSend={handleSend} />
        </div>
    );
}
