import MainPage from "./pages/RoomsPage/MainPage";
import HomePage from "./pages/HomePage/HomePage";
import RoomChatPage from "./pages/RoomChatPage/RoomChatPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return(
    <BrowserRouter>
     
     <Routes>

      <Route path="/room" element={<MainPage />} />  

      <Route path="/" element={<HomePage />} />

      <Route path="/room/1" element={<RoomChatPage />} />

     </Routes>

    </BrowserRouter>
  )
}

export default App