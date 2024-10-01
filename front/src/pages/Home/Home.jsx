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
    <div className="w-screen h-screen bg-slate-100">
      <Header />
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-4xl mt-10 pl-4">
          Descubre tu próximo restaurante favorito
        </h1>
        <div className="flex items-center">
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

      <div className="flex flex-col justify-center items-center gap-5 mt-20">
        <div className="flex flex-wrap justify-center gap-5 px-5 ">
          {Array.isArray(restaurants) ? (
            restaurants.map((res) => (
              <Link key={res._id} to={`/restaurants/${res._id}`}>
                <div className="w-64 h-80 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 mb-24">
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
            ))
          ) : (
            <p>No hay restaurantes disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
