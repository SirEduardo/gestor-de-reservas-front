import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "../../components/Rating/Rating";

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
    <div className="w-svw h-max bg-slate-200 flex justify-center">
      <div className="flex gap-5 pt-14 pb-14 w-2/4 justify-center">
        {restaurant ? (
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">{restaurant.name}</h1>
            <div>
              <img className="rounded-xl" src={restaurant.img}></img>
            </div>
            <section className="flex justify-between gap-5">
              <div className="flex flex-col w-full p-6 bg-white rounded-lg border-slate-300 border gap-3">
                <h3 className="font-bold text-lg">Puntuaciones y opiniones</h3>
                <Rating
                  average_rating={restaurant.average_rating}
                  rating_number={restaurant.rating_number}
                />
              </div>
              <div className="flex flex-col w-full bg-white p-6 rounded-lg border-slate-300 border gap-3">
                <h3 className="font-bold text-lg">Detalles</h3>
                <div>
                  <h4 className="font-semibold">Horario</h4>
                  {restaurant.schedule.opening}-{restaurant.schedule.closing}
                </div>
                <div>
                  <h4 className="font-semibold">Comidas</h4>
                  <p>Comidas y Cenas</p>
                </div>
                <div>
                  <h4 className="font-semibold">Tipo de cocina </h4>
                  <div>{restaurant.category}</div>
                </div>
              </div>
              <div className="flex flex-col w-full bg-white p-6 rounded-lg border-slate-300 border  gap-3">
                <h3 className="font-bold text-lg">Ubicacion y contacto</h3>
                <span>Contacto: {restaurant.telephone}</span>
                {restaurant.location}
              </div>
            </section>
          </div>
        ) : (
          <p>No hay restaurantes disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
