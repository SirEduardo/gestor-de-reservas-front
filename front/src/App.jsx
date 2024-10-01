import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Restaurants from "./pages/Restaurants/Restaurants";
import MyRestaurant from "./pages/MyRestaurant/MyRestaurant";
import MyReservations from "./pages/MyReservations/MyReservations";
import Comments from "./pages/Comments/Comments";
import Auth from "./pages/SingIn/Auth";

function App() {
  return (
    <div className="h-svh">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/restaurants/:id" element={<Restaurants />} />
        <Route path="/myRestaurant" element={<MyRestaurant />} />
        <Route path="/myReservations" element={<MyReservations />} />
        <Route path="/comments/:id" element={<Comments />} />
      </Routes>
    </div>
  );
}

export default App;
