import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Homepage.css";

const LoginPage = (props) => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="auth-form-container">
      <form className="login-form" onSubmit={loginUser}>
        <h2> Login Page! </h2>

        <label htmlfor="email">Email:</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          id="email"
          name="email"
        />

        <label htmlfor="password">Password:</label>
        <input
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />

        <button className="login-button" type="submit"> Log-in </button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Register here
      </button>
    </div>
  );
};

export default LoginPage;
