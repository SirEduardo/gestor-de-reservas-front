import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Login/auth";
import Restaurants from "./pages/Restaurants/Restaurants";
import MyRestaurant from "./pages/MyRestaurant/MyRestaurant";
import MyReservations from "./pages/MyReservations/MyReservations";

function App() {
  return (
    <div className="h-svh">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/restaurants/:id" element={<Restaurants />} />
        <Route path="/myRestaurant" element={<MyRestaurant />} />
        <Route path="/myReservations" element={<MyReservations />} />
      </Routes>
    </div>
  );
}

export default App;
