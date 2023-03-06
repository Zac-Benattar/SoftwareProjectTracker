import React from "react";
// import "../pages/Homepage.css";

export const SuccessChanceDisplay = ({ risk_evaluation }) => {
  return (
    <div className="risk-info-container">
      <div className="project-risk-score">
        <p>
          This project has a {risk_evaluation.success_chance}% chance of
          success as of {risk_evaluation.date}.
        </p>
        <p> Your project currently has 0 recommendations. </p>
      </div>
    </div>
  );
};

export default SuccessChanceDisplay;
