import CancelReservation from "../../../utils/Functions/Delete/CancelReservation.js";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

const ReservationCard = ({
  id,
  name,
  restaurant,
  booking_date,
  time,
  n_persons,
  location,
  state,
}) => {
  return (
    <div>
      <div key={id} className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{name}</h2>
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <CalendarDays className="w-5 h-5 mr-2" />
            <span>{new Date(booking_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2" />
            <span>{n_persons} personas</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{location}</span>
          </div>
        </div>
        <div className="mt-4">
          <span
            className={`inline-block px-2 py-1 rounded-full text-sm font-semibold
          ${
            state === "confirmed"
              ? "bg-green-100 text-green-800"
              : state === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
          >
            {state === "confirmed"
              ? "Confirmada"
              : state === "pending"
              ? "Pendiente"
              : "Cancelada"}
          </span>
        </div>
        {state !== "cancelled" ? (
          <button
            onClick={() => CancelReservation(id)}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
            aria-label={`Cancelar reserva en ${restaurant}`}
          >
            Cancelar Reserva
          </button>
        ) : (
          <div className="h-14"></div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
