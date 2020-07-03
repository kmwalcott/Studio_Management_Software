import React from 'react'
import {Link} from 'react-router-dom';

export default function StudentForm() {
    //FIXME: Add back second email and phone?
    //States
    /*
    const [emailHidden, setEmailHidden] = useState(true);
    const [phoneHidden, setPhoneHidden] = useState(true);

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
            <input type="hidden" id="email2" name="email[2]"/>
            <br/>
        </div>
    }
    else{
        email2 = <div>
            <label htmlFor="email2">Email 2 (Optional): </label>
            <input type="email" id="email2" name="email[2]"/>
            <br/>
        </div>
    }
    if(phoneHidden === true){
        var phone2 = <div>
            <input type="hidden" id="phone2" name="phone[2]"/>
            <br/>
        </div>
    }
    else{
        phone2 = <div>
            <label htmlFor="phone2">Phone 2 (Optional): </label>
            <input type="text" id="phone2" name="phone[2]"/>
            <br/>
        </div>
    }
    */
    
    const new_student = `${process.env.REACT_APP_BASE_URL}/students`;

    return (
        <div>
            <form method="POST" action={new_student} className="admin-form">
                <label htmlFor="student_name">Student Name: </label>
                <input type="text" id="student_name" name="student_name" placeholder="e.g. John Doe" required/>
                <br/>
                <label htmlFor="parent1_name">Parent 1 Name: </label>
                <input type="text" id="parent1_name" name="parent_names[1]" required/>
                <br/>
                <label htmlFor="parent2_name">Parent 2 Name (Optional): </label>
                <input type="text" id="parent2_name" name="parent_names[2]"/>
                <br/>
                <label htmlFor="gender">Gender: </label>
                <select name="gender" id="gender" required>
                    <option value="">--Choose Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <br/>
                <label htmlFor="birthday">Birthday: </label>
                <input type="text" id="birthday" name="birthday" placeholder="MM/DD/YYYY" required/>
                <br/>
                <label htmlFor="email">Email (Optional): </label>
                <input type="email" id="email" name="email"/>
                <br/>
                <label htmlFor="phone">Phone Number (Optional): </label>
                <input type="text" id="phone" name="phone"/>
                <br/>
                <label htmlFor="status">Status: </label>
                <select name="status" id="status" required>
                    <option value="">--Choose Status--</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <br/>
                <label htmlFor="referrer">Referrer (Optional): </label>
                <input type="text" id="referrer" name="referrer"/>
                <br/>
                <label htmlFor="notes">Notes (Optional): </label>
                <textarea name="notes" id="notes"></textarea>
                <br/>
                <button type="submit">Submit</button>
                <Link to="/admin/students"><button type="button">Cancel</button></Link>
            </form>
        </div>
    )
}
