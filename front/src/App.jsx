import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Restaurants from "./pages/Restaurants/Restaurants";
import MyRestaurant from "./pages/MyRestaurant/MyRestaurant";
import MyReservations from "./pages/MyReservations/MyReservations";
import Comments from "./components/Create/CreateComments/Comments";
import Register from "./pages/SingIn/Register";
import CreateReservation from "./components/Create/CreateReservation/CreateReservation";
import { GlobalProvider } from "./utils/Hooks/useReducer";

function App() {
  return (
    <div className="h-svh">
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Register />} />
          <Route path="/restaurants/:id" element={<Restaurants />} />
          <Route path="/myRestaurant" element={<MyRestaurant />} />
          <Route path="/myReservations" element={<MyReservations />} />
          <Route path="/comments/:id" element={<Comments />} />
          <Route
            path="/createReservation/:id"
            element={<CreateReservation />}
          />
        </Routes>
      </GlobalProvider>
    </div>
  );
}

export default App;
