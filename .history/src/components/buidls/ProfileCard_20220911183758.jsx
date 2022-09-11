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
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
      molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
      numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
      optio.</p>
    </div>
   </div>
  )
}
