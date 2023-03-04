import React, { useEffect, useState, useRef } from "react";
import "./Homepage.css";
import { Dropdown } from "../components/Dropdown";
import { ProjectListItem } from "../components/ProjectListItem";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import HomeNavbar from "../components/HomeNavbar";
import MemberInput from "../components/MemberInput";



export const Homepage = () => {

  const options = [
      {value: "name", label:"Project Name"},
      {value: "deadline_date", label: "Deadline"},
      {value: "start_date", label: "Start Date"},
      {value: "progress", label: "Progress completed"}
  ];

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [projectStart, setProjectStart] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectMembers, setProjectMembers] = useState("");
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");

  // list to store members in a project
  const [membersList, setMembersList] = useState([{member: ""}]); 


  

  console.log(membersList);
  const handleServiceAdd = () => {
    setMembersList([...membersList, {member:""}]);
  }

  const handleServiceRemove = (index) => {
    const list = [...membersList];
    list.splice(index, 1);
    setMembersList(list);
  }

  const handleServiveChange = (e,  index) => {
    const {name, value} = e.target; 
    const list = [...membersList];
    list[index][name]=value;
    setMembersList(list);
  }


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


  let [allRoles, setRoles] = useState([]);

  useEffect(() => {
    getRoles();
  }, []);

  let getRoles = async () => {
    let response = await fetch("/api/roles/");
    let data = await response.json();
    console.log("Data:", data);
    setRoles(data);
  };

  const roleNames = 
  allRoles.map(role =>( { key:role.id}, {label:role.name} ));

  console.log(roleNames);


  const addProject = () => {
    var modal = document.getElementById("add-project-modal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }

  }
  const addRole = () => {
    var modal = document.getElementById("add-role-modal");
    var span = document.getElementsByClassName("role-close")[0];
    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }

  }
  

  return (
      <>
      <HomeNavbar/> 
      <div id="add-project-modal" className="modal">
        <div className="modal-content"> 
              
              <span className="close">&times;</span>

              <h1>Create New Project</h1>

              <span className = "project_name">
                  <label forHtml = "project_name" className = "inputLabels">Project Name: </label>
                  <input 
                  type = "text" 
                  required id = "project_name" 
                  name = "project_name" 
                  placeholder = "Project Name" 
                  className = "projectInputs" 
                  onChange={event=> setProjectName(event.target.value)}>
                  </input>
              </span>

                <span className = "project_description">
                    <label forHtml = "project_description" className = "inputLabels">Project Description: </label>
                    <input 
                    type = "text" 
                    required id = "project_description" 
                    name = "project_description" 
                    placeholder = "Project Description" 
                    className = "projectInputs" 
                    onChange = {event => setProjectDescription(event.target.value)}>
                    </input>
                </span>

                <span className = "project_budget">
                    
                    <label 
                          forHtml = "project_budget"
                          className = "inputLabels">
                            Project Budget: 
                    </label>
                    
                    <input 
                      type = "text" 
                      required id = "project_budget" 
                      name = "project_budget" 
                      placeholder = "Project Budget" 
                      className = "projectInputs" 
                      onChange = {event => setProjectBudget(event.target.value)}>
                    </input>
                </span>

                <span className = "project_deadline">
                    
                    <label 
                          forHtml = "project_deadine"
                          className = "inputLabels">
                            Project Deadline: 
                    </label>
                    
                    <input 
                      type = "text" 
                      required id = "project_deadline" 
                      name = "project_deadline" 
                      placeholder = "Project Deadline" 
                      className = "projectInputs" 
                      onChange = {event => setProjectDeadline(event.target.value)}>
                    </input>
                </span>

                <span className = "project_start">
                    
                    <label 
                          forHtml = "project_start"
                          className = "inputLabels">
                            Project Start Date: 
                    </label>
                    
                    <input 
                      type = "text" 
                      required id = "project_start" 
                      name = "project_start" 
                      placeholder = "Project Start" 
                      className = "projectInputs" 
                      onChange = {event => setProjectStart(event.target.value)}>
                    </input>
                </span>           

                <label htmlFor="member"> Member(s) </label>
                {membersList.map((singleMember,index) => (
                   <>                  
                   <div key = {index} className="members">
                  <input name="member" type="text" id="member" placeholder="Member Username" required
                  value = {singleMember.member}
                  onChange={(e)=>handleServiveChange(e, index )}/>
                  {membersList.length - 1 === index   && 
                  (
                  <button onClick={handleServiceAdd}> <span> Add a member </span></button>
                  )}

                  <Dropdown classname="add-proj-drop" placeHolder="Select Role" options={roleNames}/>

                  <button onClick={addRole}> Role not here? Add a new one. </button>
                  </div>
                  
                  <div className="second-div">
                    <button onClick={()=>handleServiceRemove(index)}> <span> Remove Button </span></button>
                  </div>
                  </>
                  
                ))}
 
                <span>
                  <button className="create-project-btn">Create Project</button>
                </span>
                
        </div>
      </div>


      <div className="new-role-modal" id="add-role-modal">

      <div className="role-modal-content"> 
              
              <span className="role-close">&times;</span>
              <span className = "role-name">
                  <label forHtml = "role-name" className = "role-input-labels">Role Name: </label>
                  <input 
                  type = "text" 
                  required id = "role_name" 
                  name = "role_name" 
                  placeholder = "Role Name" 
                  className = "projectInputs" 
                  onChange={event=> setRoleName(event.target.value)}>
                  </input>
              </span>

                <span className = "role-description">
                    <label forHtml = "role-description" className = "role-input-labels">Role Description: </label>
                    <input 
                    type = "text" 
                    required id = "role_description" 
                    name = "role_description" 
                    placeholder = "Role Description" 
                    className = "projectInputs" 
                    onChange = {event => setRoleDescription(event.target.value)}>
                    </input>
                </span>

                <button> Add new role! </button>

      </div>
      
      </div>
      
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

              <button  
              className= "add-proj-btn" 
              onClick = {addProject}> 
              Add Project 
              </button>
              
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
