import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooksAsync, selectAllBooks } from "./allBooksSlice";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector(selectAllBooks);
  const bookStatus = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

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
            {index + 1}. <Link to="/singleBook">{book.title}</Link> by{" "}
            {book.author}
          </div>
          <img src={book.book_image} alt="Book Image" />
          <p>{book.description}</p>
          <p>Price: {book.price}</p>
          <button>Add to Cart</button>
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
