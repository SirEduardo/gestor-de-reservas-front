import { useContext, useEffect } from "react";
import { API_URL } from "../../utils/Functions/api/api";
import { Header } from "../../components/Header/Header";
import ReservationCard from "../../components/Create/ReservationCard/ReservationCard";
import Loading from "../../components/Loading/Loading";
import useFetch from "../../utils/Hooks/fetch";
import { GlobalContext } from "../../utils/Hooks/useReducer";

const MyReservations = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { reservations, loading, error } = state;
  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem("token");

      const response = await fetchData(
        `${API_URL}/reservations/my-reservation`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({ type: "SET_RESERVATIONS", payload: response.reserve });
    };

    fetchReservations();
    return () => {
      dispatch({ type: "SET_RESERVATIONS", payload: [] });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mis Reservas</h1>
        {loading && <Loading message="Cargando reservas..." />}
        {error && <div className="text-red-600">{error}</div>}
        {reservations?.length === 0 ? (
          <p className="text-gray-600">No tienes reservas actualmente.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reservations.map((reserve) => (
              <ReservationCard
                key={reserve._id}
                id={reserve._id}
                name={reserve.restaurant.name}
                booking_date={reserve.booking_date}
                time={reserve.time}
                n_persons={reserve.n_persons}
                location={reserve.restaurant.location}
                state={reserve.state}
                restaurant={reserve.restaurant}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
