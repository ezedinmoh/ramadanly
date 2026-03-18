import React, { useState, useRef, useEffect } from 'react';
import { quranAPI } from '../services/quranAPI';

function AudioPlayer({ surahNumber, ayahNumber, verseKey, onClose }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [reciterId, setReciterId] = useState(7); // Default: Mishary Alafasy
  const [autoPlay, setAutoPlay] = useState(false);
  const [loading, setLoading] = useState(false);

  const reciters = [
    { id: 7, name: 'Mishary Rashid Alafasy' },
    { id: 2, name: 'Abdul Basit (Murattal)' },
    { id: 9, name: 'Abdurrahman As-Sudais' },
    { id: 5, name: 'Abu Bakr Ash-Shaatree' },
    { id: 3, name: 'Mahmoud Khalil Al-Husary' },
    { id: 4, name: 'Mohamed Siddiq Al-Minshawi' }
  ];

  useEffect(() => {
    loadAudio();
    // eslint-disable-next-line
  }, [surahNumber, ayahNumber, verseKey, reciterId]);

  const loadAudio = () => {
    if (!audioRef.current) return;

    setLoading(true);
    let audioUrl;

    if (verseKey) {
      // Play specific Ayah
      audioUrl = quranAPI.getAyahAudioUrl(verseKey, reciterId);
    } else if (surahNumber) {
      // Play full Surah
      audioUrl = quranAPI.getAudioUrl(surahNumber, reciterId);
    }

    if (audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setLoading(false);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (autoPlay && ayahNumber) {
      // Auto-play next Ayah (implement if needed)
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, currentTime - 10);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, currentTime + 10);
    }
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onCanPlay={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
      />

      <div className="audio-player-header">
        <div className="audio-info">
          <i className="fa-solid fa-volume-high"></i>
          <span>
            {verseKey ? `Ayah ${verseKey}` : `Surah ${surahNumber}`}
          </span>
        </div>
        {onClose && (
          <button className="btn-icon" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      <div className="audio-controls">
        <button className="btn-icon" onClick={skipBackward} disabled={loading}>
          <i className="fa-solid fa-backward"></i>
        </button>
        
        <button 
          className="btn-play" 
          onClick={togglePlay}
          disabled={loading}
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : isPlaying ? (
            <i className="fa-solid fa-pause"></i>
          ) : (
            <i className="fa-solid fa-play"></i>
          )}
        </button>
        
        <button className="btn-icon" onClick={skipForward} disabled={loading}>
          <i className="fa-solid fa-forward"></i>
        </button>
      </div>

      <div className="audio-progress">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={handleSeek}
          className="progress-slider"
        />
        <span className="time">{formatTime(duration)}</span>
      </div>

      <div className="audio-settings">
        <div className="setting-group">
          <label>
            <i className="fa-solid fa-volume-low"></i>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>

        <div className="setting-group">
          <label>Speed:</label>
          <div className="speed-buttons">
            {[0.75, 1, 1.25, 1.5].map(rate => (
              <button
                key={rate}
                className={`btn-speed ${playbackRate === rate ? 'active' : ''}`}
                onClick={() => handlePlaybackRateChange(rate)}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <label>Reciter:</label>
          <select
            className="reciter-select"
            value={reciterId}
            onChange={(e) => setReciterId(Number(e.target.value))}
          >
            {reciters.map(reciter => (
              <option key={reciter.id} value={reciter.id}>
                {reciter.name}
              </option>
            ))}
          </select>
        </div>

        <div className="setting-group">
          <label>
            <input
              type="checkbox"
              checked={autoPlay}
              onChange={(e) => setAutoPlay(e.target.checked)}
            />
            Auto-play next
          </label>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
