import React from "react";
import { useParams } from "react-router-dom";

const SingleBook = () => {
  const { bookId } = useParams();
  console.log(bookId);
  return (
    <div>
      <h1>SINGLE BOOK PAGE</h1>
    </div>
  );
};

export default SingleBook;
