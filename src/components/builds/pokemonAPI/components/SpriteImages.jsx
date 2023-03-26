import React from 'react'




export default function SpriteImages() {
    const images = require.context('./sprites', false, /\.(png|jpe?g|svg)$/);
    console.log('images: ',images)
  
  return (
    <div> 
        {images.keys().map((imageName, index) => (
       <>
                
            <img src={`./sprites/`+ imageName.slice(2)} alt={imageName.slice(2)} key={index} />
    
          
       </>))}
    </div>
  )
}
