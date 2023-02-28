import React, { Fragment, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Homepage } from "./pages/Homepage";
import { Project } from "./pages/Project";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { Route, Routes, Router } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

const App = ({ location }) => {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }

  return (
    <div className='App'>
      <Router>
        <Fragment>
          <Navbar/>
          <Routes>
            <Route location={location} exact path='/' element={<PrivateRoute />}>
              <Route location={location} exact path='/' element={<Homepage />} />
            </Route>
            <Route location={location} exact path='/login' element={<Login />} />
            <Route location={location} exact path='/register' element={<Register />} />
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
