var mongoose = require('mongoose');

//Make mongoose schema 
var PunchSchema = new mongoose.Schema({
    time_in:Date,
    time_out:Date
})

var staffSchema = new mongoose.Schema(
    {
    name:String, birthday:Date, email:String, phone:String, hours:[PunchSchema]}, 
    
    {collection: 'staff'});


    //Make mongoose model 
var Staff = mongoose.model('Staff', staffSchema);


module.exports = Staff;