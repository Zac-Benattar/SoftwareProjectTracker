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

  const passing_data = {
    name: state.name,
    id: state.id,
    description: state.description,
    i_budget: state.initial_budget,
    c_budget: state.current_budget,
    i_deadline: state.initial_deadline,
    c_deadline: state.current_deadline,
    methodology: state.methodology,
  };

  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/project" state={passing_data}>
              Project Overview
            </Link>
          </li>
          <li>
            <Link to="/suggestions">Suggestions</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          <li>
            <Link to="/people" state={passing_data}>
              People
            </Link>
          </li>
          <li className="logout">
            {user ? (
              // This needs styling in css like a link to hide the fact its a paragraph
              <p className="logout-button" onClick={logoutUser}>
                Logout
              </p>
            ) : (
              <Link to="/login">Login</Link>
            )}
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
