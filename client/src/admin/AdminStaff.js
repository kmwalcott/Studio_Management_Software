import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import NewStaff from './NewStaff';
import EditStaff from './EditStaff';

export default function AdminStaff() {
    //States
    const [view, setView] = useState('menu');

    //onclick function for delete Button
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
    
    if(view ==='menu'){
        return (
            <div>         
                <ListGroup className="no-bullets">
                    <ListGroup.Item><Button onClick={()=> setView('add')}>Create New Staff Member</Button></ListGroup.Item>
                    <ListGroup.Item><Button onClick={()=> setView('edit')}>Edit Staff Info</Button></ListGroup.Item>
                    <ListGroup.Item><Button onClick={delete_staff}>Delete Staff Member</Button></ListGroup.Item>
                </ListGroup> 
            </div>
        )
    }
    else if(view === 'add'){
        return (
            <div>         
                <Button onClick={()=> setView('menu')}>Back</Button>
                <NewStaff/>
            </div>
        )
    }
    else if(view === 'edit'){
        return (
            <div>         
                <Button onClick={()=> setView('menu')}>Back</Button>
                <EditStaff/>
            </div>
        )
    }
}
