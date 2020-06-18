var mongoose = require('mongoose');

//Make mongoose schema 
var queriesSchema = new mongoose.Schema(
    {result: [Object]}, 
    
    {collection: 'queries'});


    //Make mongoose model 
var Queries = mongoose.model('Queries', queriesSchema);

module.exports = Queries;
