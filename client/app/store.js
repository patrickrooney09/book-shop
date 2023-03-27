import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import allBooksReducer from "../features/allBooks/allBooksSlice";
import guestCartReducer from "../features/guestCart/guestCartSlice";
import guestCheckoutReducer from "../features/guestCheckOut/guestCheckoutSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: allBooksReducer,
    guestCart: guestCartReducer,
    guestCheckout: guestCheckoutReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
