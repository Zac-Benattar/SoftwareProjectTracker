import React, { useEffect, useState, useRef, useContext } from "react";
import "./Homepage.css";
import AuthContext from "../context/AuthContext";
import { Dropdown } from "../components/Dropdown";
import { ProjectListItem } from "../components/ProjectListItem";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Nav } from "../components/NavbarElems";
import HomeNavbar from "../components/HomeNavbar";
import MemberInput from "../components/MemberInput";


const Homepage = () => {
  // Sets variables 
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [projectStart, setProjectStart] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectMembers, setProjectMembers] = useState("");
  
  let [projects, setProjects] = useState([]);


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

      // Creates a list of role names from the role object.
      const roleNames = 
      allRoles.map(role =>( { key:role.id}, {label:role.name} ));

      
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









          <div className="home-page">
              <HomeNavbar/> 
              <div className="home-page-content">
                <div className="home-page-menu">
                  
                    <button  
                      className= "add-proj-btn" 
                      onClick = {addProject}> 
                      Add Project 
                    </button>
                
                      <button 
                      className="add-proj-btn">
                        Edit Skillset
                      </button>
                      
                </div>
                <div className="projects-list">
                  {projects.map((project, index) => (
                    <ProjectListItem key={index} project={project} />
                  ))}
                  {projects.map((project, index) => (
                    <ProjectListItem key={index} project={project} />
                  ))}
                  {projects.map((project, index) => (
                    <ProjectListItem key={index} project={project} />
                  ))}
                  {projects.map((project, index) => (
                    <ProjectListItem key={index} project={project} />
                  ))}
                  
                  
                </div>
                
              </div>
            </div>

        
    

     
      </>     
   
  );
}

export default Homepage;