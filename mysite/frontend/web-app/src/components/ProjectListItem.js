import React from "react";
import { ProgressBar } from "./ProgressBar";
import { Homepage } from "../pages/Homepage";
import "../pages/Homepage.css";
import {Link} from "react-router-dom";

export const ProjectListItem = ({ project }) => {

 
  const passing_data = {
    name: project.name,
    id: project.id,
  };

  return (
    

      <div className="project_container">
        <Link to="/project" state = {passing_data}>
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
