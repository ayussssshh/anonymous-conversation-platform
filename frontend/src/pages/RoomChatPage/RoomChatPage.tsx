"use client";



import RoomTopBar from "../../components/RoomTopBar/RoomTopBar"
import SendMsg from "../../components/RoomMsgSend/RoomMsgSend"
import ChatMsg from "../../components/ChatMsg/ChatMsg"
import { useState } from "react";
import "./RoomChatPage.css"


interface Message {
    username: string;
    massage: string;
    timestamp: number;
}



export default function RoomChatPage() {


    const [messages, setMessages] = useState<Message[]>([])

    function addMessage(message: Message) {

        const newMessage: Message = message

        setMessages(prev => [...prev, newMessage])

    }


    return (
        <div className="room-chat-page">
            <div
                className="roomtopbar-positioner">
                <RoomTopBar
                    roomName="Room1"
                    activeUser={18}
                />
            </div>


            <main className="chatmsg-container">




                {messages.map(msg => (

                    <ChatMsg
                        username={msg.username}
                        massage={msg.massage}
                        timestamp={msg.timestamp}
                    />

                ))}

                
                <div
                    className="sendmsg-positioner"
                >
                    <SendMsg />
                </div>

            </main>

        </div>

    )
}



