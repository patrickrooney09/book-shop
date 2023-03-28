import React from "react";
import { selectGuestCheckoutAddress } from "../guestCart/guestCheckoutAddressSlice";
import { selectGuestReceipt } from "./guestReceiptSlice";

import { useSelector, useDispatch } from "react-redux";

const GuestReceipt = () => {
  const dispatch = useDispatch();
  const receipt = useSelector(selectGuestReceipt);
  const totalPrice = receipt.items.reduce((previousValue, currentValue) => {
    return previousValue + Number(currentValue.price);
  }, 0);

  return (
    <div>
      <h1>Order Confirmation</h1>
      <div>
        Your Order of:{" "}
        {receipt.items.map((book, index) => {
          return (
            <li key={index}>
              <strong>Title:</strong> {book.title} <strong>Author:</strong>{" "}
              {book.author} <strong>Price:</strong> {book.price}{" "}
              <strong>Quantity:</strong> {book.quantity}
            </li>
          );
        })}
        will be sent to{" "}
        <div>
          {receipt.address.name}
          <br />
          {receipt.address.street}
          <br />
          {receipt.address.city}
          <br />
          {receipt.address.state}
          <br />
          {receipt.address.zip}
        </div>{" "}
        for a total price of ${totalPrice}
      </div>
    </div>
  );
};

export default GuestReceipt;
