import React from 'react';
import "./ProfileCard.css";
import placeH from '../../static/images/imagePlaceHolder.png'

export default function ProfileCard() {
  return (
   <div className="card">
    <div className="cardImage">
     <img src={placeH} alt="Avatar" />
    </div>
    <div className="container">
     <h2><b>John Doe</b></h2>
     <p>Lorem ipsum dolor sit</p>
    </div>
   </div>
  )
}
