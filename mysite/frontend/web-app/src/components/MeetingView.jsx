import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import CalendarView from './CalendarView';

export const MeetingsForm = () => {
  return(
  <>
  <div className="home-page">
  <Navbar />
  <div className="main_container">
    <p className="title">Meetings Calendar</p>
    <div className="mainbody_container">
        <CalendarView />
    </div>
  </div>
  </div>
  </>
  )
  }
  
export default MeetingsForm
  