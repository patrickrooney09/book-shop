import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchSingleBookAsync,
  selectSingleBook,
} from "../singleBook/singleBookSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllBooks } from "../allBooks/allBooksSlice";
import { fetchAllBooksAsync } from "../allBooks/allBooksSlice";

const SingleBook = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const bookStatus = useSelector((state) => state.books.status);

  useEffect(() => {}, [bookStatus, dispatch]);

  if (bookStatus === "idle") {
    dispatch(fetchAllBooksAsync());
  }

  const book = useSelector(selectAllBooks).books[bookId];
  console.log(book);
  console.log(bookId);
  // const bookStatus = useSelector((state) => state.singleBook.status);

  // useEffect(() => {
  //   dispatch(fetchSingleBookAsync(bookId));
  // }, [bookId]);

  // const singleBook = useSelector(selectSingleBook);

  // console.log("SINGLE BOOK:", singleBook);
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
      </div>
    );
  } else if (bookStatus === "failed") {
    content = <div>{error}</div>;
  }
  // return (
  //   <div>
  //     <h1>Hello</h1>
  //     <h1>{book.title}</h1>
  //     <h2>by {book.author}</h2>
  //     <img></img>
  //     <img src={book.book_image} alt="Book Image" />
  //     <p>{book.description}</p>
  //   </div>
  // );
};

export default SingleBook;
