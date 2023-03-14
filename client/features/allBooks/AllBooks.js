import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, selectAllBooks } from "./allBooksSlice";

const AllBooks = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector(selectAllBooks);
  console.log(allBooks);
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);
  return (
    <div>
      <h1>Browse All New York Times Bestsellers</h1>
    </div>
  );
};

export default AllBooks;
