import axios from "axios";
import { API_URL } from "../api/api";

const DeleteRestaurant = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/restaurants/${id}`);

    if (response.status === 200) {
      console.log("Restaurant successfuly deleted");
      window.location.reload();
    }
  } catch (error) {
    console.log("Error trying to delete the restaurant", error);
  }
};

export default DeleteRestaurant;
