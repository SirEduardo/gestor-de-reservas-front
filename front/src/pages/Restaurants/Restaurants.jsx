import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import { Header } from "../../components/Header/Header";
import axios from "axios";
import ShowComments from "../../components/showComments/ShowComments";

const Restaurants = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/restaurants/${id}`
        );
        const res = response.data;
        console.log(res);

        setRestaurant(res);
      } catch (error) {
        console.log("Error recogiendo el restaurante del fetch", error);
      }
    };
    fetchRestaurant();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-200">
      <Header />
      <div className="flex-grow flex justify-center py-14">
        <div className="w-2/4 max-w-4xl">
          {restaurant ? (
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-3xl">{restaurant.name}</h1>
              <div>
                <img
                  className="rounded-xl w-full h-auto"
                  src={restaurant.img}
                ></img>
              </div>
              <section className="flex flex-col md:flex-row justify-between gap-5">
                <div className="flex flex-col w-full p-6 bg-white rounded-lg border gap-3">
                  <h3 className="font-bold text-lg">
                    Puntuaciones y opiniones
                  </h3>
                  <Rating
                    average_rating={restaurant.average_rating}
                    rating_number={restaurant.rating_number}
                  />
                </div>
                <div className="flex flex-col w-full bg-white p-6 rounded-lg border gap-3">
                  <h3 className="font-bold text-lg">Detalles</h3>
                  <div>
                    <h4 className="font-semibold">Horario</h4>
                    {restaurant.opening}-{restaurant.closing}
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
                <div className="flex flex-col w-full bg-white p-6 rounded-lg border  gap-3">
                  <h3 className="font-bold text-lg">Ubicacion y contacto</h3>
                  <span>Contacto: {restaurant.telephone}</span>
                  {restaurant.location}
                </div>
              </section>
              <div className="bg-white p-5 rounded-lg">
                <h4 className="font-bold text-xl pb-10">Contribuye!</h4>
                <Link to={`/comments/${id}`}>
                  <button className="bg-black text-white px-5 py-3 rounded-full font-bold">
                    Escribe un comentario
                  </button>
                </Link>
              </div>
              <ShowComments id={id} />
            </div>
          ) : (
            <p>No hay restaurantes disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
