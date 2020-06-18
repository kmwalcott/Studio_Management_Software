import React, {useState} from 'react'

export default function Setting(props) {
    const [view, setView] = useState('default');
    var setting_title = props.title;
    var setting_db = props.setting;

    var button_color = {
        backgroundColor: 'orange' 
    }

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
                <button style={button_color} onClick={add_view}>Add</button>
                <button style={button_color} onClick={drop_view}>Drop</button>
            </div>
        )
    }
    
    else if(view === 'add'){
        var action = `${process.env.REACT_APP_BASE_URL}/settings/add-setting`;
        return (
            <div>
                <p> Add {setting_title}: </p>
                <form method="POST" action={action}>
                    <input type="text" size="30" name="value" placeholder="Enter what you'd like to add"/>
                    <input type="hidden" name="setting" value={setting_db}/>
                    <button style={button_color} type="submit">Submit</button>
                </form>
                <button style={button_color} onClick={default_view}>Cancel</button>
            </div>
        )
    }

    else{
        action = `${process.env.REACT_APP_BASE_URL}/settings/drop-setting`;
        return (
            <div>
                 <p> Drop {setting_title}: </p>
                <form method="POST" action={action}>
                    <input type="text" size="30" name="value" placeholder="Enter what you'd like to drop"/>
                    <input type="hidden" name="setting" value={setting_db}/>
                    <button style={button_color} type="submit">Submit</button>
                </form>
                <button style={button_color} onClick={default_view}>Cancel</button>
            </div>
        )
    }
}
