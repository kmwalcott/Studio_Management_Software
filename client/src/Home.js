import React, { useEffect, useState } from 'react'
import Event from './Event';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
                    <ButtonGroup>
                        <Button onClick={previous_day}>
                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                            <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </Button>
                        <Button onClick={next_day}>
                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
                            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>
                            </svg>
                        </Button>
                    </ButtonGroup>
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
                    <ButtonGroup>
                        <Button onClick={previous_day}>
                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                            <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </Button>
                        <Button onClick={next_day}>
                            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
                            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>
                            </svg>
                        </Button>
                    </ButtonGroup>
                    {events_list}
                </>
            </div>
        )
    }
}
