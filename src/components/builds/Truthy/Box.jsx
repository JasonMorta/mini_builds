import React from 'react';
import "./boxes.css";

export default function Box(props) {
  return (
    <div
        style={{ color: props.textColor }}
        className="box"
        onClick={props.handleClick} >
        {props.context}
    </div>
  );
}
