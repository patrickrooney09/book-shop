import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGuestCart } from "./guestCartSlice";
import {
  removeBook,
  increaseQuantity,
  decreaseQuantity,
} from "./guestCartSlice";

const GuestCart = () => {
  const guestBooks = useSelector(selectGuestCart);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Your Cart Good Sir</h1>
      <h2>Items:</h2>
      {guestBooks.map((book, index) => {
        return (
          <div key={index}>
            <h3>{book.title}</h3>
            <h4>{book.author}</h4>
            <img
              src={book.book_image}
              alt="Book Image"
              width="50"
              height="50"
            />
            <button
              onClick={() => {
                dispatch(removeBook(book, index));
              }}
            >
              Remove Book
            </button>
            <button
              onClick={() => {
                dispatch(increaseQuantity(book, index));
              }}
            >
              Increase quantity
            </button>
            <button
              onClick={() => {
                dispatch(decreaseQuantity(book, index));
              }}
            >
              decrease quantity
            </button>
            <p>Quantity: {book.quantity}</p>
          </div>
        );
      })}
      <button>Proceed to checkout</button>
    </div>
  );
};

export default GuestCart;
