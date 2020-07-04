import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import StudentFormEdit from './StudentFormEdit';

export default function EditStudent() {
    //States
    const [students, setStudents] = useState([]); //List of student names in dropdown
    const [student_name, setStudentName] = useState(''); //Information for a single student. Used to populate form.
    const [parent_names, setParentNames] = useState([]);
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');
    const [makeups, setMakeups] = useState(0);
    const [notes, setNotes]= useState('');
    const [referrer, setReferrer] = useState('');

    //Effects
    useEffect(() => {
        get_students();
      },[]);

    function get_students(){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${process.env.REACT_APP_BASE_URL}/students`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    setStudents(JSON.parse(xhr.response));
                }
            }
            
        }
        xhr.send();
   }

    //onChange function for dropdown. Auto populate form with existing student data.
    function auto_populate(){
        var student_name = document.getElementById("my_dropdown").value; 
        var toSend = {student_name: student_name};
        var jsonString = JSON.stringify(toSend);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_BASE_URL}/students/student-info-form`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    var student_js = JSON.parse(xhr.response)[0];
                    setStudentName(student_js.student_name);
                    setParentNames(student_js.parent_names);
                    setGender(student_js.gender);
                    //Make birthday the right format
                    if(student_js.birthday === ''){
                        setBirthday('');
                    }
                    else{
                        var my_date = new Date(student_js.birthday);
                        var my_month = my_date.getMonth();
                        var my_day = my_date.getDate();
                        var my_year = my_date.getFullYear();
                        setBirthday(`${my_month}/${my_day}/${my_year}`);
                    }
                    setEmail(student_js.email);
                    setPhone(student_js.phone);
                    setStatus(student_js.status);
                    setMakeups(student_js.makeups);
                    setNotes(student_js.notes);
                    setReferrer(student_js.referrer);
                }
            }
            
        }
        xhr.send(jsonString);
   }


    //Create student dropdown  
   const student_options = students.map((my_student)=>
    <option key={my_student._id} value={my_student.student_name}>{my_student.student_name}</option>
    )

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
                        <div className="centered-text">
                            <select id="my_dropdown" onChange={auto_populate}>
                                <option value="">--Choose Student--</option>
                                {student_options}
                            </select>
                        </div>
                        <StudentFormEdit student_name={student_name} parent_names={parent_names} gender={gender} birthday={birthday} email={email} phone={phone} status={status} makeups={makeups} notes={notes} referrer={referrer}/>
                    </div>
                </div> 
            </div>
        </div>
    )
}
