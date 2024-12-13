import React, { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import data from "./data";
import styles from "./Leaderboard.module.css";

export default function LeaderBoardScores() {
  const [rows, setRows] = useState([]); // Initialize with an empty array
  const [prevRanks, setPrevRanks] = useState([]); // Initialize with an empty object

  useEffect(() => {
    // Function to update scores and ranks
    const updateScores = () => {
      let oldData = []; // Copy the current state

      // Update scores and calculate new totalScore
      const updatedData = data.map((item, index) => {
        const newScoreNow = Math.floor(Math.random() * 300);
        return {
          ...item,
          score_now: newScoreNow,
          kycInstances: item.kycInstances + newScoreNow,
        };
      });

      // Sort rows by new totalScore
      const sortedRows = updatedData.sort(
        (a, b) => b.kycInstances - a.kycInstances
      );

      // Get the previous rank from the current state
      setRows(sortedRows); // Update state with sorted data and previous ranks
    };

    // Initial sort and update
    updateScores();

    // Set interval to update scores every 4 seconds
    const intervalId = setInterval(updateScores, 4000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once

  let height = 0; // Initialize a variable to calculate the height of the list

  // Set up transitions to animate the list items
  const transitions = useTransition(
    rows.map((data) => ({ ...data, y: (height += 27) - 27 })), // Map the data to include the Y position for each item
    {
      key: (item) => item.name, // Use the item’s name as a unique key
      from: { height: 0, opacity: 0 }, // Initial state: hidden and collapsed
      leave: { height: 0, opacity: 0 }, // Leaving state: collapse and fade out
      enter: ({ y, height }) => ({ y, height, opacity: 1 }), // Entering state: move to the correct position and fade in
      update: ({ y, height }) => ({ y, height }), // Updating state: adjust position and size
    }
  );

  return (
    <div className={styles.leaderBoard_main}>
      <div className={styles.header}>
        <span className={styles.newAndPrevRank}>
          <span style={{ textAlign: "left", width: "40%" }}>Rank</span>
        </span>
        <span style={{ textAlign: "left" }}>AGENT</span>
        <span style={{ textAlign: "right" }}>KYC INSTANCES</span>
        <span style={{ textAlign: "right" }}>APPROVALS</span>
        <span style={{ textAlign: "right" }}>CHATS</span>
        <span style={{ textAlign: "right" }}>EMAILS</span>
        <span style={{ textAlign: "right" }}>CALLS</span>
      </div>
      <div className={styles.list} style={{ height }}>
        {transitions((style, item, t, index) => (
          <animated.div
            className={styles.card}
            style={{ zIndex: rows.length - index, ...style }}
          >
            <div className={styles.cell}>
              <div
                className={styles.details}
                style={{ backgroundImage: item.css }}
              >
                <div className={styles.inner_item}>
                  <span className={styles.ranking}>
                    <span style={{ textAlign: "left" }}>{index + 1} </span>
                  </span>
                  <span style={{ textAlign: "left" }}>{item.name}</span>
                  <span style={{ textAlign: "right" }}>{item.kycInstances}</span>
                  <span style={{ textAlign: "right" }}>{item.approvals}</span>
                  <span style={{ textAlign: "right" }}>{item.chats}</span>
                  <span style={{ textAlign: "right" }}>{item.emails}</span>
                  <span style={{ textAlign: "right" }}>{item.calls}</span>
                </div>
              </div>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
}
