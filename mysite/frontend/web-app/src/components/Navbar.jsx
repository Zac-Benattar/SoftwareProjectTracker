import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <nav className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {user ? (
            <p onClick={logoutUser}>Logout</p>
          ) : (
            <Link to="/login">Login</Link>
          )}

          {user && <p>Hello {user.username}</p>}
        </li>
      </nav>
    </div>
  );
};

export default Navbar;
