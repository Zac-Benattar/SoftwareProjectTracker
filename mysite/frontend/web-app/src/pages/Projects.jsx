import React from "react";
import {Link, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import {ListPeople }from "../components/ListPeople";

import Navbar from "../components/Navbar";



const Projects = (props) => {



    const location = useLocation();
    const state = location.state;
    let [projects, setProjects] = useState([]);

    
    
    useEffect(() => {
        getProjects();
    }, []);

    let getProjects = async () => {
        let response = await fetch('/api/projects/'+state.id+'/members/');
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
        <Navbar/>
        <div className="home-page">
        <div className="risk-info-container">
                <div className="project-risk-score">
                    <p> This project has a {riskScore}% chance of success.</p>
                    <p> Your project currently has 0 recommendations. </p>
                </div>
            </div>
            <div className="project-info-container">
                <div className="project-name">
                    <h1>{state.name}</h1>
                </div>
                <div className="project-description">
                    <h3 className="des-title"> Project Description: </h3>
                    <p className="des">{state.description}</p>
                    <h3 className="des-title"> Project methodology: </h3>
                    <p  className="des">{state.methodology}</p>
                    <h3 className="des-title"> Project budget: </h3>
                    <p className="des">  {state.i_budget}</p>
                    <h3 className="des-title"> Project deadine: </h3>
                    <p className="des"> {state.i_deadline}</p>

                </div>

                <button className="proj-button">Pause project progress</button>
                <button className="proj-button">Push back project deadline</button>
            </div>  
           
        </div>
        </>     
    );

      
    //     <div> 

    //         <h2> 
    //             This is the projects page for {state.name}!
    //         </h2>

    //         <h3>
    //             <Link to="/people" state={passing_data}>
    //                 People
    //             </Link>
    //         </h3>
                

    //     </div>
    // )
}

export default Projects