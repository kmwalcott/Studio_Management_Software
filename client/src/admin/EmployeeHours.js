import React, {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EmployeeHours() {
    //States
    const [initialDate, setInitialDate] = useState(null);
    const [finalDate, setFinalDate] = useState(null);
    const [employees, setEmployees] = useState([]); //List of employee names in dropdown

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
     
    
    return (
        <div>
            <select>
                <option value="">--Choose Employee--</option>
            </select>
            <label htmlFor="initial_date">Initial Date: </label>
            <DatePicker id="initial_date" name="initial_date" selected={initialDate} onChange={date =>setInitialDate(date)} />
            <label htmlFor="final_date">Final Date: </label>
            <DatePicker id="final_date" name="final_date" selected={finalDate} onChange={date =>setFinalDate(date)} />
        </div>
    )
}
