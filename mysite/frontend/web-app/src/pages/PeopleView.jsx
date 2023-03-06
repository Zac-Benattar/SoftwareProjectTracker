import React, {useEffect, useState, useContext} from "react";
import "./Homepage.css";
import { ListPeople } from "../components/ListPeople";
import {useParams, useLocation} from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthContext from "../context/AuthContext";


const PeopleView = () => {

    const { slug } = useParams();


    let [members, setMembers] = useState([]);
    let array_members = [];

     // Deconstructing the relevent sections from AuthContext
    let { authTokens, logoutUser, user } = useContext(AuthContext);

    // Setting up states
    useEffect(() => {
        getMembers();
    }, []);

    // Obtaining the projects the user is involved in via a GET request to the api referencing our authorisation token
    let getMembers = async (e) => {
            let response = await fetch("http://127.0.0.1:8000/api/projects/".concat(slug).concat("/members"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
        },
    });
    let data = await response.json();

    // If the response is good - set the state of projects to be the result of the GET request
    if (response.status === 200) {
        setMembers(data);
        
      
      // If the respose is unauthorised, log out the user using the imported AuthContext method
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  console.log("members", members)

    return (
        <>
        <div className="home-page">
            <Navbar/>
            <div className="all-containers">

                <div className="people-container">
                    <div className="people-info">
                                       
                        {members.map((member, index) => (
                            <ListPeople key={index} member={member} />
                        ))}                 
                
                        
                    </div>

                </div>

            </div>

        </div>
        
        
        </>
        


    )
}

export default PeopleView;