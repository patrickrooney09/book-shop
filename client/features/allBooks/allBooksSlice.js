import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import guestCartSlice from "../guestCart/guestCartSlice";

export const fetchAllBooksAsync = createAsyncThunk("/allBooks", async () => {
  try {
    const res = await axios.get(`/api/nyt`);
    const bookList = res.data.results.books;
    bookList.map((currentBook) => {
      currentBook.customerDefaultQuantity = 1;
    });
    return bookList;
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return "There was an issue with your request.";
    }
  }
});

/*
  SLICE
*/
export const allBooksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {
    increaseOrderQuantity: (state, action, index) => {
      console.log(action.payload);
      state.books.filter((currentBook) => {
        console.log(currentBook.customerDefaultQuantity);
        if (currentBook.title === action.payload.title) {
          currentBook.customerDefaultQuantity++;
        }
      });

      // action.payload.customerDefaultQuantity++;
    },
    decreaseOrderQuantity: (state, action, index) => {
      state.books.filter((currentBook) => {
        if (currentBook.title === action.payload.title) {
          currentBook.customerDefaultQuantity--;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBooksAsync.pending, (state, action) => {
      state.status = "loading";

      // state.me = action.payload;
    });
    builder.addCase(fetchAllBooksAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      // state.books = state.books.concat(action.payload);
      state.books = action.payload;
      // state.me = action.payload;
    });
    builder.addCase(fetchAllBooksAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

/*
  ACTIONS
*/
export const selectAllBooks = (state) => {
  console.log("selectAllBooks", state);
  return state.books;
};
/*
  REDUCER
*/
export const { increaseOrderQuantity, decreaseOrderQuantity } =
  allBooksSlice.actions;
export default allBooksSlice.reducer;
