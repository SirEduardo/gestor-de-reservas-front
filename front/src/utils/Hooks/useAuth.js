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
          "Content-type": "application/json",
        },
      });

      setLoading(false);
      return response.data;
    } catch (error) {
      setError(error.message, "Could not Register the user");
      setLoading(false);
      return undefined;
    }
  };
  return { loading, error, authUser };
};

export default useAuth;
