var mongoose = require('mongoose');

//Make mongoose schema 
var settingsSchema = new mongoose.Schema(
    {event_type:[String], location:[String], teacher:[String], instrument: [String]}, 
    
    {collection: 'settings'});


//Make mongoose model 
var Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;