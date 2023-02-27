import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Homepage.css";
import { Dropdown } from "../components/Dropdown";
import { Navbar } from "../components/Navbar";
import { ProjectListItem } from "../components/ProjectListItem";
import {ProgressBar} from '../components/ProgressBar';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

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

  const [date,setDate] = useState(new Date());
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

      <div className="left_side">

        <div className="user-profile"> 

            <h2 className="user-title">

                Welcome, Username

            </h2>

            <p className="user-info">
                Role in project: Role
            </p>
        </div>


        <div className="calander-container">
            <Calendar onChange={setDate} value={date}/>
        </div>

        <p className='text-center'>
            <span className='bold'>Selected Date:</span>{' '}
            {date.toDateString()}
        </p>
      </div>


      <div className="all_projects">

     

      
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

      </div>

      </div>


     
      </>     
   
  );
}
