import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import StaffForm from './StaffForm';

export default function EditStaff() {
    //States
    const [employees, setEmployees] = useState([]); //List of employee names in dropdown
    const [name, setName] = useState(''); //Information for a single employee. Used to populate form.
    const [birthday, setBirthday] = useState(null);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    //Effects
    useEffect(() => {
        get_staff();
      },[]);

    function get_staff(){
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${process.env.REACT_APP_BASE_URL}/staff`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    setEmployees(JSON.parse(xhr.response));
                }
            }
            
        }
        xhr.send();
   }

   //onChange function for dropdown. Auto populate form with existing student data.
   function auto_populate(){
        var name = document.getElementById("my_dropdown").value; 
        var toSend = {name: name};
        var jsonString = JSON.stringify(toSend);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_BASE_URL}/staff/staff-info-form`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    setName(JSON.parse(xhr.response)[0].name);
                    //Make birthday the right format
                    if(JSON.parse(xhr.response)[0].birthday === ''){
                        setBirthday('');
                    }
                    else{
                        var my_date = new Date(JSON.parse(xhr.response)[0].birthday);
                        var my_month = my_date.getMonth();
                        var my_day = my_date.getDate();
                        var my_year = my_date.getFullYear();
                        setBirthday(`${my_month}/${my_day}/${my_year}`);
                    }
                    setEmail(JSON.parse(xhr.response)[0].email);
                    setPhone(JSON.parse(xhr.response)[0].phone);
                }
            }
            
        }
        xhr.send(jsonString);
   }


    //Create staff dropdown  
    const staff_options = employees.map((my_employee)=>
    <option key={my_employee._id} value={my_employee.name}>{my_employee.name}</option>
    )

    //Form action  
    var action = `${process.env.REACT_APP_BASE_URL}/staff/update`;

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
                    <div className="centered-text">
                        <select id="my_dropdown" onChange={auto_populate}>
                            <option value="">--Choose Staff Member--</option>
                            {staff_options}
                        </select>
                    </div>
                    <StaffForm action={action} name={name} birthday={birthday} email={email} phone={phone}/>
                </div> 
            </div>
        </div>
    )

}

