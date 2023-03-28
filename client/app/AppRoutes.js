import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import AllBooks from "../features/allBooks/AllBooks";
import SingleBook from "../features/singleBook/SingleBook";
import GuestCart from "../features/guestCart/GuestCart";
import { me } from "./store";
import GuestCheckoutPage from "../features/guestCart/GuestCheckoutPage";
import GuestReceipt from "../features/guestReceipt/GuestReceipt";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/allBooks" element={<AllBooks />} />
          <Route path="/singleBook/:bookId" element={<SingleBook />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/allBooks" element={<AllBooks />} />
          <Route path="/singleBook/:bookId" element={<SingleBook />} />
          <Route path="/guestCart" element={<GuestCart />} />
          <Route path="/GuestCheckoutPage" element={<GuestCheckoutPage />} />
          <Route path="/GuestReceipt" element={<GuestReceipt />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
