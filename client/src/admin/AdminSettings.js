import React from 'react'
import Setting from './Setting';
import Container from 'react-bootstrap/Container';

export default function AdminSettings() {
    return (
        <div>              
            <Container>
                <Setting setting="event_type" title="Event Type"/>
                <Setting setting="location" title="Location"/>
                <Setting setting="teacher" title="Teacher"/>
                <Setting setting="instrument" title="Instrument"/>
            </Container>
        </div>
    )
}
