import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";
import Cards from "../../components/Create/Cards/Cards";
import SearchByName from "../../components/Search/SearchByName";
import SearchByCategory from "../../components/Search/SearchByCategory";
import { API_URL } from "../../utils/Functions/api/api";
import Loading from "../../components/Loading/Loading";
import useFetch from "../../utils/Hooks/fetch";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const { loading, fetchData } = useFetch();

  const getRestaurants = async () => {
    try {
      const res = await fetchData(`${API_URL}/restaurants`);
      if (res) {
        setRestaurants(res);
        setAllRestaurants(res);

        const uniqueCategories = Array.from(
          new Set(res.map((restaurant) => restaurant.category))
        );
        setCategories(uniqueCategories);
      }
    } catch (err) {
      setError("Error cargando restaurantes.");
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
          {loading && <Loading message="Cargando restaurantes..." />}
          {!loading && error ? (
            <p className="text-center text-gray-600 text-xl">{error}</p>
          ) : (
            restaurants.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {restaurants.map((res) => (
                  <Link
                    key={res._id}
                    to={`/restaurants/${res._id}`}
                    className="block"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <Cards
                        name={res.name}
                        id={res._id}
                        img={res.img || "default-image.jpg"}
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
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
