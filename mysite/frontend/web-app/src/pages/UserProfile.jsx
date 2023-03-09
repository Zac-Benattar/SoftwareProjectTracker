import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SuccessChanceDisplay from "../components/SuccessChanceDisplay";
import AuthContext from "../context/AuthContext";
import HomeNavbar from "../components/HomeNavbar";
import { FaUser } from 'react-icons/fa';
import "./Homepage.css";
import SkillChecklist from "../components/SkillChecklist";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";


const UserProfile = () => {
  // Deconstructing the relevent sections from AuthContext
  let { authTokens, logoutUser, user } = useContext(AuthContext);

  // User can update their skill set.
  const [skill, setSkill] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setPasswordVerified] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");

  let [currentUser, setUser] = useState([]);
  let [skills, setSkills] = useState([]);
  const [isError, setError] = useState(null);

  // Get slug parameter given when Project is referenced in router
  const { slug } = useParams();

  // Setting up states
  useEffect(() => {
    getUser();
    getSkills();
  }, []);

  // Obtaining the specific project's most recent risk evaulation via a GET request to the api referencing our authorisation token
  let getUser = async (e) => {
    let response = await fetch(
      "http://127.0.0.1:8000/api/users/".concat(user.user_id),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();

    // If the response is good - set the state of riskevaluation to be the result of the GET request
    if (response.status === 200) {
      setUser(data);
      // If the respose is unauthorised, log out the user using the imported AuthContext method
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };


  console.log("current user", currentUser);
  console.log("current user id", currentUser.id);
  console.log(user.user_id);


  let getSkills = async () => {
    let response = await fetch('/api/users/'+user.user_id+'/skills/');
    let data = await response.json();
    console.log("Data:", data);
    setSkills(data);
  };


  let createSkill = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/users/" + currentUser.id + "/skills/",{
      method : "POST",
      headers: {
        'Content-Type' : 'application/json',
        Authorization: "Bearer " + String(authTokens.access),
      },
      body : JSON.stringify({
        name: skill,
        description : skillDescription,
      })
    });
    
    let data = await response.json();
    if(response.status === 201) {
      setSkill([...skill,data]);
    }
  };


  const closeModal = () => {
    var modal = document.getElementById("skillset-modal");   
    var btn = document.getElementsByClassName("add-skill-btn");

    modal.style.display = "block";
    btn.onclick = function() {
      modal.style.display = "none";
    }

  
  }

  // Gets checked elements of a checklist.
  let [checked, setChecked] = useState([]);

  // Add or remove checked item from list.
  const handleCheck = (event) => {
      var updatedList = [...checked];
      if (event.target.checked) {
        updatedList = [...checked, event.target.value];
      } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
      }
      setChecked(updatedList);
  };


  const checkedItems = checked.length 
      ? checked.reduce((total, item) => {
          return total + ',' + item;
  })
  : "";

  const onPassChange = (e) => {
    let pass = e.target.value;
    setPassword({...password, 
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


  // return classes based on whether item is checked
  var isChecked = (item) => 
  checked.includes(item) ? "checked-item" : "not-checked-item";

  // This is where all checked skills are stored.
  console.log("checked items", checked)



  console.log(currentUser);
  console.log("skill",skills);
  console.log(isError);




  const addSkill = () => {
    var modal = document.getElementById("skillset-modal");
    var span = document.getElementsByClassName("skill-close")[0];
    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }

  }

  const removeSkill = () => {
    var modal = document.getElementById("remove-skills-modal");
    var span = document.getElementsByClassName("skill-close")[1];
    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }

  }

  const editName = () => {
    var modal = document.getElementById("name-modal");
    var span = document.getElementsByClassName("skill-close")[2];
    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }

  }


  const editUsername = () => {
    var modal = document.getElementById("username-modal");
    var span = document.getElementsByClassName("skill-close")[3];
    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }

  }

  const editContactDetails = () => {
    var modal = document.getElementById("contact-modal");
    var span = document.getElementsByClassName("skill-close")[4];
    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }

  }


  const editPassword = () => {
    var modal = document.getElementById("password-modal");
    var span = document.getElementsByClassName("skill-close")[5];
    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }

  }



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
    <>


        <div id="skillset-modal" className="skillset-modal">

        <div className="skill-close">  &times; </div>
            <div className="skillset-modal-content">


                  <h1>Add to your skillset!</h1>
                  <div className="skill-input-div">
                      <label 
                        className="skill-input-labels">
                        Skill name:
                      </label>

                      <input 
                        className="skill-inputs" 
                        type="text"
                        placeholder="Enter Skill Name"
                        onChange={event=>setSkill(event.target.value)}
                      />
                  </div>

                  <div className="skill-input-div">
                      <label 
                        className="skill-input-labels">
                        Skill description:
                      </label>

                      <textarea 
                        className="skill-inputs" 
                        type="text"
                        placeholder="Enter Skill Description"
                        onChange={event=>setSkillDescription(event.target.value)}
                      />
                  </div>


                  <button onClick = {createSkill} className="add-skill-btn">Add skill</button>

            </div>


        </div>


        <div id="remove-skills-modal" className="skillset-modal">

        <div className="skill-close">  &times; </div>
            <div className="skillset-modal-content">


                  <h1>Remove skills from your skillset.</h1>

                  <div className="checkList">

                  

                    {skills.map((item, index) => (
                           <div key={index}>
                           <input value={item.name} type="checkbox" onChange={handleCheck}/>
                           <span className={isChecked(item.name)}> {item.name} </span>
                       </div>
                    ))}

                </div>

                  <button className="add-skill-btn">Remove skill</button>

            </div>


      </div>

      <div id="name-modal" className="skillset-modal">

        <div className="skill-close">  &times; </div>
            <div className="skillset-modal-content">


                  <h1>Edit your name.</h1>
                  <div className="skill-input-div">
                      <label 
                        className="skill-input-labels">
                        First name:
                      </label>

                      <input 
                        className="skill-inputs" 
                        type="text"
                        placeholder="Enter First Name"
                        onChange={event=>setFirstName(event.target.value)}
                      />
                  </div>

                  <div className="skill-input-div">
                      <label 
                        className="skill-input-labels">
                        Last name:
                      </label>

                      <textarea 
                        className="skill-inputs" 
                        type="text"
                        placeholder="Enter Last Name"
                        onChange={event=>setLastName(event.target.value)}
                      />
                  </div>


                  <button className="add-skill-btn">Update name.</button>

            </div>


        </div>

        <div id="username-modal" className="skillset-modal">

          <div className="skill-close">  &times; </div>
          <div className="skillset-modal-content">


                <h1>Edit username.</h1>
                <div className="skill-input-div">
                    <label 
                      className="skill-input-labels">
                      New username:
                    </label>

                    <input 
                      className="skill-inputs" 
                      type="text"
                      placeholder="Enter username."
                      onChange={event=>setUsername(event.target.value)}
                    />
                </div>
                <button className="add-skill-btn">Update username.</button>

          </div>

      </div>



      <div id="contact-modal" className="skillset-modal">

          <div className="skill-close">  &times; </div>
          <div className="skillset-modal-content">


                <h1>Edit contact details.</h1>
                <div className="skill-input-div">
                    <label 
                      className="skill-input-labels">
                      Phone number:
                    </label>

                    <input 
                      className="skill-inputs" 
                      type="text"
                      placeholder="Enter phone number."
                      onChange={event=>setPhoneNumber(event.target.value)}
                    />
                </div>

                <div className="skill-input-div">
                    <label 
                      className="skill-input-labels">
                      Email:
                    </label>

                    <input 
                      className="skill-inputs" 
                      type="email"
                      placeholder="Enter email."
                      onChange={event=>setEmail(event.target.value)}
                    />
                </div>
                <button className="add-skill-btn">Update username.</button>

          </div>

      </div>


      <div id="password-modal" className="skillset-modal">

      <div className="skill-close">  &times; </div>
      <div className="skillset-modal-content">


            <h1>Change your password.</h1>
            <div className="skill-input-div">
                <label 
                  className="skill-input-labels">
                  Update password:
                </label>
                {isError !== null && <p className="errors"> - {isError}</p>}

                <input 
                  className="skill-inputs"
                  value={password} 
                  type="password"
                  id="password"
                  onChange={event=>{onPassChange(event);setPassword(event.target.value)}}
                />
            </div>

            <div className="skill-input-div">
                <label 
                  className="skill-input-labels">
                  Re-type your password:
                </label>

                <input 
                  className="skill-inputs" 
                  type="password"
                  id= "password-confirmed"
                  onChange={event=>setPasswordVerified(event.target.value)}
                />
            </div>
            <button onClick={passwordConfirmation} className="add-skill-btn">Update Password</button>

      </div>

