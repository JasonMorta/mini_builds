import React from 'react'

export default function BoxAware(props) {
  return (

      <div
        className='box'
        onClick={props.handleClick}
        >
        {props.context}
        </div>

  )
}
