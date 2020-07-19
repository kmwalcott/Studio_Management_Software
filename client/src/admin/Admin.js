import React from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import AdminStudents from './AdminStudents';
import AdminStaff from './AdminStaff';
import AdminHours from './AdminHours';
import AdminSettings from './AdminSettings';

export default function Admin() {
    return (
        <div>
            <Tabs defaultActiveKey="students">
                    <Tab eventKey="students" title="Students">
                        <AdminStudents/>
                    </Tab>
                    <Tab eventKey="staff" title="Staff">
                        <AdminStaff/>
                    </Tab>
                    <Tab eventKey="events" title="Hours and Scheduling">
                        <AdminHours/>
                    </Tab>
                    <Tab eventKey="settings" title="Settings">
                        <AdminSettings/>
                    </Tab>
                </Tabs>
        </div>
    )
}
