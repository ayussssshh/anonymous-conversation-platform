import "./ChatMsg.css"



interface ChatMsgProps{
    massage: string,
    username: string,
    timestamp: number
}



export default function ChatMsg({massage, username, timestamp} :ChatMsgProps ){

    return(
        <div className="msg-block">
            <h4 className="msg-username">{username}</h4>
            <p className="msg-content">{massage}</p>
            <span className="msg-timestamp">{timestamp}</span>
        </div>
    )

}