import "./RoomListPage.css";
import Header from "../../components/Header/Header";
import RoomCard from "../../components/RoomCard/RoomCard";
import type { RoomCardProps } from "../../components/RoomCard/RoomCard";
import { api } from "../../modules/Apis";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SKELETON_COUNT = 6;

function RoomListPage() {
    const [roomlist, setRoomlist] = useState<RoomCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate()


    const loadRooms = useCallback(async () => {
        try {
            const response = await api.get("/rooms/room-list");
            console.log(response.data.data)
            setRoomlist(response.data.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRooms();
    }, [loadRooms]);

    function handleRetry() {
        setIsLoading(true);
        setError(null);
        loadRooms();
    }

    function handleCreateRoom() {
        
        navigate('/create-room')

    }

    const hasRooms = !isLoading && !error && roomlist.length > 0;
    const isEmpty = !isLoading && !error && roomlist.length === 0;

    let subtitle = "Browse and join a room";
    if (hasRooms) {
        subtitle = `${roomlist.length} ${roomlist.length === 1 ? "room" : "rooms"} available`;
    }

    console.log(roomlist)

    return (
        <div className="main-page">
            <Header />

            <main className="main-page__content">
                <div className="main-page__head">
                    <div className="main-page__heading">
                        <h1 className="main-page__title">Rooms</h1>
                        <p className="main-page__subtitle">{subtitle}</p>
                    </div>

                    <button
                        type="button"
                        className="page-btn page-btn--primary"
                        onClick={handleCreateRoom}
                    >
                        <span aria-hidden="true">+</span>
                        Create Room
                    </button>
                </div>

                {isLoading && (
                    <section className="rooms" aria-busy="true" aria-label="Loading rooms">
                        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
                            <div key={i} className="rooms__skeleton" />
                        ))}
                    </section>
                )}

                {error && (
                    <div className="rooms-state" role="alert">
                        <h2 className="rooms-state__title">Couldn't load rooms</h2>
                        <p className="rooms-state__text">{error}</p>
                        <button
                            type="button"
                            className="page-btn page-btn--ghost"
                            onClick={handleRetry}
                        >
                            Try again
                        </button>
                    </div>
                )}

                {isEmpty && (
                    <div className="rooms-state">
                        <h2 className="rooms-state__title">No rooms yet</h2>
                        <p className="rooms-state__text">
                            Create a room to get started.
                        </p>
                    </div>
                )}

                {hasRooms && (
                    <section className="rooms">
                        {roomlist.map((room) => (
                            <RoomCard
                                key={room.room_id}
                                name={room.name}
                                description={room.description}
                                members={room.members}
                                room_id={room.room_id}
                                is_private={room.is_private}
                            />
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
}

export default RoomListPage;
