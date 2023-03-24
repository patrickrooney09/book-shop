import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectGuestCart } from "../guestCart/guestCartSlice";

const GuestCheckOut = () => {
  const navigate = useNavigate();
  const guestBooks = useSelector(selectGuestCart);
  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={() => navigate("/guestCart")}>Back To Cart</button>
      <form>
        <h3>Enter Shipping Address:</h3>
        <label>Street:</label>
        <input type="text" name="streetName" />
        <label>City:</label>
        <input type="text" name="cityName" />
        <label>State:</label>
        <input type="text" name="stateName" />
        <label>ZIP Code:</label>
        <input type="text" name="zipCode" />
        <label>Email Address:</label>
        <input type="text" name="emailAddress" />
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

export default GuestCheckOut;
