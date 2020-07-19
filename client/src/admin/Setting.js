import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

export default function Setting(props) {
    const [view, setView] = useState('default');
    var setting_title = props.title;
    var setting_db = props.setting;

    function add_view(){
        setView('add');
    }
    function drop_view(){
        setView('drop');
    }
    function default_view(){
        setView('default');
    }

    if(view === 'default'){
        return (
            <div>
                <p>{setting_title}</p>
                <ButtonGroup>
                    <Button onClick={add_view}>Add</Button>
                    <Button onClick={drop_view}>Drop</Button>
                </ButtonGroup>
            </div>
        )
    }
    
    else if(view === 'add'){
        var action = `${process.env.REACT_APP_BASE_URL}/settings/add-setting`;
        return (
            <div>
                <Form method="POST" action={action}>
                    <Form.Label> Add {setting_title}: </Form.Label>
                    <Form.Control type="text" size="30" name="value" placeholder="Enter what you'd like to add"/>
                    <Form.Control type="hidden" name="setting" value={setting_db}/>
                    <ButtonGroup>
                        <Button type="submit">Submit</Button>
                        <Button onClick={default_view}>Cancel</Button>
                    </ButtonGroup>
                </Form>
                
            </div>
        )
    }

    else{
        action = `${process.env.REACT_APP_BASE_URL}/settings/drop-setting`;
        return (
            <div>
                <Form method="POST" action={action}>
                    <Form.Label> Drop {setting_title}: </Form.Label>
                    <Form.Control type="text" size="30" name="value" placeholder="Enter what you'd like to drop"/>
                    <Form.Control type="hidden" name="setting" value={setting_db}/>
                    <ButtonGroup>
                        <Button type="submit">Submit</Button>
                        <Button onClick={default_view}>Cancel</Button>
                    </ButtonGroup>
                </Form>
            </div>
        )
    }
}
