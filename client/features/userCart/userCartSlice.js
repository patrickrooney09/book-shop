import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemAsync = createAsyncThunk("addItem", async (itemData) => {
  console.log(itemData);
  const { data } = await axios.post("/api/items", itemData);
  return data;
});

export const getItemsAsync = createAsyncThunk("getItems", async (id) => {
  const { data } = await axios.get(`/api/items/${id}`);
  return data;
});

const allItemsSlice = createSlice({
  name: "allItems",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addItemAsync.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.status = "idle";
    });
    builder.addCase(getItemsAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getItemsAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(getItemsAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectAllItems = (state) => {
  return state.allItems;
};

export default allItemsSlice.reducer;
