import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../../components/Cards/Cards";

const Restaurants = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/restaurants/${id}`
        );
        const res = await response.json();
        console.log(res);

        setRestaurant(res);
      } catch (error) {
        console.log("Error recogiendo el restaurante del fetch", error);
      }
    };
    fetchRestaurant();
  }, [id]);

  return (
    <div className="w-svw h-svh bg-slate-100 flex justify-center">
      <div className="flex justify-center items-center gap-5">
        {restaurant ? (
          <Cards
            key={restaurant._id}
            name={restaurant.name}
            id={restaurant._id}
            img={restaurant.img}
            category={restaurant.category}
            average_rating={restaurant.average_rating}
            rating_number={restaurant.rating_number}
            location={restaurant.location}
            opening={restaurant.schedule.opening}
            closing={restaurant.schedule.closing}
          />
        ) : (
          <p>No hay restaurantes disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
