import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import { Header } from "../../components/Header/Header";
import axios from "axios";
import ShowComments from "../../components/showComments/ShowComments";
import { Star, MapPin, Phone, Clock } from "lucide-react";
import { API_URL } from "../../utils/Functions/api/api";

const Restaurants = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`${API_URL}/restaurants`);
        const allRestaurants = response.data;

        const foundRestaurant = allRestaurants.find((rest) => rest._id === id);

        setRestaurants(allRestaurants);
        setRestaurant(foundRestaurant);
        setLoading(false);
      } catch (error) {
        console.log("Error recogiendo el restaurante del fetch", error);
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  const findIndex = () => {
    const itemsSorted = [...restaurants].sort(
      (a, b) => b.average_rating - a.average_rating
    );
    const indexRestaurant = itemsSorted.findIndex(
      (item) => item._id === restaurant._id
    );
    const restaurantPosition = indexRestaurant + 1;

    return restaurantPosition;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <div className="flex-grow flex justify-center py-14 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          {restaurant ? (
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-2xl sm:text-3xl">
                {restaurant.name}
              </h1>
              <div>
                <img
                  className="rounded-xl w-full h-auto"
                  src={restaurant.img}
                ></img>
              </div>
              <section className="flex flex-col md:flex-row justify-between gap-5">
                <div className="flex flex-col w-full p-6 bg-white rounded-lg border gap-3 shadow-md">
                  <h3 className="font-bold text-lg">
                    Puntuaciones y opiniones
                  </h3>
                  <Rating
                    average_rating={restaurant.average_rating}
                    rating_number={restaurant.rating_number}
                  />
                  <div className="flex gap-2">
                    <p className="font-bold">N.º {findIndex()} </p>
                    <p>de {restaurants.length} restaurantes</p>
                  </div>
                </div>
                <div className="flex flex-col w-full bg-white p-6 rounded-lg border gap-3 shadow-md">
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
                <div className="flex flex-col w-full bg-white p-6 rounded-lg border  gap-3 shadow-md">
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
              <div className="bg-white p-6 rounded-lg mb-8 flex flex-col items-center  shadow-md sm:flex-row sm:justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-center sm:text-start">
                    Contribuye!
                  </h4>
                  <Link to={`/comments/${id}`}>
                    <button className="bg-black text-white hover:bg-primary/90 px-6 py-3 rounded-full font-bold transition-colors mb-4 ">
                      Escribe un comentario
                    </button>
                  </Link>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4 text-center sm:text-end">
                    Haz tu reserva!
                  </h4>
                  <Link to={`/createReservation/${id}`}>
                    <button className="bg-black text-white hover:bg-primary/90 px-6 py-3 rounded-full font-bold transition-colors mb-4 ">
                      Reserva ahora
                    </button>
                  </Link>
                </div>
              </div>
              <div>
                <ShowComments id={restaurant._id} />
              </div>
            </div>
          ) : (
            <p className="text-center">
              {loading ? "Cargando..." : "No hay restaurantes disponibles"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
