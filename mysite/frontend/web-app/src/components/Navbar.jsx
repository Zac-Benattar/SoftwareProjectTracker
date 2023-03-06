import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavbarElems";
import "../App.css";
import AuthContext from "../context/AuthContext";

const Navbar = (props) => {
  let { user, logoutUser } = useContext(AuthContext);
  const userProfileRoute = "/users/".concat(user.user_id);

  const location = useLocation();
  const state = location.state;

  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/project">Project Overview</Link>
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
          <li className="logout">
            <p className="logout-button" onClick={logoutUser}>
              Logout
            </p>
          </li>
          <li>
            <Link to={userProfileRoute}>{user.username}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
