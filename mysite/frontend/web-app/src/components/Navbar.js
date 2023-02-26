import React from "react";
import {Navigate} from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav className="nav">
        <a> Homepage </a>
        <ul>
          <li>
            <a> Logout </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
