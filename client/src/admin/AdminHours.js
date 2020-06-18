import React from 'react'
import {Link} from 'react-router-dom';

export default function AdminHours() {
    return (
        <div>
                <div className="admin-folder">
                    <div className="admin-folder-top">
                        <ul>
                            <Link to="/admin/students"><li>Manage Students</li></Link>
                            <Link to="/admin/staff"><li>Manage Staff</li></Link>
                            <Link to="/admin/hours"><li className="selected-tab">Hours and Scheduling</li></Link>
                            <Link to="/admin/settings"><li>Settings</li></Link>
                        </ul>
                    </div>
                    <div className="admin-folder-bottom">
                        <br/>
                        <br/>
                        <ul>
                            <li><Link to="/admin/hours/new-event"><button className="margin30">Create One-Time Event</button></Link></li>
                            <li><Link to="/admin/hours/new-events"><button className="margin30">Create Weekly Event</button></Link></li>
                            <li><Link to="/admin/hours/edit-events"><button className="margin30">Edit Events</button></Link></li>
                            <li><Link to="/admin/hours/delete-events"><button className="margin30">Delete Events</button></Link></li>
                        </ul>
                    </div> 
                </div>
        </div>
    )
}
