import React, { Component } from 'react'

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
const notstarted = [
  {
    taskid: 'Research',
    taskname: 'Find sources',
    startdate: new Date(2015, 0, 1),
    enddate: new Date(2015, 0, 5),
    duration: null,
    completionstatus: 100
  }]

const started =[
  {
    taskid: 'Testing',
    taskname: 'Test frontend',
    startdate: new Date(2015, 0, 11),
    enddate: new Date(2015, 0, 15),
    duration: null,
    completionstatus: 16
  },
  {
    taskid: 'Integrate',
    taskname: 'Integration',
    startdate: new Date(2015, 0, 1),
    enddate: new Date(2015, 0, 5),
    duration: null,
    completionstatus: 100
  }]

const completed = [
  {
    taskid: 'Testing',
    taskname: 'Testing backend',
    startdate: new Date(2015, 0, 11),
    enddate: new Date(2015, 0, 15),
    duration: null,
    completionstatus: 16
  },
  {
    taskid: 'Development',
    taskname: 'Develop backend',
    startdate: new Date(2015, 0, 1),
    enddate: new Date(2015, 0, 5),
    duration: null,
    completionstatus: 100
  }
]

function RenderingNotStarted(){
    const tableRows=notstarted.map(
        (element)=>{
            return( 
                <div>
                <h3>{element.taskid}</h3>
                <p>{element.taskname}</p>
            </div>                 
            )
        }
    )
    return(
        <div>
                {tableRows}                  
        </div>
    )
  }
  function RenderingStarted(){
    const tableRows=started.map(
        (element)=>{
            return( 
                <div>
                <h3>{element.taskid}</h3>
                <p>{element.taskname}</p>
            </div>                  
            )
        }
    )
    return(
        <div>
                {tableRows}                  
        </div>
    )
  }
  function RenderingCompleted(){
    const tableRows=completed.map(
        (element)=>{
            return( 
              <div>
                <h3>{element.taskid}</h3>
                <p>{element.taskname}</p>
            </div>              
            )
        }
    )
    return(
        <div>
                {tableRows}                  
        </div>
    )
  }
export const BoardView = () => {
    return (
      <div>
        <div>
          <h2>Board View</h2>
          <table>
          <thead>
          <th><h2>Not started</h2></th>
          <th><h2>Started</h2></th>
          <th><h2>Completed</h2></th>
          </thead>
          <tbody>
          <td>
            <RenderingNotStarted />
          </td>
          <td>
            <RenderingStarted />
        </td>
          <td>            
            <RenderingCompleted />
        </td>
          </tbody>
          </table>
        </div>
      </div>
    );
  }
export default BoardView