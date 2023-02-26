import React, { useState, useEffect } from 'react';
import { Header } from "../components/Header";
import { Navbar } from '../components/Navbar';
import { ProjectListItem } from '../components/ProjectListItem';
import './App.css';

export const Homepage = (props) => {

    let [projects, setProjects] = useState([])

    useEffect(() => {
        getProjects()
    }, [])

    let getProjects = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/projects/')
        let data = await response.json()
        console.log('Data:', data)
        setProjects(data)
    }

    return (
        <div>
            <Navbar />
            <div className="projects-list">
                {projects.map((project, index)=> (
                    <ProjectListItem key={index} project={project}/>
                ))}
            </div>
        </div >

    )
}