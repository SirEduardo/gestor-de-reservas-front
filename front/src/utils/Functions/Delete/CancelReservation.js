import axios from "axios";
import { API_URL } from "../api/api";

const CancelReservation = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/reservations/${id}/state`,
      { state: "cancelled" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 200) {
      console.log("Reserva cancelada exitosamente");

      window.location.reload();
    }
  } catch (error) {
    console.error("Error cancelando la reserva", error);
  }
};

export default CancelReservation;
