var mongoose = require('mongoose');

//Make mongoose schema 
var studentSchema = new mongoose.Schema(
    {
    student_name:String, parent_names:[String], gender:String, birthday:Date, email:String, phone:String, status:String, makeups:Number, referrer: String, student_since: Date, notes: String, location:[String], teacher:[String], instrument:[String], duration:[Number], day:[String], time:[String]},
    
    {collection: 'students'});


    //Make mongoose model 
var Students = mongoose.model('Students', studentSchema);

module.exports = Students;



