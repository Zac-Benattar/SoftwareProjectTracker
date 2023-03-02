import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import Dropdown from "../components/Dropdown";
import ProjectListItem from "../components/ProjectListItem";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { ProgressBar } from "../components/ProgressBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Homepage = () => {
  const options = [
    { value: "name", label: "Project Name" },
    { value: "deadline_date", label: "Deadline" },
    { value: "start_date", label: "Start Date" },
    { value: "progress", label: "Progress completed" },
  ];

  const [date, setDate] = useState(new Date());
  let [projects, setProjects] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getProjects();
  }, []);

  let getProjects = async (e) => {
    let response = await fetch("http://127.0.0.1:8000/api/projects/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setProjects(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <Navbar />

      <div className="home-page">
        <div className="left_side">
          <div className="user-profile">
            <h2 className="user-title">Welcome, Username</h2>

            <p className="user-info">Role in project: Role</p>
          </div>

          <div className="calander-container">
            <Calendar onChange={setDate} value={date} />
            <Navbar />
            <div className="dropdown-menu">
              <Dropdown placeHolder="Select ..." options={options} />
            </div>

            <p className="text-center">
              <span className="bold">Selected Date:</span> {date.toDateString()}
            </p>
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
      </div>
    </div>
  );
};

export default Homepage;
