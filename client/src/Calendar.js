import React, {useState, useEffect} from 'react'
import Table from './Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useAuth0 } from "./react-auth0-spa";

export default function Calendar() {
    const {user} = useAuth0();

    //States
    const today = new Date();
    const current_month = today.getMonth();
    const current_year = today.getFullYear();
    
    
    const [month, setMonth] = useState(current_month); //Month format 0-11
    const [year, setYear] = useState(current_year); //Year format YYYY
    const [rows, setRows] = useState([]);
    const months_in_letters = ['January', 'February', 'March','April','May','June','July','August','September','October','November','December']; 
    const month_in_letters = months_in_letters[month];

    //Effects
    useEffect(() => {
        get_calendar_info();
      }, [month]);

    function get_calendar_info(){
        const toSend = {month: month, year: year, user: user.name};
        const jsonString = JSON.stringify(toSend);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_BASE_URL}/events/calendar`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    setRows(JSON.parse(xhr.response));
                }
            }
            
        }
        xhr.send(jsonString);
    }

    //Onclick functions for navigation buttons
    function previous_month(){
        if (month === 0){
            setYear(year-1);
            setMonth(11);
        }
        else{setMonth(month-1);}
    }
    function next_month(){
        if (month=== 11){
            setYear(year+1);
            setMonth(0);
        }
        else{setMonth(month+1);}
    }

   
    var columns = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    return (
        <div>
            <div className="centered-text">
                <h2>{`${month_in_letters} ${year}`}</h2>
                <ButtonGroup>
                    <Button type="button" onClick={previous_month}>
                        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                        <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </Button>
                    <Button type="button" onClick={next_month}>
                        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/>
                        </svg>
                    </Button>
                </ButtonGroup>
                <Table rows ={rows} columns={columns}/>
            </div>
        </div>
    )
}
