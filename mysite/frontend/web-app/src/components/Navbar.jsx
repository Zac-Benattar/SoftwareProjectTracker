import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavbarElems";
import "../App.css"
import AuthContext from "../context/AuthContext";

export const Navbar = (e) => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/overview">Overview</Link>
      </li>
      <li>
        <Link to="/suggestions">Suggestions</Link>
      </li>
      <li>
        <Link to="/tasks">Tasks</Link>
      </li>
      <li>
        <Link to="/people">People</Link>
      </li>
      <li>
        {user ? (
          <p onClick={logoutUser}>Logout</p>
        ) : (
          <Link to="/login">Login</Link>
        )}

        {user && <p>Hello {user.username}</p>}
      </li>
    </div>
  );
};

export default Navbar;
