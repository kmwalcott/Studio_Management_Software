import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function EventsForm(props) {
    //List props
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
    var day = props.day;
    var teacher = props.teacher;
    var instrument = props.instrument;
    var notes = props.notes;
    var participants = props.participants;
    var attendance = props.attendance;
    var initial_date = props.initial_date;
    var final_date = props.final_date;
    var selected = props.selected;
    
    


    //Datepicker state
    const [initialDate, setInitialDate] = useState(initial_date);
    const [finalDate, setFinalDate] = useState(final_date);
    
    const event_type_dropdown = event_type_list.map((field)=>
     <option key={field} value={field}>{field}</option>
     );
     const location_dropdown = location_list.map((field)=>
     <option key={field} value={field}>{field}</option>
     );
     const teacher_dropdown = teacher_list.map((field)=>
     <option key={field} value={field}>{field}</option>
     );
     const instrument_dropdown = instrument_list.map((field)=>
     <option key={field} value={field}>{field}</option>
     );

    return (
            <div>
                <form method="POST" action={action} className="admin-form">
                    <label htmlFor="event_type">Event Type: </label>
                    <select name="event_type" id="event_type" required defaultValue={event_type}>
                        <option value="">--Choose Event Type--</option>
                        {event_type_dropdown}
                    </select>
                    <br/>
                    <label htmlFor="location">Location: </label>
                    <select name="location" id="location" required defaultValue={location}>
                        <option value="">--Choose Location--</option>
                        {location_dropdown}
                    </select>
                    <br/>
                    <label htmlFor="day">Day: </label>
                    <select name="day" id="day" required defaultValue={day}>
                        <option value="">--Choose Event Day--</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <br/>
                    <label htmlFor="time">Event Time: </label>
                    <input type="text" id="time" name="time" required defaultValue={time}/>
                    <br/>
                    <label htmlFor="duration"> Event Duration in Minutes: </label>
                    <input type="text" id="duration" name="duration" required defaultValue={duration}/>
                    <br/>
                    <label htmlFor="initial_date">Initial Date: </label>
                    <DatePicker id="initial_date" name="initial_date" required selected={initialDate} onChange={date =>setInitialDate(date)} />
                    <br/>
                    <label htmlFor="final_date">Final Date: </label>
                    <DatePicker id="final_date" name="final_date" required selected={finalDate} onChange={date =>setFinalDate(date)} />
                    <br/>
                    <label htmlFor="teacher">Teacher (Optional): </label>
                    <select name="teacher" id="teacher" defaultValue={teacher}>
                        <option value="">--Choose Teacher--</option>
                        {teacher_dropdown}
                    </select>
                    <br/>
                    <label htmlFor="instrument">Instrument (Optional): </label>
                    <select name="instrument" id="instrument" defaultValue={instrument}>
                        <option value="">--Choose Instrument--</option>
                        {instrument_dropdown}
                    </select>
                    <br/>
                    <label htmlFor="notes">Notes (Optional): </label>
                    <input type="text" id="notes" name="notes" defaultValue={notes}/>
                    <br/>
                    <label htmlFor="participants">Participants: </label>
                    <input type="text" id="participants" name="participants" required placeholder="Separate with comma" defaultValue={participants}/>
                    <br/>
                    <label htmlFor="attendance">Attendance (Optional): </label>
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
                    <input type="hidden" id="selected" name="selected" value={selected}/>
                    <button type="submit">Submit</button>
                    <Link to="/admin/hours"><button type="button">Cancel</button></Link>
                </form>
            </div>
        )
    
}
