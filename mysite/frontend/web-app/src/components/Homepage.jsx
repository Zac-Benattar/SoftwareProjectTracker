import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import "./Homepage.css"; 

export const Homepage = () => {
    return (
        <>
        <nav className="nav">
            <a> Homepage </a>
            <ul>
                <li>
                    <a> Logout </a>
                </li>
            </ul>
        </nav>

        <div className="project_container">
            <div className="title">
                <h1>Demo Project</h1>
            </div>
            <div className="info_container">
                <div className="info">
                    <p>Here there will be some info</p>
                    <p>Some more info </p>
                    <p>Some other info</p>
                </div>
                <div className="info">
                    <p>Here there will be some info</p>
                    <p>Some more info </p>
                    <p>Some other info</p>
                </div>
            </div>
        </div> 
        <div className="project_container">
            <div className="title">
                <h1>Demo Project</h1>
            </div>
            <div className="info_container">
                <div className="info">
                    <p>Here there will be some info</p>
                    <p>Some more info </p>
                    <p>Some other info</p>
                </div>
                <div className="info">
                    <p>Here there will be some info</p>
                    <p>Some more info </p>
                    <p>Some other info</p>
                </div>
            </div>
        </div>  
        <div className="project_container">
            <div className="title">
                <h1>Demo Project</h1>
            </div>
            <div className="info_container">
                <div className="info">
                    <p>Here there will be some info</p>
                    <p>Some more info </p>
                    <p>Some other info</p>
                </div>
                <div className="info">
                    <p>Here there will be some info</p>
                    <p>Some more info </p>
                    <p>Some other info</p>
                </div>
            </div>
        </div> 
        </>     
     
    );
}
