import React, {useEffect, useState} from "react";
import "./Homepage.css";
import { ListPeople } from "../components/ListPeople";
import {Link, useLocation} from "react-router-dom";
import Navbar from "../components/Navbar";


const PeopleView = (props) => {


    const location = useLocation();
    const state = location.state;


    let [people, setPeople] = useState([]);

    useEffect(() => {
        getPeople();
    }, []);

    let getPeople = async () => {
        let response = await fetch('/api/projects/'+state.id+'/members/');
        let data = await response.json();
        console.log("Data:", data);
        setPeople(data);
    };


    return (
        <>

        <div className="home-page">
        <Navbar/>
            <div className="all-containers">
                {people.map((people, index) => (
                <ListPeople key={index} member={people} />
                ))}
            </div>
        </div>
        
        
        </>
        


    )
}

export default PeopleView;