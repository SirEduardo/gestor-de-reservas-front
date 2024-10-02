import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import { Header } from "../../components/Header/Header";
import axios from "axios";
import ShowComments from "../../components/showComments/ShowComments";
import { Star, MapPin, Phone, Clock } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-slate-100">
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
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <div>
                        <h4 className="font-semibold">Horario</h4>
                        {restaurant.opening}-{restaurant.closing}
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Star className="w-5 h-5 text-gray-600" />
                      <div>
                        <h4 className="font-semibold">Comidas</h4>
                        <p>Comidas y Cenas</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Star className="w-5 h-5 text-gray-600" />
                      <div>
                        <h4 className="font-semibold">Tipo de cocina </h4>
                        <div>{restaurant.category}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full bg-white p-6 rounded-lg border  gap-3">
                  <h3 className="font-bold text-lg">Ubicacion y contacto</h3>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <h4 className="font-semibold">Contacto</h4>
                        <p className="text-gray-600">{restaurant.telephone}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <div>
                        <h4 className="font-semibold">Dirección</h4>
                        <p className="text-gray-600">{restaurant.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h4 className="font-bold text-lg mb-4">Contribuye!</h4>
                <Link to={`/comments/${id}`}>
                  <button className="bg-black text-white hover:bg-primary/90 px-6 py-3 rounded-full font-bold transition-colors">
                    Escribe un comentario
                  </button>
                </Link>
              </div>
              <div>
                <ShowComments id={id} />
              </div>
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
