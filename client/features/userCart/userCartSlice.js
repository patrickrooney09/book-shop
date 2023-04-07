import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemAsync = createAsyncThunk("addItem", async (itemData) => {
  const { data } = await axios.post("/api/items", itemData);
  return data;
});

const allItemsSlice = createSlice({
  name: "allItems",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addItemAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectAllItems = (state) => {
  return state.allItems;
};

export default allItemsSlice.reducer;
