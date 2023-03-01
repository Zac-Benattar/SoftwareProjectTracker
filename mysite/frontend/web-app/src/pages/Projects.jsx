import React from "react";
import {Link, useLocation} from "react-router-dom";

export const Projects = (props) => {
    const location = useLocation();
    const state = location.state;
    
    return (

        <div> 

            <h2> 
                This is the projects page for {state.name}
            </h2>

            <h3><Link to="/people">People</Link></h3>
                

        </div>
    )
}