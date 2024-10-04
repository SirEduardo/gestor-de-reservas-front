import CancelReservation from "../../Delete/CancelReservation.js";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

const ReservationCard = ({ reservations }) => {
  return (
    <div>
      {reservations.length === 0 ? (
        <p className="text-gray-600">No tienes reservas actualmente.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reservations.map((reservation) => (
            <div
              key={reservation._id}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-4">
                {reservation.restaurant.name}
              </h2>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  <span>
                    {new Date(reservation.booking_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{reservation.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{reservation.n_persons} personas</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{reservation.restaurant.location}</span>
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-sm font-semibold
          ${
            reservation.state === "confirmed"
              ? "bg-green-100 text-green-800"
              : reservation.state === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
                >
                  {reservation.state === "confirmed"
                    ? "Confirmada"
                    : reservation.state === "pending"
                    ? "Pendiente"
                    : "Cancelada"}
                </span>
              </div>
              {reservation.state !== "cancelled" && (
                <button
                  onClick={() => CancelReservation(reservation._id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                  aria-label={`Cancelar reserva en ${reservation.restaurant}`}
                >
                  Cancelar Reserva
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
