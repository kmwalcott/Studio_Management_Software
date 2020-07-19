import React from 'react'
import StaffForm from './StaffForm';

export default function NewStaff() {
    var action = `${process.env.REACT_APP_BASE_URL}/staff`;
    var name = '';
    var birthday = null;
    var email = '';
    var phone = '';

    return (
        <div>
            <StaffForm action={action} name={name} birthday={birthday} email={email} phone={phone}/>       
        </div>
    )
}
