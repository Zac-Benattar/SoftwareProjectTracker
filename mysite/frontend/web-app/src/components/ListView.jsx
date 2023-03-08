import React from "react";

//append array of tasks to ganttChartData const

//ganttChartData const stores array of task arrays

//first element is array of gantt chart data fields (do not change)

//task id unique identifier for each task
//task name is name of task (does not have to be unique but recommend is quite short for for better formatting)

//duration is converted from milliseconds to days
//---> number of days * 24 * 60 * 60 * 1000 = number of milliseconds
//---> this number will then be converted and displayed as number of days
//duration defaults to time between start and end date if left null

//completion status is measured as a percentage of completion
//we do not store data on the task percentage completion - assign arbitrary values to completion status categories instead
//e.g. 50 = started but not completed

//dependecies takes a string containing a list of task ids of tasks that are dependent
//only include tasks dependent on the current task not tasks the current task is dependent on
//dependencies in the depencies string are separated by a comma only (no spaces)
//format of depencies string --> 'dependency1taskid,dpendency2taskid'

function RenderingListofTasks({ tasks }) {
  const tableRows = tasks.map((task) => {
    return (
      <tr key={task.id}>
        <td>{task.id}</td>
        <td>{task.name}</td>
        <td>{task.completion_status}</td>
        <td>{task.duration}</td>
        <td>{task.startdate}</td>
      </tr>
    );
  });
  return <tbody>{tableRows}</tbody>;
}

const ListView = ({ tasks }) => {
  return (
    <div>
      <div>
        <h2>List View</h2>
        <select>
          <option>Deadline</option>
          <option>Name</option>
          <option>Completion Status</option>
        </select>
        <table>
          <thead>
            <tr>
              <th> Task id</th>
              <th> Task name</th>
              <th> Completion status</th>
              <th> Duration </th>
              <th> Startdate </th>
            </tr>
          </thead>
          <RenderingListofTasks tasks={tasks} />
        </table>
      </div>
    </div>
  );
};

export default ListView;
