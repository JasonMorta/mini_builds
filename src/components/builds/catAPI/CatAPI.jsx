import React, { useState } from "react";
// import { useContext } from "react";
// import { StateContext } from "../../../StateManager";
import "../../../loadingCSS.css";
import "./cat.css";
import { useQuery } from "react-query";
import StyledButton from "../../StyledButton";
import placeHolder from "./placeholder.png";

const fetchCat = async () => {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function CatAPI() {
  const [imageLoaded, setImageLoaded] = useState(false);

  console.log(`%c Cat component`, "color: #2196f3");
  const { isLoading, data, isError, refetch, isFetching } = useQuery(
    "catImage",
    fetchCat,
    {
      //cacheTime: 5000, //
      //staleTime: 60000, //determines how long data is considered fresh before a refetch is triggered in the background
    }
  );
  console.log("isLoading", isLoading);

  //if (isLoading ) return

  if (isError) return <div>{isError.message}</div>;

  function handleClick() {
    refetch();
  }

  async function handleImageLoaded() {
    //setImageLoaded(true);
  }

  return (
    <div className="cat_image_container">
      <h2>Random Cat API</h2>
      <img
        src={!isFetching ? data[0]?.url : placeHolder}
        alt={!isFetching ? data[0]?.id : 'none'}
        onLoad={handleImageLoaded}
      />
      <StyledButton type="secondary" text="Next" onclick={handleClick} />
    </div>
  );
}
