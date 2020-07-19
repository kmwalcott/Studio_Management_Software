import React from 'react';
import NavBar from "./NavBar";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./PrivateRoute";
import './App.css'
import StudentSearch from './StudentSearch';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Calendar from './Calendar';
import Attendance from './Attendance';
import TimeClock from './TimeClock';
import StudentInfo from './StudentInfo';
import Admin from './admin/Admin';
import AdminSettings from './admin/AdminSettings';
import NewEvent from './admin/NewEvent';
import NewEvents from './admin/NewEvents';
import EditEvents from './admin/EditEvents';
import DeleteEvents from './admin/DeleteEvents';
import NewStudent from './admin/NewStudent';
import EditStudent from './admin/EditStudent';
import NewStaff from './admin/NewStaff';
import EditStaff from './admin/EditStaff';
import Intro from './Intro';


function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
      <Nav/>
      <StudentSearch/>
      <NavBar/>
      <Switch>
        <Route path='/' exact component={Intro}/>
        <PrivateRoute path='/home' component={Home}/>
        <PrivateRoute path='/calendar' exact component={Calendar}/>
        <PrivateRoute path='/attendance' component={Attendance}/>
        <PrivateRoute path='/timeclock' component={TimeClock}/>
        <PrivateRoute path='/studentinfo' component={StudentInfo}/>
        <PrivateRoute path='/admin' exact component={Admin}/>
        <PrivateRoute path="/admin/students/new-student" component={NewStudent}/>
        <PrivateRoute path="/admin/students/edit-student" component={EditStudent}/>
        <PrivateRoute path='/admin/staff/new-staff' component={NewStaff}/>
        <PrivateRoute path='/admin/staff/edit-staff' component={EditStaff}/>
        <PrivateRoute path="/admin/hours/new-event" component={NewEvent}/>
        <PrivateRoute path="/admin/hours/new-events" component={NewEvents}/>
        <PrivateRoute path="/admin/hours/edit-events" component={EditEvents}/>
        <PrivateRoute path="/admin/hours/delete-events" component={DeleteEvents}/>
        <PrivateRoute path='/admin/settings' component={AdminSettings}/>
      </Switch>
    </Router>
    </div>
  );  
  
}

export default App;
