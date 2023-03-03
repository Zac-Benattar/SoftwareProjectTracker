import React, { useEffect, useState, useContext } from "react";
import "./Homepage.css";
import Dropdown from "../components/Dropdown";
import ProjectListItem from "../components/ProjectListItem";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Homepage = () => {
  // Defining options for the order by dropdown
  const options = [
    { value: "name", label: "Project Name" },
    { value: "deadline_date", label: "Deadline" },
    { value: "start_date", label: "Start Date" },
    { value: "progress", label: "Progress completed" },
  ];

  // Defining the states
  let [date, setDate] = useState(new Date());
  let [projects, setProjects] = useState([]);

  // Deconstructing the relevent sections from AuthContext
  let { authTokens, logoutUser, user } = useContext(AuthContext);

  // Setting up states
  useEffect(() => {
    getProjects();
  }, []);

  // Obtaining the projects the user is involved in via a GET request to the api referencing our authorisation token
  let getProjects = async (e) => {
    let response = await fetch("http://127.0.0.1:8000/api/projects/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    // If the response is good - set the state of projects to be the result of the GET request
    if (response.status === 200) {
      setProjects(data);
      // If the respose is unauthorised, log out the user using the imported AuthContext method
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <>
      <div className="home-page">
        <div className="left_side">
          <div className="user-profile">
            <h2 className="user-title">Welcome, {user.username}</h2>
          </div>

          <div className="calander-container">
            <Calendar onChange={setDate} value={date} />

            <p className="text-center">
              <span className="bold">Selected Date:</span> {date.toDateString()}
            </p>
          </div>
        </div>

        <div className="all_projects">
          <div className="top-of-page">
            <h2 className="dropdown-title">ORDER BY:</h2>
            <div className="dropdown-menu">
              <Dropdown placeHolder="Select ..." options={options} />
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
};

export default Homepage;
