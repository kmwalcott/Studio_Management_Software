import React, { useState, useEffect } from 'react'


export default function StudentSearch() {

    //Declare state variables
    const [advancedIsOpen, setAdvancedIsOpen] = useState(false);
    const [settings, setSettings] = useState('[{"event_type":["Individual Lesson","Ensemble Rehearsal","Makeup Lesson","Meeting","Substitute Lesson","Other"],"location":["Main Studio","Lifesong","Home","Online","Other"],"teacher":["Kyle","Jarell","Jen","Christy","Michael","Emily","Gabe","Andrea","Other"],"instrument":["Piano","Violin","Viola","Voice","Other"]}]');

    //Effects
    useEffect(() => {
        get_settings();
    }, []);

    function get_settings() {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${process.env.REACT_APP_BASE_URL}/settings`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    setSettings(xhr.response);
                }
            }

        }
        xhr.send();
    }

    //Process seetings for use on page
    var settings_js = JSON.parse(settings)[0];
    var teachers = settings_js.teacher;
    var instruments = settings_js.instrument;
    var locations = settings_js.location;

    //Construct dropdowns
    var teacher_list = teachers.map((teacher) =>
        <option value={teacher.name}>{teacher.name}</option>
    )

    var instrument_list = instruments.map((instrument) =>
        <option value={instrument}>{instrument}</option>
    )

    var location_list = locations.map((location) =>
        <option value={location}>{location}</option>
    )


    if (advancedIsOpen) {
        var action = `${process.env.REACT_APP_BASE_URL}/students/search`
        return (
            <form method="POST" action={action}>
                <input type="text" name="student_name" id="student_name" placeholder="Find student" />
                <button type="submit">Search</button>
                <button type="button" onClick={() => setAdvancedIsOpen(!(advancedIsOpen))}>Advanced</button>
                <fieldset>
                    <legend>Filter Results</legend>
                    <select name="gender">
                        <option value="">--Choose gender--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <select name="day">
                        <option value="">--Choose lesson day--</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <select name="duration">
                        <option value="">--Choose lesson duration--</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                        <option value="60">60</option>
                    </select>
                    <select name="teacher">
                        <option value="">--Choose teacher--</option>
                        {teacher_list}
                    </select>
                    <select name="instrument">
                        <option value="">--Choose instrument--</option>
                        {instrument_list}
                    </select>
                    <select name="location">
                        <option value="">--Choose lesson location--</option>
                        {location_list}
                    </select>
                    <select name="status">
                        <option value="">--Choose student status--</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <select name="makeups">
                        <option value="">--Choose number of makeups--</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Include</legend>
                    <label htmlFor="include_parent_names">Parent Names</label>
                    <input type="checkbox" checked name="include_parent_names" id="include_parent_names" value="checked" />
                    
                    <label htmlFor="include_gender">Gender</label>
                    <input type="checkbox" name="include_gender" id="include_gender" value="checked" />
                    
                    <label htmlFor="include_birthday">Birthday</label>
                    <input type="checkbox" name="include_birthday" id="include_birthday" value="checked" />
                    
                    <label htmlFor="include_day">Lesson Day</label>
                    <input type="checkbox" name="include_day" id="include_day" value="checked" />
                    
                    <label htmlFor="include_duration">Lesson Duration</label>
                    <input type="checkbox" name="include_duration" id="include_duration" value="checked" />
                    
                    <label htmlFor="include_teacher">Teacher</label>
                    <input type="checkbox" name="include_teacher" id="include_teacher" value="checked" />
                    
                    <label htmlFor="include_instrument">Instrument</label>
                    <input type="checkbox" name="include_instrument" id="include_instrument" value="checked" />
                    
                    <label htmlFor="include_location">Lesson Location</label>
                    <input type="checkbox" name="include_location" id="include_location" value="checked" />
                    
                    <label htmlFor="include_status">Status</label>
                    <input type="checkbox" name="include_status" id="include_status" value="checked" />
                    
                    <label htmlFor="include_makeups">Makeup Credits</label>
                    <input type="checkbox" name="include_makeups" id="include_makeups" value="checked" />
                    
                    <label htmlFor="include_phone">Phone</label>
                    <input type="checkbox" checked name="include_phone" id="include_phone" value="checked" />
                    
                    <label htmlFor="include_email">Email</label>
                    <input type="checkbox" checked name="include_email" id="include_email" value="checked" />
                </fieldset>
            </form>
        )
    }

    else {
        action = `http://localhost:5000/students/search`;
        return (
            
            <form method="POST" action={action}>
                <input type="text" name="student_name" id="student_name" required placeholder="Find student"/>
                <input type="hidden" name="gender" value=""/>
                <input type="hidden" name="status" value=""/>
                <input type="hidden" name="makeups" value=""/>
                <input type="hidden" name="duration" value=""/>
                <input type="hidden" name="day" value=""/>
                <input type="hidden" name="instrument" value=""/>
                <input type="hidden" name="location" value=""/>
                <input type="hidden" name="teacher" value=""/>
                <input type="hidden" name="include_birthday" value=""/>
                <input type="hidden" name="include_gender" value=""/>
                <input type="hidden" name="include_status" value=""/>
                <input type="hidden" name="include_makeups" value=""/>
                <input type="hidden" name="include_email" value="checked"/>
                <input type="hidden" name="include_phone" value="checked"/>
                <input type="hidden" name="include_parent_names" value="checked"/>
                <input type="hidden" name="include_duration" value=""/>
                <input type="hidden" name="include_day" value=""/>
                <input type="hidden" name="include_time" value=""/>
                <input type="hidden" name="include_instrument" value=""/>
                <input type="hidden" name="include_location" value=""/>
                <input type="hidden" name="include_teacher" value=""/>
                <button type="submit">Search</button>
                <button type="button" onClick={() => setAdvancedIsOpen(!(advancedIsOpen))}>Advanced</button>
            </form>

        )

    }
}
