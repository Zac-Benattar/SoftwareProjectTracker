import React from "react";
import { Navigate, Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <span></span>
        <Link to="/login">Logout</Link>
      </nav>
    </div>
  );
};
