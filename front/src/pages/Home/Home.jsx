import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = async () => {
    const response = await fetch("http://localhost:3000/api/v1/restaurants");
    const res = await response.json();
    setRestaurants(res);
  };

  useEffect(() => {
    getRestaurants(restaurants);
  }, [getRestaurants]);

  return (
    <div className="w-svw h-svh bg-slate-100">
      <Header />
      <h1 className="font-bold text-4xl">Restaurants in Salamanca</h1>
      <div className="flex justify-center flex-col items-center gap-5">
        {Array.isArray(restaurants) ? (
          restaurants.map((res) => (
            <div
              className="flex flex-col bg-slate-300 p-20 gap-3 rounded-xl cursor-pointer"
              key={res._id}
            >
              <h2 className="font-bold">{res.name}</h2>
              <p>{res.average_rating}</p>
              <p>{res.category}</p>
              <p>
                {res.schedule.opening} - {res.schedule.closing}
              </p>
            </div>
          ))
        ) : (
          <p>No hay restaurantes disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Home;
