import React from 'react'
import {Link} from 'react-router-dom';

export default function Nav() {
   
    return (
        <nav id="main-menu">
            <ul>
                <Link to='/home'><li>Home</li></Link>
                <Link to='/calendar'><li>Calendar</li></Link>
                <Link to='/attendance'><li>Attendance</li></Link>
                <Link to='/timeclock'><li>Time Clock</li></Link>
                <Link to='/admin'><li>Admin</li></Link>
            </ul>
        </nav>
    )
}
