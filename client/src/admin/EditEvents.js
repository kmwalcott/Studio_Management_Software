import React, {useState, useEffect} from 'react'
import EventsForm from './EventsForm';
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
import Event from '../Event'
import Pagination from '../Pagination';

export default function EditEvents() {
    //FIXME Add back select all and deselect all buttons 
    //States
    const [events, setEvents] = useState([]);
    const [eventTypeList, setEventTypeList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [teacherList, setTeacherList] = useState([]);
    const [instrumentList, setInstrumentList] = useState([]);
    //const [eventDate, setEventDate] = useState(null);

    //Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(2);

    //State for child components (Event components)
    const [selected, setSelected] = useState([]);

    //Effects
    useEffect(() => {
        get_settings();
      },[]);

      function get_settings(){
         
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${process.env.REACT_APP_BASE_URL}/settings`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    setEventTypeList(JSON.parse(xhr.response)[0].event_type);
                    setLocationList(JSON.parse(xhr.response)[0].location);
                    setTeacherList(JSON.parse(xhr.response)[0].teacher);
                    setInstrumentList(JSON.parse(xhr.response)[0].instrument);
                }
            }
            
        }
        xhr.send();
   }

    //onChange function for dropdowns. Use value of dropdowns to filter events. 
    function filter_events(){
        var event_type = document.getElementById('event_types').value;
        var location = document.getElementById('location').value;
        var teacher = document.getElementById('teacher').value;
        var instrument = document.getElementById('instrument').value;
        //var date = eventDate;
        var toSend = {event_type: event_type, location: location, teacher: teacher, instrument: instrument};
        var jsonString = JSON.stringify(toSend);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_BASE_URL}/events/search`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    setEvents(JSON.parse(xhr.response));
                }
            }
            
        }
        xhr.send(jsonString);
    }

    /*
    //onchange function for date (change date state, then call filter_events)
    function datechange_and_filter(date){
        //console.log(date);
        setEventDate(date);
        filter_events();
    }
    */

    /*
    //onClick function for "select all" button.
    function select_all(){
        var all_ids = [];
        events.forEach((event)=>{
            all_ids.push(event._id);
        })
        setSelected(all_ids);
    }

    //onClick function for "deselect all" button.
    function deselect_all(){
        setSelected([]);
    }
    */

    //onchange function for selected_change prop of Event components.
    function handleSelectedChange(id){
        if(selected.indexOf(id) === -1){
            //add
            var new_entry = [id];
            setSelected(selected => selected.concat(new_entry));
        }
        else{
            //remove
            var new_array = selected.filter(array_entry => array_entry !== id);
            setSelected(new_array);
        }
    }
    
    //Set form action 
    var action = `${process.env.REACT_APP_BASE_URL}/events/update`;

    //Set form default values
    var event_type = '';
    var location = '';
    var initial_date = '';
    var final_date = '';
    var time = '';
    var day = '';
    var duration = '';
    var teacher = '';
    var instrument = '';
    var participants = [];
    var attendance = '';
    var notes = '';
    

    
    //Create dropdowns 
    const event_types_dropdown = eventTypeList.map((field)=>
        <option key={field} value={field}>{field}</option>
    );
    const location_dropdown = locationList.map((field)=>
        <option key={field} value={field}>{field}</option>
    );
    const teacher_dropdown = teacherList.map((field)=>
        <option key={field} value={field}>{field}</option>
    );
    const instrument_dropdown = instrumentList.map((field)=>
        <option key={field} value={field}>{field}</option>
    );    
    
    //Create list of event components to be displayed after filtering 
    const event_list = events.map((event)=>
    <Event key={event._id} event_type={event.event_type} start_time={event.time} duration={event.duration} location={event.location} participants={event.participants} attendance={event.attendance} event_id={event._id} selected={selected} selected_change={() => handleSelectedChange(event._id)} />
    ); 
    
    //Get one page of events
    const index_of_last_event = currentPage * eventsPerPage;
    const index_of_first_event = index_of_last_event - eventsPerPage;
    const current_events = event_list.slice(index_of_first_event, index_of_last_event);

    //Change page
    function paginate(page_number){
        setCurrentPage(page_number);
    }
          
    return (
        <div>          
            <select name="event_types" id="event_types" onChange={filter_events}>
                <option value="">--Choose event type--</option>
                {event_types_dropdown}
            </select>
            <select name="location" id="location" onChange={filter_events}>
                <option value="">--Choose location--</option>
                {location_dropdown}
            </select>
            <select name="teacher" id="teacher" onChange={filter_events}>
                <option value="">--Choose teacher--</option>
                {teacher_dropdown}
            </select>
            <select name="instrument" id="instrument" onChange={filter_events}>
                <option value="">--Choose instrument--</option>
                {instrument_dropdown}
            </select>   
            <EventsForm action={action} event_type_list={eventTypeList} location_list={locationList} teacher_list={teacherList} instrument_list={instrumentList} event_type={event_type} location={location} initial_date={initial_date} final_date={final_date} time={time} day={day} duration={duration} teacher={teacher} instrument={instrument} participants={participants} attendance={attendance} notes={notes} selected={selected}/>
            {current_events}
            <Pagination eventsPerPage={eventsPerPage} totalEvents={events.length} paginate={paginate} />
        </div> 
    )
}
    
 
    
                