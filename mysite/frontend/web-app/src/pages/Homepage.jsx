import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Homepage.css";
import { Dropdown } from "../components/Dropdown";
import { Navbar } from "../components/Navbar";
import { ProjectListItem } from "../components/ProjectListItem";
import {ProgressBar} from '../components/ProgressBar';

// export const Homepage = () => {
//   const options = [
//     {value: "name", label:"Project Name"},
//     {value: "deadline_date", label: "Deadline"},
//     {value: "start_date", label: "Start Date"},
//     {value: "progress", label: "Progress completed"}
// ];

//   let [projects, setProjects] = useState([]);

//   useEffect(() => {
//     getProjects();
//   }, []);

//   let getProjects = async () => {
//     let response = await fetch("/api/projects/");
//     let data = await response.json();
//     console.log("Data:", data);
//     setProjects(data);
//   };

//   return (
//     <div>
//       <Navbar />

//       <div className="home-page">
//         <div className="dropdown-menu">
//           <Dropdown placeHolder="Select ..." options={options} />
//         </div>

//         <div>
//           <div className="projects-list">
//             {projects.map((project, index) => (
//               <ProjectListItem key={index} project={project} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
export const Homepage = () => {

  const options = [
      {value: "name", label:"Project Name"},
      {value: "deadline_date", label: "Deadline"},
      {value: "start_date", label: "Start Date"},
      {value: "progress", label: "Progress completed"}
  ];

  let [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  let getProjects = async () => {
    let response = await fetch("/api/projects/");
    let data = await response.json();
    console.log("Data:", data);
    setProjects(data);
  };

  return (
      <>
      <div className="home-page">

      <div className="user-profile"> 

      This will contain some user information


      </div>

     
      <div className="top-of-page"> 

          <h2 className="dropdown-title"> 
              ORDER BY:
          </h2>
          <div className="dropdown-menu">

              <Dropdown placeHolder="Select ..." options={options}/>

          </div>

      </div>



        
      <div className="projects-list">
        {projects.map((project, index) => (
          <ProjectListItem key={index} project={project} />
        ))}
      </div>

      <div className="project_container">
          
          <div className="title">
              <h1>Demo Project</h1>
          </div>
          <div className="progress-bar">
              <ProgressBar progress='30'/>
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
              <ProgressBar progress='100'/>
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
              <ProgressBar progress='70'/>
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
