import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./page/App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

const store = configureStore({ reducer });

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
