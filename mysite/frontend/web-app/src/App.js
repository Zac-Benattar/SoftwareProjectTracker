import React, { Fragment, useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Project from "./pages/Project";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Route, Routes, Router } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

const App = ({ location, isAuthenticated }) => (
  <div className="App">
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <AuthProvider>
            <Route
              location={location}
              exact
              path="/"
              element={
                <PrivateRoute>
                  {" "}
                  <Homepage />{" "}
                </PrivateRoute>
              }
            />
            <Route
              location={location}
              exact
              path="/login"
              element={<LoginPage />}
            />
            <Route
              location={location}
              exact
              path="/register"
              element={<Register />}
            />
            <Route
              location={location}
              exact
              path="/project:"
              element={<Project />}
            />
          </AuthProvider>
        </Routes>
      </Fragment>
    </Router>
  </div>
);

export default App;
