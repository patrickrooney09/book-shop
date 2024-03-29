import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooksAsync, selectAllBooks } from "./allBooksSlice";
import { addBook } from "../guestCart/guestCartSlice";
import { addItemAsync } from "../userCart/userCartSlice";
import { Link } from "react-router-dom";
import SingleBook from "../singleBook/SingleBook";
import { increaseOrderQuantity, decreaseOrderQuantity } from "./allBooksSlice";

const AllBooks = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector(selectAllBooks);
  const bookStatus = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);
  const user = useSelector((state) => state.auth.me);

  useEffect(() => {
    if (bookStatus === "idle") {
      dispatch(fetchAllBooksAsync());
    }
  }, [bookStatus, dispatch]);

  let content;

  if (bookStatus === "loading") {
    content = <h1>Loading</h1>;
  } else if (bookStatus === "succeeded") {
    content = allBooks.books.map((book, index) => {
      return (
        <div className="allBooksBook" key={index}>
          <div>
            {index + 1}. <Link to={`/singleBook/${index}`}>{book.title}</Link>{" "}
            by {book.author}
          </div>
          <p>Price: {book.price}</p>
          <img src={book.book_image} alt="Book Image" width="50" height="50" />
          <button
            onClick={() => {
              if (Object.keys(user).length > 0) {
                // checking if the user object is empty- previously i had this as if user undefined
                dispatch(addItemAsync({ ...book, cartId: user.id }));
              } else {
                dispatch(addBook(book));
              }
            }}
          >
            Add to Cart
          </button>
          <div>
            <button
              onClick={() => {
                dispatch(decreaseOrderQuantity(book, index));
              }}
            >
              -
            </button>
            Quantity: {book.customerDefaultQuantity}
            <button
              onClick={() => {
                dispatch(increaseOrderQuantity(book, index));
              }}
            >
              +
            </button>
          </div>
        </div>
      );
    });
  } else if (bookStatus === "failed") {
    content = <div>{error}</div>;
  }
  return (
    <div>
      <h1>Browse All New York Times Bestsellers</h1>
      {content}
    </div>
  );
};

export default AllBooks;
