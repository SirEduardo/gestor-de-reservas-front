import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import RestaurantModal from "../../components/RestaurantModal/RestaurantModal";
import { AnimatePresence, motion } from "framer-motion";
import { API_URL } from "../../utils/Functions/api/api";
import CancelReservation from "../../utils/Functions/Delete/CancelReservation";
import ConfirmReservation from "../../utils/Functions/Confirm/Confirm";
import { X, Check, ChevronUp, ChevronDown } from "lucide-react";
import ShowComments from "../../components/showComments/ShowComments";
import Loading from "../../components/Loading/Loading";
import useFetch from "../../utils/Hooks/fetch";

const MyRestaurant = () => {
  const [modal, setModal] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [expandedReservation, setExpandedReservation] = useState(null);
  const { loading, error, fetchData } = useFetch();

  const token = localStorage.getItem("token");

  const getUserData = useCallback(async () => {
    const response = await fetchData(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = response;
    const restaurant = userData.restaurant;
    const restaurantId = restaurant[0]?._id;

    if (!restaurantId) {
      console.log("No restaurant found for this user");
      return;
    }
    return restaurantId;
  }, [fetchData, token]);

  const getRestaurant = useCallback(
    async (restaurantId) => {
      const restaurantResponse = await fetchData(
        `${API_URL}/restaurants/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRestaurant(restaurantResponse);
    },
    [fetchData, token]
  );

  const getReservations = useCallback(
    async (restaurant) => {
      const reservationsResponse = await fetchData(
        `${API_URL}/reservations/restaurant/${restaurant}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservations(reservationsResponse?.reservations || []);
    },
    [fetchData, token]
  );

  useEffect(() => {
    const fetchData = async () => {
      const restaurantId = await getUserData();
      if (restaurantId) {
        await Promise.all([
          getRestaurant(restaurantId),
          getReservations(restaurantId),
        ]);
      }
    };
    fetchData();
  }, []);

  const toggleReservationExpansion = (id) => {
    setExpandedReservation(expandedReservation === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <div className="container mx-auto">
        <div className="flex justify-center mb-8 mt-8">
          {!restaurant && (
            <button
              onClick={() => setModal(!modal)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition-colors shadow-lg"
            >
              Crea tu restaurante
            </button>
          )}
          <AnimatePresence>
            {modal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              >
                <RestaurantModal setModal={setModal} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {loading && <Loading message="Cargando la información..." />}

        {!loading && error && (
          <div className="text-center py-8">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && restaurant && (
          <div className="space-y-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={restaurant.img}
                    alt={`${restaurant.name} image`}
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {restaurant.category}
                  </div>
                  <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                    {restaurant.name}
                  </h2>
                  <p className="mt-2 text-gray-500">
                    Horario: {restaurant.opening} - {restaurant.closing}
                  </p>
                  <p className="mt-2 text-gray-500">{restaurant.location}</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-gray-800 text-center text-2xl font-bold mb-6">
                Reservas
              </h2>
              {reservations.length > 0 ? (
                <div className="space-y-4">
                  {reservations.map((reserve) => (
                    <div
                      key={reserve._id}
                      className="border-b border-gray-200 pb-4"
                    >
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleReservationExpansion(reserve._id)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="font-semibold">
                            {reserve.user.userName} {reserve.user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(
                              reserve.booking_date
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold
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
                          {expandedReservation === reserve._id ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>
                      {expandedReservation === reserve._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-2"
                        >
                          <p>Hora: {reserve.time} H</p>
                          <p>Numero de personas: {reserve.n_persons}</p>
                          {reserve.state !== "cancelled" &&
                            reserve.state !== "confirmed" && (
                              <div className="flex space-x-2 mt-2">
                                <button
                                  onClick={() => CancelReservation(reserve._id)}
                                  className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors"
                                  aria-label={`Cancel reservation at ${restaurant.name}`}
                                >
                                  <X size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    ConfirmReservation(reserve._id)
                                  }
                                  className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors"
                                  aria-label={`Confirm reservation at ${restaurant.name}`}
                                >
                                  <Check size={16} />
                                </button>
                              </div>
                            )}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center">
                  Aún no tienes reservas.
                </p>
              )}
            </div>
            <ShowComments id={restaurant._id} />
          </div>
        )}

        {!loading && !error && !restaurant && (
          <div className="text-center bg-white shadow-lg rounded-lg p-8">
            <p className="text-xl font-semibold text-gray-700">
              No se encontraron restaurantes. Crea uno para comenzar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRestaurant;
