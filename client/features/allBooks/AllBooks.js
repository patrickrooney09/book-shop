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
    // Sort posts in reverse chronological order by datetime string
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));

    // content = allBooks.books[0].title;
    content = allBooks.books.map((book) => {
      return <div>{book.title}</div>;
    });
  } else if (bookStatus === "failed") {
    content = <div>{error}</div>;
  }

  console.log(content);
  console.log(bookStatus);
  console.log(allBooks.books);

  // console.log("ALL BOOKS FROM ALL BOOKS COMPONENT:", allBooks);
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
