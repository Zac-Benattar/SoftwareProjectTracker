import React, { Fragment } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Project from "./pages/Project";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Route, Routes, Router } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

const App = ({ isAuthenticated }) => (
  <div className="App">
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <AuthProvider>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  {" "}
                  <Homepage />{" "}
                </PrivateRoute>
              }
            />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/project:" element={<Project />} />
          </AuthProvider>
        </Routes>
      </Fragment>
    </Router>
  </div>
);

export default App;
