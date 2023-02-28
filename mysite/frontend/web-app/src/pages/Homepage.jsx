import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../App.css";
import { Dropdown } from "../components/Dropdown";
import { Navbar } from "../components/Navbar";
import { ProjectListItem } from "../components/ProjectListItem";

export const Homepage = () => {
  const options = [
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
  ];

  let [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  let getProjects = async () => {
    let response = await fetch("/api/projects/");
    let data = await response.json();
    console.log("Data:", data);
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
