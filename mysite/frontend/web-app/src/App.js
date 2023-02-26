import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {Homepage} from './pages/Homepage';
import {Projects} from './pages/Projects';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
      }
    </div>
  );
}

export default App;
