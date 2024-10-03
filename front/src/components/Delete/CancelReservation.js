import axios from "axios";
import { API_URL } from "../../utils/Functions/api/api";

const CancelReservation = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/reservations/${id}/cancel`,
      { status: "cancelled" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response) {
      window.location.reload();
    }
  } catch (error) {
    console.error("Error cancelando la reserva", error);
  }
};

export default CancelReservation;
