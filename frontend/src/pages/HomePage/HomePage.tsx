import Header from "./../../components/Header/Header";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { api } from "../../modules/Apis";






export default function Home() {

    const navigate = useNavigate()

    
    // get started function for navigeting the react and creating the user

    async function createUser() {

        const result = await api("/")

        navigate('/room')

    }


    return (
        <div className="home-page">
            <Header />

            <main className="home-main">
                <section className="home-content">
                    <p className="home-intro">
                        Anoyt is a place to communicate without making your
                        identity the center of the conversation. Join a room,
                        talk to others, and leave when you are done. There is
                        no need to build a profile or explain who you are.
                    </p>

                    <button
                        className="home-start-button"
                        type="button"
                        onClick={async () => {
                            await createUser()
                        }}
                    >
                        Get Started
                    </button>

                    <p className="home-guide">
                        Keep in mind that anonymity does not make information
                        private. Do not share passwords, addresses, phone
                        numbers, financial information, personal documents, or
                        anything else you would not want a stranger to know.
                        Treat every conversation as a conversation with
                        someone you do not know, and share only what you are
                        comfortable making public.
                    </p>
                </section>
            </main>
        </div>
    );
}







