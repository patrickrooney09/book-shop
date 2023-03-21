import { createSlice } from "@reduxjs/toolkit";

export const guestCartSlice = createSlice({
  name: "guestCart",
  initialState: [],
  reducers: {
    addBook: (state, action) => {
      console.log("book:", action);
      console.log(state);
      state.push(action.payload);
    },
    removeBook: (state, action, index) => {
      state.splice(index, 1);
    },
  },
});

export const selectGuestCart = (state) => {
  return state.guestCart;
};

export const { addBook, removeBook } = guestCartSlice.actions;

export default guestCartSlice.reducer;
