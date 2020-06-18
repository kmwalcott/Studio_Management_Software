import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function EventForm(props) {
    //List props (settings)
    var event_type_list = props.event_type_list;
    var location_list = props.location_list;
    var teacher_list = props.teacher_list;
    var instrument_list = props.instrument_list;
    
    //Non-list props (default values)
    var action = props.action;
    var event_type = props.event_type;
    var location = props.location;
    var time = props.time;
    var duration = props.duration;
    var date = props.date;
    var teacher = props.teacher;
    var instrument = props.instrument;
    var notes = props.notes;
    var participants = props.participants;
    var attendance = props.attendance;

    const event_type_dropdown = event_type_list.map((field)=>
     <option key={field._id} value={field}>{field}</option>
     );
     const location_dropdown = location_list.map((field)=>
     <option key={field._id} value={field}>{field}</option>
     );
     const teacher_dropdown = teacher_list.map((field)=>
     <option key={field._id} value={field}>{field}</option>
     );
     const instrument_dropdown = instrument_list.map((field)=>
     <option key={field._id} value={field}>{field}</option>
     );

    //Datepicker state
    const [eventDate, setEventDate] = useState(date);

    return (
            <div>
                <form method="POST" action={action} className="admin-form">
                    <label for="event_type">Event Type: </label>
                    <select name="event_type" id="event_type" required defaultValue={event_type}>
                        <option value="">--Choose Event Type--</option>
                        {event_type_dropdown}
                    </select>
                    <br/>
                    <label for="location">Location: </label>
                    <select name="location" id="location" required defaultValue={location}>
                        <option value="">--Choose Location--</option>
                        {location_dropdown}
                    </select>
                    <br/>
                    <label for="time">Event Time: </label>
                    <input type="text" id="time" name="time" required defaultValue={time}/>
                    <br/>
                    <label for="duration"> Event Duration in Minutes: </label>
                    <input type="text" id="duration" name="duration" required defaultValue={duration}/>
                    <br/>
                    <label for="date">Date: </label>
                    <DatePicker id="date" name="date" required selected={eventDate} onChange={date =>setEventDate(date)} />
                    <br/>
                    <label for="teacher">Teacher (Optional): </label>
                    <select name="teacher" id="teacher" defaultValue={teacher}>
                        <option value="">--Choose Teacher--</option>
                        {teacher_dropdown}
                    </select>
                    <br/>
                    <label for="instrument">Instrument (Optional): </label>
                    <select name="instrument" id="instrument" defaultValue={instrument}>
                        <option value="">--Choose Instrument--</option>
                        {instrument_dropdown}
                    </select>
                    <br/>
                    <label for="notes">Notes (Optional): </label>
                    <input type="text" name="notes" id="notes" defaultValue={notes}/>
                    <br/>
                    <label for="participants">Participants: </label>
                    <input type="text" id="participants" required name="participants" placeholder="Separate with comma" defaultValue={participants}/>
                    <br/>
                    <label for="attendance">Attendance (Optional): </label>
                    <select name="attendance" id="attendance" defaultValue={attendance}>
                        <option value="Not yet entered">--Choose Attendance--</option>
                        <option value="present">Present</option>
                        <option value="late">Late</option>
                        <option value="absent_makeup">Absent- Give Makeup</option>
                        <option value="absent_no_makeup">Absent- No Makeup</option>
                        <option value="teacher_absent">Teacher Absent</option>
                        <option value="not_applicable">Not Applicable</option>
                    </select>
                    <br/>
                    <button type="submit">Submit</button>
                    <Link to="/admin/hours"><button type="button">Cancel</button></Link>
                </form>
            </div>
        )
    
}
