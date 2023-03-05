import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavbarElems";
import AuthContext from "../context/AuthContext";

export const HomeNavbar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <nav className="home-nav">
        <ul>
          <li>
            {user ? (
              <p onClick={logoutUser}>Logout</p>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          <li>{user && <p>{user.username}</p>}</li>
        </ul>
      </nav>
    </div>
  );
};

export default HomeNavbar;
