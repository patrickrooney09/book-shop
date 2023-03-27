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
      // making copy of object so i can add a quantity property to it

      let book = Object.assign({}, action.payload);

      if (state.length > 0) {
        let found = false;
        state.filter((currentBook, index) => {
          if (book.title === currentBook.title) {
            currentBook.quantity++;
            sessionStorage.removeItem(book.title);
            sessionStorage.setItem(
              currentBook.title,
              JSON.stringify(currentBook)
            );
            found = true;
          } else if (index === state.length - 1 && found === false) {
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
    },
    removeBook: (state, action, index) => {
      console.log(action.payload.title);
      sessionStorage.removeItem(action.payload.title);
      state.splice(index, 1);
    },
    increaseQuantity(state, action, index) {
      // must filter here instead of accessing array directly
      state.filter((currentBook) => {
        if (currentBook.title === action.payload.title) {
          currentBook.quantity++;
          sessionStorage.removeItem(currentBook.title);
          sessionStorage.setItem(
            currentBook.title,
            JSON.stringify(currentBook)
          );
        }
      });
    },
    decreaseQuantity(state, action, index) {
      // must filter here instead of accessing array directly
      state.filter((currentBook) => {
        if (
          currentBook.title === action.payload.title &&
          currentBook.quantity > 1
        ) {
          currentBook.quantity--;
          sessionStorage.removeItem(currentBook.title);
          sessionStorage.setItem(
            currentBook.title,
            JSON.stringify(currentBook)
          );
        }
      });
    },
    clearCart(state, action) {
      return (state = []);
    },
  },
});

export const selectGuestCart = (state) => {
  return state.guestCart;
};

export const {
  addBook,
  removeBook,
  increaseQuantity,
  decreaseQuantity,
  getQuantity,
  clearCart,
} = guestCartSlice.actions;

export default guestCartSlice.reducer;
