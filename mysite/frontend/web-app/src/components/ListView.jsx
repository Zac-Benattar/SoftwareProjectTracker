import React from "react";
import "./ListView.css";

function RenderingListofTasks({ tasks }) {
  const tableRows = tasks.map((task) => {
    const startDate = new Date(task.start_date_unix * 1000)
    const dateString = startDate.getHours() + ':' + startDate.getMinutes() + ' ' + startDate.getDate() + '/' + startDate.getMonth() + '/' + startDate.getFullYear()
    return (
      <tr data-testid="task" key={task.id}>
        <td>{task.id}</td>
        <td>{task.name}</td>
        <td>{task.completion_status}</td>
        <td>{task.duration}</td>
        <td>{dateString}</td>
      </tr>
    );
  });
  return <tbody>{tableRows}</tbody>;
}

const ListView = ({ tasks }) => {
  return (
    
      <div className="listview-container">
        <h2 className="title-list">List View</h2>
        <table className="list-table">
          <thead>
            <tr>
              <th className="table-title"> Task ID</th>
              <th className="table-title"> Task name</th>
              <th className="table-title"> Completion status</th>
              <th className="table-title"> Duration </th>
              <th className="table-title"> Startdate </th>
            </tr>
          </thead>
          <RenderingListofTasks tasks={tasks} />
        </table>
      </div>
    
  );
};

export default ListView;
