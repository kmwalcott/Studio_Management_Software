import React, {useState, useEffect} from 'react'
import Table from './Table';
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
                <button type="button" onClick={previous_month}>Previous</button>
                <button type="button" onClick={next_month}>Next</button>
                <Table rows ={rows} columns={columns}/>
            </div>
        </div>
    )
}
