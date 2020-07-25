import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import NewEvent from './NewEvent';
import NewEvents from './NewEvents';
import EditEvents from './EditEvents';
import DeleteEvents from './DeleteEvents';
import GetHours from './GetHours';

export default function AdminHours() {
    //States
    const [view, setView] = useState('menu');

    if(view === 'menu'){
        return (
            <div>              
                <ListGroup className="no-bullets">
                    <ListGroup.Item><Button onClick={()=> setView('add-one')}>Create One-Time Event</Button></ListGroup.Item>
                    <ListGroup.Item><Button onClick={()=> setView('add-many')}>Create Weekly Event</Button></ListGroup.Item>
                    <ListGroup.Item><Button onClick={()=> setView('edit')}>Edit Events</Button></ListGroup.Item>
                    <ListGroup.Item><Button onClick={()=> setView('delete')}>Delete Events</Button></ListGroup.Item>
                    <ListGroup.Item><Button onClick={()=> setView('get-hours')}>Get Employee Hours</Button></ListGroup.Item>
                </ListGroup>        
            </div>
        )
    }
    else if(view === 'add-one'){
        return (
            <div>              
                <Button onClick={()=> setView('menu')}>Back</Button>
                <NewEvent/>   
            </div>
        )
    }
    else if(view === 'add-many'){
        return (
            <div>              
                <Button onClick={()=> setView('menu')}>Back</Button>
                <NewEvents/>
            </div>
        )
    }
    else if(view === 'edit'){
        return (
            <div>              
                <Button onClick={()=> setView('menu')}>Back</Button>
                <EditEvents/>
            </div>
        )
    }
    else if(view === 'delete'){
        return (
            <div>              
                <Button onClick={()=> setView('menu')}>Back</Button>
                <DeleteEvents/>
            </div>
        )
    }
    else if(view === 'get-hours'){
        return (
            <div>              
                <Button onClick={()=> setView('menu')}>Back</Button>
                <GetHours/>
            </div>
        )
    }
}
