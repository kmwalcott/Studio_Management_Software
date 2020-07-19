const express = require('express');
const router = express.Router();
const Events = require('../models/Events');
const moment = require('moment');
const { check, validationResult } = require('express-validator');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

//@Route post request to /events/single-event
//@Description: Create a single new event. Form submission. 
//Access: Admin only
router.post('/single-event', 
    [check('time').isLength({max: 10}), 
    check('duration').isInt(), 
    check('notes').isLength({max: 100})
    ],  
    (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    var base_url_client = process.env.BASE_URL_CLIENT;
    var date_parts = req.body.date.split('/');
    var month = parseInt(date_parts[0]) - 1;
    var date = parseInt(date_parts[1]);
    var year = parseInt(date_parts[2]);
    var time_parts = req.body.time.split(':');
    var hour = parseInt(time_parts[0]);
    var minutes = parseInt(time_parts[1]);

    var my_date = new Date(year, month, date, hour, minutes);

    let event_object = {
        event_type: req.body.event_type, location: req.body.location, date: my_date, time:req.body.time, day: '', duration: req.body.duration, teacher: req.body.teacher, instrument: req.body.instrument, participants: req.body.participants.split(', '), attendance: req.body.attendance, notes: req.body.notes 
    }
    
    var newEvent = new Events(event_object);
    newEvent.save((err,result)=>{
        if(err){res.status(400).send(err)}
        else{res.status(200).redirect(`${base_url_client}/admin`)} 
    })    
})

//@Route post request to /events/multiple-events
//@Description: Create multiple new events. Form submission. 
//Access: Admin only
router.post('/multiple-events', 
    [check('time').isLength({max: 10}), 
    check('duration').isInt(), 
    check('notes').isLength({max: 100})
    ],    
    (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    
    var time_parts = req.body.time.split(':');
    var hour = parseInt(time_parts[0]);
    var minutes = parseInt(time_parts[1]);
    
    var date_parts_initial = req.body.initial_date.split('/');
    var month_initial = parseInt(date_parts_initial[0]) - 1;
    var date_initial = parseInt(date_parts_initial[1]);
    var year_initial = parseInt(date_parts_initial[2]);
    
    var date_parts_final = req.body.final_date.split('/');
    var month_final = parseInt(date_parts_final[0]) - 1;
    var date_final = parseInt(date_parts_final[1]);
    var year_final = parseInt(date_parts_final[2]);
    
    var multiple_events = [];
    var date_string = (new Date(year_initial, month_initial, date_initial, hour, minutes)).toISOString();
    var final_date = (new Date(year_final, month_final, date_final, hour, minutes)).toISOString();

    while (moment(date_string).isSameOrBefore(final_date)){
        var date_moment = moment(date_string);
        var event = {
            event_type: req.body.event_type, 
            location: req.body.location, 
            date: date_string, 
            time: req.body.time, 
            day: req.body.day, 
            duration: req.body.duration, 
            teacher: req.body.teacher, 
            instrument: req.body.instrument, 
            participants: req.body.participants.split(', '), 
            notes: req.body.notes, 
            attendance: req.body.attendance
        };
        multiple_events.push(event);
        //Increment date string and date moment by week
        date_moment.add(1, 'weeks');
        date_string = (new Date(date_moment)).toISOString();
    }
    
    //console.log(multiple_events);
    var base_url_client = process.env.BASE_URL_CLIENT;
    Events.insertMany(multiple_events, (err,result)=>{
        
        if(err){res.status(400).json(err)}
        else{res.status(200).redirect(`${base_url_client}/admin`)}
        
    })
})

