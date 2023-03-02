import React from 'react';
import {  Link } from "react-router-dom";
import './NavbarElems';


export const Navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/overview">Overview</Link>
    </li>
    <li>
      <Link to="/suggestions">Suggestions</Link>
    </li>
    <li>
      <Link to="/tasks">Tasks</Link>
    </li>
    <li>
      <Link to="/people">People</Link>
    </li>
    <li>
      <Link to="/signin">Logout</Link>
    </li>
  </div>
  );
}

export default Navbar;