import React, { useState, useEffect } from "react";
// import { useContext } from "react";
// import { StateContext } from "../../../StateManager";
import "../../../loadingCSS.css";
import "./cat.css";
import StyledButton from "../../StyledButton";
import placeHolder from "./placeholder.png";
import { getCatImg } from "./APIcalls";
import {
  useQuery,
  useQueryClient,
} from 'react-query'

export default function CatAPI() {
  // Access the client
  const queryClient = useQueryClient()
  const [imgLoaded, setImgLoaded] = useState(true);
  const [btnText, setBtnText] = useState("Load");
  const [disableBtn, setDisableBtn] = useState(true);
  const prop = useQuery('randomCat', getCatImg)


  async function handleClick() {
    setBtnText("Loading...");
    setImgLoaded(true);
    setDisableBtn(true);
    queryClient.invalidateQueries('randomCat')
    prop.refetch()
    console.log('Start Img load', prop)
  }


  function handleImageComplete(e) {

    console.log('e.target.src', e.target.src)
  

    if (!e.target.src.includes('base64')) {
      setDisableBtn(false);
    }
    
    setBtnText("Load Next");
    setImgLoaded(false);
    console.log('Complete Img load', prop)
    
  }
  
  return (
    <div className="cat_image_container">
      <h2>Random Cat API</h2>
      {  <>
            {prop.data?.map((img, i) => (
              
              // imgLoaded ? 
              // <CircularProgress />
              // : 
                <>
                {prop.isFetching ?
                  <span>Fetching</span>
                  : prop.isError ?
                    <span>Error: {prop.error.message}</span>
                    :
                    <img
                      src={imgLoaded ? placeHolder : img.url}
                      alt="CatImage"
                      onLoad={handleImageComplete}
                    />}
                  <StyledButton
                    type="instagram"
                    text={btnText}
                    className="cat_button"
                    disabled={disableBtn}
                    onPress={handleClick} />
                </>
            ))}
        </>
      }
    </div>
  );

}
