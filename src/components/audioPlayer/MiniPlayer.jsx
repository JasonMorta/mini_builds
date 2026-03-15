import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './AudioPlayer.module.css';

export default function MiniPlayer({ audioSrc }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    // Keep the custom transport UI in sync with the hidden native audio element.
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset state whenever the cry source changes.
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [audioSrc]);

  const progressPercent = useMemo(() => {
    if (!duration) return 0;
    return Math.min(100, (currentTime / duration) * 100);
  }, [currentTime, duration]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
    }
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const nextValue = Number(event.target.value);
    const nextTime = (nextValue / 100) * duration;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const formatTime = (value) => {
    if (!Number.isFinite(value) || value <= 0) return '0:00';
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={styles.miniPlayer}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      <button
        type="button"
        className={styles.playButton}
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause cry' : 'Play cry'}
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>

      <div className={styles.trackGroup}>
        <div className={styles.visualizer} aria-hidden="true">
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progressPercent}
          onChange={handleSeek}
          className={styles.progressSlider}
          aria-label="Seek cry audio"
        />
      </div>

      <span className={styles.timeLabel}>{formatTime(duration || currentTime)}</span>
    </div>
  );
}
