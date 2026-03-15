import React from "react";
import { useInView } from "react-intersection-observer";
import styles from "./IOP.module.css";

export default function IntersectionOP() {
  const { ref: section3, inView: isVis3 } = useInView({ threshold: 0.4 });
  const { ref: section1, inView: isVis1 } = useInView({ threshold: 0.4 });
  const { ref: section2, inView: isVis2 } = useInView({ threshold: 0.4 });
  const { ref: section4, inView: isVis4 } = useInView({ threshold: 0 });
  const { ref: section5, inView: isVis5 } = useInView({ threshold: 0.4 });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>React Intersection Observer API</h1>
      <p className={styles.lead}>
        The Intersection Observer API provides a way to asynchronously observe changes in the
        intersection of a target element with an ancestor element or with a top-level document's viewport.
      </p>
      <p className={styles.lead}>
        React implementation of the Intersection Observer API to tell you when an element enters or leaves the viewport.
      </p>
      <section className={styles.textSection}>
        <div ref={section1} className={styles.contents}>
          {isVis1 ? (
            <>
              <h3 className={styles.trackingInExpand}>section1</h3>
              <p className={styles.trackingInExpand}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </>
          ) : null}
        </div>
        <div ref={section2} className={styles.contents}>
          {isVis2 ? (
            <>
              <h3 className={styles.slideInTop}>section2</h3>
              <p className={styles.slideInTop}>It is a long established fact that a reader will be distracted by the readable content of a page.</p>
            </>
          ) : null}
        </div>
        <div ref={section3} className={`${styles.contents} ${isVis3 ? styles.invert : styles.section3}`}>
          <h3>section3</h3>
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
        </div>
        <div ref={section4} className={styles.contents}>
          {isVis4 ? (
            <div className={styles.section4}>
              <h3>section4</h3>
              <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
            </div>
          ) : null}
        </div>
        <div ref={section5} className={styles.contents}>
          {isVis5 ? <h1 className={styles.slideInEllipticBottomFwd} style={{ fontSize: "10vw" }}>END</h1> : null}
        </div>
      </section>
    </div>
  );
}
