import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login }from "./pages/Login";
import { Homepage } from './pages/Homepage';
import { Register } from './pages/Register';
import { Project } from './pages/Project';
import  {Projects } from './pages/Projects';
import { PeopleView } from './pages/PeopleView';
import { OverviewForm } from './pages/Overview';

// Most of this will soon move to App.js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="register" element={<Register />} />
        <Route path="project/:id" element={<Project />} />
        <Route path="project" element = {<Projects/>}/>
        <Route path = "people" element = {<PeopleView/>}/>
        <Route path="overview" element = {<OverviewForm/>}/>
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

