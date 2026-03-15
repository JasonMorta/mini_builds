import React, { useEffect, useRef, useState } from 'react';
import styles from './Loaders.module.css';
import StyledButton from '../../StyledButton';
import DataLoader from './DataLoader';

export default function Loaders() {
  const progressRef = useRef(null);
  const h2Ref = useRef(null);
  const intervalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.value = 0;
    }
    if (h2Ref.current) {
      h2Ref.current.innerText = 'Progress: 0%';
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  function increaseProgress() {
    if (!progressRef.current || !h2Ref.current || isLoading) {
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsLoading(true);
    progressRef.current.value = 0;
    let progress = 0;

    // useRef stores the progress element so this loop can update it without re-rendering on every tick.
    intervalRef.current = setInterval(() => {
      progress += 1;
      progressRef.current.value = progress;
      h2Ref.current.innerText = `Progress: ${progress}%`;

      if (progress >= 100) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsLoading(false);
      }
    }, 10);
  }

  return (
    <div className={styles.loadersContainer}>
      <section className={styles.loadingProgress}>
        <p>Here the <b>useRef</b> hook is used to avoid re-rendering the component on progress updates.</p>
        <h2 ref={h2Ref} />
        <progress className={styles.progressBar} ref={progressRef} value={progressRef.current?.value} max="100" />
        <StyledButton type="secondary" disabled={isLoading} text={isLoading ? 'Loading…' : 'Load'} onPress={increaseProgress} />
      </section>
      <DataLoader />
    </div>
  );
}