//@Route post request to /events/home
//@Description: Show events on homepage for single day.   
//Access: Login required
router.post('/home', (req,res)=>{
    var daychange = req.body.daychange; //how many days forward or back from today
    var today = moment();
    
    //Moment calculation to find new day and beginning and end of that day (for query) 
    var new_day = today.clone().add(daychange,'days');
    var start_of_new_day = new_day.clone().startOf('day');
    var end_of_new_day = new_day.clone().endOf('day');
    
    //Convert new_day to month date year, to be displayed by front end
    var new_month = new_day.month();
    var new_date = new_day.date();
    var new_year = new_day.year();
    
    //Find events on new day
    Events.find({participants: req.body.user, date: { $gte: start_of_new_day, $lte: end_of_new_day }}, (err,result)=>{
        
        if(err){res.status(400).json(err)}
        else{res.status(200).json({events:result, month: new_month, date:new_date, year:new_year})}
    }).sort({ date: 1 }); 
})

//@Route post request to /events/attendance
//@Description: Search events with filter.   
//Access: Login required
router.post('/attendance', (req,res)=>{
    
    var student_name = req.body.student_name;

    Events.find({participants: student_name}, (err,result)=>{
        
        if(err){res.status(400).json(err)}
        else{res.status(200).json(result)}
    }).sort({ date: -1 });

})


