import React, { useEffect, useState } from 'react'

export default function TypeFilter() {

    const [typesArray, setTypesArray] = useState()


    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/type')
        .then(response => response.json())
        .then(data => {
          const typesList = data.results;
      
          // loop through the list and print out the names of the types
          typesList.forEach(type => {
            console.log(type.name);
          });
        });
    }, [third])
    

  return (
    <div>TypeFilter</div>
  )
}
