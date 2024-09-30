import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";
import Cards from "../../components/Cards/Cards";
import Search from "../../components/Search/Search";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = async () => {
    const response = await fetch("http://localhost:3000/api/v1/restaurants");
    const res = await response.json();

    setRestaurants(res);
  };

  useEffect(() => {
    getRestaurants(restaurants);
  });

  return (
    <div className="w-svw h-svh bg-slate-100">
      <Header />
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-4xl mt-10 pl-4">
          Descubre tu próximo restaurante favorito
        </h1>
        <Search />
      </div>

      <div className="flex flex-col justify-center items-center gap-5 mt-20 flex-wrap">
        <div className="flex gap-7">
          {Array.isArray(restaurants) ? (
            restaurants.map((res) => (
              <Link key={res._id} to={`/restaurants/${res._id}`}>
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
