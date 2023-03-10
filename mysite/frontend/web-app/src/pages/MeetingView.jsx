import React, { useState, useEffect, useContext} from "react";
import CalendarView from "../components/CalendarView";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../components/Calendar.css";
import "../utils/DateStringifier";
import UnixDateStringifier from "../utils/DateStringifier";

export const MeetingsForm = () => {

    // Deconstructing the relevent sections from AuthContext
    let { authTokens, logoutUser, user } = useContext(AuthContext);

    // Defining the states
    let [meetings, setMeetings] = useState([]);
  
    // Get slug parameter given when Project is referenced in router
    const { slug } = useParams();
  
    // Setting up states
    useEffect(() => {
      getMeetings();
    }, []);
  
    let getMeetings = async (e) => {
      let response = await fetch(
        "http://127.0.0.1:8000/api/projects/".concat(slug).concat("/meetings/"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      );
      let data = await response.json();
  
      // If the response is good - set the state of projects to be the result of the GET request
      if (response.status === 200) {
        setMeetings(data);
        // If the respose is unauthorised, log out the user using the imported AuthContext method
      } else if (response.statusText === "Unauthorized") {
        logoutUser();
      }
    };
  
    const meetingsData = meetings.map((meeting) => {
      return {
        id: meeting.id,
        name: meeting.name,
        dateFrom: UnixDateStringifier.getFullDateForCalendar(meeting.start_date_unix),
        dateTo: UnixDateStringifier.getFullDateForCalendar(meeting.end_date_unix),
        meta: meeting.description,
        type: meeting.type,
      };
    });

    console.log(meetingsData)

  return (
    <>
      <div className="home-page">
        <Navbar />

        <div className="mainbody-container">
          <CalendarView meetings={meetingsData}/>
        </div>
      </div>
    </>
  );
};

export default MeetingsForm;
