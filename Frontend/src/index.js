import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { DataLayer } from "./DataLayer/DataLayer";
// import reducerFn, { initialState } from "./DataLayer/ReducerFn";
import "antd/dist/antd.min.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <DataLayer initialState={initialState} reducerFn={reducerFn}>
    </DataLayer> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </>
);
