import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../utils/Functions/api/api";

const SearchByName = ({ setRestaurants, allRestaurants }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filterRestaurants = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!search.trim()) {
      setRestaurants(allRestaurants);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/restaurants`);

      const res = response.data;

      const filtered = res.filter((restaurant) => {
        const matchesName = restaurant.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            search
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          );
        return matchesName;
      });
      console.log(filtered);

      setRestaurants(filtered);
    } catch (error) {
      console.log("Error trying to find restaurants", error);
      setError("Error al buscar restaurantes. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={filterRestaurants}
      className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl mx-auto"
    >
      <div className="relative w-full">
        <input
          className="w-full rounded-full px-5 py-3 pl-12 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
          type="text"
          id="search"
          name="search"
          placeholder="Buscar restaurantes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-8 py-3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
      >
        Buscar
      </button>
      <div className="flex items-center justify-center w-full sm:w-auto">
        {loading && (
          <p className="text-gray-600 animate-pulse">
            <svg
              className="inline mr-2 w-5 h-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Cargando...
          </p>
        )}
        {error && <p className="text-red-500 font-medium">{error}</p>}
      </div>
    </form>
  );
};

export default SearchByName;
