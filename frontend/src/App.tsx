import MainPage from "./pages/RoomsPage/RoomListPage";
import HomePage from "./pages/HomePage/HomePage";
import RoomChatPage from "./pages/RoomChatPage/RoomChatPage";
import CreateRoomPage from "./pages/CreateRoomPage/CreateRoomPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return(
    <BrowserRouter>
     
     <Routes>

      <Route path="/room" element={<MainPage />} />  

      <Route path="/" element={<HomePage />} />

      <Route path="/room/:room_id" element={<RoomChatPage />} />

      <Route path="/create-room" element={<CreateRoomPage/>}/>

     </Routes>

    </BrowserRouter>
  )
}

export default App