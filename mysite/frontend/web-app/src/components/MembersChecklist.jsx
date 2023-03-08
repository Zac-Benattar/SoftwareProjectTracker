
import React, {useState, useEffect} from "react";
import { ProgressBar } from "./ProgressBar";
import { Homepage } from "../pages/Homepage";
import "../pages/Homepage.css";
import {Link} from "react-router-dom";

const MembersChecklist = ({ index, member }) => {


    let [user, setUsers] = useState([]);
    let [members, setMembers] = useState([]);

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

    // return classes based on whether item is checked
    var isChecked = (item) => 
    checked.includes(item) ? "checked-item" : "not-checked-item";


    useEffect(() => {
        getUsers();
    }, []);

    let getUsers = async () => {
        let response = await fetch('/api/users/'+member.id+'/');
        let data = await response.json();
        console.log("Data:", data);
        setUsers(data);
    };   

    // This is where all current users are 
    console.log("checked items", checked)

    return (
                <div key="index">
                    <input
                        type="checkbox"
                        value={user.first_name}
                        onClick={handleCheck}
                      
                    />

                    <span className={isChecked(user.first_name)}>{user.first_name}</span>



                    <div>
                            {`Items checked are: ${checkedItems}`}
                    </div> 

            </div> 

                
  
  );
};

export default MembersChecklist;

