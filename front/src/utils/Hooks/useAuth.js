import axios from "axios";
import { useState } from "react";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authUser = async (url, formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setError("Usuario no encontrado.");
        } else if (error.response.status === 400) {
          setError(error.response.data || "Usuario o contraseña incorrectos.");
        } else {
          setError("Error. Porfavor, intentelo de nuevo");
        }
      } else if (error.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Error: " + error.message);
      }

      setLoading(false);
      return undefined;
    }
  };

  return { loading, error, authUser };
};

export default useAuth;
