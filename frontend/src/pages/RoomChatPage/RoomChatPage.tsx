"use client";

import { useEffect, useRef } from "react";


import RoomTopBar from "../../components/RoomTopBar/RoomTopBar"
import SendMsg from "../../components/RoomMsgSend/RoomMsgSend"
import "./RoomChatPage.css"


export default function RoomChatPage() {


    const sendMsgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const viewport = window.visualViewport;

        if (!viewport) return;

        const updateSendPosition = () => {
            const sendMsg = sendMsgRef.current;

            if (!sendMsg) return;

            const viewportBottom =
                viewport.offsetTop + viewport.height;

            const sendMsgHeight = sendMsg.offsetHeight;

            const topPosition = viewportBottom - sendMsgHeight;

            sendMsg.style.top = `${topPosition}px`;
        };

        updateSendPosition();

        viewport.addEventListener("resize", updateSendPosition);
        viewport.addEventListener("scroll", updateSendPosition);

        return () => {
            viewport.removeEventListener("resize", updateSendPosition);
            viewport.removeEventListener("scroll", updateSendPosition);
        };
    }, []);

    return (
        <div className="room-chat-page">

            <RoomTopBar
                roomName="Room1"
                activeUser={18}
            />


          // component for the msg

            <div
                ref={sendMsgRef}
                className="sendmsg-positioner"
            >
                <SendMsg />
            </div>

        </div>

    )
}



