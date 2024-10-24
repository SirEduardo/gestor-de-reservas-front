import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "./useReducer";

const useAuth = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { loading, error } = state;

  const authUser = async (url, formData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: "SET_LOADING", payload: false });
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          dispatch({ type: "SET_ERROR", payload: "Usuario no encontrado." });
        } else if (error.response.status === 400) {
          dispatch({
            type: "SET_ERROR",
            payload: error.response.data || "Usuario o contraseña incorrectos.",
          });
        } else if (error.response.status === 409) {
          dispatch({ type: "SET_ERROR", payload: "Este usuario ya existe" });
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: "Error. Porfavor, intentelo de nuevo",
          });
        }
      } else if (error.request) {
        dispatch({
          type: "SET_ERROR",
          payload: "Network error. Revisa tu conexión a internet.",
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: "Error: " + error.message,
        });
      }

      dispatch({ type: "SET_LOADING", payload: false });
      return undefined;
    }
  };

  return { loading, error, authUser };
};

export default useAuth;
