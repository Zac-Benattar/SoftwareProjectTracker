import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import {Login} from './pages/Login';
import {Register} from './pages/Register';

function App() {
  // This will soon all be replaced with a new structure from the Authentication branch
  // Routers from index.js will be moved here for simplicity
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
