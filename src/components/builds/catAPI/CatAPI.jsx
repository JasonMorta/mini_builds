import React, { useEffect, useState } from "react";
// import { useContext } from "react";
// import { StateContext } from "../../../StateManager";
import "../../../loadingCSS.css";
import "./cat.css";
import { useQuery, QueryClient } from 'react-query';
import StyledButton from "../../StyledButton";



const fetchCat = async () => {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


export default function CatAPI() {
  console.log(`%c Cat component`, 'color: #2196f3')
  const { isLoading, data, isError, refetch, isFetching } = useQuery('catImage', fetchCat,
  {
    cacheTime: 5000,
  });
  console.log('isFetching', isFetching)
  console.count('data')
  if (isLoading) return <div>Loading...</div>;
  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;

  function handleClick(){
    refetch()
  }

  function handleImageLoaded(){
    console.log(`%c LOADED DONE`, 'color: #2196f3')
  }


  return (
   
    <div className="cat_image_container">
    <h2>Kitty</h2>
    <img 
    src={data[0].url} 
    alt={data[0].id}
    onLoad={handleImageLoaded}
     />
    < StyledButton 
    type='secondary'
    text='Next'
    onclick={handleClick}
     />
    </div>
 
  );
}
