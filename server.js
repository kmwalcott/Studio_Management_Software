const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const student_routes = require('./routes/student-routes.js');
const staff_routes = require('./routes/staff-routes.js');
const settings_routes = require('./routes/settings-routes');
const events_routes = require('./routes/events-routes');
require('dotenv').config();

//Static folder
app.use(express.static('static'));

//Parse json and urlencoded requests
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Start server
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, ()=> console.log(`Listening on port ${port}`));

//Connect to Mongo
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
    .then(()=> console.log('Mongo connected...'))
    .catch(err => console.log(err));

//Use routes
app.use('/students',student_routes);
app.use('/staff', staff_routes);
app.use('/settings', settings_routes);
app.use('/events', events_routes);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res)=>{
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
