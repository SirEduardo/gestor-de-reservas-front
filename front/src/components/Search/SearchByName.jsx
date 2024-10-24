import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../utils/Hooks/useReducer";

const SearchByName = ({ allRestaurants, setError }) => {
  const { dispatch } = useContext(GlobalContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (allRestaurants.length > 0) {
      dispatch({ type: "SET_RESTAURANTS", payload: allRestaurants });
    }
  }, [allRestaurants, dispatch]);

  const handleFilter = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);

    if (term) {
      const filteredRestaurants = allRestaurants.filter((restaurant) =>
        restaurant.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(term)
      );

      if (filteredRestaurants.length === 0) {
        const top3 = allRestaurants.slice(0, 3);
        dispatch({ type: "SET_RESTAURANTS", payload: top3 });
        setError("No se encontraron coincidencias, mostrando sugerencias.");
      } else {
        dispatch({ type: "SET_RESTAURANTS", payload: filteredRestaurants });
        setError(null);
      }
    } else {
      dispatch({ type: "SET_RESTAURANTS", payload: allRestaurants });
      setError(null);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
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
            onChange={handleFilter}
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
      </form>
    </div>
  );
};

export default SearchByName;
