import React from 'react'
import {Link} from 'react-router-dom';

export default function StudentFormEdit(props) {
    var student_name = props.student_name;
    var parent1_name = props.parent_names[0];
    var parent2_name = props.parent_names[1];
    var gender = props.gender;
    var birthday = props.birthday;
    var my_email = props.email;
    var my_phone = props.phone;
    var status = props.status;
    var referrer = props.referrer;
    var notes = props.notes;
    var makeups = props.makeups;

    //FIXME: Add back second email and phone?
    //States
    //const [emailHidden, setEmailHidden] = useState(true);
    //const [phoneHidden, setPhoneHidden] = useState(true);

    /*
    //toggle 2nd email visibility
    function toggle_email(){
        setEmailHidden(!emailHidden);
    }

    //toggle 2nd phone visibility
    function toggle_phone(){
        setPhoneHidden(!phoneHidden);
    }

    if(emailHidden === true){
        var email2 = <div>
            <input type="hidden" id="email2" name="email[2]" defaultValue={my_email2}/>
            <br/>
        </div>
    }
    else{
        email2 = <div>
            <label htmlFor="email2">Email 2 (Optional): </label>
            <input type="email" id="email2" name="email[2]" defaultValue={my_email2}/>
            <br/>
        </div>
    }
    if(phoneHidden === true){
        var phone2 = <div>
            <input type="hidden" id="phone2" name="phone[2]" defaultValue={my_phone2}/>
            <br/>
        </div>
    }
    else{
        phone2 = <div>
            <label htmlFor="phone2">Phone 2 (Optional): </label>
            <input type="text" id="phone2" name="phone[2]" defaultValue={my_phone2}/>
            <br/>
        </div>
    }
    */
    
    const edit_student = `${process.env.REACT_APP_BASE_URL}/students/update`;

    return (
        <div>
            <form method="POST" action={edit_student} className="admin-form">
                <label htmlFor="student_name">Student Name: </label>
                <input type="text" id="student_name" name="student_name" placeholder="e.g. John Doe" required defaultValue={student_name}/>
                <br/>
                <label htmlFor="parent1_name">Parent 1 Name: </label>
                <input type="text" id="parent1_name" name="parent_names[1]" required defaultValue={parent1_name}/>
                <br/>
                <label htmlFor="parent2_name">Parent 2 Name (Optional): </label>
                <input type="text" id="parent2_name" name="parent_names[2]" defaultValue={parent2_name}/>
                <br/>
                <label htmlFor="gender">Gender: </label>
                <select name="gender" id="gender" required defaultValue={gender}>
                    <option value="">--Choose Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <br/>
                <label htmlFor="birthday">Birthday: </label>
                <input type="text" id="birthday" name="birthday" placeholder="MM/DD/YYYY" required defaultValue={birthday}/>
                <br/>
                <label htmlFor="email">Email (Optional): </label>
                <input type="email" id="email" name="email" defaultValue={my_email}/>
                <br/>
                <label htmlFor="phone">Phone (Optional): </label>
                <input type="text" id="phone" name="phone" defaultValue={my_phone}/>
                <br/>
                <label htmlFor="status">Status: </label>
                <select name="status" id="status" required defaultValue={status}>
                    <option value="">--Choose Status--</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <br/>
                <label htmlFor="referrer">Referrer (Optional): </label>
                <input type="text" id="referrer" name="referrer" defaultValue={referrer}/>
                <br/>
                <label htmlFor="notes">Notes (Optional): </label>
                <textarea name="notes" id="notes" defaultValue={notes}></textarea>
                <br/>
                <label htmlFor="makeups">Number of Makeups: </label>
                <select name="makeups" id="makeups" required defaultValue={makeups}>
                    <option value="">--Choose number--</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <br/>
                <button type="submit">Submit</button>
                <Link to="/admin/students"><button type="button">Cancel</button></Link>
            </form>
        </div>
    )
}
