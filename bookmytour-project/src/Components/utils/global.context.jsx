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
      localStorage.removeItem("favs");
      return { ...state, user: null, favs: [] };
    case "ADD_FAV":
      const updatedFavsAdd = [...state.favs, action.payload];
      localStorage.setItem("favs", JSON.stringify(updatedFavsAdd)); 
      return { ...state, favs: updatedFavsAdd };
    case "REMOVE_FAV":
      const updatedFavsRemove = state.favs.filter(favid => favid !== action.payload);
      localStorage.setItem("favs", JSON.stringify(updatedFavsRemove)); 
      return { ...state, favs: updatedFavsRemove };
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

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({
        type: "SET_USER",
        payload: JSON.parse(user),
      });
    }

    async function fetchData() {
      const response = await fetch("https://bookmytourweb.online/api/tours");
      const data = await response.json();
      dispatch({ type: "GET_TOURS", payload: data });
    }
    fetchData();

    async function fetchCategories() {
      const response = await fetch(
        "https://bookmytourweb.online/api/categories"
      );
      const data = await response.json();
      dispatch({ type: "GET_CATEGORIES", payload: data });
    }
    fetchCategories();

    fetchTours();
  }, []);

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(state.favs)); 
  }, [state.favs]); 

  return (
    <ContextGlobal.Provider value={{ state, dispatch, fetchTours }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useContextGlobalStates = () => useContext(ContextGlobal);
