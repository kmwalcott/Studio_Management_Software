import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Table from '../Table';

export default function GetHours() {
    //States
    const [initialDate, setInitialDate] = useState(null);
    const [finalDate, setFinalDate] = useState(null);
    const [view, setView] = useState('form');
    const [rows, setRows] = useState([]);
    
    //Columns prop
    let columns = ['Name', 'Total Hours'];

    //Calculate employee hours
    function calculate_hours(){
        var toSend = {initial_date: initialDate, final_date: finalDate};
        var jsonString = JSON.stringify(toSend);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_BASE_URL}/staff/calculate-hours`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    setRows(JSON.parse(xhr.response));
                    setInitialDate(null);
                    setFinalDate(null);
                    setView('show-hours');
                }
            }
        }
        xhr.send(jsonString);
    }

    if(initialDate !== null && finalDate !== null){
        calculate_hours();
    }

    if(view === 'form'){
        return (
            <div>
                <Container>
                    <Form>
                        <Form.Label htmlFor="initial_date">Initial Date: </Form.Label>
                        <DatePicker id="initial_date" name="initial_date" selected={initialDate} onChange={date =>setInitialDate(date)} />
                        <Form.Label htmlFor="final_date">Final Date: </Form.Label>
                        <DatePicker id="final_date" name="final_date" selected={finalDate} onChange={date =>setFinalDate(date)} />
                    </Form>
                </Container>
            </div>
        )
    }
    else {
        return (
            <div>
                <Container>
                    <Table rows={rows} columns={columns}/>
                </Container>
            </div>
        )
    }
}
