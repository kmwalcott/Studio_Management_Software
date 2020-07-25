import React from 'react'
import Table from '../Table';

export default function ShowHours(props) {
    return (
        <div>
            <Table rows={props.rows} columns={props.columns}/>
        </div>
    )
}
