import React from "react";
import "../pages/Homepage.css";

export const SuccessChanceDisplay = ({ risk_evaluation }) => {
  return (
    <div className="risk_evaluation_container">
      <p>Success Chance: {risk_evaluation.success_chance * 100}%</p>
      <p>As of: {risk_evaluation.date}</p>
    </div>
  );
};

export default SuccessChanceDisplay;
