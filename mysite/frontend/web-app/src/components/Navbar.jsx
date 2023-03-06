import React, { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./NavbarElems";
import "../pages/Homepage.css";
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
  const { slug } = useParams();
  const baseRoute="/projects/".concat(slug)
  const suggestionsRoute=baseRoute.concat("/suggestions")
  const tasksRoute=baseRoute.concat("/tasks")
  const peopleRoute=baseRoute.concat("/people")
  const meetingsRoute = baseRoute.concat("/meetings")


  return (
    
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={baseRoute}>
              Project Overview
            </Link>
          </li>
          <li>
            <Link to={suggestionsRoute}>Suggestions</Link>
          </li>
          <li>
            <Link to={tasksRoute}>Tasks</Link>
          </li>
          <li>
            <Link to={peopleRoute}>People</Link>
          </li>
          <li>
            <Link to={meetingsRoute}>
              Meetings
            </Link>
          </li>
          <li onClick={logoutUser}>
              Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
