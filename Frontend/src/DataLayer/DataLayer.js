import React, { createContext, useContext, useReducer } from "react";

export const DataLayerContext = createContext();
export const DataLayer = ({ initialState, reducerFn, children }) => {
  <DataLayerContext.Provider value={useReducer(reducerFn, initialState)}>
    {children}
  </DataLayerContext.Provider>;
};

export const useDataLayerValue = () => useContext(DataLayerContext);
