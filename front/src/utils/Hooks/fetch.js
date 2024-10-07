import { useState } from "react";
import axios from "axios";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios(url, options);
      return response.data;
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Ocurrió un error al obtener la información.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const postData = async (url, data, options = {}) => {
    return fetchData(url, { method: "POST", data, ...options });
  };

  const putData = async (url, data, options = {}) => {
    return fetchData(url, { method: "PUT", data, ...options });
  };
  return { loading, error, fetchData, postData, putData };
};

export default useFetch;
