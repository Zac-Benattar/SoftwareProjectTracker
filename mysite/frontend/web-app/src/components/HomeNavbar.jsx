import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavbarElems";
import AuthContext from "../context/AuthContext";

export const HomeNavbar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  const userProfileRoute = "/users/".concat(user.user_id);

  return (
    <div>
      <nav className="home-nav">
        <ul>
          <li>
              <p onClick={logoutUser}>Logout</p>
          </li>
          <li>
            <Link to={userProfileRoute}>{user.username}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomeNavbar;
