const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

//@Route get request to /settings
//@Description: Get settings.  
//Access: Public
router.get('/', (req,res) =>{
    
    Settings.find({_id:"5ea6fcb24296ea4818494a2a"}, (err,result)=>{
        if(err){res.status(400).json(err)}
        else{res.status(200).json(result)}
    })

})

//@Route post request to /settings/add-setting
//@Description: Add a setting. Form submission.  
//Access: Public
router.post('/add-setting', (req,res) =>{
    var body = req.body;
    var setting = body.setting;
    var value = body.value;
    var base_url_client = process.env.BASE_URL_CLIENT;

    switch (setting){
        case 'event_type':
            Settings.findOneAndUpdate({_id:"5ea6fcb24296ea4818494a2a"}, { $push: {event_type: value} }, {useFindAndModify: false}, (err,result)=>{
                if(err){res.status(400).json(err)}
                else{res.status(200).redirect(`${base_url_client}/admin/settings`)}
            })
            break;
        case 'location':
            Settings.findOneAndUpdate({_id:"5ea6fcb24296ea4818494a2a"}, { $push: {location: value} }, {useFindAndModify: false}, (err,result)=>{
                if(err){res.status(400).json(err)}
                else{res.status(200).redirect(`${base_url_client}/admin/settings`)}
            })
            break;
        case 'teacher':
            Settings.findOneAndUpdate({_id:"5ea6fcb24296ea4818494a2a"}, { $push: {teacher: value} }, {useFindAndModify: false}, (err,result)=>{
                if(err){res.status(400).json(err)}
                else{res.status(200).redirect(`${base_url_client}/admin/settings`)}
            })
            break;
        case 'instrument':
            Settings.findOneAndUpdate({_id:"5ea6fcb24296ea4818494a2a"}, { $push: {instrument: value} }, {useFindAndModify: false}, (err,result)=>{
                if(err){res.status(400).json(err)}
                else{res.status(200).redirect(`${base_url_client}/admin/settings`)}
            })
            break;
        default:
    }

})

//@Route post request to /settings/drop-setting
//@Description: Drop a setting. Form submission.  
//Access: Public
router.post('/drop-setting', (req,res) =>{
    var body = req.body;
    var setting = body.setting;
    var value = body.value;
    var base_url_client = process.env.BASE_URL_CLIENT;

    switch (setting){
        case 'event_type':
            Settings.findOneAndUpdate({_id:"5ea6fcb24296ea4818494a2a"}, { $pull: {event_type: value} }, {useFindAndModify: false}, (err,result)=>{
                if(err){res.status(400).json(err)}
                else{res.status(200).redirect(`${base_url_client}/admin/settings`)}
            })
            break;
        case 'location':
            Settings.findOneAndUpdate({_id:"5ea6fcb24296ea4818494a2a"}, { $pull: {location: value} }, {useFindAndModify: false}, (err,result)=>{
                if(err){res.status(400).json(err)}
                else{res.status(200).redirect(`${base_url_client}/admin/settings`)}
            })
            break;
        case 'teacher':
            Settings.findOneAndUpdate({_id:"5ea6fcb24296ea4818494a2a"}, { $pull: {teacher: value} }, {useFindAndModify: false}, (err,result)=>{
                if(err){res.status(400).json(err)}
                else{res.status(200).redirect(`${base_url_client}/admin/settings`)}
            })
            break;
        case 'instrument':
            Settings.findOneAndUpdate({_id:"5ea6fcb24296ea4818494a2a"}, { $pull: {instrument: value} }, {useFindAndModify: false}, (err,result)=>{
                if(err){res.status(400).json(err)}
                else{res.status(200).redirect(`${base_url_client}/admin/settings`)}
            })
            break;
        default:
    }

})


module.exports = router;