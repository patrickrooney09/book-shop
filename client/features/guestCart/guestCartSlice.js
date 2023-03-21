import { createSlice } from "@reduxjs/toolkit";

export const guestCartSlice = createSlice({
  name: "guestCart",
  initialState: [],
  reducers: {
    addBook: (state, action) => {
      console.log("book:", action);
      console.log("state", state);
      state.push(action.payload);
    },
  },
});

export const selectGuestCart = (state) => {
  return state.guestCart;
};

export const { addBook } = guestCartSlice.actions;

export default guestCartSlice.reducer;
