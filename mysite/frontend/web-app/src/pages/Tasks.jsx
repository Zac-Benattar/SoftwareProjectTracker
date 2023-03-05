import React, {useState, useEffect} from "react";
import {Modal, Button} from "react-bootstrap";
import GanttChart from '../components/GanttChart';
import ListView from '../components/ListView';
import Calendar from '../components/CalendarView';
import BoardView from '../components/BoardView';
// import Navbar from "../components/Navbar";
import "./tasks.css";
import {Link, useLocation} from "react-router-dom";

export const TasksForm = () => {
  const [checkedtasks, setCheckedTasks] = useState([]);
  let [dependencies, setDependencies] = useState(['task1 ','task2','task3']);

  useEffect(() => {
      getDependencies();
  }, []);

  let getDependencies = async () => {
      let response = await fetch('/api/projects/'+state.id+'/tasks/');
      let data = await response.json();
      console.log("Data:", data);
      setDependencies(data);
  };
  const [checked, setChecked] = useState([]);
  const handleCheck = (event,checked,setChecked) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  let [people, setPeople] = useState(['aPPLE ','ORANGE','PEAR']);
  const location = useLocation();
  const state = location.state;
  useEffect(() => {
      getPeople();
  }, []);

  let getPeople = async () => {
      let response = await fetch('/api/projects/'+state.id+'/members/');
      let data = await response.json();
      console.log("Data:", data);
      setPeople(data);
  };
const [modalstate,setmodalstate] =useState( {
  isOpen: false
});

const openModal = () => setmodalstate({isOpen: true});
const closeModal = () => setmodalstate({isOpen: false});

const viewoptions = ['Gantt Chart', 'List View', 'Board View', 'Calendar View'];
const [viewStyle, setviewStyle] = useState(viewoptions[0]);
const [inputs, setInputs] = useState({});
const handleChange = (e) => 
{
  const name = e.target.name;
  const value = e.target.value;
  setInputs(values => ({...values, [name]:value}))
}

const handleSubmit = (e) => 
{
  e.preventDefault();
  
  alert({checked});
}
const isChecked = (item) =>
   checked.includes(item) ? "checked-item" : "not-checked-item";

function View() {
  
  if (viewStyle == viewoptions[0]) {
    return <GanttChart />;
  }else if (viewStyle==viewoptions[1]) {
    return <ListView />;
  }else if (viewStyle==viewoptions[2]) {
    return <BoardView />;
  }else {
    <Calendar />
  }
}
return(
<>
{/* <Navbar /> */}
<div className="main_container">
  <p className="title">Task Tracker</p>
  <div className="menu_container"> 
    <div className="viewType"> 
      <p> View Type: </p>
      <select defaultValue={viewStyle} onChange={(e)=> setviewStyle(e.target.value)} id="viewTypeSelector">
        <option> {viewoptions[0]}</option>
        <option> {viewoptions[1]}</option>
        <option> {viewoptions[2]}</option>
        <option> {viewoptions[3]}</option>
      </select>
    </div>
      <button onClick={openModal}> Add Task </button>
      <div className="modal_container">
      <Modal show={modalstate.isOpen} className="addTask_container">
      <button onClick={closeModal}>Close</button>

        <form onSubmit={handleSubmit}>
          <div className="addTaskField_container">
          <label className="inputLabels"> Task name:</label>
          <input className="taskInputs" type="text" name="taskname" value={inputs.taskname || ""} onChange={handleChange}/>
          </div>
          <br/>
          <div className="addTaskField_container">
          <label  className="inputLabels"> Task description:</label>
          <input className="taskInputs" type="text" name="taskdescription" value={inputs.taskdescription || ""} onChange={handleChange}/>
          </div>
          <br/>
          <div className="addTaskField_container">
          <label  className="inputLabels"> Task name:</label>
          <input  className="taskInputs" type="date" name="startdate" value={inputs.startdate || ""} onChange={handleChange}/>
          </div>
          <div className="addTaskField_container">
          <label  className="inputLabels"> Duration:</label>
          <input className="taskInputs" type="text" name="duration" value={inputs.duration || ""} onChange={handleChange}/>
          </div>
          <br/>
          <div className="addTaskField_container">
          <div className="checkList">
    <label>Add team members:</label>
    <div className="list-container">
      {people.map((item, index) => (
         <div key={index}>
         <input value={item} type="checkbox" onChange={handleCheck}/>
         <span className={isChecked(item)}>{item}</span>
       </div>
      ))}
    </div>
  </div>
          </div>
          <br/>
          <div className="addTaskField_container">
          <div className="checkList">
    <label>Add dependencies:</label>
    <div className="list-container">
      {dependencies.map((item, index) => (
         <div key={index}>
         <input value={item} type="checkbox" onChange={handleCheck}/>
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
</>
)
}

export default TasksForm
