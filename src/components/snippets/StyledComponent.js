import React from 'react'
import styled from "styled-components";

export default function showroom() {
  
  const H3 = styled.h3`
    font-weight: bold;
    &:before {
      content: "Hello world";
      width: 100%;
      animation: example 1s ease-out;
    }
    @keyframes example {
      from {
        width: 0%;
      }
      to {
        width: 100%;
      }
    }`
  return (<H3 className="h3Style">Styled Element</H3>)
}
