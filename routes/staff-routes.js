const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff.js');
const { check, validationResult } = require('express-validator');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const base_url_client = process.env.BASE_URL_CLIENT;

//@Route post request to /staff
//@Description: Create a new staff member. Form submission. 
//Access: Admin only
router.post('/', 
    [check('email').isEmail(), 
    check('name').isLength({ max: 35 }), 
    check('phone').isMobilePhone()
    ], 
    (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    let staff_object = {
       
        name: req.body.name, birthday:req.body.birthday, email:req.body.email, phone:req.body.phone, hours:[]


    }
    var newStaff = new Staff(staff_object);
    newStaff.save((err,result)=>{
        if(err){res.status(400).send(err)}
        else{res.status(200).redirect(`${base_url_client}/admin/staff`)}
        
        
    })
})


//@Route get request to /staff
//@Description: Get all staff.  
//Access: Public
router.get('/', (req,res) =>{
    
    Staff.find({}, (err,result)=>{
        if(err){res.status(400).json(err)}
        else{res.status(200).json(result)}
    })

})


//@Route post request to /staff/staff-info-form
//@Description: Get specific employee's data to display in form. Ajax request.   
//Access: Admin 
router.post('/staff-info-form', (req,res) =>{
    var body = req.body;
    var name = body.name;

    Staff.find({name: name },{_id:0},(err,result)=>{
        if(err){res.status(400).send(err)}
        else{res.status(200).json(result)}
    })

})

//@Route get request to /staff/hours
//@Description: Get staff hours for table in TimeClock component. Effect hook. 
//Access: Login required
router.get('/hours', async (req,res) =>{
    try{
        var staff_member = await Staff.find({name:'Kyle Walcott'}, {hours:1});
        var hours = staff_member[0].hours;
        res.json(hours);
    }
    catch (error){res.send(error)}
})

//@Route put request to /staff/hours
//@Description: Punch the timeclock and update the table. Ajax request.  
//Access: Login required
router.put('/hours', async (req,res)=>{
    try{
        var date_today = new Date();
        var staff_member = await Staff.find({name:'Kyle Walcott'}, {hours:1});
        var hours = staff_member[0].hours;
        if(hours.length > 0){
            var last_object = hours[hours.length - 1];
        }
        
        //No punches yet. Create new entry in hours array and change time_in to current time, time_out empty. 
        if(typeof last_object === 'undefined'){
            await Staff.findOneAndUpdate({name:'Kyle Walcott'}, {$push:{hours:[{time_in:date_today,time_out:''}]}}, {useFindAndModify: false}); 
            var updated_object = await Staff.find({name:'Kyle Walcott'}, {hours:1}); 
            var updated_hours = updated_object[0].hours;
        }
        
        //User is clocked in. Must clock out. Change time_out in last entry of array.
        else if(last_object.time_out === null){
            await Staff.findOneAndUpdate({name:"Kyle Walcott", "hours._id":last_object._id}, {"hours.$.time_out": date_today}, {useFindAndModify: false});
            var updated_object = await Staff.find({name:'Kyle Walcott'}, {hours:1}); 
            var updated_hours = updated_object[0].hours;
        }
        
        //User is clocked out. Must clock in. Create new entry in hours array and change time_in to current time, time_out empty.
        else{
            await Staff.findOneAndUpdate({name:'Kyle Walcott'}, {$push:{hours:[{time_in:date_today,time_out:''}]}}, {useFindAndModify: false}); 
            var updated_object = await Staff.find({name:'Kyle Walcott'}, {hours:1}); 
            var updated_hours = updated_object[0].hours;
        }
        
        
       res.json(updated_hours);
    }
    catch (error){res.send(error)}
})

//@Route post request to /staff/update
//@Description: Update staff info. Form submission. 
//Access: Admin only
router.post('/update',
    [check('email').isEmail(), 
    check('name').isLength({ max: 35 }), 
    check('phone').isMobilePhone()
    ], 
    (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    Staff.findOneAndUpdate({ "name": req.body.name },{name:req.body.name, birthday:req.body.birthday, email:req.body.email, phone:req.body.phone}, {useFindAndModify: false}, (err,result)=>{
        if(err){res.status(400).send(err)}
        else{res.status(200).redirect(`${base_url_client}/admin/staff`)}
    })

})

//@Route delete request to /staff
//@Description: Delete a staff member. Ajax request.  
//Access: Admin only
router.delete('/', (req,res) =>{

    var body = req.body;
    var name = body.name;
    
    Staff.deleteOne({ name:name },(err,result)=>{
        if(err){res.status(400).send(err)}
        else{res.status(200).redirect(`${base_url_client}/admin/staff`)}
    })

})

module.exports = router;

