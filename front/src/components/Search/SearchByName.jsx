import { useState } from "react";

const SearchByName = ({ setRestaurants }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filterRestaurants = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!search.trim()) {
      setRestaurants([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/restaurants`);
      if (!response.ok) {
        throw new Error("Error en la búsqueda de restaurantes");
      }

      const res = await response.json();

      const filtered = res.filter((restaurant) => {
        const matchesName = restaurant.name
          .toLowerCase()
          .includes(search.toLowerCase());
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
    <form onSubmit={filterRestaurants} className="flex gap-2">
      <input
        className="rounded-full px-8 py-2 border-solid border"
        type="text"
        id="search"
        name="search"
        placeholder="Buscar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 rounded-full text-white p-2">
        Buscar
      </button>
      <div className="flex items-center">
        {loading && <p>Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};

export default SearchByName;
