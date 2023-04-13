import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItemsAsync, selectAllItems } from "./userCartSlice";
import { useParams } from "react-router-dom";

const UserCart = () => {
  const dispatch = useDispatch();
  let cartStatus = useSelector((state) => state.allItems.status);
  const error = useSelector((state) => state.allItems.error);
  const items = useSelector(selectAllItems);

  const { userId } = useParams();

  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(getItemsAsync(userId));
    }
  }, [cartStatus, dispatch]);

  let userItems;

  if (cartStatus === "loading") {
    userItems = <h1>Loading</h1>;
  } else if (cartStatus === "succeeded") {
    userItems = items.items.map((item, index) => {
      return (
        <div key={index}>
          {" "}
          <img src={item.book_image} alt="Book Image" width="50" height="50" />
          <div>{item.title}</div>
          <div>{item.author}</div>
          <div>{item.quantity}</div>
        </div>
      );
    });
  } else if (cartStatus === "failed") {
    userItems = <div>{error}</div>;
  }
  return (
    <div>
      <h1>User Cart</h1>
      {userItems}
    </div>
  );
};

export default UserCart;
