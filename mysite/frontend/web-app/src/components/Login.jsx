import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


export const Login = (props) => {
    const[email, setEmail] = useState('');
    const[password, setPass] = useState('');

    const[authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated")||false);

  
    const [error, setError] = useState("");

    const navigate = useNavigate();


    // Temporary user 
    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    };


    const handleSubmit = (e) => {
        
        // page gets reloaded and state gets lost
        e.preventDefault()

        if (email==adminUser.email && password == adminUser.password) {
            setAuthenticated(true)
            localStorage.setItem("authenticated",true);
            navigate("/homepage")
        } else {
            setError("Details do not match!")
        }

    };


    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit = {handleSubmit}>
                <h2> Login Page! </h2>
                {(error!="") ? (<div className="error">{error}</div>) : ""}
            
                <label htmlfor="email">Email:</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)}
                type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
        
              
            
                <label htmlfor = "password">Password:</label>
                <input value = {password} onChange={(e)=>setPass(e.target.value)}
                type = "password" placeholder="********" id="password" name="password"/>
            
            
                <button className="login-button"> Log-in </button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Register here</button>
        </div>
    )
}