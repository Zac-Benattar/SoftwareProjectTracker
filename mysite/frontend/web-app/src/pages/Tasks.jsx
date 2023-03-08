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

const TasksForm = () => {
  // Deconstructing the relevent sections from AuthContext
  let { authTokens, logoutUser, user } = useContext(AuthContext);
  const { slug } = useParams();
  let [tasks, setTasks] = useState([]);
  let [members, setMembers] = useState([]);

  // Setting up states
  useEffect(() => {
    getTasks();
    getMembers();
  }, []);

  // Obtaining the projects the user is involved in via a GET request to the api referencing our authorisation token
  // Need to check this URLSS
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



  console.log("members",members);

  const [checkedtasks, setCheckedTasks] = useState([]);
  let [dependencies, setDependencies] = useState(["task1 ", "task2", "task3"]);

  const [checked, setChecked] = useState([]);

  const handleCheck = (event, checked, setChecked) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const [modalstate, setmodalstate] = useState({
    isOpen: false,
  });

  const openModal = () => setmodalstate({ isOpen: true });
  const closeModal = () => setmodalstate({ isOpen: false });

  const viewoptions = ["Gantt Chart", "List View", "Board View"];
  const [viewStyle, setviewStyle] = useState(viewoptions[0]);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert({ checked });
  };
  const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  function View() {
    if (viewStyle === viewoptions[0]) {
      return <GanttChart />;
    } else if (viewStyle === viewoptions[1]) {
      return <ListView tasks={tasks} />;
    } else {
      return <BoardView tasks={tasks} />;
    }
  }
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
                          
                          <MembersChecklist member={item} insex={index}/>
                         ))}

                      </div>

                    </div>

                  </div>
                  <br />
                  <div className="addTaskField_container">
                    <div className="checkList">
                      <label>Add dependencies:</label>
                      <div className="list-container">
                        {dependencies.map((item, index) => (
                          <div key={index}>
                            <input
                              value={item}
                              type="checkbox"
                              onChange={handleCheck}
                            />
                            <span className={isChecked(item)}>{item}</span>
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
          <div className="mainbody_container">
            <View />
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksForm;

// if (viewStyle == viewoptions[0]) {
//   return <GanttChart />;
// }else if (viewStyle==viewoptions[1]) {
//   return <ListView />;
// }else if (viewStyle==viewoptions[2]) {
//   return <BoardView />;
// }else {
//   <Calendar />
// }
