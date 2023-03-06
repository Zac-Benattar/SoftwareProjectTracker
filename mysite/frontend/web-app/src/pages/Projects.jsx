import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ListPeople }from "../components/ListPeople";
import Navbar from "../components/Navbar";
import SuccessChanceDisplay from "../components/SuccessChanceDisplay";
import AuthContext from "../context/AuthContext";



const Projects = () => {

    const location = useLocation();
    const state = location.state;

    // Deconstructing the relevent sections from AuthContext
    let { authTokens, logoutUser, user } = useContext(AuthContext);

  // Defining the states
  let [project, setProject] = useState([]);
  let [riskEvaluation, setRiskEvaluation] = useState([]);

  // Get slug parameter given when Project is referenced in router
  const { slug } = useParams();

  // Setting up states
  useEffect(() => {
    getProject();
    getRiskEvaluation();
  }, []);

  // Obtaining the specific project via a GET request to the api referencing our authorisation token
  let getProject = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/api/projects/".concat(slug),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();

    // If the response is good - set the state of project to be the result of the GET request
    if (response.status === 200) {
      setProject(data);
      // If the respose is unauthorised, log out the user using the imported AuthContext method
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  // Obtaining the specific project's most recent risk evaulation via a GET request to the api referencing our authorisation token
  let getRiskEvaluation = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/api/projects/"
        .concat(slug)
        .concat("/riskevaluation"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();

    // If the response is good - set the state of riskevaluation to be the result of the GET request
    if (response.status === 200) {
      setRiskEvaluation(data);
      // If the respose is unauthorised, log out the user using the imported AuthContext method
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

    // const passing_data = {
    //     name: state.name,
    //     id: state.id,
    // };



    // const [clientName, setName] = useState('');
    // const [releaseDate, setDate] = useState();
    // const [methodology, setMethodology] = '';
    // const requirements = 0;
    // const design = 0;
    // const implementation = 0;
    // const unittesting = 0;
    // const integration = 0;
    const success_chance = 0;

    
    return (
        <>
        <Navbar/>
        <div className="home-page">
            {riskEvaluation.map((riskEvaluation, index) => (
            <SuccessChanceDisplay key={index} risk_evaluation={riskEvaluation} />
            ))}
            <div className="project-info-container">
                <div className="project-name">
                    <h1>{project.name}</h1>
                </div>
                <div className="project-description">
                    <h3 className="des-title"> Project Description: </h3>
                    <p className="des">{project.description}</p>
                    <h3 className="des-title"> Project methodology: </h3>
                    <p  className="des">{project.methodology}</p>
                    <h3 className="des-title"> Project budget: </h3>
                    <p className="des">  {project.initial_budget}</p>
                    <h3 className="des-title"> Project deadine: </h3>
                    <p className="des"> {project.initial_deadline}</p>

                </div>

                <button className="proj-button">Pause project progress</button>
                <button className="proj-button">Push back project deadline</button>
            </div>  
           
        </div>
        </>     
    );
}

export default Projects;