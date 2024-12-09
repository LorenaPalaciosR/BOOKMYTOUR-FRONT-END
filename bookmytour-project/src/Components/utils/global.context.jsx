import { createContext, useContext, useEffect, useReducer } from "react";

const lsFavs = JSON.parse(localStorage.getItem("favs")) || [];
export const initialState = {
  theme: "",
  data: [],
  categories: [],
  user: null,
  favs: lsFavs,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_TOURS":
      return { ...state, data: action.payload };
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return { ...state, user: null };
    case "ADD_FAV":
      return { ...state, favs: [...state.favs, action.payload] };
    case "REMOVE_FAV":
      const filteredFavs = state.favs.filter(
        (favid) => favid !== action.payload
      );
      return { ...state, favs: filteredFavs };
    default:
      throw new Error("Acción inexistente");
  }
};

const ContextGlobal = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchTours = async () => {
    try {
      const response = await fetch("https://bookmytourweb.online/api/tours");
      const data = await response.json();
      dispatch({ type: "GET_TOURS", payload: data });
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://bookmytourjson.s3.us-east-1.amazonaws.com/categories.json"
      );
      const data = await response.json();
      dispatch({ type: "GET_CATEGORIES", payload: data });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({
        type: "SET_USER",
        payload: JSON.parse(user),
      });
    }

    fetchTours();
    fetchCategories();
  }, []);

  return (
    <ContextGlobal.Provider value={{ state, dispatch, fetchTours }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useContextGlobalStates = () => useContext(ContextGlobal);
