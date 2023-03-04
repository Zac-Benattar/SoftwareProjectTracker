import React from "react";
import ProgressBar from "./ProgressBar";
import "../pages/Homepage.css";
import { Link } from "react-router-dom";

export const ProjectListItem = ({ project }) => {
  const passing_data = {
    name: project.name,
    id: project.id,
    description: project.description,
    i_budget: project.initial_budget,
    c_budget: project.current_budget,
    i_deadline: project.initial_deadline,
    c_deadline: project.current_deadline,
    methodology: project.methodology,
  };

  const projectRoute = "/projects/".concat(passing_data.id);

  return (
    <div className="project_container">
      <Link to={projectRoute} state={passing_data}>
        <div className="title">
          <h1>{project.name}</h1>
        </div>
      </Link>

      <div className="progress-bar">
        <ProgressBar progress="30" />
      </div>
      <div className="info_container">
        <div className="info">
          <p>Current Budget: £{project.current_budget}</p>
          <p>Current Deadline: {project.current_deadline}</p>
          <p>Methodology: {project.methodology}</p>
        </div>
        <div className="info">
          <p>Here there will be some info</p>
          <p>Some more info </p>
          <p>Some other info</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectListItem;
