import React from "react";
import ProgressBar from "./ProgressBar";
import "../pages/Homepage.css";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export const ProjectListItem = ({ project }) => {
  const projectRoute = "/projects/".concat(project.id);

  // Turning unix timestamp into a nicely formatted string
  const currentDeadlineDate = new Date(project.current_deadline_unix * 1000);
  var currentDeadlineString = "";

  // If number of hours in the date is zero, append another zero to the end to get e.g. 00:30 rather than 0:30
  if (currentDeadlineDate.getUTCHours() === 0) {
    currentDeadlineString += currentDeadlineDate.getUTCHours() + "0";
  } else if (
    currentDeadlineDate.getUTCHours() > 0 &&
    currentDeadlineDate.getUTCHours() < 10
  ) {
    currentDeadlineString += "0" + currentDeadlineDate.getUTCHours();
  } else {
    currentDeadlineString += currentDeadlineDate.getUTCHours();
  }

  currentDeadlineString += ":";

  // If number of minutes in the date is zero, append another zero to the end to get e.g. 12:00 rather than 12:0
  if (currentDeadlineDate.getUTCMinutes() === 0) {
    currentDeadlineString += currentDeadlineDate.getUTCMinutes() + "0 ";
  } else if (
    currentDeadlineDate.getUTCMinutes() > 0 &&
    currentDeadlineDate.getUTCMinutes() < 10
  ) {
    currentDeadlineString += "0" + currentDeadlineDate.getUTCMinutes();
  } else {
    currentDeadlineString += currentDeadlineDate.getUTCMinutes();
  }

  currentDeadlineString +=
    " " +
    currentDeadlineDate.getUTCDate() +
    "/" +
    currentDeadlineDate.getUTCMonth() +
    "/" +
    currentDeadlineDate.getUTCFullYear();

  return (
    <Link to={projectRoute}>
      <div className="project_container">
        <div className="title-info">
          <div className="title">
            <h1>{project.name}</h1>
          </div>

          <div className="progress-bar">
            <ProgressBar progress={project.completion} />
          </div>
        </div>
        <div className="info_container">
          <div className="info">
            <h3>Current Budget:</h3> <p> £{project.current_budget}</p>
            <br />
            <br />
            <h3>Current Deadline:</h3>
            <p> {currentDeadlineString}</p>
            <br />
            <br />
            <h3>Methodology: </h3>
            <p>{project.methodology}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectListItem;
