import { createContext, useContext, useState } from "react";

const RequestContext = createContext();

export const useRequest = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error("useRequest must be used inside a RequestProvider");
  }
  return context;
};
export const RequestProvider = ({ url, children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <RequestContext.Provider value={{ data, loading, error, fetchData }}>
      {children}
    </RequestContext.Provider>
  );
};
