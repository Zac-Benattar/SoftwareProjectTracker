import React from 'react';
import {  Link, useLocation } from "react-router-dom";
import './NavbarElems';


export const HomeNavbar = () => {
 
 
  return (
  <div>
    <nav className="home-nav">
      <ul>
    <li className='logout'>
      <Link to="/signin">Logout</Link>
    </li>
    </ul>
    
    </nav>
  </div>
  );
}

export default HomeNavbar;