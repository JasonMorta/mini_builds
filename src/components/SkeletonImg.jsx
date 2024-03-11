import React from 'react'
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonImg(width, height) {
  return (
    <Skeleton 
        variant="rectangular" 
        width={width} 
        height={height} />
  )
}
