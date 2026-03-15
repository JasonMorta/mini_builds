import React, { useState } from "react";
import styles from "./CatAPI.module.css";
import StyledButton from "../../StyledButton";
import placeHolder from "./placeholder.png";
import { getCatImg } from "./APIcalls";
import { useQuery, useQueryClient } from 'react-query';

export default function CatAPI() {
  const queryClient = useQueryClient();
  const [imgLoaded, setImgLoaded] = useState(true);
  const [btnText, setBtnText] = useState("Load");
  const [disableBtn, setDisableBtn] = useState(true);
  const catQuery = useQuery('randomCat', getCatImg);

  async function handleClick() {
    setBtnText("Loading...");
    setImgLoaded(true);
    setDisableBtn(true);
    queryClient.invalidateQueries('randomCat');
    catQuery.refetch();
  }

  function handleImageComplete(event) {
    if (!event.target.src.includes('base64')) {
      setDisableBtn(false);
    }

    setBtnText("Load next");
    setImgLoaded(false);
  }

  return (
    <div className={styles.catImageContainer}>
      <div className={styles.catHeading}>
        <p>Gallery</p>
        <h2>Random Cat API</h2>
      </div>

      {catQuery.data?.map((img) => (
        <React.Fragment key={img.id || img.url}>
          {catQuery.isFetching ? (
            <span>Fetching</span>
          ) : catQuery.isError ? (
            <span>Error: {catQuery.error.message}</span>
          ) : (
            <img
              src={imgLoaded ? placeHolder : img.url}
              alt="Cat"
              onLoad={handleImageComplete}
            />
          )}
        </React.Fragment>
      ))}

      <StyledButton
        type="instagram"
        text={btnText}
        className={styles.catButton}
        disabled={disableBtn}
        onPress={handleClick}
      />
    </div>
  );
}
