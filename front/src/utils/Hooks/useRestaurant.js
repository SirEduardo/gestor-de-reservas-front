import { useCallback } from "react";
import { API_URL } from "../../utils/Functions/api/api";
import DeleteRestaurant from "../../utils/Functions/Delete/DeleteRestaurant";

const useRestaurant = (dispatch) => {
  const token = localStorage.getItem("token");

  const fetchRestaurantData = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await response.json();
      const restaurant = userData.restaurant;
      const restaurantId = restaurant[0]?._id;

      if (!restaurantId) {
        console.log("No restaurant found for this user");
        dispatch({ type: "SET_LOADING", payload: false });
        return;
      }

      await Promise.all([
        getRestaurant(restaurantId),
        getReservations(restaurantId),
      ]);
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error fetching user data",
        error,
      });
    }
  }, [dispatch, token]);

  const getRestaurant = useCallback(
    async (restaurantId) => {
      try {
        const restaurantResponse = await fetch(
          `${API_URL}/restaurants/${restaurantId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await restaurantResponse.json();
        dispatch({ type: "SET_RESTAURANT", payload: data });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Error fetching restaurant data",
          error,
        });
      }
    },
    [dispatch, token]
  );

  const getReservations = useCallback(
    async (restaurantId) => {
      try {
        const reservationsResponse = await fetch(
          `${API_URL}/reservations/restaurant/${restaurantId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await reservationsResponse.json();
        dispatch({
          type: "SET_RESERVATIONS",
          payload: data?.reservations || [],
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Error fetching reservations",
          error,
        });
      }
    },
    [dispatch, token]
  );

  const handleDelete = async (restaurantId) => {
    try {
      await DeleteRestaurant(restaurantId);
      dispatch({ type: "SET_RESTAURANT", payload: null });
    } catch (error) {
      console.log("Error deleting restaurant", error);
    }
  };

  return { fetchRestaurantData, handleDelete };
};

export default useRestaurant;
