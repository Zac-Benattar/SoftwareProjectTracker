import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import AuthContext from "../context/AuthContext";

const Homepage = () => {
  
  // Defining the states
  let [project, setProject] = useState([]);

  // Deconstructing the relevent sections from AuthContext
  let { authTokens, logoutUser, user } = useContext(AuthContext);

  // Get slug parameter given when Project is referenced in router
  const { slug } = useParams();

  // Setting up states
  useEffect(() => {
    getProject();
  }, []);

  // Obtaining the specific project via a GET request to the api referencing our authorisation token
  let getProject = async (e) => {
    let response = await fetch("http://127.0.0.1:8000/api/projects/".concat(slug), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    // If the response is good - set the state of project to be the result of the GET request
    if (response.status === 200) {
      setProject(data);
    // If the respose is unauthorised, log out the user using the imported AuthContext method
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  // For machine learning, put a new get request section here that gets from the machine learning endpoint, which will need to be created in the api

  return (
    <div>
      <h1>Project: {project.name}</h1>
      <h1>Success chance: </h1>
    </div>
  );
};

export default Homepage;
