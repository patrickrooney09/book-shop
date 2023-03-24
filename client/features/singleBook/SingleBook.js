import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllBooks } from "../allBooks/allBooksSlice";
import { fetchAllBooksAsync } from "../allBooks/allBooksSlice";
import { addBook } from "../guestCart/guestCartSlice";

const SingleBook = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const bookStatus = useSelector((state) => state.books.status);

  if (bookStatus === "idle") {
    dispatch(fetchAllBooksAsync());
  }

  const book = useSelector(selectAllBooks).books[bookId];

  if (bookStatus === "loading") {
    return <h1>Loading</h1>;
  } else if (bookStatus === "succeeded") {
    return (
      <div>
        <h1>{book.title}</h1>
        <h2>by {book.author}</h2>
        <img></img>
        <img src={book.book_image} alt="Book Image" />
        <p>{book.description}</p>
        <button
          onClick={() => {
            dispatch(addBook(book));
          }}
        >
          Add To Cart
        </button>
      </div>
    );
  } else if (bookStatus === "failed") {
    content = <div>{error}</div>;
  }
};

export default SingleBook;
