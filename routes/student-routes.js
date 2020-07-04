const express = require('express');
const router = express.Router();
const Students = require('../models/Students.js');
const Queries = require('../models/Queries');
const { check, validationResult } = require('express-validator');


//Note: Student model has 17 fields. 

//@Route post request to /students
//@Description: Create a new student. Form submission. 
//Access: Admin only
router.post('/',
    [check('email.*').optional({checkFalsy:true}).isEmail(), 
    check('student_name').isLength({ max: 35 }), 
    check('parent_names.*').optional({checkFalsy:true}).isLength({ max: 35 }), 
    check('phone.*').optional({checkFalsy:true}).isMobilePhone(),
    check('notes').isLength({max: 100})
    ], 
    (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var base_url_client = process.env.BASE_URL_CLIENT;
    let student_object = {
        student_name:req.body.student_name, 
        parent_names:req.body.parent_names, 
        gender:req.body.gender, 
        birthday:req.body.birthday,
        email:req.body.email,
        phone: req.body.phone,
        status:req.body.status,
        referrer: req.body.referrer, 
        notes: req.body.notes,
        location:[],
        teacher:[],
        instrument:[],
        duration:[],
        day:[],
        time:[],
        student_since: new Date(),
        makeups:0
    }
    var newStudent = new Students(student_object);
    newStudent.save((err,result)=>{
        if(err){res.status(400).send(err)}
        else{res.status(200).redirect(`${base_url_client}/admin/students`)}
    })
})

//@Route get request to /students
//@Description: Get all students.
//Access: Sign in required
router.get('/', (req,res) =>{
    Students.find({}, (err,result)=>{
        if(err){res.status(400).json(err)}
        else{res.status(200).json(result)}
    })
})

//@Route post request to /students/get-students
//@Description: Get students only for current user.  
//Access: Sign in required
router.post('/get-students', (req,res) =>{
    var user = req.body.user;

    Students.find({}, (err,result)=>{
        if(err){res.status(400).json(err)}
        else{res.status(200).json(result)}
    })

})

//@Route post request to /students/search
//@Description: Return student info based on search filters
//Access: Login required 
//FIXME add events query to find lesson info
router.post('/search', (req,res) =>{
    var conditional_filter = {};
    var include_string = 'student_name';
    var body = req.body;   
    var base_url_client = process.env.BASE_URL_CLIENT;
    
    //Filtered non-lesson fields, 4 total
    var student_name = body.student_name;
    var gender = body.gender;
    var status = body.status;
    var makeups = body.makeups;
    
    //Filtered lesson fields, 5 total
    var duration = body.duration;
    var day = body.day;
    var instrument = body.instrument;
    var location = body.location;
    var teacher = body.teacher;
    

    //Included non-lesson fields, 7 total
    var include_birthday = body.include_birthday;
    var include_gender = body.include_gender;
    var include_status = body.include_status;
    var include_makeups = body.include_makeups;
    var include_email = body.include_email;
    var include_phone = body.include_phone;
    var include_parent_names = body.include_parent_names;
    
    
    //Included lesson fields, 6 total
    var include_duration = body.include_duration;
    var include_day = body.include_day;
    var include_time = body.include_time;
    var include_instrument = body.include_instrument;
    var include_location = body.include_location;
    var include_teacher = body.include_teacher;

    var filtered = [student_name, gender, status, makeups, duration, day, instrument, location, teacher];
    var included = [include_birthday, include_gender, include_status, include_makeups, include_email, include_phone, include_parent_names, include_duration, include_day, include_time, include_instrument, include_location, include_teacher];
    
    var filtered_fields = ['student_name', 'gender', 'status', 'makeups', 'duration', 'day', 'instrument', 'location', 'teacher']; 
    var included_fields = ['birthday', 'gender', 'status', 'makeups', 'email', 'phone', 'parent_names', 'duration','day','time','instrument','location','teacher'];

    for(i=0; i<filtered.length; i++){
        if (filtered[i].length > 0){
            conditional_filter[filtered_fields[i]] = filtered[i];
        }     
    }

   for(i=0;i<included.length;i++){
        if (included[i]=="checked"){
            include_string = include_string + ' ' + included_fields[i];
        }
    }    
    
    Students.find(conditional_filter, include_string, (err,result)=>{
        if(err){
            res.status(400).json(err)
        }
        Queries.findOneAndUpdate({},{result:result}, {useFindAndModify:false},(err,result)=>{
            if(err){
                res.status(400).json(err)
            }
            res.redirect(`${base_url_client}/studentinfo`);  
        })
    })

})

//@Route post request to /students/student-info-form
//@Description: Get specific student's data to display in form being edited. Ajax request.   
//Access: Login required
router.post('/student-info-form', (req,res) =>{
    if(req.body.student_name === ""){
        //console.log('No student selected.');
        var result = {
            student_name: '', 
            parent_names: [], 
            gender: '',
            birthday: '',
            email: '',
            phone: '',
            status: '',
            referrer: '',
            notes: '',
            makeups: 0
        };
        res.status(200).json([result]);
    }
    else{
        Students.find({ student_name: req.body.student_name },{_id:0},(err,result)=>{
            if(err){res.status(400).send(err)}
            else{res.status(200).json(result)}
        })
    }
})


//@Route get request to /students/student-info-table
//@Description: Get student data to display in table. Ajax request.   
//Access: Login required
router.get('/student-info-table', (req,res) =>{
    
    Queries.findOne({},{_id:0},(err,result)=>{
        if(err){res.status(400).send(err)}
        else{res.status(200).json(result)}
    })

})


//@Route post request to /students/update
//@Description: Update student info. Form submission. 
//Access: Admin only
router.post('/update', 
    [check('email.*').optional({checkFalsy:true}).isEmail(),   
    check('student_name').isLength({ max: 35 }), 
    check('parent_names.*').optional({checkFalsy:true}).isLength({ max: 35 }), 
    check('phone.*').optional({checkFalsy:true}).isMobilePhone(),
    check('notes').isLength({max: 100})
    ], 
    (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    
    var base_url_client = process.env.BASE_URL_CLIENT;
    Students.findOneAndUpdate({ "student_name": req.body.student_name },
    {
        student_name: req.body.student_name, 
        parent_names: req.body.parent_names, 
        gender: req.body.gender,
        birthday: req.body.birthday,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
        referrer: req.body.referrer,
        notes: req.body.notes,
        makeups: req.body.makeups
    }, 
        {useFindAndModify: false}, (err,result)=>{
        if(err){res.status(400).send(err)}
        else{res.status(200).redirect(`${base_url_client}/admin/students`)}
    })
})

//@Route delete request to /students
//@Description: Delete a student. Ajax request.   
//Access: Admin only
router.delete('/', (req,res) =>{
    var base_url_client = process.env.BASE_URL_CLIENT;
    
    Students.deleteOne({student_name: req.body.name },(err,result)=>{
        if(err){res.status(400).send(err)}
        else{res.status(200).redirect(`${base_url_client}/admin/students`)}
    })
})

module.exports = router;