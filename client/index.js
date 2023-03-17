import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store.js";
import App from "./app/App";
import { BrowserRouter as Router } from "react-router-dom";
// import * as dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// console.log("PROCESS.ENV:", process.env);

const root = createRoot(document.getElementById("app"));

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
