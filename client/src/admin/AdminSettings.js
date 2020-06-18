import React from 'react'
import {Link} from 'react-router-dom';
import Setting from './Setting';


export default function AdminSettings() {
        
        return (
            <div>    
                <div className="admin-folder">
                    <div className="admin-folder-top">
                        <ul>
                            <Link to="/admin/students"><li>Manage Students</li></Link>
                            <Link to="/admin/staff"><li>Manage Staff</li></Link>
                            <Link to="/admin/hours"><li>Hours and Scheduling</li></Link>
                            <Link to="/admin/settings"><li className="selected-tab">Settings</li></Link>
                        </ul>
                    </div>
                    <div className="admin-folder-bottom">
                        <br/>
                        <br/>
                        <div className="settings">
                            <Setting setting="event_type" title="Event Type"/>
                            <Setting setting="location" title="Location"/>
                            <Setting setting="teacher" title="Teacher"/>
                            <Setting setting="instrument" title="Instrument"/>
                        </div>
                    </div> 
                </div>
            </div>
        )
    
}
