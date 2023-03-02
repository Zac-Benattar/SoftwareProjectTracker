import React from "react";
import {Link, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import {ListPeople }from "../components/ListPeople";

import Navbar from "../components/Navbar";



export const Projects = (props) => {



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
        <div>
        <div className="project_container">
            <div className="info">
                    <p>Methodology</p>
                    <select value={methodology} onChange={() => setMethodology(this.selectedOption)}>
                        <option>Waterfall</option>
                        <option>Agile</option>
                    </select>
            </div>
            <div className="info">
                    <p>Client</p>
                    <input value={clientName} onChange={(e)=>setName(e.target.value)} 
                     type="text" placeholder="Client Name" id="clientname" name="clientname"/>
            </div>
            <div className="info">
                    <p>Release Date</p>
                    <input value={releaseDate} onChange={(e)=>setDate(e.target.value)} 
                     type="date" id="releaseDate" name="releaseDate"/>
            </div>
        </div> 
        <div className="project_container">
            <div className="title">
                <h1>{state.name}</h1>
            </div>
            <div className="info_container">
                <div className="info">
                    <p>{state.description}</p>
                </div>
                <br/>
                <div className="info">
                    <ul>
                        <li> Requirements: {requirements}% Complete </li>
                        <li> Design: {design}% Complete </li>
                        <li> Implementation: {implementation}% Complete </li>
                        <li> Unit Testing: {unittesting}% Complete </li>
                        <li> Integration Testing: {integration}% Complete </li>
                    </ul>
                </div>
            </div>
        </div>  
            <div className="info_container">
                <div className="info">
                    <p> Risk Score: {riskScore}% Success Chance</p>
                </div>
            </div>
            <button>Pause project</button>
            <button>Push back project</button>
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