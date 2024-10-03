import { useState } from "react";
import { Header } from "../../components/Header/Header";
import RestaurantModal from "../../components/RestaurantModal/RestaurantModal";

const MyRestaurant = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center">
          <button
            onClick={() => setModal(!modal)}
            className="bg-black text-white hover:bg-primary/90 px-6 py-3 rounded-full font-bold transition-colors"
          >
            Crea tu restaurante
          </button>
          {modal ? <RestaurantModal /> : ""}
        </div>
      </div>
    </div>
  );
};

export default MyRestaurant;
