import React from 'react'
import { useState } from 'react'

export default function Counter(props) {

 const [selectCounter, setSelectCounter] = useState(0)


  return (
    <p className='select-counter'>You score: {selectCounter}</p>
  )
}
