import React from 'react'
import {Link} from 'react-router-dom';

export default function AdminStaff() {
    //onclick function for delete button
    
    function delete_staff(){
        var name = prompt('Enter full name of staff member to delete.'); 
        var toSend = {name: name};
        var jsonString = JSON.stringify(toSend);
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `${process.env.REACT_APP_BASE_URL}/staff`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){ 
                    
                }
            }
            
        }
        xhr.send(jsonString);  
    }
    
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
                    <ul>
                        <li><Link to="/admin/staff/new-staff"><button className="margin30">Create New Staff Member</button></Link></li>
                        <li><Link to="/admin/staff/edit-staff"><button className="margin30">Edit Staff Info</button></Link></li>
                        <li><button className="margin30" onClick={delete_staff}>Delete Staff Member</button></li>
                    </ul>
                </div> 
            </div>
        </div>
    )
}
