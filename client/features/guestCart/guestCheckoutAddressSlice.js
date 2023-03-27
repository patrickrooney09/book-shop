import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
};

export const guestCheckoutAddressSlice = createSlice({
  name: "guestCheckoutAddress",
  initialState,
  reducers: {
    addName: (state, action) => {
      console.log(state);
      console.log(action);
      state.name = action.payload;
    },
    addStreet: (state, action) => {
      state.street = action.payload;
    },
    addCity: (state, action) => {
      state.city = action.payload;
    },
    addState: (state, action) => {
      state.state = action.payload;
    },
    addZip: (state, action) => {
      state.zip = action.payload;
    },
    addEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const selectGuestCheckoutAddress = (state) => {
  return state.guestCheckoutAddress;
};

export const { addName, addStreet, addCity, addState, addZip, addEmail } =
  guestCheckoutAddressSlice.actions;

export default guestCheckoutAddressSlice.reducer;
