import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from './Table';
import { useAuth0 } from "./react-auth0-spa";

export default function TimeClock() {
    const {user} = useAuth0();
    
    //States
    const [rows, setRows] = useState([]);
    
    //Effects
    useEffect(() => {
        get_hours();
    }, []);

    function get_hours(){
        var toSend = {user: user.name};
        var jsonString = JSON.stringify(toSend);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_BASE_URL}/staff/get-hours`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    setRows(JSON.parse(xhr.response));    
                }
            }

        }
        xhr.send(jsonString);
    }

    //onclick function for "punch" button
    function time_punch(){
        var toSend = {user: user.name};
        var jsonString = JSON.stringify(toSend);
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${process.env.REACT_APP_BASE_URL}/staff/hours`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    setRows(JSON.parse(xhr.response));    
                }
            }

        }
        xhr.send(jsonString);
    }
    
    var columns = ['Date', 'Time In', 'Time Out'];
    var rows_processed = [];
    //console.log(rows);
    rows.forEach((row)=>{
        var column3 = '';
        var my_minutes_zero = '';
        var other_minutes_zero = '';
        
        // returns the hours number for a date, between 1 and 12
        function hours12(date) { return (date.getHours() + 24) % 12 || 12; }


        var date_in = new Date(row.time_in);
        var my_month = date_in.getMonth();
        var my_date = date_in.getDate();
        var my_year = date_in.getFullYear();
        var my_hour = hours12(date_in);
        var my_minutes = date_in.getMinutes();
        if (my_minutes < 10){
            my_minutes_zero = '0'; 
        }
        if (row.time_out === null){
            console.log('if branch is running');
            column3 = '';
        }
        else{
            var date_out = new Date(row.time_out);
            var other_hours = hours12(date_out);
            var other_minutes = date_out.getMinutes();
            if (other_minutes < 10){
                other_minutes_zero = '0';
            }
            console.log('else branch is running');
            column3 = `${other_hours}:${other_minutes_zero}${other_minutes}`;
        }
        var my_row = [`${my_month}/${my_date}/${my_year}`, `${my_hour}:${my_minutes_zero}${my_minutes}`, column3];
        rows_processed.push(my_row);
    })

    return (
        <div>
            <Container className="text-center">
                <Button onClick={time_punch}>Punch</Button>
                <Table columns={columns} rows={rows_processed}/>
            </Container>
        </div>
    )
}
