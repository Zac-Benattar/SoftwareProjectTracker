import React, {useState, useEffect} from "react";
import { ProgressBar } from "./ProgressBar";
import { Homepage } from "../pages/Homepage";
import "../pages/Homepage.css";
import {Link} from "react-router-dom";
import { FaTrash } from 'react-icons/fa'

export const ListPeople = ({ member }) => {


    let [user, setUsers] = useState([]);
    let [role, setRoles] = useState([]);
    let [skills, setSkills] = useState([]);

    useEffect(() => {
        getUsers();
        getRoles();
        getSkills();
    }, []);

    let getUsers = async () => {
        let response = await fetch('/api/users/'+member.id+'/');
        let data = await response.json();
        console.log("Data:", data);
        setUsers(data);
    };   

    let getRoles = async () => {
        let response = await fetch('/api/roles/'+member.role+'/');
        let data = await response.json();
        console.log("Data:", data);
        setRoles(data);
    };

    let getSkills = async () => {
        let response = await fetch('/api/users/'+member.id+'/skills');
        let data = await response.json();
        console.log("Data:", data);
        setSkills(data);
    };




    console.log("user",user);
    console.log("roles",role);

    console.log("skill",skills);

  return (

            <div className="people-container">
            <i className="delete-people-btn"> <FaTrash /> </i>
            <div className="people-info">
               <h2> Name: {user.first_name} {user.last_name} </h2>
                <h3> Role: {role.name} </h3> 
                    
                     <ul className="all-skills">
                       

                        {skills.map((skill) => 

                            <li className="skill">
                                {skill.name}
                            </li>
                        
                        )}
                       
                    </ul>
                    <p> Work hours: {member.work_hours}</p>
                    <p>Phone Number: {user.phone}</p>                 
            </div>
            </div>

       
  
  );
};
