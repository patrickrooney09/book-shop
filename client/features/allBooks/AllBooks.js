import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooksAsync, selectAllBooks } from "./allBooksSlice";
import { addBook } from "../guestCart/guestCartSlice";
import { addItemAsync } from "../userCart/userCartSlice";
import { Link } from "react-router-dom";
import SingleBook from "../singleBook/SingleBook";

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
              dispatch(addBook(book));
              console.log("USER:", user);
              if (Object.keys(user).length > 0) {
                // checking if the user object is empty- previously i had this as if user undefined
                dispatch(addItemAsync({ ...book, cartId: user.id }));
              }
            }}
          >
            Add to Cart
          </button>
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
