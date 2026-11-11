import "./RoomCard.css"
import { useNavigate } from "react-router-dom";



  export interface RoomCardProps {
    name: string;
    description: string;
    room_id: string;
    is_private: boolean;
    members?: number;
}


  function RoomCard({ name, description, room_id, is_private, members }: RoomCardProps) {

    const navigate = useNavigate()

    const connectToRoom = () => {
      navigate(`/room/${room_id}`)
    };

    return (
      <article className="room-card">
        <div className="room-card__header">
          <h3>{name}</h3>
          <span>{members} online</span>
        </div>

        <p className="room-card__description">
          {description}
        </p>

        <button className="room-card__button"
        onClick={connectToRoom}>
          Enter room
        </button>
      </article>
    );
  }

export default RoomCard;