import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SuccessChanceDisplay from "../components/SuccessChanceDisplay";
import AuthContext from "../context/AuthContext";
import HomeNavbar from "../components/HomeNavbar";
import { FaUser } from 'react-icons/fa'

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
  console.log("skill",skills);
  return (
    <>
      <div className="home-page">
        <HomeNavbar />
        <div className="user-profile-content">
          <i className="user-icon"> <FaUser/> </i>
          <div className="user-info-container">

            <div className="prof-line">
              <h3 className="prof-title"> Name: </h3> 
              <p className="prof-text"> {currentUser.first_name} </p>
            </div>

            <div className="prof-line">  
              <h3 className="prof-title"> Username:  </h3 >   
              <p className="prof-text">{currentUser.username} </p>
            </div>

            <div className="prof-line">  
              <h3 className="prof-title"> Skills: </h3>
              {skills.map((skill) => 

                  <li className="skill">
                      {skill.name}
                  </li>

              )}
            </div>


            
            <div className="prof-line">  

              <h3 className="prof-title">Email:  </h3>
              <p className="prof-text"> {currentUser.email}</p>
            </div>

            <div className="prof-line">  
              <h3 className="prof-title"> Join date: </h3> #
              <p className="prof-text"> {currentUser.date_joined}</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
