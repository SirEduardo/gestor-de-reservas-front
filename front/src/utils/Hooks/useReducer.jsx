import { createContext, useReducer } from "react";

const INITIALSTATE = {
  restaurants: [],
  allRestaurants: [],
  restaurant: null,
  reservations: [],
  categories: [],
  expandedReservations: null,
  modal: false,
  loading: false,
  error: null,
};

const GlobalContext = createContext(INITIALSTATE);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_RESTAURANTS":
      return { ...state, restaurants: action.payload };
    case "SET_ALL_RESTAURANTS":
      return { ...state, allRestaurants: action.payload };
    case "SET_RESTAURANT":
      return { ...state, restaurant: action.payload };
    case "SET_RESERVATIONS":
      return { ...state, reservations: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "EXPAND_RESERVATION":
      return {
        ...state,
        expandedReservations:
          state.expandedReservations === action.payload ? null : action.payload,
      };
    case "TOGGLE_MODAL":
      return { ...state, modal: !state.modal };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
  }
};
const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIALSTATE);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
