import React from 'react'

export default function Table(props) {
    var rows_in_td = [];
    props.rows.forEach((row)=>{
        var row_in_td = row.map((entry, index)=>
        <td key={index}>{entry}</td>
        )
        
        rows_in_td.push(row_in_td);
        
    })
    var table_body = rows_in_td.map((entry2, index)=>
    <tr key={index}>{entry2}</tr>
    );

    var my_columns = props.columns.map((column, index)=>
    <td key={index}>{column}</td>
    );

    return (
            <div>
            <table>
            <thead>
                <tr>
                {my_columns}
                </tr>
            </thead>
            <tbody>
                {table_body}
            </tbody>
            </table>
            </div>
    )
}
