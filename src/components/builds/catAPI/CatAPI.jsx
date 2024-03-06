import React, { useState, useEffect } from "react";
// import { useContext } from "react";
// import { StateContext } from "../../../StateManager";
import "../../../loadingCSS.css";
import "./cat.css";
import StyledButton from "../../StyledButton";
import placeHolder from "./placeholder.png";
import Skeleton from '@mui/material/Skeleton';
import { getCatImg } from "./APIcalls";

export default function CatAPI() {
  const [imgURL, setImgURL] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [btnText, setBtnText] = useState("Load");

  async function handleClick() {
    setImgURL([]);
    setIsFetching(true);
    setImgLoaded(true);
    console.log("Fetching");
  }

  useEffect(() => {
    async function handleImageLoaded() {
      if (isFetching) {
        try {
          const data = await getCatImg();
          console.log("data", data);
          setImgURL(data[0]);
        } catch (error) {
          console.error(error);
        }
      }
    }
    handleImageLoaded();
  }, [isFetching]);

  function handleImageComplete(e) {
    
    console.log('e', e)
    if (imgURL.url) {
      setIsFetching(false)
      setBtnText("Load Next");
      setImgLoaded(false);
    }
 
  }
  return (
    <div className="cat_image_container">
      <h2>Random Cat API</h2>
      {imgURL.url ? <img
        src={!imgLoaded ? imgURL.url : placeHolder}
        alt="CatImage"
        onLoad={handleImageComplete}
      />
      :
      <Skeleton
      animation="wave"
      height={500}
      width="80%"
      style={{position: "relative"}}
    />}
      <StyledButton 
        type="instagram" 
        text={btnText}
        className="cat_button"
        disabled={imgLoaded}
        onPress={handleClick} />
    </div>
  );
}
