import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRoomPage.css";
import { api } from "../../modules/Apis";

type Visibility = "public" | "private";

type FromErrors = {
  name: boolean;
  description: boolean;
}

type RoomData = {
  name: string;
  description: string;
  visibility: Visibility;
}

const VISIBILITY_OPTIONS: {
  value: Visibility;
  label: string;
  hint: string;
}[] = [
    {
      value: "public",
      label: "Public",
      hint: "Anyone can find and join this room.",
    },
    {
      value: "private",
      label: "Private",
      hint: "Only people you invite can join.",
    },
  ];

export default function CreateRoomPage() {

  const navigate = useNavigate();

  // UI state only, so the toggle shows which option is selected.
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [errors, setError] = useState<FromErrors>({
    name: false,
    description: false
  })

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {

    e.preventDefault();

    const fromData = new FormData(e.currentTarget);

    const name = fromData.get("name") as string
    const description = fromData.get("description") as string

    const newErrors: FromErrors = {
      name: name.trim() === "",
      description: description.trim() === ""
    }

    setError(newErrors)

    if (newErrors.name || newErrors.description) {
      return
    }

    const roomData: RoomData = {
      name: name,
      description: description,
      visibility: fromData.get("visibility") as Visibility
    }

    const response = await api.post("rooms/room-create", roomData)

    console.log(response);

  };

  const handleCancel = () => {
    navigate("/room")
  };

  return (
    <main className="create-room-page">
      <div className="container">
        <form className="create-room-card" onSubmit={handleSubmit}>
          <header className="create-room-header">
            <h1 className="create-room-title">Create a room</h1>
            <p className="create-room-subtitle">
              Give your room a name and decide who can join.
            </p>
          </header>

          <div className="create-room-field">
            <label className="create-room-label" htmlFor="room-name">
              Room name
            </label>
            <input
              id="room-name"
              name="name"
              type="text"
              className={`create-room-input ${errors.name ? "input-error" : ""}`}
              placeholder="Enter a room name"
              maxLength={50}
              autoComplete="off"
              onChange={() => {
                if (errors.name) {
                  setError(prev => ({ ...prev, name: false }));
                }
              }}
            />
          </div>

          <div className="create-room-field">
            <label className="create-room-label" htmlFor="room-description">
              Description
            </label>
            <textarea
              id="room-description"
              name="description"
              className={`create-room-input create-room-textarea ${errors.description ? "input-error" : ""
                }`}
              placeholder="What is this room about?"
              rows={4}
              maxLength={300}
              onChange={() => {
                if (errors.description) {
                  setError(prev => ({ ...prev, description: false }));
                }
              }}
            />
          </div>

          <fieldset className="create-room-field create-room-fieldset">
            <legend className="create-room-label">Visibility</legend>

            <div className="create-room-visibility" role="group">
              {VISIBILITY_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`create-room-option${visibility === option.value ? " is-selected" : ""
                    }`}
                  aria-pressed={visibility === option.value}
                  onClick={() => setVisibility(option.value)}
                >
                  <span className="create-room-option-label">
                    {option.label}
                  </span>
                  <span className="create-room-option-hint">
                    {option.hint}
                  </span>
                </button>
              ))}
            </div>

            <input type="hidden" name="visibility" value={visibility} />
          </fieldset>

          <div className="create-room-actions">
            <button
              type="button"
              className="create-room-btn create-room-btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="create-room-btn create-room-btn-primary"
            >
              Create room
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
