import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import allBooksReducer from "../features/allBooks/allBooksSlice";
import guestCartReducer from "../features/guestCart/guestCartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: allBooksReducer,
    guestCart: guestCartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
