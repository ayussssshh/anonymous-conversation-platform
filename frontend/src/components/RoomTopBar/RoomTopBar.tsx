import "./RoomTopBar.css"



interface RoomTopBarProps {
  roomName: string;
  activeUser: number;
}

export default function RoomTopBar({
  roomName,
  activeUser,
}: RoomTopBarProps) {
  return (
    <div className="room-top-bar">
      <h4>{roomName}</h4>
      <h5>{activeUser} active</h5>
    </div>
  );
}