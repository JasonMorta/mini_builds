import React from 'react'
import { useState } from 'react';

export default function FetchRequest(props) {
const [fecth, setFetch] = useState(props.fetch)

fetch("https://api.chucknorris.io/jokes/random")
  .then(response => response.json())
  .then(data => (setFetch(data)));

  return (
    <>
    </>
  )
}
