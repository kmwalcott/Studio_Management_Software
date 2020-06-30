import React from 'react'
import {Link} from 'react-router-dom';


export default function AdminStudents() {
    //onclick function for delete button
    function delete_student(){
        var name = prompt('Enter full name of student to delete.'); 
        var toSend = {name: name};
        var jsonString = JSON.stringify(toSend);
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `${process.env.REACT_APP_BASE_URL}/students`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){ 
                    alert(`Student ${name} has been deleted.`);
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
                            <Link to="/admin/students"><li className="selected-tab">Manage Students</li></Link>
                            <Link to="/admin/staff"><li>Manage Staff</li></Link>
                            <Link to="/admin/hours"><li>Hours and Scheduling</li></Link>
                            <Link to="/admin/settings"><li>Settings</li></Link>
                        </ul>
                    </div>
                    <div className="admin-folder-bottom">
                        <br/>
                        <br/>
                        <ul>
                            <li><Link to="/admin/students/new-student"><button className="margin30">Create New Student</button></Link></li>
                            <li><Link to="/admin/students/edit-student"><button className="margin30">Edit Student Info</button></Link></li>
                            <li><button className="margin30" onClick={delete_student}>Delete Student</button></li>
                        </ul>
                    </div> 
                </div>
            </div>
        )
}