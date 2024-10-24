import axios from "axios";

const useFetch = () => {
  const fetchData = async (url, options = {}) => {
    try {
      const response = await axios(url, options);
      return response.data;
    } catch (err) {
      console.error("Error fetching data:", err);

      return null;
    }
  };

  const postData = async (url, data, options = {}) => {
    return fetchData(url, { method: "POST", data, ...options });
  };

  const putData = async (url, data, options = {}) => {
    return fetchData(url, { method: "PUT", data, ...options });
  };
  return { fetchData, postData, putData };
};

export default useFetch;
