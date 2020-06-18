import React from 'react'

export default function Pagination(props){
    const page_numbers = [];
    for(let i=1; i <= Math.ceil(props.totalEvents/props.eventsPerPage);i++){
        page_numbers.push(i);
    }

    return (
        <div>
            <nav>
                <ul>
                    {page_numbers.map(number=>
                        <li key={number}><a onClick={()=> props.paginate(number)}>{number}</a></li>
                    )}
                </ul>
            </nav>
        </div>
    )
}
