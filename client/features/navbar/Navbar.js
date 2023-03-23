import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { selectGuestCart } from "../guestCart/guestCartSlice";

const Navbar = () => {
  const guestBooks = useSelector(selectGuestCart);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  const quantity = guestBooks.reduce((previousValue, currentValue) => {
    return (previousValue += currentValue.quantity);
  }, 0);

  return (
    <div>
      <h1>Book Shop</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/allBooks">Browse Books</Link>
            <Link to="/guestCart">
              {quantity === 0 ? "Guest Cart" : `Guest Cart (${quantity})`}
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
