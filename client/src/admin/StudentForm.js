import React from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function StudentForm() {
    //FIXME: Add back second email and phone?
    //States
    /*
    const [emailHidden, setEmailHidden] = useState(true);
    const [phoneHidden, setPhoneHidden] = useState(true);

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
            <Form.Control type="hidden" id="email2" name="email[2]"/>
            <br/>
        </div>
    }
    else{
        email2 = <div>
            <Form.Label htmlFor="email2">Email 2 (Optional): </Form.Label>
            <Form.Control type="email" id="email2" name="email[2]"/>
            <br/>
        </div>
    }
    if(phoneHidden === true){
        var phone2 = <div>
            <Form.Control type="hidden" id="phone2" name="phone[2]"/>
            <br/>
        </div>
    }
    else{
        phone2 = <div>
            <Form.Label htmlFor="phone2">Phone 2 (Optional): </Form.Label>
            <Form.Control type="text" id="phone2" name="phone[2]"/>
            <br/>
        </div>
    }
    */
    
    const new_student = `${process.env.REACT_APP_BASE_URL}/students`;

    return (
        <div>
            <Container>
            <Form method="POST" action={new_student}>
                <Form.Group>
                    <Form.Label htmlFor="student_name">Student Name: </Form.Label>
                    <Form.Control type="text" id="student_name" name="student_name" placeholder="e.g. John Doe" required/>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label htmlFor="parent1_name">Parent 1 Name: </Form.Label>
                    <Form.Control type="text" id="parent1_name" name="parent_names[1]" required/>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label htmlFor="parent2_name">Parent 2 Name (Optional): </Form.Label>
                    <Form.Control type="text" id="parent2_name" name="parent_names[2]"/>
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
                    <Form.Control type="text" id="birthday" name="birthday" placeholder="MM/DD/YYYY" required/>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label htmlFor="email">Email (Optional): </Form.Label>
                    <Form.Control type="email" id="email" name="email"/>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label htmlFor="phone">Phone Number (Optional): </Form.Label>
                    <Form.Control type="text" id="phone" name="phone"/>
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
                    <Form.Control type="text" id="referrer" name="referrer"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="notes">Notes (Optional): </Form.Label>
                    <Form.Control as="textarea" name="notes" id="notes"></Form.Control>
                </Form.Group>

                <Button type="submit">Submit</Button>
            </Form>
            </Container>
        </div>
    )
}
