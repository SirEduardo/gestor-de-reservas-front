import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";
import Cards from "../../components/Cards/Cards";
import SearchByName from "../../components/Search/SearchByName";
import SearchByCategory from "../../components/Search/SearchByCategory";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);

  const getRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/restaurants");
      if (!response.ok) {
        throw new Error("Error fetching restaurants");
      }
      const res = await response.json();
      setRestaurants(res);
      setAllRestaurants(res);
      const uniqueCategories = Array.from(
        new Set(res.map((restaurant) => restaurant.category))
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
  };

  useEffect(() => {
    getRestaurants(restaurants);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <h1 className="font-bold text-4xl md:text-5xl text-center text-gray-800 mt-10">
            Descubre tu próximo restaurante favorito
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
            <SearchByName
              setRestaurants={setRestaurants}
              categories={categories}
            />
            <SearchByCategory
              setRestaurants={setRestaurants}
              restaurants={allRestaurants}
              categories={categories}
            />
          </div>
        </div>

        <div className="mt-16">
          {Array.isArray(restaurants) && restaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {restaurants.map((res) => (
                <Link
                  key={res._id}
                  to={`/restaurants/${res._id}`}
                  className="block"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <Cards
                      key={res._id}
                      name={res.name}
                      id={res._id}
                      img={res.img}
                      category={res.category}
                      average_rating={res.average_rating}
                      rating_number={res.rating_number}
                      opening={res.opening}
                      closing={res.closing}
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-xl">
              No hay restaurantes disponibles
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
