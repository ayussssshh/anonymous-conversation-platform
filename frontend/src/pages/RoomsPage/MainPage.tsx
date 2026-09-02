import "./MainPage.css";
import Header from "./../../components/Header/Header";
import RoomCard from "./../../components/RoomCard/RoomCard";

function MainPage() {
    return (
        <div className="main-page">
            <Header />

            <main className="main-page__content">
                <section className="rooms">
                    <RoomCard
                        name="General"
                        description="General chat"
                        members={3}
                    />
                </section>
            </main>
        </div>
    );
}

export default MainPage;
