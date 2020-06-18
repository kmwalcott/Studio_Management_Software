var mongoose = require('mongoose');

//Make mongoose schema 
var eventsSchema = new mongoose.Schema(
    {
    event_type: String, location: String, date: Date, time: String, day:String, duration:Number, teacher:String, instrument: String, participants:[String], notes:String, attendance:String},
    
    {collection: 'events'});


    //Make mongoose model 
var Events = mongoose.model('Events', eventsSchema);

module.exports = Events;