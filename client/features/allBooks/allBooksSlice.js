import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllBooksAsync = createAsyncThunk("/allBooks", async () => {
  try {
    const res = await axios.get(`/api/nyt`);
    const bookList = res.data.results.books;
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBooksAsync.pending, (state, action) => {
      state.status = "loading";

      // state.me = action.payload;
    });
    builder.addCase(fetchAllBooksAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.books = state.books.concat(action.payload);
      console.log("state fulfilled", state.books);
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
export default allBooksSlice.reducer;
