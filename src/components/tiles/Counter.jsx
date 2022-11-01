import React from 'react';
import { useEffect, useState } from 'react';


export default function Counter(props) {

const [score, setScore] = useState(props.scores)
console.log('score', score)



  return (
    <p className='select-counter'>You score: {score}</p>
  )
}
