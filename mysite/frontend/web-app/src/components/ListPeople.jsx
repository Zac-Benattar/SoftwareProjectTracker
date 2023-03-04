import React, {useState, useEffect} from "react";
import { ProgressBar } from "./ProgressBar";
import { Homepage } from "../pages/Homepage";
import "../pages/Homepage.css";
import {Link} from "react-router-dom";

export const ListPeople = ({ member }) => {


    let [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    let getUsers = async () => {
        let response = await fetch('/api/users/'+member.id+'/');
        let data = await response.json();
        console.log("Data:", data);
        setUsers(data);
    };


  return (
  


        <div className="people-container">
            <div className="people-info">
                <h2> {users.forename} {users.lastname} </h2>
                <h3> {member.role} </h3>
                        
                    <ul className="all-skills">
                        <li className="skill">
                            {users.skillset}
                        </li>
                    </ul>
                    
                    <p>{users.phone}</p>
                    <p>{users.email}</p>                    
            </div>

        </div>
  
  );
};
