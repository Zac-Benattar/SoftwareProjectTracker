import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Logout {username}</Link>
        </li>
      </nav>
    </div>
  );
};

export default Navbar;
