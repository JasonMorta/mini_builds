import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StateContext } from "../../../StateManager";
import "../../../loadingCSS.css";
import "./cat.css";

export default function CatAPI() {
  const value = useContext(StateContext);
  let [mainState, setMainState] = value;

  const [cat, setCat] = useState();
  const [catImg, setCatImg] = useState();
  let loadCats = [];

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((response) => response.json())
      .then((data) => {
        loadCats.push({ image: data[0].url, id: data[0].id });
        setCat(loadCats);
        //setMainState(loadCats);
        console.log(cat);
      });

    //console.log(mainState.catImage[0].image === undefined);
  }, []);

  return (
    <div className="cat_image_container">
      {cat === undefined ? (
        <div class="lds-dual-ring"></div>
      ) : (
        <img src={cat[0].image} alt={cat[0].id} />
      )}
    </div>
  );
}
