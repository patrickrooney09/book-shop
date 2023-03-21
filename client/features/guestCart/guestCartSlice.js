import { createSlice } from "@reduxjs/toolkit";

const initialState =
  sessionStorage !== null
    ? Object.values(sessionStorage).map((currentBook) => {
        return JSON.parse(currentBook);
      })
    : [];
export const guestCartSlice = createSlice({
  name: "guestCart",
  initialState,
  reducers: {
    addBook: (state, action) => {
      console.log("book:", action);
      console.log(state);
      state.push(action.payload);
      sessionStorage.setItem(
        action.payload.title,
        JSON.stringify(action.payload)
      );
      console.log(sessionStorage);
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
