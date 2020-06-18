import React from 'react'
import {Link} from 'react-router-dom';
import StaffForm from './StaffForm';

export default function NewStaff() {
    var action = `${process.env.REACT_APP_BASE_URL}/staff`;
    var name = '';
    var birthday = null;
    var email = '';
    var phone = '';

    return (
        <div>
                <div className="admin-folder">
                    <div className="admin-folder-top">
                        <ul>
                            <Link to="/admin/students"><li>Manage Students</li></Link>
                            <Link to="/admin/staff"><li className="selected-tab">Manage Staff</li></Link>
                            <Link to="/admin/hours"><li>Hours and Scheduling</li></Link>
                            <Link to="/admin/settings"><li>Settings</li></Link>
                        </ul>
                    </div>
                    <div className="admin-folder-bottom">
                        <br/>
                        <br/>
                        <StaffForm action={action} name={name} birthday={birthday} email={email} phone={phone}/>   
                    </div> 
                </div>
        </div>
    )
}
