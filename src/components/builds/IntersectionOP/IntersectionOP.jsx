import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import "./IOP.css"
//import TextSample from './TextSample';

export default function IntersectionOP() {

    const [isVis, setIsVis] = useState()
    const {ref: section3, inView: isVis3} = useInView({threshold: 0.4,});
    const {ref: section1, inView: isVis1,} = useInView({threshold: 0.4,});
    const {ref: section2, inView: isVis2,} = useInView({threshold: 0.4,});
    const {ref: section4, inView: isVis4,} = useInView({threshold: 0.4,});
    const {ref: section5, inView: isVis5,} = useInView({threshold: 0.4,});


      
      
  return (

    <div className='IntersectionOP'>
        {/* <div className='view_port'>
    <div className='view_box'></div>
    </div> */}
    <h1>React Intersection Observer API</h1>
    <p>The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.</p>
    <p>React implementation of the Intersection Observer API to tell you when an element enters or leaves the viewport. Contains both a Hooks, render props and plain children implementation.</p>
    <section className='text_section'>
    <div ref={section1} className={`contents section1`}>
    {isVis1 ? <>
        <h3 className='tracking-in-expand'>section1</h3>
        <p className='tracking-in-expand'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </> : <></>}
    </div>
    
    <div ref={section2} className={`contents section 2`}>
        {isVis2 ? <>
            <h3 className='slide-in-top'>section2</h3>
            <p className='slide-in-top'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </>: <></>}
    </div>
    
    <div ref={section3} className={`contents  ${isVis3 ? "invert": "section3"}`}>
        <h3>section3</h3>
        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
    </div>
    
    <div ref={section4} className='contents section4'>
       {isVis4 ? <>
            <h3 className='slide-in-left '>section4</h3>
            <p className='slide-in-left'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
       </> :<></>}
    </div>
    <div ref={section5} className='contents section5'>
        {isVis5 ? <h1 className='slide-in-elliptic-bottom-fwd ' style={{fontSize: '10vw'}}>END</h1> : <></>}
        
    </div>
    </section>
    </div>
  )
}
