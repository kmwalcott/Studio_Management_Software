import React, { useState, useEffect } from 'react';
import Table from './Table';

export default function StudentInfo() {
  //Create states
  const [queryResult, setQueryResult] = useState([]);

  //Effects
  function get_student_info() {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${process.env.REACT_APP_BASE_URL}/students/student-info-table`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          setQueryResult((JSON.parse(xhr.response)).result);
        }
      }

    }
    xhr.send();
  }

  useEffect(() => {
    get_student_info();
  }, []);

  //Process query result string
  console.log(queryResult);
  queryResult.forEach((student) => {
    delete student._id;
  })

  //Make columns and rows 
  var header = [];
  var header_renamed = [];
  var rows = [];
  if (typeof queryResult[0] == 'undefined') {
    header = ['student_name', 'parent_names', 'email', 'phone'];
  }
  else {
    header = Object.keys(queryResult[0]);
  }
  var student_name_index = header.indexOf('student_name');
  if (typeof header.indexOf('birthday') !== undefined) {
    var birthday_index = header.indexOf('birthday');
  }

  //Rename Columns
  header.forEach((column) => {
    var new_name = '';
    switch (column) {
      case 'student_name':
        new_name = 'Student Name'
        header_renamed.push(new_name);
        break;
      case 'birthday':
        new_name = 'Birthday'
        header_renamed.push(new_name);
        break;
      case 'gender':
        new_name = 'Gender'
        header_renamed.push(new_name);
        break;
      case 'status':
        new_name = 'Status'
        header_renamed.push(new_name);
        break;
      case 'makeups':
        new_name = 'Makeups'
        header_renamed.push(new_name);
        break;
      case 'email':
        new_name = 'Email'
        header_renamed.push(new_name);
        break;
      case 'phone':
        new_name = 'Phone'
        header_renamed.push(new_name);
        break;
      case 'parent_names':
        new_name = 'Parent Names'
        header_renamed.push(new_name);
        break;
      case 'duration':
        new_name = 'Lesson Duration'
        header_renamed.push(new_name);
        break;
      case 'day':
        new_name = 'Lesson Day'
        header_renamed.push(new_name);
        break;
      case 'time':
        new_name = 'Lesson Time'
        header_renamed.push(new_name);
        break;
      case 'instrument':
        new_name = 'Instrument'
        header_renamed.push(new_name);
        break;
      case 'location':
        new_name = 'Lesson Location'
        header_renamed.push(new_name);
        break;
      case 'teacher':
        new_name = 'Teacher'
        header_renamed.push(new_name);
        break;
      default:
    }
  })

  //Reorder columns
  header_renamed.splice(student_name_index, 1);
  header_renamed.unshift('Student Name');

  //Create, reorder rows 

  if (queryResult.length > 0) {
    queryResult.forEach((student) => {
      var row_data = Object.values(student);
      row_data.forEach((entry, index) => {
        if (Array.isArray(entry)) {
          var array_joined = entry.join(', ');
          row_data[index] = array_joined;
        }
      })
      if (typeof header.indexOf('birthday') !== undefined) {
        var birthday_date = new Date(row_data[birthday_index]);
        row_data[birthday_index] = `${birthday_date.getMonth()}/${birthday_date.getDate()}/${birthday_date.getFullYear()}`;
      }
      row_data.unshift(row_data[student_name_index]); //Reorder rows
      row_data.splice((student_name_index + 1), 1); //Reorder rows
      rows.push(row_data);
    })
  }
  else {
    rows = [['', '', '', '']];
  }

  
  if (queryResult.length > 0){
    return (
        <Table rows={rows} columns={header_renamed}/>
    )
  }
  else{
    return (
      <p>No results found.</p>
    )
  }
}





