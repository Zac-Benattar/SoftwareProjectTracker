import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import Dropdown from "../components/Dropdown";
import ProjectListItem from "../components/ProjectListItem";
import AuthContext from "../context/AuthContext";

const Homepage = () => {
  const options = [
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
  ];

  let [projects, setProjects] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getProjects();
  }, []);

  let getProjects = async (e) => {
    let response = await fetch("http://127.0.0.1:8000/api/projects/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setProjects(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <div className="home-page">
        <div className="dropdown-menu">
          <Dropdown placeHolder="Select ..." options={options} />
        </div>

        <div>
          <div className="projects-list">
            {projects.map((project, index) => (
              <ProjectListItem key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
