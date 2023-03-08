import React, { useEffect, useState, useContext } from "react";
import DateTimePicker from "react-datetime-picker";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SuccessChanceDisplay from "../components/SuccessChanceDisplay";
import AuthContext from "../context/AuthContext";
import "./Homepage.css";


const Projects = () => {

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectNewBudget, setProjectNewBudget] = useState("");
  const [projectStart, setProjectStart] = useState(new Date());
  const [projectNewDeadline, setProjectNewDeadline] = useState(new Date());
  const [projectMembers, setProjectMembers] = useState("");

  

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

  // Deconstructing the relevent sections from AuthContext
  let { authTokens, logoutUser, user } = useContext(AuthContext);

  // Defining the states
  let [project, setProject] = useState([]);
  let [riskEvaluation, setRiskEvaluation] = useState([]);

  // Get slug parameter given when Project is referenced in router
  const { slug } = useParams();

  // Setting up states
  useEffect(() => {
    getProject();
    getRiskEvaluation();
    setProjectName(project.name);
    setProjectDescription(project.description);
    setProjectNewBudget(project.current_budget);
    setProjectNewDeadline(project.current_deadline);
  }, []);

  // Obtaining the specific project via a GET request to the api referencing our authorisation token
  let getProject = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/api/projects/".concat(slug),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();

    // If the response is good - set the state of project to be the result of the GET request
    if (response.status === 200) {
      setProject(data);
      // If the respose is unauthorised, log out the user using the imported AuthContext method
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };


  let updateProject = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/projects/".concat(slug)+"/", {
      method : "PUT",
      headers: {
        'Content-Type' : 'application/json',
        Authorization: "Bearer " + String(authTokens.access),
      },
      body : JSON.stringify({
        name : projectName,
        description : projectDescription,
        client_name : projectName,
        initial_budget: project.initial_budget,
        current_budget : projectNewBudget,
        amount_spent : project.initial_budget,
        start_date : project.start_date,
        initial_deadline : project.initial_deadline,
        current_deadline :  projectNewDeadline,
        methodology : projectName,
        gitHub_token : projectName,
      })
    });

    let data = await response.json();
    if (response.status === 200) {
      setProject(data);
    }
  }

  let deleteProject = async (id) => {
    let response = fetch(
      "http://127.0.0.1:8000/api/projects/".concat(slug)+"/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
        
    setProject(project.filter(p=> p.project_id !== id))
  }
  console.log(project);

  // Obtaining the specific project's most recent risk evaulation via a GET request to the api referencing our authorisation token
  let getRiskEvaluation = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/api/projects/"
        .concat(slug)
        .concat("/generateriskevaluation"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();

    // If the response is good - set the state of riskevaluation to be the result of the GET request
    if (response.status === 200) {
      setRiskEvaluation(data);
      // If the respose is unauthorised, log out the user using the imported AuthContext method
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };


      const editProject = () => {
        var edit_modal = document.getElementById("add-project-modal");
        var close_button = document.getElementsByClassName("close")[0];
        
        edit_modal.style.display = "block";
        close_button.onclick = function() {
          edit_modal.style.display = "none";
        }
       
        
        window.onclick = function(event) {
          if (event.target === edit_modal) {
            edit_modal.style.display = "none";
          }
        }

      }

     


    return (
      <>


<div id="add-project-modal" className="modal">

<div className="close"> &times; </div>


       
          <div className="modal-content">

          <h1>Edit this project: </h1>
            <div className="input-div">
                <label 
                  className="input-labels">
                  Edit Project Name:
                </label>

                <input 
                  className="project-inputs" 
                  type="text"
                  placeholder= "project-name"
                  defaultValue = {project.name}
                  onChange={event=>setProjectName(event.target.value)}
                />
            </div>


            <div className="input-div">
                <label 
                  className="input-labels">
                  Edit Project Description:
                </label>

                <textarea 
                  className="project-inputs" 
                  type="text"
                  placeholder="Enter Description"
                  defaultValue = {project.description}
                  onChange={event=>setProjectDescription(event.target.value)}
                />
            </div>

            <div className="input-div">
                <label 
                  className="input-labels">
                  Edit Project Start Date:
                </label>

                <DateTimePicker
                  className="project-inputs" 
                  defaultValue = {project.start_date}
                  onChange={(newValue) => setProjectStart(newValue)}
                />
            </div>

            <div className="input-div">
                <label 
                  className="input-labels">
                  Edit Project Deadline:
                </label>

                <DateTimePicker
                  className="project-inputs" 
                  defaultValue = {project.current_deadline}
                  onChange={(newValue) => setProjectNewDeadline(newValue)}
                />
            </div>

            <div className="input-div">
                <label 
                  className="input-labels">
                  Edit Project Budget:
                </label>

                <input
                  className="project-inputs" 
                  type="number"
                  placeholder="£"
                  defaultValue = {project.current_budget}
                  onChange={event=>setProjectNewBudget(event.target.value)}
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
                  <button onClick = {updateProject} className="create-project-btn">Save Project</button>
                </span>
               
            </div>
          </div>
        </div>

      <div className="home-page">

      <Navbar/>   
        <div className="projects-page-content">
            
          
            {riskEvaluation.map((riskEvaluation, index) => (
            <SuccessChanceDisplay key={index} risk_evaluation={riskEvaluation} />
            ))}

              
            <div className="project-info-container">
                <div className="project-name">
                    <h1>{project.name}</h1>
                </div>
                <div className="project-description">
                    <h3 className="des-title"> Project Description: </h3>
                    <p className="des">{project.description}</p>
                    <br/>
                    <br/>
                    <h3 className="des-title"> Project methodology: </h3>
                    <p  className="des">{project.methodology}</p>
                    <br/>
                    <br/>
                    <h3 className="des-title"> Project budget: </h3>
                    <p className="des">  {project.initial_budget}</p>
                    <br/>
                    <br/>
                    <h3 className="des-title"> Project deadine: </h3>
                    <p className="des"> {project.initial_deadline}</p>

                </div>

                <div className="project-buttons">
                <button className="proj-button" onClick={editProject}>Edit project info</button>
                </div>

                </div>

            </div>
            </div>
    </>
    
           
    );
}

export default Projects;



  /* <Navbar/>
                    <div className="projects-page-content"> 


                <div className="project-info-container">

                    <div className="project-name">
                        <h1>{state.name}</h1>
                    </div>

                    <div className="project-description">
                        <br/>
                        <h3 className="des-title"> Project Description: </h3>
                        <p className="des">{state.description}</p>
                        <br/>
                        <br/>
                        <h3 className="des-title"> Project methodology: </h3>
                        <p  className="des">{state.methodology}</p>
                        <br/>
                        <br/>
                        <h3 className="des-title"> Project budget: </h3>
                        <p className="des">  {state.i_budget}</p>
                        <br/>
                        <br/>

                        <h3 className="des-title"> Project deadine: </h3>
                        <p className="des"> {state.i_deadline}</p>

                        <br/>
                        <br/>

                        <h3 className="des-title"> Client: </h3>
                        <p className="des"> client </p>


                    </div>
                    <div className="project-buttons">

                    <button className="proj-button">Pause project progress</button>
                    <button className="proj-button">Push back project deadline</button>
                    </div>
                </div>  

                <div className="risk-info-container">
                        <div className="project-risk-score">
                            <p> Your project has a {riskScore}% chance of success.</p>
                        </div>

                        <div className="project-risk-score">
                            <p> Your project has 0 incomplete tasks. </p>
                        </div>               

                
                        <div className="project-risk-score">
                            <p> Your project has 0 suggestions. </p>
                        </div>
                </div> */