//@Route post request to /events/calendar
//@Description: Show calendar. Navigation arrows are ajax requests.  
//Access: Login required
router.post('/calendar', async (req,res) =>{
    try{
        var month = req.body.month; //Format 0-11
        var year = req.body.year; //Format YYYY
        
        //Use Moment JS to calculate the 3 parameters determining calendar shape
        var days_in_month = moment(`${year}-${month+1}`, "YYYY-M").daysInMonth(); //creating moment uses 1 indexing, must add 1 to month variable
        var first_weekday = moment(`${year}-${month+1}-1`,"YYYY-M-D").day(); //creating moment uses 1 indexing, must add 1 to month variable
        var last_weekday = moment(`${year}-${month+1}-${days_in_month}`,"YYYY-M-D").day(); //creating moment uses 1 indexing, must add 1 to month variable
        
        //Get start and end of month
        var start_of_month = moment(`${year}-${month+1}-1`,"YYYY-M-D").startOf('month');
        var end_of_month = moment(`${year}-${month+1}-1`,"YYYY-M-D").endOf('month');

        //Initialize necessary arrays
        var rows = [];
        var monday_dates = [];
        var tuesday_dates = [];
        var wednesday_dates = [];
        var thursday_dates = [];
        var friday_dates = [];
        var saturday_dates = [];
        var sunday_dates = []; 
        
        //Populate each weekday array with dates of that weekday
        for(i=0; i<days_in_month; i++){
            var weekday = moment(`${year}-${month+1}-${i+1}`,"YYYY-M-D").day();
            switch(weekday){
                case 0: //Sun
                    sunday_dates.push(i+1);
                    break;
                case 1: //Mon
                    monday_dates.push(i+1);
                    break;
                case 2: //Tues
                    tuesday_dates.push(i+1);
                    break;
                case 3: //Wed
                    wednesday_dates.push(i+1);
                    break;
                case 4: //Thurs
                    thursday_dates.push(i+1);
                    break;
                case 5: //Fri
                    friday_dates.push(i+1);
                    break;
                default: //case 6 Sat
                    saturday_dates.push(i+1);
            }
        }
        
        //Add null to beginning and end of weekday arrays to represent empty boxes
        switch(first_weekday){
            case 0: //Sun
                monday_dates.unshift(null);
                tuesday_dates.unshift(null);
                wednesday_dates.unshift(null);
                thursday_dates.unshift(null);
                friday_dates.unshift(null);
                saturday_dates.unshift(null);
            break;
            case 1: //Mon
            
            break;
            case 2: //Tues
                monday_dates.unshift(null);
                
            break;
            case 3: //Wed
                monday_dates.unshift(null);
                tuesday_dates.unshift(null);
                
            break;
            case 4: //Thurs
                monday_dates.unshift(null);
                tuesday_dates.unshift(null);
                wednesday_dates.unshift(null);
                
            break;
            case 5: //Fri
                monday_dates.unshift(null);
                tuesday_dates.unshift(null);
                wednesday_dates.unshift(null);
                thursday_dates.unshift(null);
                
            break;
            default: //case 6 Sat
                monday_dates.unshift(null);
                tuesday_dates.unshift(null);
                wednesday_dates.unshift(null);
                thursday_dates.unshift(null);
                friday_dates.unshift(null);   
        }
        
        switch(last_weekday){
            case 0: //Sun
            break;
            case 1: //Mon
                tuesday_dates.push(null);
                wednesday_dates.push(null);
                thursday_dates.push(null);
                friday_dates.push(null);
                saturday_dates.push(null);
                sunday_dates.push(null);
            break;
            case 2: //Tues
            
                wednesday_dates.push(null);
                thursday_dates.push(null);
                friday_dates.push(null);
                saturday_dates.push(null);
                sunday_dates.push(null);
            break;
            case 3: //Wed
            
            thursday_dates.push(null);
            friday_dates.push(null);
            saturday_dates.push(null);
            sunday_dates.push(null);
            break;
            case 4: //Thurs
            
            friday_dates.push(null);
            saturday_dates.push(null);
            sunday_dates.push(null);
            break;
            case 5: //Fri
            
            saturday_dates.push(null);
            sunday_dates.push(null);
            break;
            default: //case 6 Sat
            sunday_dates.push(null);
        }

        
        //Create all rows (1-6)
        for(i=0; i < 6; i++){
            my_row = [monday_dates[i], tuesday_dates[i], wednesday_dates[i], thursday_dates[i], friday_dates[i], saturday_dates[i], sunday_dates[i]];
            rows.push(my_row);
        }

        //Remove row 6 if empty
        if(typeof rows[5][0] === "undefined"){
            rows.pop();
        }
        
        //Make a query for all events in which the current user is a participant
        var events = await Events.find({participants: req.body.user, date: { $gte: start_of_month, $lte: end_of_month }});    
        //console.log(events);
        
        //Need a function to convert to my day numbering system (Monday is 0)
        function convert_js_to_mine(js_day){
            if (js_day === 0){
                var new_day = js_day + 6;
            }
            else{
                new_day = js_day - 1;
            }
            return new_day;
        }
        
        //Loop through all events for the month and place in proper dates
        events.forEach((event)=>{
            //console.log('Loop entered. +1!');
            var my_date_obj = new Date(event.date);
            
            var js_day = my_date_obj.getDay();//get day of week
            var my_day = convert_js_to_mine(js_day);
            
            var my_date = my_date_obj.getDate();//get date 
            
            var start_time_moment = moment(my_date_obj.toISOString());
            var end_time_moment = start_time_moment.clone().add(parseInt(event.duration), 'minutes');
            var end_time_moment_formatted = end_time_moment.format("h:mm");
            
            
            rows.forEach((row, index)=>{
                if(row[my_day] === my_date){
                    rows[index][my_day] += "\n";
                    rows[index][my_day] += `${event.time}-${end_time_moment_formatted}, ${event.participants.join(', ')}, ${event.location}.`;
                    //console.log(rows[index][my_day]);
                    //console.log(typeof rows[index][my_day]);
                }
                else if(typeof rows[index][my_day] === 'string'){
                    rows[index][my_day] += "\n";
                    rows[index][my_day] += `${event.time}-${end_time_moment_formatted}, ${event.participants.join(', ')}, ${event.location}.`;
                    //console.log(rows[index][my_day]);
                    //console.log(typeof rows[index][my_day]);
                }
            }) 
            
        })
        
        res.json(rows); 
    }

    catch (err){res.json(err)}
})

//@Route post request to /events/get-events
//@Description: Grab all events falling on a certain date. AJAX. 
//Access: Admin only
router.post('/get-events', (req,res)=>{
    var date = req.body.date;
    var today = moment();
    var start_of_today = today.clone().startOf('day');
    var end_of_today = today.clone().endOf('day');


    //Make a query for all events falling on chosen date.
    Events.find({time: { $gte: start_of_today, $lte: end_of_today }}, (err,result)=>{
        
        if(err){res.status(400).json(err)}
        else{res.status(200).json(result)}
    })
})

