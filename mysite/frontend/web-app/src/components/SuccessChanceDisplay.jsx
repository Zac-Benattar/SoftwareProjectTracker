import React from "react";
// import "../pages/Homepage.css";

export const SuccessChanceDisplay = ({ risk_evaluation, suggestions }) => {

  const suggestionCount = suggestions.length
  const date = new Date(risk_evaluation.date_unix * 1000)
  const dateString = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

  return (
    
    <div className="risk-info-container"> 

      <div className="project-risk-score">
        <p className="risk-percentage">
          This project has a {risk_evaluation.success_chance}% chance of
          success as of {dateString}
        </p>
      </div>

      <div className="project-risk-score">
        <p className="risk-percentage"> Your project currently has {suggestionCount} suggestions. </p>
      </div>

      </div>

   
    
  );
};

export default SuccessChanceDisplay;
