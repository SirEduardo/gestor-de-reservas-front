import axios from "axios";
import { API_URL } from "../api/api";

const DeleteComments = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log("Comment deleted successfuly");
      window.location.reload();
    }
  } catch (error) {
    console.log("Error trying to delete comment", error);
  }
};

export default DeleteComments;
