import React from "react";
import { selectGuestCheckoutAddress } from "../guestCart/guestCheckoutAddressSlice";
import { clearCart, selectGuestCart } from "../guestCart/guestCartSlice";
import { useSelector, useDispatch } from "react-redux";

const GuestReceipt = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectGuestCart);
  const address = useSelector(selectGuestCheckoutAddress);
  const totalPrice = books.reduce((previousValue, currentValue) => {
    return previousValue + Number(currentValue.price);
  }, 0);

  return (
    <div>
      <h1>Order Confirmation</h1>
      <div>
        Your Order of:{" "}
        {books.map((book, index) => {
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
          {address.name}
          <br />
          {address.street}
          <br />
          {address.city}
          <br />
          {address.state}
          <br />
          {address.zip}
        </div>{" "}
        for a total price of ${totalPrice}
      </div>
    </div>
  );
};

export default GuestReceipt;
