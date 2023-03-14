import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/

/*
  THUNKS
*/
export const getAllBooks = createAsyncThunk("/allBooks", async () => {
  // const token = window.localStorage.getItem(TOKEN);
  try {
    if (NYT_API_KEY) {
      const res = await axios.get(
        `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`
      );
      console.log("BOOKS FROM NYT:", res.data);
      return res.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return "There was an issue with your request.";
    }
  }
});

// export const authenticate = createAsyncThunk(
//   'auth/authenticate',
//   async ({ username, password, method }, thunkAPI) => {
//     try {
//       const res = await axios.post(`/auth/${method}`, { username, password });
//       window.localStorage.setItem(TOKEN, res.data.token);
//       thunkAPI.dispatch(me());
//     } catch (err) {
//       if (err.response.data) {
//         return thunkAPI.rejectWithValue(err.response.data);
//       } else {
//         return 'There was an issue with your request.';
//       }
//     }
//   }
// );

/*
  SLICE
*/
export const allBooks = createSlice({
  name: "allBooks",
  initialState: {
    // getAllBooks: {},
    // error: null,
  },
  reducers: {
    // logout(state, action) {
    //   window.localStorage.removeItem(TOKEN);
    //   state.getAllBooks = {};
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      console.log(action.payload);
      state.me = action.payload;
    });
    builder.addCase(getAllBooks.rejected, (state, action) => {
      state.error = action.error;
    });
    // builder.addCase(authenticate.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
  },
});

/*
  ACTIONS
*/
// export const { logout } = getAllBooks.actions;
export const selectAllBooks = (state) => {
  return state.allBooks;
};
/*
  REDUCER
*/
export default allBooks.reducer;
