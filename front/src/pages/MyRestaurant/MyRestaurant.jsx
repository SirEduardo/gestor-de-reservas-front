import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import RestaurantModal from "../../components/RestaurantModal/RestaurantModal";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_URL } from "../../utils/Functions/api/api";
import CancelReservation from "../../utils/Functions/Delete/CancelReservation";
import ConfirmReservation from "../../utils/Functions/Confirm/Confirm";
import { X, Check } from "lucide-react";
import ShowComments from "../../components/showComments/ShowComments";

const MyRestaurant = () => {
  const [modal, setModal] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      const restaurant = userData.restaurant;
      const restaurantId = restaurant[0]?._id;

      if (!restaurantId) {
        console.log("No restaurant found for this user");
        return;
      }
      const restaurantResponse = await axios.get(
        `${API_URL}/restaurants/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRestaurant(restaurantResponse.data);
      const reservationsResponse = await axios.get(
        `${API_URL}/reservations/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservations(reservationsResponse.data.reservations);

      console.log(restaurantResponse.data);
      console.log(reservationsResponse.data.reservations);
    } catch (error) {
      console.log("Error fetching user data", error);
      setError("No se pudo cargar la información del restaurante.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const headers = [
    { title: "Nombre" },
    { title: "Día" },
    { title: "Hora" },
    { title: "Nº" },
    { title: "Estado" },
    { title: "Acciones" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex-grow flex justify-center py-14 px-4 sm:px-6 lg:px-8">
          {!restaurant && (
            <button
              onClick={() => setModal(!modal)}
              className="bg-black text-white px-6 py-3 rounded-full font-bold transition-colors"
            >
              Crea tu restaurante
            </button>
          )}
          <AnimatePresence>
            {modal && <RestaurantModal setModal={setModal} />}
          </AnimatePresence>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">Cargando datos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : restaurant ? (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col lg:flex-row justify-evenly">
              <div
                key={restaurant._id}
                className="bg-white overflow-hidden shadow-lg rounded-lg w-full lg:w-1/3"
              >
                <div className="px-4 py-5 sm:p-6 flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {restaurant.name}
                  </h3>
                  <img
                    className="rounded-lg w-full h-auto"
                    src={restaurant.img}
                    alt={`${restaurant.name} image`}
                  />
                  <p className="text-gray-600">{restaurant.opening}</p>
                  <p className="text-gray-600">{restaurant.closing}</p>
                  <p className="text-sm text-gray-500">{restaurant.category}</p>
                  <p className="text-sm text-gray-500">{restaurant.location}</p>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                <h2 className="text-gray-800 text-center text-2xl font-bold mb-5">
                  Reservas
                </h2>
                <div className="flex gap-5 border-b border-gray-300 pb-4">
                  {headers.map((header, index) => (
                    <div
                      className="flex flex-col items-center flex-1"
                      key={index}
                    >
                      <p className="text-lg font-semibold">{header.title}</p>
                    </div>
                  ))}
                </div>
                {reservations.length > 0 ? (
                  reservations.map((reserve) => (
                    <div
                      className="flex flex-col lg:flex-row gap-5 border-b border-gray-300 py-4"
                      key={reserve._id}
                    >
                      <div className="flex flex-col items-center flex-1">
                        <h2>
                          {reserve.user.userName} {reserve.user.lastName}
                        </h2>
                      </div>
                      <div className="flex flex-col items-center flex-1">
                        <span>
                          {new Date(reserve.booking_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-col items-center flex-1">
                        <span>{reserve.time}H</span>
                      </div>
                      <div className="flex flex-col items-center flex-1">
                        <span>{reserve.n_persons}</span>
                      </div>
                      <div className="flex flex-col items-center flex-1">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-sm font-semibold
                      ${
                        reserve.state === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : reserve.state === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                        >
                          {reserve.state === "confirmed"
                            ? "Confirmada"
                            : reserve.state === "pending"
                            ? "Pendiente"
                            : "Cancelada"}
                        </span>
                      </div>
                      <div className="flex items-center flex-1">
                        {reserve.state !== "cancelled" &&
                        reserve.state !== "confirmed" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => CancelReservation(reserve._id)}
                              className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors"
                              aria-label={`Cancelar reserva en ${restaurant.name}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => ConfirmReservation(reserve._id)}
                              className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors"
                              aria-label={`Confirmar reserva en ${restaurant.name}`}
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex-1"></div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">
                    No tienes reservas actualmente.
                  </p>
                )}
              </div>
            </div>
            <div className="w-full lg:w-3/4 m-auto">
              <ShowComments id={restaurant._id} />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700 mt-20">
              No restaurants found. Create one to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRestaurant;
