import React from "react";
// import "../pages/Homepage.css";

export const SuccessChanceDisplay = ({ risk_evaluation, suggestions }) => {
  const suggestionCount = suggestions.length;
  const date = new Date(risk_evaluation.date_unix * 1000);
  var dateString = "";

  // If number of hours in the date is zero, append another zero to the end to get e.g. 00:30 rather than 0:30
  if (date.getUTCHours() === 0) {
    dateString += date.getUTCHours() + "0";
  } else if (date.getUTCHours() > 0 && date.getUTCHours() < 10) {
    dateString += "0" + date.getUTCHours();
  } else {
    dateString += date.getUTCHours();
  }

  dateString += ":";

  // If number of minutes in the date is zero, append another zero to the end to get e.g. 12:00 rather than 12:0
  if (date.getUTCMinutes() === 0) {
    dateString += date.getUTCMinutes() + "0 ";
  } else if (date.getUTCMinutes() > 0 && date.getUTCMinutes() < 10) {
    dateString += "0" + date.getUTCMinutes();
  } else {
    dateString += date.getUTCMinutes();
  }

  dateString += ":";

  // If number of seconds in the date is zero, append another zero to the end to get e.g. 12:00 rather than 12:0
  if (date.getUTCSeconds() === 0) {
    dateString += date.getUTCSeconds() + "0 ";
  } else if (date.getUTCSeconds() > 0 && date.getUTCSeconds() < 10) {
    dateString += "0" + date.getUTCSeconds();
  } else {
    dateString += date.getUTCSeconds();
  }

  return (
    <div className="risk-info-container">
      <div className="project-risk-score">
        <p className="risk-percentage">
          This project has a {risk_evaluation.success_chance}% chance of success
          as of {dateString}
        </p>
      </div>

      <div className="project-risk-score">
        <p className="risk-percentage">
          {" "}
          Your project currently has {suggestionCount} suggestions.{" "}
        </p>
      </div>
    </div>
  );
};

export default SuccessChanceDisplay;
