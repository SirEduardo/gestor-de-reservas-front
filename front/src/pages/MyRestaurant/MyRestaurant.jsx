import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import RestaurantModal from "../../components/RestaurantModal/RestaurantModal";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_URL } from "../../utils/Functions/api/api";

const MyRestaurant = () => {
  const [modal, setModal] = useState(false);
  const [restaurant, setRestaurant] = useState(null);

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      const restaurant = userData.restaurant;
      const restaurantId = restaurant[0]?._id;
      console.log(restaurant);

      console.log(restaurantId);

      if (!restaurantId) {
        console.log("No restaurant found for this user");
        return;
      }
      const restaurantResponse = await axios.get(
        `${API_URL}/restaurants/${restaurantId}`
      );
      setRestaurant(restaurantResponse.data);
      console.log(restaurantResponse.data);
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col items-center justify-center pt-20">
          <button
            onClick={() => setModal(!modal)}
            className="bg-black text-white hover:bg-primary/90 px-6 py-3 rounded-full font-bold transition-colors"
          >
            Crea tu restaurante
          </button>
          <AnimatePresence>
            {modal ? <RestaurantModal setModal={setModal} /> : ""}
          </AnimatePresence>
        </div>
        {restaurant ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              key={restaurant._id}
              className="bg-white overflow-hidden shadow-lg rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 mb-4">{restaurant.name}</p>
                <p className="text-sm text-gray-500">{restaurant.location}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700">
              No restaurants found. Create one to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRestaurant;
