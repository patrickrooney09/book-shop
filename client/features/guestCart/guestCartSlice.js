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
      // making copy of object so i can add a quantity property to it
      let book = Object.assign({}, action.payload);

      if (state.length > 0) {
        state.filter((currentBook, index) => {
          if (book.title === currentBook.title) {
            currentBook.quantity++;
            sessionStorage.removeItem(book.title);
            sessionStorage.setItem(
              currentBook.title,
              JSON.stringify(currentBook)
            );
          } else if (
            index === state.length &&
            book.title !== currentBook.title
          ) {
            book.quantity = 1;
            state.push(book);
            sessionStorage.setItem(book.title, JSON.stringify(book));
          }
        });
      } else {
        book.quantity = 1;
        state.push(book);
        sessionStorage.setItem(book.title, JSON.stringify(book));
      }

      // book.quantity = 1;
      // state.push(book);
      // sessionStorage.setItem(book.title, JSON.stringify(book));
      // console.log(sessionStorage);
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
