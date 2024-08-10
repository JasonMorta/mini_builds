import React, { useState, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'
import data from './data'

import styles from './Leaderboard.module.css'

export default function LeaderBoardScores() {
  const [rows, setRows] = useState(data) // Initialize state with the imported data

  // Effect to sort rows by totalScore whenever the data updates externally
  useEffect(() => {
    const sortedRows = [...rows].sort((a, b) => b.totalScore - a.totalScore); // Sort rows by totalScore in descending order
    setRows(sortedRows); // Update state with sorted data
  }, [rows]); // Dependency array includes rows to trigger sorting on updates

  let height = 0 // Initialize a variable to calculate the height of the list

  // Set up transitions to animate the list items
  const transitions = useTransition(
    rows.map(data => ({ ...data, y: (height += data.height) - data.height })), // Map the data to include the Y position for each item
    {
      key: (item) => item.name, // Use the item’s name as a unique key
      from: { height: 0, opacity: 0 }, // Initial state: hidden and collapsed
      leave: { height: 0, opacity: 0 }, // Leaving state: collapse and fade out
      enter: ({ y, height }) => ({ y, height, opacity: 1 }), // Entering state: move to the correct position and fade in
      update: ({ y, height }) => ({ y, height }), // Updating state: adjust position and size
    }
  )

  return (

    <div className={styles.leaderBoard_main} >
      <div className={styles.header}> {/* Header for the list */}
        <span style={{ textAlign: "left" }}>Rank</span> {/* Rank column */}
        <span style={{ textAlign: "left" }}>Name</span> {/* Name column */}
        <span style={{ textAlign: "right" }}>Today</span> {/* Score column */}
        <span style={{ textAlign: "right" }}>Monthly Total</span> {/* Score column */}
      </div>
      <div className={styles.list} style={{ height }}> {/* Container for the animated list */}
        {transitions((style, item, t, index) => ( // Render each animated item
          <animated.div className={styles.card} style={{ zIndex: rows.length - index, ...style }}> {/* Animated wrapper for each item */}
            <div className={styles.cell}> {/* Cell wrapper for content */}
              <div className={styles.details} style={{ backgroundImage: item.css }}>
                <div className={styles.inner_item}>
                  <span className={styles.ranking}>
                    <span style={{ textAlign: "left" }}>{index + 1} {" "} </span>
                  
                    <span>{ `-1`}</span>
                    <span>{index === 0 ? "👑": index === 1 ? "🥈" : ""}</span>
                  </span>



                  <span style={{ textAlign: "left" }}>{item.name}</span>
                  <span style={{ textAlign: "right" }}>{item.score_now}</span>
                  <span style={{ textAlign: "right" }}>{item.totalScore}</span>
                </div>
              </div>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}
