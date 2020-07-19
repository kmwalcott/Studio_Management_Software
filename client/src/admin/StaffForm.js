import React from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function StaffForm(props) {
    var action = props.action;
    var name = props.name;
    var birthday = props.birthday;
    var email = props.email;
    var phone = props.phone;
    
    return (
        <div>
            <Container>
            <Form method="POST" action={action}>
                <Form.Group>
                    <Form.Label htmlFor="name">Name: </Form.Label>
                    <Form.Control type="text" name="name" id="name" placeholder="e.g. John Doe" required defaultValue={name}/>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label htmlFor="birthday">Birthday: </Form.Label>
                    <Form.Control type="text" id="birthday" name="birthday" placeholder="MM/DD/YYYY" required defaultValue={birthday}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="email">Email: </Form.Label>
                    <Form.Control type="email" name="email" id="email" required defaultValue={email}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="phone">Phone: </Form.Label>
                    <Form.Control type="text" name="phone" id="phone" required defaultValue={phone}/>
                </Form.Group>

                <Button type="submit">Submit</Button>
            </Form>
            </Container>
        </div>
    )
}
