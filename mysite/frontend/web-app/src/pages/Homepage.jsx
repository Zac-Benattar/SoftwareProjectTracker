import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import Dropdown from "../components/Dropdown";
import Navbar from "../components/Navbar";
import ProjectListItem from "../components/ProjectListItem";
import AuthContext from "../context/AuthContext";

const Homepage = () => {
  const options = [
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
  ];

  let [projects, setProjects] = useState([]);
  let {authTokens} = useContext(AuthContext)

  useEffect(() => {
    getProjects();
  }, []);

  let getProjects = async () => {
    let response = await fetch('/api/projects/', {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorisation':'Bearer' + String*(authTokens.access)
      }
    });
    let data = await response.json();
    setProjects(data);
  };

  return (
    <div>
      <Navbar />

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
