import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DataLayer } from "./DataLayer/DataLayer";
import reducerFn, { initialState } from "./DataLayer/ReducerFn";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducerFn={reducerFn}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataLayer>
  </React.StrictMode>
);
