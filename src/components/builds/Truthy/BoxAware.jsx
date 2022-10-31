import React from 'react'

export default function BoxAware(props) {
  return (

      <div
      style={{color: props.textColor}}
        className='box'
        onClick={props.handleClick}
        >
        {props.context}
        </div>

  )
}
