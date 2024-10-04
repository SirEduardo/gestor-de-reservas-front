import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/Functions/api/api";
import { Header } from "../../components/Header/Header";
import ReservationCard from "../../components/Create/ReservationCard/ReservationCard";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/reservations/my-reservation`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setReservations(response.data.reserve);
        console.log(response.data.reserve);

        setError(null);
      } catch (error) {
        console.error("Error fetching reservations", error);
        setError(
          "No se pudo cargar las reservas. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
    return () => {
      setReservations([]);
    };
  }, []);

  if (loading) return <div>Cargando reservas...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mis Reservas</h1>
        {reservations.length === 0 ? (
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
