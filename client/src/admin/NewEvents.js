import React, {useEffect, useState} from 'react'
import EventsForm from './EventsForm';

export default function NewEvents() {
     //States
     const [eventTypeList, setEventTypeList] = useState([]);
     const [locationList, setLocationList] = useState([]);
     const [teacherList, setTeacherList] = useState([]);
     const [instrumentList, setInstrumentList] = useState([]);
     
     
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
                     var settings = JSON.parse(xhr.response)[0];
                    setEventTypeList(settings.event_type);
                    setLocationList(settings.location);
                    setTeacherList(settings.teacher);
                    setInstrumentList(settings.instrument);
                 }
             }
             
         }
         xhr.send();
    }
    
     
    //Set form action 
    var action = `${process.env.REACT_APP_BASE_URL}/events/multiple-events`;

    //Form values (empty for new event)
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
    var events = [];
     
    return (
        <div>        
            <EventsForm action={action} event_type_list={eventTypeList} location_list={locationList} teacher_list={teacherList} instrument_list={instrumentList} event_type={event_type} location={location} initial_date={initial_date} final_date={final_date} time={time} day={day} duration={duration} teacher={teacher} instrument={instrument} participants={participants} attendance={attendance} notes={notes} events_array={events}/>
        </div>
    )
}
