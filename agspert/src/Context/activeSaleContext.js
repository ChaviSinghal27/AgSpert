import { createContext, useContext, useReducer } from "react";

const ActiveSaleContext = createContext();

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "SALE_ORDER":
      return {
        activeSaleOrder: [...state.activeSaleOrder, action.payload],
      };
    case "UPDATE_SALE_ORDER":
      return {
        ...state,
        activeSaleOrder: state.activeSaleOrder.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };
    default:
      return state;
  }
};

const ActivSaleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, {
    activeSaleOrder: [],
  });
  return (
    <ActiveSaleContext.Provider value={{ state, dispatch }}>
      {children}
    </ActiveSaleContext.Provider>
  );
};

const useActive = () => useContext(ActiveSaleContext);

export { useActive, ActivSaleProvider };
