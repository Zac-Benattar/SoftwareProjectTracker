import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import Navbar from "../components/Navbar";
import GanttChart from "../components/GanttChart";
import ListView from "../components/ListView";
import BoardView from "../components/BoardView";
import "./tasks.css";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import MembersChecklist from "../components/MembersChecklist";
import TaskDependenciesChecklist from "../components/TaskDependenciesChecklist";

const TasksForm = () => {
  // Deconstructing the relevent sections from AuthContext
  let { authTokens, logoutUser, user } = useContext(AuthContext);
  const { slug } = useParams();
  let [tasks, setTasks] = useState([]);
  let [members, setMembers] = useState([]);

  const [modalstate, setmodalstate] = useState({
    isOpen: false,
  });

  const openModal = () => setmodalstate({ isOpen: true });
  const closeModal = () => setmodalstate({ isOpen: false });

  const viewoptions = ["Gantt Chart", "List View", "Board View"];
  const [viewStyle, setviewStyle] = useState(viewoptions[0]);
  const [inputs, setInputs] = useState({});


  
  function View() {
    if (viewStyle === viewoptions[0]) {
      return <GanttChart tasks={tasks} />;
    } else if (viewStyle === viewoptions[1]) {
      return <ListView tasks={tasks} />;
    } else {
      return <BoardView />;
    }
  }


  // Setting up states
  useEffect(() => {
    getTasks();
    getMembers();
  }, []);

  // Obtaining the tasks for the project via a GET request to the api referencing our authorisation token
  let getTasks = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/api/projects/".concat(slug).concat("/tasks/"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();

    // If the response is good - set the state of projects to be the result of the GET request
    if (response.status === 200) {
      setTasks(data);
      // If the respose is unauthorised, log out the user using the imported AuthContext method
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  /* Obtaining the members of the project to be chosen for the task via a GET request to the api 
   * referencing our authorisation token */
  
  let getMembers = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/api/projects/".concat(slug).concat("/members/"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();


    // If the response is good - set the state of projects to be the result of the GET request
    if (response.status === 200) {
      setMembers(data);
      // If the respose is unauthorised, log out the user using the imported AuthContext method
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };




  

  // const [checked, setChecked] = useState([]);

  // const handleMemberCheck = (event, checked, setChecked) => {
  //   var updatedList = [...checked];
  //   if (event.target.checked) {
  //     updatedList = [...checked, event.target.value];
  //   } else {
  //     updatedList.splice(checked.indexOf(event.target.value), 1);
  //   }
  //   setChecked(updatedList);
  // };


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  //  // Add or remove checked item from list.
  //  const handleTaskCheck = (event) => {
  //      var updatedList = [...checkedTasks];
  //      if (event.target.checkedTasks) {
  //        updatedList = [...checkedTasks, event.target.value];
  //      } else {
  //        updatedList.splice(checkedTasks.indexOf(event.target.value), 1);
  //      }
  //      setCheckedTasks(updatedList);
  //  };

  //  const checkedItems = checkedTasks.length 
  //      ? checkedTasks.reduce((total, item) => {
  //          return total + ',' + item;
  //  })
  //  : "";

  //  // return classes based on whether item is checked
  //  var isChecked = (item) => 
  //  checkedTasks.includes(item) ? "checked-item" : "not-checked-item";



   
  // Gets checked elements of a checklist.
  let [checkedTasks, setChecked] = useState([]);

  // Add or remove checked item from list.
  const handleCheck = (event) => {
      var updatedList = [...checkedTasks];
      var id = event.target.value;
      if (event.target.checked) {
        updatedList = [...checkedTasks, event.target.value];
      } else {
        updatedList.splice(checkedTasks.indexOf(id), 1);
      }
      setChecked(updatedList);
  };

  
  // return classes based on whether item is checked
  var isChecked = (item) => 
  checkedTasks.includes(item) ? "checked-item" : "not-checked-item";

  // This is where all checked skills are stored.



   console.log("tasks",tasks);
   console.log("checked tasks",checkedTasks);


  return (
    <>
      <div className="home-page">
        <Navbar />
        <div className="main_container">
          <p className="title">Task Tracker</p>
          <div className="menu_container">
            <div className="viewType">
              <p> View Type: </p>
              <select
                defaultValue={viewStyle}
                onChange={(e) => setviewStyle(e.target.value)}
                id="viewTypeSelector"
              >
                <option> {viewoptions[0]}</option>
                <option> {viewoptions[1]}</option>
                <option> {viewoptions[2]}</option>
              </select>
            </div>


            
            <button onClick={openModal}> Add Task </button>
            <div className="modal_container">
              <Modal show={modalstate.isOpen} className="addTask_container">
                <button onClick={closeModal}>Close</button>

                <form onSubmit={handleSubmit}>
                  <div className="addTaskField_container">
                    <label> Task name:</label>
                    <input
                      type="text"
                      name="taskname"
                      value={inputs.taskname || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                  <div className="addTaskField_container">
                    <label> Task description:</label>
                    <input
                      type="text"
                      name="taskdescription"
                      value={inputs.taskdescription || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                  <div className="addTaskField_container">
                    <label> Task name:</label>
                    <input
                      type="date"
                      name="startdate"
                      value={inputs.startdate || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="addTaskField_container">
                    <label> Duration:</label>
                    <input
                      type="text"
                      name="duration"
                      value={inputs.duration || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                  <div className="addTaskField_container">

                    <div className="checkList">

                      <label>Add team members:</label>

                      <div className="list-container">
                        {members.map((item, index) => (
                          
                          <MembersChecklist member={item} index={index}/>
                         ))}

                      </div>

                    </div>

                  </div>
                  <br />
                  <div className="addTaskField_container">
                    <div className="checkList">
                      <label>Add dependencies:</label>
                      <div className="checkList">
                      
                        {tasks.map((task, index) => (
                          <div key={index}>


                            <input
                            type="checkbox"
                            value={task.name}
                            onChange={handleCheck}
                            />

                            <span className={isChecked(task.name)}>{task.name}</span>
                          </div>
                          
                         ))}

                     
                      </div>
                    </div>
                  </div>
                  <button type="submit">Add Task</button>
                </form>
              </Modal>
            </div>
          </div>
          <div className="view-container">
            <View />
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksForm;
