import React from 'react';
import Button from 'react-bootstrap/Button';

export default function BS_Button(props) {
  return (
    <>
    <Button 
    className={props.className}
    variant={props.variant}
    onClick={props.handleClick}
    >
      {props.text}
    </Button>
    </>
  )
}
