import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleBookAsync = createAsyncThunk(
  "singleBook",
  async (id) => {
    try {
      const res = await axios.get(`/api/nyt/${id}`);
      console.log("BOOKLIST IN FETCH SINGLE BOOK:", res.data);
      const bookList = res.data;
      return bookList;
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return "There was an issue with your request.";
      }
    }
  }
);

// export const updateSingleStudentAsync = createAsyncThunk(
//   "updateSingleStudent",
//   async (studentData) => {
//     try {
//       const { data } = await axios.put(
//         `/api/students/${studentData.id}`,
//         studentData
//       );
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const singleBookSlice = createSlice({
  name: "singleBook",
  initialState: { book: {}, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleBookAsync.pending, (state, action) => {
      state.status = "loading";

      // state.me = action.payload;
    });
    builder.addCase(fetchSingleBookAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.book = action.payload;
    });
  },
});

export const selectSingleBook = (state) => {
  console.log("SELECT SINGLE BOOK", state.singleBook);
  return state.singleBook.book;
};

export default singleBookSlice.reducer;
