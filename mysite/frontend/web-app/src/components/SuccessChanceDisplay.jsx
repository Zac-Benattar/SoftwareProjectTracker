import React from "react";
import UnixDateStringifier from "../utils/DateStringifier";
// import "../pages/Homepage.css";

export const SuccessChanceDisplay = ({ risk_evaluation, suggestions }) => {
  const suggestionCount = suggestions.length;

  return (
    <div className="risk-info-container">
      <div className="project-risk-score">
        <p className="risk-percentage">
          This project has a {risk_evaluation.success_chance}% chance of success
          as of {UnixDateStringifier.getTime(risk_evaluation.date_unix)}
        </p>
      </div>

      <div className="project-risk-score">
        <p className="risk-percentage">
          Your project currently has {suggestionCount} suggestions.{" "}
        </p>
      </div>
    </div>
  );
};

export default SuccessChanceDisplay;
