import React, {useState} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

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
                <Container>
                <Form method="POST" action={action}>
                    <Form.Group>
                        <Form.Label for="event_type">Event Type: </Form.Label>
                        <Form.Control as="select" name="event_type" id="event_type" required defaultValue={event_type}>
                            <option value="">--Choose Event Type--</option>
                            {event_type_dropdown}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label for="location">Location: </Form.Label>
                        <Form.Control as="select" name="location" id="location" required defaultValue={location}>
                            <option value="">--Choose Location--</option>
                            {location_dropdown}
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label for="time">Event Time: </Form.Label>
                        <Form.Control type="text" id="time" name="time" required defaultValue={time}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label for="duration"> Event Duration in Minutes: </Form.Label>
                        <Form.Control type="text" id="duration" name="duration" required defaultValue={duration}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label for="date">Date: </Form.Label>
                        <DatePicker id="date" name="date" required selected={eventDate} onChange={date =>setEventDate(date)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label for="teacher">Teacher (Optional): </Form.Label>
                        <Form.Control as="select" name="teacher" id="teacher" defaultValue={teacher}>
                            <option value="">--Choose Teacher--</option>
                            {teacher_dropdown}
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label for="instrument">Instrument (Optional): </Form.Label>
                        <Form.Control as="select" name="instrument" id="instrument" defaultValue={instrument}>
                            <option value="">--Choose Instrument--</option>
                            {instrument_dropdown}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label for="notes">Notes (Optional): </Form.Label>
                        <Form.Control type="text" name="notes" id="notes" defaultValue={notes}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label for="participants">Participants: </Form.Label>
                        <Form.Control type="text" id="participants" required name="participants" placeholder="Separate with comma" defaultValue={participants}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label for="attendance">Attendance (Optional): </Form.Label>
                        <Form.Control as="select" name="attendance" id="attendance" defaultValue={attendance}>
                            <option value="Not yet entered">--Choose Attendance--</option>
                            <option value="present">Present</option>
                            <option value="late">Late</option>
                            <option value="absent_makeup">Absent- Give Makeup</option>
                            <option value="absent_no_makeup">Absent- No Makeup</option>
                            <option value="teacher_absent">Teacher Absent</option>
                            <option value="not_applicable">Not Applicable</option>
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit">Submit</Button>
                </Form>
                </Container>
            </div>
        )
    
}
