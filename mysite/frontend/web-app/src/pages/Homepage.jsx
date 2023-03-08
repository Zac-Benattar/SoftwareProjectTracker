import React, { useEffect, useState, useRef, useContext } from "react";
import "./Homepage.css";
import AuthContext from "../context/AuthContext";
import { Dropdown } from "../components/Dropdown";
import { ProjectListItem } from "../components/ProjectListItem";
import HomeNavbar from "../components/HomeNavbar";
import DateTimePicker from 'react-datetime-picker';


const Homepage = () => {
  // Sets variables 
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [projectStart, setProjectStart] = useState(new Date());
  const [projectDeadline, setProjectDeadline] = useState(new Date());
  const [projectMembers, setProjectMembers] = useState("");
  
  let [projects, setProjects] = useState([]);


   // list to store members in a project
   const [membersList, setMembersList] = useState([{member: ""}]); 

   console.log(membersList);
   const addMember = () => {
     setMembersList([...membersList, {member:""}]);
   }
 
   const removeMember = (index) => {
     const list = [...membersList];
     list.splice(index, 1);
     setMembersList(list);
   }
 
   const changeMember = (e,  index) => {
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

  let createProject = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/projects/", {
      method : "POST",
      headers: {
        'Content-Type' : 'application/json',
        Authorization: "Bearer " + String(authTokens.access),
      },
      body : JSON.stringify({
        name : projectName,
        description : projectDescription,
        client_name : projectName,
        initial_budget: projectBudget,
        current_budget : projectBudget,
        amount_spent : projectBudget,
        start_date : projectStart,
        initial_deadline : projectDeadline,
        current_deadline :  projectDeadline,
        methodology : projectName,
        gitHub_token : projectName,
      })
    });

    let data = await response.json();
    if (response.status === 201) {
      setProjects([...projects,data]);
    }
    
  }

  console.log("projects",projects);

 

  return (
    
      <>
    <div id="add-project-modal" className="modal">

    <div className="close"> &times; </div>


           
              <div className="modal-content">

              

              <h1>Create New Project</h1>
                <div className="input-div">
                    <label 
                      className="input-labels">
                      Project Name:
                    </label>

                    <input 
                      className="project-inputs" 
                      type="text"
                      placeholder="Enter Project Name"
                      onChange={event=>setProjectName(event.target.value)}
                    />
                </div>


                <div className="input-div">
                    <label 
                      className="input-labels">
                      Project Description:
                    </label>

                    <textarea 
                      className="project-inputs" 
                      type="text"
                      placeholder="Enter Description"
                      onChange={event=>setProjectDescription(event.target.value)}
                    />
                </div>


                <div className="input-div">
                    <label 
                      className="input-labels">
                      Project Start Date:
                    </label>

                    <DateTimePicker
                      className="project-inputs" 
                      onChange={(newValue) => setProjectStart(newValue)}
                    />
                </div>


                <div className="input-div">
                    <label 
                      className="input-labels">
                      Project Deadline:
                    </label>

                    <DateTimePicker
                      className="project-inputs" 
                      onChange={(newValue) => setProjectDeadline(newValue)}
                    />
                </div>

                <div className="input-div">
                    <label 
                      className="input-labels">
                      Project Budget:
                    </label>

                    <input
                      className="project-inputs" 
                      type="number"
                      placeholder="£"
                      onChange={event=>setProjectBudget(event.target.value)}
                    />
                </div>


                <div className="input-div">
                    <label 
                      className="input-labels">
                      Add Member(s):
                    </label>

                    {membersList.map((each_member, index) => (
                      
                      <div key={index} className="members">


                        <input 
                        // need to look at functionality again.
                          className="project-inputs" 
                          type="text"
                         // value={each_member.member}
                          placeholder="Member Name"
                          onChange={(e)=>(changeMember, index)}
                        />



                      
                        <input 
                          //doesn't save role to a varirable yet.
                          className="project-inputs"
                          type="text"
                          placeholder="Member Role"
                          //onChange={(e)=>addMember(e, index)}

                        />


                        <div className="project-inputs">
                          {membersList.length - 1 === index && 
                          (
                            <button 
                                className="member-button" 
                                onClick={addMember}> 
                                <span> Add a member </span>
                            </button>
                          )} 

                            <button 
                                className="member-button"
                                onClick={()=>removeMember(index)}> 
                                <span> Remove Member </span>
                            </button>

                        </div>

                        



                      </div>

                    

                    ))}

                    <span>
                      <button onClick = {createProject} className="create-project-btn">Create Project</button>
                    </span>
                   
                </div>


                




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
                  
                </div>
                
              </div>
            </div>
     
      </>     
   
  );
}

export default Homepage;