</div>






      <div className="home-page">
        <HomeNavbar />

        <div className="home-page-content">

          <div className="user-menu">

                      <button 
                      className="menu-button"
                      >
                        Edit Account Details
                      </button>
                      <div className="menu-dropdown"> 
                          <button className="edit-btn" onClick={editName}>Edit Name</button>
                          <button className="edit-btn" onClick={editUsername}>Edit Username</button>
                          <button className="edit-btn" onClick={editPassword}>Edit Password</button>
                          <button className="edit-btn" onClick={editContactDetails}>Edit Contact Details</button>
                          <button className="edit-btn" onClick={addSkill}>
                            Add to your skillset</button>
                          <button className="edit-btn" onClick={removeSkill}>Remove from your skillset</button>
                      </div>

          </div>

      
        <div className="user-profile-content">


          <i className="user-icon"> <FaUser/> </i>
          <div className="user-info-container">

            <div className="prof-line">
              <h3 className="prof-title"> Name: </h3> 
              <p className="prof-text"> {currentUser.first_name} {currentUser.last_name}</p>
            </div>

            <div className="prof-line">  
              <h3 className="prof-title"> Username:  </h3 >   
              <p className="prof-text">{currentUser.username} </p>
            </div>

            <div className="prof-line">  
              <h3 className="prof-title"> Skills: </h3>
              {skills.map((skill) => 

                  <li className="skill">
                      {skill.name}
                  </li>

              )}
            </div>


            <div className="prof-line">  

                <h3 className="prof-title">Contact number:  </h3>
                <p className="prof-text"> {currentUser.phone}</p>
            </div>


            
            <div className="prof-line">  

              <h3 className="prof-title">Email:  </h3>
              <p className="prof-text"> {currentUser.email}</p>
            </div>

            <div className="prof-line">  
              <h3 className="prof-title"> Join date: </h3> #
              <p className="prof-text"> {currentUser.date_joined}</p>
            </div>

          </div>
        </div>


        </div>
      </div>
    </>
  );
};

export default UserProfile;