//@Route post request to /events/search
//@Description: Filter events based on date and dropdown inputs. AJAX. 
//Access: Admin only
router.post('/search', async (req,res)=>{
    try{
        //Form inputs
        var event_type = req.body.event_type;
        var location = req.body.location;
        var teacher = req.body.teacher;
        var instrument = req.body.instrument;
        //var date = req.body.date;

        var conditional_filter = {};
        var field_array = [event_type, location, teacher, instrument];
        var field_array_string = ["event_type", "location", "teacher", "instrument"];
        
        //Filter from dropdown input
        field_array.forEach((field, index)=>{
            if(field.length > 0){
                conditional_filter[field_array_string[index]] = field_array[index];
            }
        })
        
        /*
        //Filter from date
        if(typeof date === 'string'){
            var my_date = new Date(date);
            var day = moment(my_date);
            var start_of_day = day.clone().startOf('day');
            var end_of_day = day.clone().endOf('day');
            conditional_filter.date = { $gte: start_of_day, $lte: end_of_day }; 
        }
        */
        
        
        //Return zero events if filter is empty
        if(Object.keys(conditional_filter).length === 0){
            var result = [];
            res.json(result);
        }

        else{
            //Non-empty filter: make a query for all events matching date and dropdown inputs.
            var result = await Events.find(conditional_filter).sort({date: -1});
            res.json(result);
        }
    }
    catch{}
})


//@Route post request to /events/update
//@Description: Edit selected events. Form submission. 
//Access: Admin only
router.post('/update', 
    [check('time').isLength({max: 10}), 
    check('duration').isInt(), 
    check('notes').isLength({max: 100})
    ],   
    (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var update = {};
    var body = req.body;
    var event_type = body.event_type;
    var location = body.location;
    var date = body.initial_date;
    var duration = body.duration;
    var teacher = body.teacher;
    var instrument = body.instrument;
    var participants = body.participants.split(', ');
    var notes = body.notes;
    var selected = body.selected.split(',');
    
    var field_array = [event_type, location, duration, teacher, instrument, participants, notes];
    var field_array_string = ["event_type", "location", "duration", "teacher", "instrument", "participants", "notes"];
    field_array.forEach((field, index)=>{
        if(field.length > 0){
            update[field_array_string[index]] = field_array[index];
        }
    })

    if(typeof date !== 'undefined'){
        update["date"] = date;
    }


    var base_url_client = process.env.BASE_URL_CLIENT;
    Events.updateMany({_id: {$in: selected}}, update, (err,result)=>{
        
        if(err){res.status(400).json(err)}
        else{res.status(200).redirect(`${base_url_client}/admin`)}
    })
})

//@Route post request to /events/edit-attendance
//@Description: Attendance. Form submission. 
//Access: Login required
router.post('/edit-attendance',(req,res)=>{
    var body = req.body;
    var id = body._id;
    var attendance = body.attendance;
    var base_url_client = process.env.BASE_URL_CLIENT;

    Events.findOneAndUpdate({_id: id},{attendance: attendance}, {useFindAndModify: false}, (err,result)=>{
        if(err){res.status(400).send(err)}
        else{res.status(200).redirect(`${base_url_client}/attendance`)}
    })
})

//@Route delete request to /events
//@Description: Delete selected events. Ajax request.  
//Access: Admin only
router.delete('/', (req,res) =>{

    var selected = req.body.selected;
    
    Events.deleteMany({_id: {$in: selected}},(err,result)=>{
        if(err){res.status(400).send(err)}
        else{
            //Set HTTP method to GET
            req.method = 'GET';
            res.status(200).end();
        }
    })
})

module.exports = router;