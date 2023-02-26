import React from "react";

export const Progress_bar = ({ progress }) => {
  const Parentdiv = {
    height: 30,
    width: "100%",
    backgroundColor: "rgb(193, 191, 191)",
    borderRadius: 40,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: "#9c00fd",
    borderRadius: 40,
    textAlign: "right",
  };

  const progresstext = {
    padding: 5,
    color: "white",
    fontWeight: 500,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};
