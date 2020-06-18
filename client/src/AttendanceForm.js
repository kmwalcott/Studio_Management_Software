import React from 'react'

export default function AttendanceForm(props) {
    var event_id = props.event_id;
    var action = `${process.env.REACT_APP_BASE_URL}/events/edit-attendance`;

    return (
        <div>
            <form method="POST" action={action}>
                <input type="hidden" name="_id" value={event_id}/>
                <select name="attendance">
                    <option value="Not yet entered">--Choose Attendance--</option>
                    <option value="present">Present</option>
                    <option value="late">Late</option>
                    <option value="absent_makeup">Absent- Give Makeup</option>
                    <option value="absent_no_makeup">Absent- No Makeup</option>
                    <option value="teacher_absent">Teacher Absent</option>
                    <option value="not_applicable">Not Applicable</option>
                </select>
                <label htmlFor="notes">Notes: </label>
                <input type="text" name="notes" id="notes"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
