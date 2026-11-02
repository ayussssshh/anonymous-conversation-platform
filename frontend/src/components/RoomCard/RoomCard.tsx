import "./RoomCard.css"



export interface RoomCardProps {
    name: string;
    description: string;
    members: number;
}


function RoomCard({ name, description, members } : RoomCardProps) {
  return (
    <article className="room-card">
      <div className="room-card__header">
        <h3>{name}</h3>
        <span>{members} online</span>
      </div>

      <p className="room-card__description">
        {description}
      </p>

      <button className="room-card__button">
        Enter room
      </button>
    </article>
  );
}

export default RoomCard;