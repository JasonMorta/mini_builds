import React from 'react'
import Skeleton from '@mui/material/Skeleton';

export default function CardSkeleton() {
  return (
    <div className="pokeCard-container">
            {/* <Skeleton
              variant="h3"
              width="100%"
              height="50px"
              style={{ margin: "10px 0px 10px" }}
            /> */}
            <Skeleton
              variant="rectangular"
              width="475px"
              height="475px"
              style={{ margin: "10px 0px 10px" }}
            ></Skeleton>
           
            {/* <Skeleton
              variant="h3"
              width="100%"
              height="68px"
              style={{ margin: "10px 0px 10px" }}
            /> */}
          </div>
  )
}
