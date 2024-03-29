import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getItemsAsync,
  selectAllItems,
  deleteItemAsync,
  decreaseItemQuantityAsync,
} from "./userCartSlice";
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
      console.log("ITEM:", item.id);
      return (
        <div key={index}>
          {" "}
          <img src={item.book_image} alt="Book Image" width="50" height="50" />
          <div>{item.title}</div>
          <div>{item.author}</div>
          <div>{item.quantity}</div>
          <button
            onClick={() => {
              let idObject = { cartId: Number(userId), itemId: item.id };
              dispatch(deleteItemAsync(idObject));
            }}
          >
            Delete
          </button>
          <button>Increase Quantity</button>
          <button
            onClick={() => {
              dispatch(
                decreaseItemQuantityAsync({
                  title: item.title,
                  cartId: Number(userId),
                })
              );
            }}
          >
            Decrease Quantity
          </button>
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
