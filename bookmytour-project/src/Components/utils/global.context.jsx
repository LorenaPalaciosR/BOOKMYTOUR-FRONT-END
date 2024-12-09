import { createContext, useContext, useEffect, useReducer } from "react";

export const initialState = { theme: "", data: [], categories: [], user: null };

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
    default:
      throw new Error("Acción inexistente");
  }
};

const ContextGlobal = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
  }, []);

  return (
    <ContextGlobal.Provider value={{ state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useContextGlobalStates = () => useContext(ContextGlobal);
