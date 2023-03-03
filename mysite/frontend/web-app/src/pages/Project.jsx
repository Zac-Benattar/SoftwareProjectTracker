import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import AuthContext from "../context/AuthContext";

const Homepage = () => {
  let [project, setProject] = useState([]);
  let { authTokens, logoutUser, user } = useContext(AuthContext);
  const { slug } = useParams();

  useEffect(() => {
    getProject();
  }, []);

  let getProject = async (e) => {
    let response = await fetch("http://127.0.0.1:8000/api/projects/".concat(slug), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setProject(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <h1>Project: {project.name}</h1>
    </div>
  );
};

export default Homepage;
