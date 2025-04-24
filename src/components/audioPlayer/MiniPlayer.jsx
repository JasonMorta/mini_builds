// AudioPlayer.jsx
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import styles from './AudioPlayer.module.css';

export default function MiniPlayer({ defaultStyle = "normal", audioSrc = "/api/placeholder/400/320", trackTitle = "Sample Audio Track" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [style, setStyle] = useState(defaultStyle); // "mini" or "normal"
  
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    // Add event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));
    
    // Set volume
    audio.volume = volume;
    
    // Cleanup
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [volume]);
  
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };
  
  const skipBackward = () => {
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
  };
  
  const skipForward = () => {
    audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
  };
  
  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };
  
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const toggleStyle = () => {
    setStyle(style === "mini" ? "normal" : "mini");
  };
  
  // Mini player component
  if (style === "mini") {
    return (
      <div className={styles.miniContainer}>
        <audio 
          ref={audioRef} 
          src={audioSrc} 
          preload="metadata"
        />
        
        <button 
          onClick={togglePlay}
          className={styles.miniPlayButton}
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
        </button>
        
        <div className={styles.miniProgressContainer}>
          <input
            type="range"
            className={styles.progressBar}
            value={currentTime}
            min="0"
            max={duration || 0}
            step="0.01"
            onChange={handleProgressChange}
          />
        </div>
        
        <button 
          onClick={toggleStyle}
          className={styles.miniExpandButton}
        >
          <Maximize2 size={12} />
        </button>
      </div>
    );
  }
  
  // Normal player component
  return (
    <div className={styles.container}>
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        preload="metadata"
      />
      
      <div className={styles.header}>
        <div className={styles.trackTitle}>{trackTitle}</div>
        <div className={styles.timeDisplay}>
          <div className={styles.timeText}>{formatTime(currentTime)} / {formatTime(duration)}</div>
          <button 
            onClick={toggleStyle}
            className={styles.minimizeButton}
          >
            <Minimize2 size={16} />
          </button>
        </div>
      </div>
      
      <div className={styles.progressContainer}>
        <input
          type="range"
          ref={progressBarRef}
          className={styles.progressBar}
          value={currentTime}
          min="0"
          max={duration || 0}
          step="0.01"
          onChange={handleProgressChange}
        />
      </div>
      
      <div className={styles.controls}>
        <div className={styles.playbackControls}>
          <button 
            onClick={skipBackward}
            className={styles.skipButton}
          >
            <SkipBack size={20} />
          </button>
          
          <button 
            onClick={togglePlay}
            className={styles.playButton}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button 
            onClick={skipForward}
            className={styles.skipButton}
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className={styles.volumeControls}>
          <button 
            onClick={toggleMute}
            className={styles.muteButton}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          
          <input
            type="range"
            className={styles.volumeSlider}
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}