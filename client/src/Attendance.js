import React, { useState, useEffect } from 'react'
import Event from './Event';
import { useAuth0 } from "./react-auth0-spa";

export default function Attendance() {
    const {user} = useAuth0();

    //States
    const [students, setStudents] = useState([]);
    const [events, setEvents] = useState([]);

    //Effects
    useEffect(() => {
        get_students();
    }, []);

    function get_students() {
        var toSend = {user: user.name};
        var jsonString = JSON.stringify(toSend);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_BASE_URL}/students/get-students`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    setStudents(JSON.parse(xhr.response));
                }
            }

        }
        xhr.send(jsonString);
    }

    //onChange function for dropdown. 
    function get_events() {
        //Return past events in which chosen student was a participant, most recent first.
        var student_name = document.getElementById("my_dropdown").value;
        var toSend = { student_name: student_name };
        var jsonString = JSON.stringify(toSend);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_BASE_URL}/events/attendance`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    setEvents(JSON.parse(xhr.response));
                }
            }

        }
        xhr.send(jsonString);
    }

    
    //Create dropdown lists
    var students_dropdown = students.map((student) =>
        <option key={student._id} value={student.student_name}>{student.student_name}</option>
    );

    var event_list = events.map((event) =>
        <Event key={event._id} event_type={event.event_type} date={event.date} start_time={event.time} duration={event.duration} location={event.location} participants={event.participants} attendance={event.attendance} event_id={event._id} selected={[]} selected_change={()=>{}} />
    )
    
    return (
        <div className="centered-text">
            <h1>Attendance</h1>
            <select id="my_dropdown" onChange={get_events}>
                <option value="">--Choose Student--</option>
                {students_dropdown}
            </select>
            {event_list}
        </div>
    )
}
