import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const guestCheckoutSlice = createSlice({
  name: "guestAddress",
  initialState,
  reducers: {},
});

export const selectGuestAddress = (state) => {
  return state.guestAddress;
};

export const { completeOrder } = guestCheckoutSlice.actions;

export default guestCheckoutSlice.reducer;
