import { motion } from "framer-motion";
import { X, Check, ChevronUp, ChevronDown } from "lucide-react";

const ReservationList = ({
  reservations,
  expandedReservations,
  toggleReservationExpansion,
  handleCancel,
  handleConfirm,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-gray-800 text-center text-2xl font-bold mb-6">
        Reservas
      </h2>
      {reservations.length > 0 ? (
        <div className="space-y-4">
          {reservations.map((reserve) => (
            <div key={reserve._id} className="border-b border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleReservationExpansion(reserve._id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="font-semibold">
                    {reserve.user.userName} {reserve.user.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(reserve.booking_date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
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
                  {expandedReservations === reserve._id ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>
              {expandedReservations === reserve._id && (
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
                          onClick={() => handleCancel(reserve._id)}
                          className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors"
                          aria-label={`Cancel reservation`}
                        >
                          <X size={16} />
                        </button>
                        <button
                          onClick={() => handleConfirm(reserve._id)}
                          className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors"
                          aria-label={`Confirm reservation`}
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
        <p className="text-gray-600 text-center">Aún no tienes reservas.</p>
      )}
    </div>
  );
};

export default ReservationList;
