import axios from "axios";
import { API_URL } from "../api/api";

const ConfirmReservation = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/reservations/${id}/state`,
      { state: "confirmed" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 200) {
      console.log("Reserva confirmada");

      window.location.reload();
    }
  } catch (error) {
    console.error("Error confirmando la reserva", error);
  }
};

export default ConfirmReservation;
