import React, { createContext, useContext, useReducer } from "react";

export const DataLayerContext = createContext();
export const DataLayer = ({ initialState, reducerFn, children }) => {
  // console.log(initialState, reducerFn, children, "from datalayer")
  <DataLayerContext.Provider value={useReducer(reducerFn, initialState)}>
    {children}
  </DataLayerContext.Provider>
};

export const useDataLayerValue = () => useContext(DataLayerContext);
