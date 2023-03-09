import { indexOf } from "lodash";
import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

//QUERY - are critical actions classified separately from normal suggestions?
//how does dismissing suggestions work

const SuggestionsForm = () => {
  const criticalActions = 0;

  let [suggestions, setSuggestions] = useState([]);

  let { authTokens, logoutUser, user } = useContext(AuthContext);
  const { slug } = useParams();

  // Setting up states
  useEffect(() => {
    getSuggestions();
  }, []);

  // Obtaining the projects the user is involved in via a GET request to the api referencing our authorisation token
  // Need to check this URLSS
  let getSuggestions = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/api/projects/"
        .concat(slug)
        .concat("/suggestions/"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();

    // If the response is good - set the state of projects to be the result of the GET request
    if (response.status === 200) {
      setSuggestions(data);
      // If the respose is unauthorised, log out the user using the imported AuthContext method
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  function RenderingSuggestions({ suggestions }) {
    const allsuggestions = suggestions.map((suggestion) => {
      return (
        <div className="mainbody_container">
          <h3>{suggestion.id}</h3>
          <h3>{suggestion.name}</h3>
          <p>{suggestion.description}</p>
          <button> Dismiss suggestion</button>
        </div>
      );
    });
    return <div>{allsuggestions}</div>;
  }
  return (
    <>
      <div className="home-page">
        <Navbar />
        <div className="main_container">
          <p className="sug-title">Suggestions</p>
          <div className="menu_container">
            <p>
              {console.log(suggestions)}
              {suggestions.length} Suggestions, {criticalActions} Critical
              Actions
            </p>
          </div>
          <RenderingSuggestions suggestions={suggestions}/>
        </div>
      </div>
    </>
  );
};

export default SuggestionsForm;
