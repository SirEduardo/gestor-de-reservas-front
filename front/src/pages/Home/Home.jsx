import { useCallback, useContext, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";
import Cards from "../../components/Create/Cards/Cards";
import SearchByName from "../../components/Search/SearchByName";
import SearchByCategory from "../../components/Search/SearchByCategory";
import { API_URL } from "../../utils/Functions/api/api";
import Loading from "../../components/Loading/Loading";
import useFetch from "../../utils/Hooks/fetch";
import { GlobalContext } from "../../utils/Hooks/useReducer";

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { restaurants, allRestaurants, categories, error, loading } = state;
  const { fetchData } = useFetch();

  const getRestaurants = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await fetchData(`${API_URL}/restaurants`);
      if (res && res.length > 0) {
        const sortedRestaurants = res.sort(
          (a, b) => b.average_rating - a.average_rating
        );
        dispatch({ type: "SET_RESTAURANTS", payload: sortedRestaurants });
        dispatch({ type: "SET_ALL_RESTAURANTS", payload: res });

        const uniqueCategories = Array.from(
          new Set(res.map((restaurant) => restaurant.category))
        );
        dispatch({ type: "SET_CATEGORIES", payload: uniqueCategories });
      }
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error cargando restaurantes.",
        error,
      });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [fetchData]);

  useEffect(() => {
    getRestaurants();
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
              allRestaurants={allRestaurants}
              setError={(error) =>
                dispatch({ type: "SET_ERROR", payload: error })
              }
            />
            <SearchByCategory
              setRestaurants={(restaurants) =>
                dispatch({ type: "SET_RESTAURANTS", payload: restaurants })
              }
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
            <div>
              {restaurants.length > 0 ? (
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
              ) : (
                <p className="text-center text-gray-600 text-xl">
                  No hay restaurantes disponibles.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
