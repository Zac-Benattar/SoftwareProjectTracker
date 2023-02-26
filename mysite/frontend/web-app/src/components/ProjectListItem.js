import React from "react";
import { Progress_bar } from "./ProgressBar";

export const ProjectListItem = ({ project }) => {
  return (
    <div className="project_container">
      <div className="title">
        <h1>{project.name}</h1>
      </div>
      <div>
        <Progress_bar progress="100" />
      </div>
      <div className="info_container">
        <div className="info">
          <p>Current Budget: £{project.current_budget}</p>
          <p>Current Deadline: {project.current_deadline}</p>
          <p>{project.methodology}</p>
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
