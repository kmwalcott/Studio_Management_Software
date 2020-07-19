import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import NewStudent from './NewStudent';
import EditStudent from './EditStudent';

export default function AdminStudents() {
    //States
    const [view, setView] = useState('menu');
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
    
    if(view === 'menu'){
        return (
            <div>   
                <ListGroup className="no-bullets">
                    <ListGroup.Item><Button onClick={()=> setView('add')}>Create New Student</Button></ListGroup.Item>
                    <ListGroup.Item><Button onClick={()=> setView('edit')}>Edit Student Info</Button></ListGroup.Item>
                    <ListGroup.Item><Button onClick={delete_student}>Delete Student</Button></ListGroup.Item>
                </ListGroup>
            </div>
        )
    }
    else if(view ==='add'){
        return (
            <div>   
                <Button onClick={()=> setView('menu')}>Back</Button>
                <NewStudent/>
            </div>
        )
    }
    else if(view ==='edit'){
        return (
            <div>   
                <Button onClick={()=> setView('menu')}>Back</Button>
                <EditStudent/>
            </div>
        )
    }

}
