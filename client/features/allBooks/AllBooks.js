import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooksAsync, selectAllBooks } from "./allBooksSlice";

const AllBooks = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector(selectAllBooks);
  const bookStatus = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    console.log("BOOK STATUS", bookStatus);
    if (bookStatus === "idle") {
      dispatch(fetchAllBooksAsync());
    }
  }, [bookStatus, dispatch]);

  let content;

  if (bookStatus === "loading") {
    content = <h1>Loading</h1>;
  } else if (bookStatus === "succeeded") {
    content = allBooks.books.map((book) => {
      return (
        <div className="allBooksBook">
          <div>
            {book.title} by {book.author}
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

  console.log(content);
  console.log(bookStatus);
  console.log(allBooks.books);
  return (
    <div>
      <h1>Browse All New York Times Bestsellers</h1>
      {content}
      {/* <h2>{allBooks.books[0].title}</h2> */}
      {/* <ul>
        {allBooks.results.books?.map((currentBook) => {
          <li>{currentBook.title}</li>;
        })}
      </ul> */}
    </div>
  );
};

export default AllBooks;
