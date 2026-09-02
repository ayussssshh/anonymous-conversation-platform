import "./RoomMsgSend.css"


export default function SendMsg() {

    return (
        <div
            className="sendmsg"
        >
            <form>

                <textarea className="msgtypeing" placeholder="Send a massage"></textarea>

                <button className="msg-send-button" >Send</button>

            </form>
            

        </div>
    )

}