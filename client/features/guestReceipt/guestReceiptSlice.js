import { createSlice } from "@reduxjs/toolkit";
import guestCartSlice from "../guestCart/guestCartSlice";

const initialState = {};

export const guestReceiptSlice = createSlice({
  name: "guestReceipt",
  initialState,
  reducers: {
    addItems: (state, action) => {
      console.log(action);
      state.items = action.payload;
    },
    addAddress: (state, action) => {
      console.log(action);
      state.address = action.payload;
    },
  },
});

export const selectGuestReceipt = (state) => {
  return state.guestReceipt;
};

export const { addItems, addAddress } = guestReceiptSlice.actions;

export default guestReceiptSlice.reducer;
