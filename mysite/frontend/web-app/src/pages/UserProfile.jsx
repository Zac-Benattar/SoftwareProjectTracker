import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SuccessChanceDisplay from "../components/SuccessChanceDisplay";
import AuthContext from "../context/AuthContext";
import HomeNavbar from "../components/HomeNavbar";


const UserProfile = () => {


    // Deconstructing the relevent sections from AuthContext
    let { authTokens, logoutUser, user } = useContext(AuthContext);

    let [currentUser, setUser] = useState([]);
    

    // Get slug parameter given when Project is referenced in router
    const { slug } = useParams();

    // Setting up states
    useEffect(() => {
        getUser();
    }, []);


    // Obtaining the specific project's most recent risk evaulation via a GET request to the api referencing our authorisation token
    let getUser = async (e) => {
        let response = await fetch(
        "http://127.0.0.1:8000/api/users/"
            .concat(user.user_id),
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
        setUser(data);
        // If the respose is unauthorised, log out the user using the imported AuthContext method
        } else if (response.statusText === "Unauthorized") {
        logoutUser();
        }
    };
    
    console.log(currentUser);
    return (
      <>
      <div className="home-page">

        <HomeNavbar/>   
        <div className="projects-page-content">
        
            <div className="project-info-container">

                <p> Name: </p>
                <p> Username: </p>
                <p> Phone number: {currentUser.phone} </p>
                <p> Email: </p>
                <p> Join date: </p>


            </div>
        </div>
    </div>
    </>
    
           
    );
}

export default UserProfile;