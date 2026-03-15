import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import data from './data';
import styles from './Leaderboard.module.css';

export default function LeaderBoardScores() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const updateScores = () => {
      const updatedData = data.map((item) => {
        const newScoreNow = Math.floor(Math.random() * 300);
        return {
          ...item,
          score_now: newScoreNow,
          kycInstances: item.kycInstances + newScoreNow,
        };
      });

      const sortedRows = updatedData.sort((a, b) => b.kycInstances - a.kycInstances);
      setRows(sortedRows);
    };

    updateScores();
    const intervalId = setInterval(updateScores, 4000);
    return () => clearInterval(intervalId);
  }, []);

  let height = 0;

  const transitions = useTransition(
    rows.map((entry) => ({ ...entry, y: (height += 56) - 56 })),
    {
      key: (item) => item.name,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height }),
    },
  );

  return (
    <div className="leaderboard-build">
      <section className="leaderboard-build__intro build-card">
        <h3 style={{ marginTop: 0 }}>Live leaderboard</h3>
        <p style={{ marginBottom: 0 }}>
          Scores reshuffle every few seconds to demonstrate animated rank movement.
        </p>
      </section>

      <div className={styles.leaderBoard_main}>
        <div className={styles.header}>
          <span className={styles.newAndPrevRank}>
            <span style={{ textAlign: 'left', width: '40%' }}>Rank</span>
          </span>
          <span style={{ textAlign: 'left' }}>Agent</span>
          <span style={{ textAlign: 'right' }}>KYC instances</span>
          <span style={{ textAlign: 'right' }}>Approvals</span>
          <span style={{ textAlign: 'right' }}>Chats</span>
          <span style={{ textAlign: 'right' }}>Emails</span>
          <span style={{ textAlign: 'right' }}>Calls</span>
        </div>
        <div className={styles.list} style={{ height }}>
          {transitions((style, item, t, index) => (
            <animated.div className={styles.card} style={{ zIndex: rows.length - index, ...style }}>
              <div className={styles.cell}>
                <div className={styles.details} style={{ backgroundImage: item.css }}>
                  <div className={styles.inner_item}>
                    <span className={styles.ranking}>
                      <span style={{ textAlign: 'left' }}>{index + 1}</span>
                    </span>
                    <span style={{ textAlign: 'left' }}>{item.name}</span>
                    <span style={{ textAlign: 'right' }}>{item.kycInstances}</span>
                    <span style={{ textAlign: 'right' }}>{item.approvals}</span>
                    <span style={{ textAlign: 'right' }}>{item.chats}</span>
                    <span style={{ textAlign: 'right' }}>{item.emails}</span>
                    <span style={{ textAlign: 'right' }}>{item.calls}</span>
                  </div>
                </div>
              </div>
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
}
