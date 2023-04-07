import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import allBooksReducer from "../features/allBooks/allBooksSlice";
import guestCartReducer from "../features/guestCart/guestCartSlice";
import guestCheckoutAddressReducer from "../features/guestCart/guestCheckoutAddressSlice";
import guestReceiptReducer from "../features/guestReceipt/guestReceiptSlice";
import allItemsReducer from "../features/userCart/userCartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: allBooksReducer,
    guestCart: guestCartReducer,
    guestCheckoutAddress: guestCheckoutAddressReducer,
    guestReceipt: guestReceiptReducer,
    allItems: allItemsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
