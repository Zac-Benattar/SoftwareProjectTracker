import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import "./Homepage.css"; 
import {Progress_bar} from './ProgressBar';
import { Dropdown } from "./Dropdown";

export const Homepage = () => {

    const options = [
        {value: "green", label:"Green"},
        {value: "blue", label: "Blue"}
    ];

    return (
        <>
        {/* <nav className="nav">
            <a> Homepage </a>
            <ul>
                <li>
                    <a> Logout </a>
                </li>
            </ul>
        </nav> */}

        
        <div className="home-page">
        <div className="dropdown-menu">

            <Dropdown placeHolder="Select ..." options={options}/>

        </div>
      
     
        <div className="project_container">
            
            <div className="title">
                <h1>Demo Project</h1>
            </div>
            <div className="progress-bar">
                <Progress_bar progress='30'/>
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
            <div className="progress-bar">
                <Progress_bar progress='100'/>
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
            <div className="progress-bar">
                <Progress_bar progress='70'/>
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

        </div>

       
        </>     
     
    );
}
