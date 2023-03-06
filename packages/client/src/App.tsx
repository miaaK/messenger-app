import React from "react";
import { Routes, Route } from "react-router-dom";

import Lobby from "./pages/Lobby";
import Friends from "./pages/Friends";
import RoomList from "./pages/RoomList";
import RoomDetail from "./pages/RoomDetail";
import SeeMore from "./pages/SeeMore";

function App() {
  return (
    <Routes>
      <Route index element={<Lobby />} /> {/* Lobby */}
      <Route path="/friends" element={<Friends />} /> {/* Friends */}
      <Route path="/rooms" element={<RoomList />} /> {/* RoomList */}
      <Route path="/rooms/:roomId" element={<RoomDetail />} />{" "}
      {/* RoomDetails */}
      <Route path="/more" element={<SeeMore />} /> {/* SeeMore */}
    </Routes>
  );
}

export default App;
