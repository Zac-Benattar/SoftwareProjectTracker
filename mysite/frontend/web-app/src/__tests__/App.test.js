import React from 'react';
import App from '../App';
//import { create } from 'react-test-renderer'

//register
//repeat email
//login
//new project
//add member to project
//repeat member
//new task
//edit task
//delete task
//add meeting
//edit meeting
//delete meeting
//gets meetings
//gets tasks
//gets projects
//people view?
//can logout
test("App Rendering", () => {
    render(<App/>); // Rendering the App
    const text = screen.getByTestId("text"); 
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(text).toBeInTheDocument();
})


  

