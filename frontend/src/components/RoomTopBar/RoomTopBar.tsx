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
      <button type="button" className="leave-btn" aria-label="Leave room">
        <svg
          className="leave-btn-icon"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span>Leave</span>
      </button>
      <h5>{activeUser} active</h5>
    </div>
  );
}