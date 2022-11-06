import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function FontDrop_down(props) {



  return (
    <DropdownButton id="dropdown-basic-button" title="Font">
    <Dropdown.Item onClick={props.handleClick}>Action</Dropdown.Item>
    <Dropdown.Item onClick={props.handleClick}>Another action</Dropdown.Item>
    <Dropdown.Item onClick={props.handleClick}>Something else</Dropdown.Item>
  </DropdownButton>
  )
}
