import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import allBooksReducer from "../features/allBooks/allBooksSlice";
const store = configureStore({
  reducer: { auth: authReducer, books: allBooksReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
