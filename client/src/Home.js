import React, { useEffect, useState } from 'react'
import Event from './Event';
import { useAuth0 } from "./react-auth0-spa"; 

export default function Home() {
    const {user} = useAuth0();

    //States and other variables 
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [date, setDate] = useState(today.getDate());
    const [year, setYear] = useState(today.getFullYear());
    const [events, setEvents] = useState([]);
    const [dayChange, setDayChange] = useState(0); //how many days forward or back from today
    const months_in_letters = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month_in_letters = months_in_letters[month];

    //Effects
    useEffect(() => {
        get_home_info();
    }, [dayChange]);

    function get_home_info() {
        var toSend = {daychange: dayChange, user: user.name};
        var jsonString = JSON.stringify(toSend);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_BASE_URL}/events/home`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    setMonth(JSON.parse(xhr.response).month);
                    setDate(JSON.parse(xhr.response).date);
                    setYear(JSON.parse(xhr.response).year);
                    setEvents(JSON.parse(xhr.response).events);
                }
            }

        }
        xhr.send(jsonString);
    }


    function previous_day() {
        setDayChange(dayChange-1);
    }

    function next_day() {
        setDayChange(dayChange+1);
    }

    
    var events_list = events.map((event)=>
        <Event key={event._id} event_type={event.event_type} start_time={event.time} duration={event.duration} date={event.date} location={event.location} participants={event.participants} attendance={event.attendance} event_id={event._id} selected={[]} selected_change={()=>{return null}}/>
    )
    
    if (events.length === 0) {
        return (
            <div className="centered-text">
                <>
                    <h1>Events for {month_in_letters} {date}, {year}</h1>
                    <button onClick={previous_day}>Previous</button>
                    <button onClick={next_day}>Next</button>
                    <p>No events to show.</p>
                </>
            </div>
        )
    }

    else {
        return (
            <div className="centered-text">
                <>
                    <h1>Events for {month_in_letters} {date}, {year}</h1>
                    <button onClick={previous_day}>Previous</button>
                    <button onClick={next_day}>Next</button>
                    {events_list}
                </>
            </div>
        )
    }
}
