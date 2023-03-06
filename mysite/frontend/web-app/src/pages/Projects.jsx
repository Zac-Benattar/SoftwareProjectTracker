import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthContext from "../context/AuthContext";



const Projects = (props) => {

    const location = useLocation();
    const state = location.state;
    let [projects, setProjects] = useState([]);

    // Deconstructing the relevent sections from AuthContext
    let { authTokens, logoutUser, user } = useContext(AuthContext);

    // Get slug parameter given when Project is referenced in router
    const { slug } = useParams();
    
    useEffect(() => {
        getProjects();
    }, []);

    let getProjects = async () => {
        let response = await fetch('/api/projects/'+slug+'/members/');
        let data = await response.json();
        console.log("Data:", data);
        setProjects(data);
    };

    const passing_data = {
        name: state.name,
        id: state.id,
    };



    const [clientName, setName] = useState('');
    const [releaseDate, setDate] = useState();
    const [methodology, setMethodology] = '';
    const requirements = 0;
    const design = 0;
    const implementation = 0;
    const unittesting = 0;
    const integration = 0;
    const riskScore = 0;

    
    return (
        <>
            <div className="projects-home-page">
                <Navbar/>
                    <div className="projects-page-content"> 


                <div className="project-info-container">

                    <div className="project-name">
                        <h1>{state.name}</h1>
                    </div>

                    <div className="project-description">
                        <br/>
                        <h3 className="des-title"> Project Description: </h3>
                        <p className="des">{state.description}</p>
                        <br/>
                        <br/>
                        <h3 className="des-title"> Project methodology: </h3>
                        <p  className="des">{state.methodology}</p>
                        <br/>
                        <br/>
                        <h3 className="des-title"> Project budget: </h3>
                        <p className="des">  {state.i_budget}</p>
                        <br/>
                        <br/>

                        <h3 className="des-title"> Project deadine: </h3>
                        <p className="des"> {state.i_deadline}</p>

                        <br/>
                        <br/>

                        <h3 className="des-title"> Client: </h3>
                        <p className="des"> client </p>


                    </div>
                    <div className="project-buttons">

                    <button className="proj-button">Pause project progress</button>
                    <button className="proj-button">Push back project deadline</button>
                    </div>
                </div>  

                <div className="risk-info-container">
                        <div className="project-risk-score">
                            <p> Your project has a {riskScore}% chance of success.</p>
                        </div>

                        <div className="project-risk-score">
                            <p> Your project has 0 incomplete tasks. </p>
                        </div>               

                
                        <div className="project-risk-score">
                            <p> Your project has 0 suggestions. </p>
                        </div>
                </div>

                </div>

                </div>
                
    
        </>     
    );
}

export default Projects