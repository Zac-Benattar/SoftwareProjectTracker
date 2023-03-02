import React from "react";
import {Link, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import {ListPeople }from "../components/ListPeople";



export const Projects = (props) => {
    const location = useLocation();
    const state = location.state;

    const [date,setDate] = useState(new Date());
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



    
    return (

        <div> 

            <h2> 
                This is the projects page for {state.name}!
            </h2>

            <h3>
                <Link to="/people" state={passing_data}>
                    People
                </Link>
            </h3>
                

        </div>
    )
}