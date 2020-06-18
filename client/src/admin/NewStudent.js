import React from 'react'
import StudentForm from './StudentForm';
import {Link} from 'react-router-dom';

export default function NewStudent() {
    
    return (
        <div>
            <div className="admin-folder">
                    <div className="admin-folder-top">
                        <ul>
                            <Link to="/admin/students"><li className="selected-tab">Manage Students</li></Link>
                            <Link to="/admin/staff"><li>Manage Staff</li></Link>
                            <Link to="/admin/hours"><li>Hours and Scheduling</li></Link>
                            <Link to="/admin/settings"><li>Settings</li></Link>
                        </ul>
                    </div>
                    <div className="admin-folder-bottom">
                        <br/>
                        <br/>
                        <div>
                            <StudentForm />
                        </div>
                    </div> 
            </div>
        </div>
    )
}
