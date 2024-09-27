import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRestaurantByName = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/restaurants/search?name=${search}`
      );
      const res = await response.json();
      console.log(res);

      setResults(res);
    } catch (error) {
      console.log("Error trying to find restaurants", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={getRestaurantByName} className="flex gap-2">
      <input
        className="rounded-full px-8 py-2"
        type="text"
        id="search"
        name="search"
        placeholder="search"
        value={search}
        onInput={(e) => setSearch(e.target.value)}
      ></input>
      <button type="submit" className="bg-blue-500 rounded-full text-white p-2">
        Buscar
      </button>
      <div>
        {loading && <p>Loading...</p>}
        {results.map((restaurant) => (
          <div key={restaurant._id}>
            <h2>{restaurant.name}</h2>
            <p>Ubicación: {restaurant.location}</p>
            <p>Calificación: {restaurant.rating}</p>
          </div>
        ))}
      </div>
    </form>
  );
};

export default Search;
