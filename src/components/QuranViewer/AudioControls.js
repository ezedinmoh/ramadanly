import React, { useState } from 'react';
import { getRecitersList } from '../../services/quranAudioAPI';

const AudioControls = ({ audioControls }) => {
  const [showSettings, setShowSettings] = useState(false);
  const reciters = getRecitersList();

  const {
    isPlaying,
    currentAyah,
    reciter,
    playbackSpeed,
    volume,
    progress,
    duration,
    error,
    togglePlayPause,
    stop,
    skipNext,
    skipPrevious,
    changeReciter,
    changeSpeed,
    changeVolume,
    seek
  } = audioControls;

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5];

  return (
    <div className="audio-controls-container">
      <div className="audio-controls">
        {/* Current Ayah Info */}
        {currentAyah && (
          <div className="audio-info">
            <i className="fa-solid fa-book-quran"></i>
            <span>
              Surah {currentAyah.surah}, Ayah {currentAyah.ayah}
            </span>
          </div>
        )}

        {/* Playback Controls */}
        <div className="audio-playback-controls">
          <button
            className="audio-btn audio-btn-secondary"
            onClick={skipPrevious}
            disabled={!currentAyah}
            title="Previous Ayah"
          >
            <i className="fa-solid fa-backward-step"></i>
          </button>

          <button
            className="audio-btn audio-btn-primary"
            onClick={togglePlayPause}
            disabled={!currentAyah}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>

          <button
            className="audio-btn audio-btn-secondary"
            onClick={stop}
            disabled={!isPlaying}
            title="Stop"
          >
            <i className="fa-solid fa-stop"></i>
          </button>

          <button
            className="audio-btn audio-btn-secondary"
            onClick={skipNext}
            disabled={!currentAyah}
            title="Next Ayah"
          >
            <i className="fa-solid fa-forward-step"></i>
          </button>
        </div>

        {/* Settings Toggle */}
        <button
          className="audio-btn audio-btn-secondary"
          onClick={() => setShowSettings(!showSettings)}
          title="Audio Settings"
        >
          <i className="fa-solid fa-gear"></i>
        </button>
      </div>

      {/* Progress Bar */}
      {duration > 0 && (
        <div className="audio-progress-container">
          <span className="audio-time">{formatTime(progress)}</span>
          <input
            type="range"
            className="audio-progress-slider"
            min="0"
            max={duration}
            value={progress}
            onChange={handleProgressChange}
            step="0.1"
          />
          <span className="audio-time">{formatTime(duration)}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="audio-error">
          <i className="fa-solid fa-triangle-exclamation"></i>
          {error}
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="audio-settings">
          {/* Reciter Selection */}
          <div className="audio-setting-group">
            <label>
              <i className="fa-solid fa-user"></i>
              Reciter
            </label>
            <select
              value={reciter}
              onChange={(e) => changeReciter(e.target.value)}
              className="audio-select"
            >
              {reciters.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Playback Speed */}
          <div className="audio-setting-group">
            <label>
              <i className="fa-solid fa-gauge"></i>
              Speed
            </label>
            <div className="audio-speed-buttons">
              {speedOptions.map((speed) => (
                <button
                  key={speed}
                  className={`audio-speed-btn ${playbackSpeed === speed ? 'active' : ''}`}
                  onClick={() => changeSpeed(speed)}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          <div className="audio-setting-group">
            <label>
              <i className="fa-solid fa-volume-high"></i>
              Volume
            </label>
            <input
              type="range"
              className="audio-volume-slider"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
            />
            <span className="audio-volume-value">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioControls;
