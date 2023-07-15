import { createContext, useContext, useReducer } from "react";
import { initialState, dataReducerFun } from "../reducer/dataReducer";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataState, dispatch] = useReducer(dataReducerFun, initialState);
  console.log(dataState)
  return (
    <DataContext.Provider value={{ dataState, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
