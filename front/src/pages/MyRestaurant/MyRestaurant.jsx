import { useContext, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import CancelReservation from "../../utils/Functions/Delete/CancelReservation";
import ConfirmReservation from "../../utils/Functions/Confirm/Confirm";
import ShowComments from "../../components/showComments/ShowComments";
import Loading from "../../components/Loading/Loading";
import { GlobalContext } from "../../utils/Hooks/useReducer";
import RestaurantHeader from "../../components/RestaurantModal/RestaurantHeader";
import RestaurantInfo from "../../components/RestaurantModal/RestaurantInfo";
import ReservationList from "../../components/RestaurantModal/ReservationSection";
import useRestaurant from "../../utils/Hooks/useRestaurant";

const MyRestaurant = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const {
    restaurant,
    error,
    loading,
    expandedReservations,
    reservations,
    modal,
  } = state;

  const { fetchRestaurantData, handleDelete } = useRestaurant(dispatch);
  useEffect(() => {
    fetchRestaurantData();
  }, [fetchRestaurantData]);

  const toggleReservationExpansion = (id) => {
    dispatch({
      type: "EXPAND_RESERVATION",
      payload: state.expandedReservations === id ? null : id,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <div className="container mx-auto">
        {!restaurant && (
          <div>
            <RestaurantHeader
              modal={modal}
              toggleModal={() => dispatch({ type: "TOGGLE_MODAL" })}
            />
          </div>
        )}
        {loading && <Loading message="Cargando la información..." />}
        {!loading && error && (
          <div className="text-center py-8">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && restaurant && (
          <div className="space-y-8">
            <RestaurantInfo restaurant={restaurant} onDelete={handleDelete} />
            <ReservationList
              reservations={reservations}
              expandedReservations={expandedReservations}
              toggleReservationExpansion={toggleReservationExpansion}
              handleCancel={CancelReservation}
              handleConfirm={ConfirmReservation}
            />
            <ShowComments id={restaurant._id} />
          </div>
        )}
        {!loading && !error && !restaurant && (
          <div className="text-center bg-white shadow-lg rounded-lg p-8">
            <p className="text-xl font-semibold text-gray-700">
              No se encontraron restaurantes. Crea uno para comenzar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRestaurant;
