import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectGuestCart } from "./guestCartSlice";
import {
  addName,
  addStreet,
  addCity,
  addState,
  addZip,
  addEmail,
} from "./guestCheckoutAddressSlice";
import { selectGuestCheckoutAddress } from "./guestCheckoutAddressSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const guestBooks = useSelector(selectGuestCart);
  const address = useSelector(selectGuestCheckoutAddress);

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={() => navigate("/guestCart")}>Back To Cart</button>

      <form>
        <h3>Enter Shipping Address:</h3>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={address.name}
          onChange={(event) => {
            dispatch(addName(event.target.value));
          }}
        />
        <label>Street:</label>
        <input
          type="text"
          name="streetName"
          value={address.street}
          onChange={(event) => {
            dispatch(addStreet(event.target.value));
          }}
        />
        <label>City:</label>
        <input
          type="text"
          name="cityName"
          value={address.city}
          onChange={(event) => {
            dispatch(addCity(event.target.value));
          }}
        />
        <label>State:</label>
        <input
          type="text"
          name="stateName"
          value={address.state}
          onChange={(event) => {
            dispatch(addState(event.target.value));
          }}
        />
        <label>ZIP Code:</label>
        <input
          type="text"
          name="zipCode"
          value={address.zip}
          onChange={(event) => {
            dispatch(addZip(event.target.value));
          }}
        />
        <label>Email Address:</label>
        <input
          type="text"
          name="emailAddress"
          value={address.email}
          onChange={(event) => {
            dispatch(addEmail(event.target.value));
          }}
        />
        <button>Submit Order</button>
      </form>
      <div>
        <h3>Your Items:</h3>
        <ul>
          {guestBooks.map((book, index) => {
            return (
              <li key={index}>
                <strong>Title:</strong> {book.title} <strong>Author:</strong>{" "}
                {book.author} <strong>Price:</strong> {book.price}{" "}
                <strong>Quantity:</strong> {book.quantity}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CheckoutPage;
