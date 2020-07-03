import React from 'react'
import {Link} from 'react-router-dom';

export default function StaffForm(props) {
    var action = props.action;
    var name = props.name;
    var birthday = props.birthday;
    var email = props.email;
    var phone = props.phone;
    
    return (
        <div>
            <form method="POST" action={action} className="admin-form">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" placeholder="e.g. John Doe" required defaultValue={name}/>
                <br/>
                <label htmlFor="birthday">Birthday: </label>
                <input type="text" id="birthday" name="birthday" placeholder="MM/DD/YYYY" required defaultValue={birthday}/>
                <br/>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" required defaultValue={email}/>
                <br/>
                <label htmlFor="phone">Phone: </label>
                <input type="text" name="phone" id="phone" required defaultValue={phone}/>
                <br/>
                <button type="submit">Submit</button>
                <Link to="/admin/staff"><button type="button">Cancel</button></Link>
            </form>
        </div>
    )
}
