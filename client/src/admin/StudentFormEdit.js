import React from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function StudentFormEdit(props) {
    var student_name = props.student_name;
    var parent1_name = props.parent_names[0];
    var parent2_name = props.parent_names[1];
    var gender = props.gender;
    var birthday = props.birthday;
    var my_email = props.email;
    var my_phone = props.phone;
    var status = props.status;
    var referrer = props.referrer;
    var notes = props.notes;
    var makeups = props.makeups;

    //FIXME: Add back second email and phone?
    //States
    //const [emailHidden, setEmailHidden] = useState(true);
    //const [phoneHidden, setPhoneHidden] = useState(true);

    /*
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
            <Form.Control type="hidden" id="email2" name="email[2]" defaultValue={my_email2}/>
            
        </div>
    }
    else{
        email2 = <div>
            <Form.Label htmlFor="email2">Email 2 (Optional): </Form.Label>
            <Form.Control type="email" id="email2" name="email[2]" defaultValue={my_email2}/>
            
        </div>
    }
    if(phoneHidden === true){
        var phone2 = <div>
            <Form.Control type="hidden" id="phone2" name="phone[2]" defaultValue={my_phone2}/>
            
        </div>
    }
    else{
        phone2 = <div>
            <Form.Label htmlFor="phone2">Phone 2 (Optional): </Form.Label>
            <Form.Control type="text" id="phone2" name="phone[2]" defaultValue={my_phone2}/>
            
        </div>
    }
    */
    
    const edit_student = `${process.env.REACT_APP_BASE_URL}/students/update`;
    
    return (
        <div>
            <Container>
            <Form method="POST" action={edit_student}>
                <Form.Group>
                    <Form.Label htmlFor="student_name">Student Name: </Form.Label>
                    <Form.Control type="text" id="student_name" name="student_name" placeholder="e.g. John Doe" required defaultValue={student_name}/>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label htmlFor="parent1_name">Parent 1 Name: </Form.Label>
                    <Form.Control type="text" id="parent1_name" name="parent_names[1]" required defaultValue={parent1_name}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="parent2_name">Parent 2 Name (Optional): </Form.Label>
                    <Form.Control type="text" id="parent2_name" name="parent_names[2]" defaultValue={parent2_name}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="gender">Gender: </Form.Label>
                    <Form.Control as="select" name="gender" id="gender" required>
                        <option value="">--Choose Gender--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label htmlFor="birthday">Birthday: </Form.Label>
                    <Form.Control type="text" id="birthday" name="birthday" placeholder="MM/DD/YYYY" required defaultValue={birthday}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="email">Email (Optional): </Form.Label>
                    <Form.Control type="email" id="email" name="email" defaultValue={my_email}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="phone">Phone (Optional): </Form.Label>
                    <Form.Control type="text" id="phone" name="phone" defaultValue={my_phone}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="status">Status: </Form.Label>
                    <Form.Control as="select" name="status" id="status" required>
                        <option value="">--Choose Status--</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label htmlFor="referrer">Referrer (Optional): </Form.Label>
                    <Form.Control type="text" id="referrer" name="referrer" defaultValue={referrer}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="notes">Notes (Optional): </Form.Label>
                    <Form.Control as="textarea" name="notes" id="notes" defaultValue={notes}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="makeups">Number of Makeups: </Form.Label>
                    <Form.Control as="select" name="makeups" id="makeups" required>
                        <option value="">--Choose number--</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </Form.Control>
                </Form.Group>
                
                <Button type="submit">Submit</Button>
            </Form>
            </Container>
        </div>
    )
}
