import React, {useState, useEffect} from "react";
import { ProgressBar } from "./ProgressBar";
import { Homepage } from "../pages/Homepage";
import "../pages/Homepage.css";
import {Link} from "react-router-dom";

export const ListPeople = ({ member }) => {


    // let [users, setUsers] = useState([]);

    // useEffect(() => {
    //     getUsers();
    // }, []);

    // let getUsers = async () => {
    //     let response = await fetch('/api/users/'+member.id+'/');
    //     let data = await response.json();
    //     console.log("Data:", data);
    //     setUsers(data);
    // };

    console.log("member");


  return (
  


        <div className="people-container">
            <div className="people-info">
               
                <h3> {member.role} </h3> 
                        
                     <ul className="all-skills">
                        <li className="skill">
                            {member.skillset}
                        </li>
                    </ul>
                     
                    <p>{member.phone}</p>
                    <p>{member.email}</p>                    
            </div>

        </div>
  
  );
};
