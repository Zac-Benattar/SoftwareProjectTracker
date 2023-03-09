import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SuccessChanceDisplay from "../components/SuccessChanceDisplay";
import AuthContext from "../context/AuthContext";
import HomeNavbar from "../components/HomeNavbar";

const UserProfile = () => {
  // Deconstructing the relevent sections from AuthContext
  let { authTokens, logoutUser, user } = useContext(AuthContext);

  let [currentUser, setUser] = useState([]);
  let [skills, setSkills] = useState([]);

  // Get slug parameter given when Project is referenced in router
  const { slug } = useParams();

  // Setting up states
  useEffect(() => {
    getUser();
    getSkills();
  }, []);

  // Obtaining the specific project's most recent risk evaulation via a GET request to the api referencing our authorisation token
  let getUser = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/api/users/".concat(user.user_id),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();

    // If the response is good - set the state of riskevaluation to be the result of the GET request
    if (response.status === 200) {
      setUser(data);
      // If the respose is unauthorised, log out the user using the imported AuthContext method
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };


  let getSkills = async () => {
    let response = await fetch('/api/users/'+currentUser.id+'/skills');
    let data = await response.json();
    console.log("Data:", data);
    setSkills(data);
  };



  console.log(currentUser);
  console.log(skills);
  return (
    <>
      <div className="home-page">
        <HomeNavbar />
        <div className="projects-page-content">
          <div className="project-info-container">
            <p> Name: {currentUser.first_name} </p>
            <p> Username:{currentUser.username} </p>
            Skills: 
            {skills.map((skill) => 

                <li className="skill">
                    {skill.name}
                </li>

            )}

            <p> Email: {currentUser.email}</p>
            <p> Join date: {currentUser.date_joined}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
