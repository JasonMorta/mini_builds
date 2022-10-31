import React from 'react';
import "./boxes.css";

export default function Box(props) {
  return (

    <div 
      className="box"
      onClick={props.toggle}>
        {props.context}
        </div>
  )
}
