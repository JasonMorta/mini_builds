import React from 'react';
import Button from 'react-bootstrap/Button';

//bootstrap reusable button
export default function BsButton(props) {
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
