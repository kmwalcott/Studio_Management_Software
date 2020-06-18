import React, {useState} from 'react'
import AttendanceForm from './AttendanceForm';

export default function Event(props) {
    //view state
    const [attendanceView, setAttendanceView] = useState(false);
    
    //onchange and selected props 
    var selected_change = props.selected_change;
    var selected = props.selected;
    
    //Other props
    var event_type = props.event_type;
    var start_time = props.start_time;
    var duration = props.duration; 
    var location = props.location;
    var participants = props.participants;
    var participants_string = participants.join(', ');
    var attendance = props.attendance;
    var event_id = props.event_id;
    var date = new Date (props.date);
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();

    //checked state
    const [checked, setChecked] = useState(selected.indexOf(event_id) !== -1);

    //Change border color to red if attendance is not set
    var border_style = {
        border: 'thick solid black',
        marginTop: 5,
        marginBottom: 5
    }

    if(attendance === 'Not yet entered'){
        
        border_style = {
            border: 'thick solid red',
            marginTop: 5,
            marginBottom: 5
        }

    }

    //onClick function for Attendance/Go Back buttons. Changes view.
    function change_view(){
        setAttendanceView(!attendanceView);
    }

    //onchange function for checkbox 
    function handle_change(){
        setChecked(!checked);
        selected_change();
    }

    if (attendanceView === false){
        return (
            <div style={border_style}>
                <p>{event_type} at {start_time} for {duration} minutes. Date: {month}/{day}/{year}. Location: {location}. Participants: {participants_string}</p>
                <p>Attendance: {attendance}</p>
                <button onClick={change_view}>Attendance</button>
                <br/>
                <label htmlFor="select">Select</label>
                <input type="checkbox" id="select" name="select" checked={checked} onChange={handle_change}/>
            </div>
        )
    }
   
    else{
        return (
            <div style={border_style}>
                <AttendanceForm event_id={event_id}/>
                <button onClick={change_view}>Go Back</button>
            </div>
        )   
    }

}
