import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGuestCart } from "./guestCartSlice";
import { removeBook } from "./guestCartSlice";

const GuestCart = () => {
  const guestBooks = useSelector(selectGuestCart);
  const dispatch = useDispatch();
  console.log(guestBooks);
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
              -
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GuestCart;
