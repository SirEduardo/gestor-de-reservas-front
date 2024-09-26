import { useState } from "react";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authUser = async (url, formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const result = await response.json();
      setLoading(false);
      return result;
    } catch (error) {
      setError(error.message, "Could not Register the user");
      setLoading(false);
      return undefined;
    }
  };
  return { loading, error, authUser };
};

export default useAuth;
