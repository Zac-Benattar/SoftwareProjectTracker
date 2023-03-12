import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [phone, setPhonenumber] = useState('');
    const [name, setName] = useState('');
    const [confirm_password, setConfirmPass] = useState('');
    const [isError, setError] = useState(null);

    const onPassChange = (e) => {
      let pass = e.target.value;
      setPass({...password, 
              pass: e.target.value,
            });
      setError(null);
      let caps, small, num, specialSymbol;
      if (password.length < 4) {
        setError(
          "Password should contain minimum 4 characters, with one UPPERCASE, lowercase, number and special character: @$! % * ? &"
        );
        return;
      } else {
        caps = (password.match(/[A-Z]/g) || []).length;
        small = (password.match(/[a-z]/g) || []).length;
        num = (password.match(/[0-9]/g) || []).length;
        specialSymbol = (password.match(/\W/g) || []).length;
        if (caps < 1) {
          setError("Must add one UPPERCASE letter");
          return;
        } else if (small < 1) {
          setError("Must add one lowercase letter");
          return;
        } else if (num < 1) {
          setError("Must add one number");
          return;
        } else if (specialSymbol < 1) {
          setError("Must add one special symbol: @$! % * ? &");
          return;
        }
      }
    };


    const [isStrong, initRobustPassword] = useState(null);
    const initPwdInput = async (childData) => {
      initRobustPassword(childData);
    };
    const onSubmit = async (e) => {
      try {
        e.preventDefault();
        e.persist();
      } catch (error) {
        throw error;
      }
    };

    const handleSubmit = (e) => {
        // page gets reloaded and state gets lost
        e.preventDefault()
    }

    let createUser = async () => {
      let response = await fetch("http://127.0.0.1:8000/api/users/", {
        method : "POST",
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
          username : name,
          password : confirm_password,
          email : email,
          phone : phone,
        })
      });
  
      if (response.status === 201) {
        alert("Account successfully created!");
      }
    };

    function passwordConfirmation() {
      var password = document.getElementById("password").value;
      var confirmPassword = document.getElementById("password-confirmed").value;
     
      if (password == "") {
          alert("Error: The password field is Empty.");
      } else if (password != confirmPassword) {
          alert("Please make sure your passwords match.")
      }
    }


  return (
    <div className="reg-auth-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2> Register here </h2>
        <label htmlFor="name">Full name:</label>
        <input
          data-testid="input-boxes" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your Name"
          id="name"
          name="name"
        />
        <label htmlFor="email">Email:</label>
        <input
          data-testid="input-boxes" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="phone">Phone:</label>
        <input
          data-testid="input-boxes"
          value={phone}
          onChange={(e) => setPhonenumber(e.target.value)}
          type="text"
          placeholder="Enter phone number"
          id="phone"
          name="phone"
        />
        <label htmlFor="password">Password:</label>
        {isError !== null && <p className="errors"> - {isError}</p>}
        <input
          data-testid="input-boxes"
          value={password}
          onChange={(e) => {onPassChange(e);setPass(e.target.value);}}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          
        />
        <label htmlFor="confirm-password">Retype Password:</label>
        <input
          data-testid="input-boxes" 
          value={confirm_password}
          onChange={(e) => setConfirmPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password-confirmed"
          name="password"
        />


        <button onClick={() => {passwordConfirmation(); createUser();}} className="register-button" type="submit">
          Register
        </button>
      </form>
      <Link data-testid="link-button"  className="link-btn" to="/login">Have an account? Login Here</Link>
    </div>
  );
};

export default Register;
