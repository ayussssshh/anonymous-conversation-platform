"use client";



import RoomTopBar from "../../components/RoomTopBar/RoomTopBar"
import SendMsg from "../../components/RoomMsgSend/RoomMsgSend"
import ChatMsg from "../../components/ChatMsg/ChatMsg";
import "./RoomChatPage.css"



export default function RoomChatPage() {


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

                <ChatMsg
                    username="test1"
                    massage="checking the test of the meaggse"
                    timestamp={6732042}
                />

                <ChatMsg
                    username="test2"
                    massage="checking the test of the meaggse"
                    timestamp={6732042}
                />

                <ChatMsg
                    username="test1"
                    massage="checking the test of the meaggse"
                    timestamp={6732042}
                />

                <ChatMsg
                    username="test1"
                    massage="checking the test of the meaggse"
                    timestamp={6732042}
                />

                <ChatMsg
                    username="test1"
                    massage="checking the test of the meaggse"
                    timestamp={6732042}
                />

                <ChatMsg
                    username="test1"
                    massage="checking the test of the meaggse"
                    timestamp={6732042}
                />

                <ChatMsg
                    username="test1"
                    massage="checking the test of the meaggse"
                    timestamp={6732042}
                />

                <ChatMsg
                    username="test1"
                    massage="checking the test of the meaggse"
                    timestamp={6732042}
                />

                <ChatMsg
                    username="test1"
                    massage="checking the test of the meaggse"
                    timestamp={6732042}
                />

                <ChatMsg
                    username="test1"
                    massage="checking the test of the meaggse f"
                    timestamp={6732042}
                />

                <ChatMsg
                    username="test1"
                    massage="checking the test of the meaggse"
                    timestamp={6732042}
                />

                <ChatMsg
                    username="test1"
                    massage="checkingeouweoiujjjueiourfiw the test of the meaggse"
                    timestamp={6732042}
                />

                <div
                    className="sendmsg-positioner"
                >
                    <SendMsg />
                </div>

            </main>

        </div>

    )
}



