import React from 'react';
import AyahCard from './AyahCard';
import LoadingSpinner from './LoadingSpinner';

const AyahDisplay = ({
  ayahs,
  loading,
  error,
  showTranslation,
  fontSize,
  highlights,
  onAyahClick,
  currentPlayingAyah,
  isPlaying,
  onPlayAyah
}) => {
  if (loading) {
    return (
      <div className="ayah-display">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="ayah-display">
        <div className="error-message">
          <i className="fa-solid fa-exclamation-circle"></i>
          <p>{error}</p>
          <p className="error-hint">Please check your internet connection and try again.</p>
        </div>
      </div>
    );
  }

  if (ayahs.length === 0) {
    return (
      <div className="ayah-display">
        <div className="empty-message">
          <i className="fa-solid fa-book-quran"></i>
          <p>No verses found for this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ayah-display">
      {ayahs.map((ayah, index) => (
        <AyahCard
          key={ayah.verseKey}
          ayah={ayah}
          ayahIndex={index}
          showTranslation={showTranslation}
          fontSize={fontSize}
          highlight={highlights[ayah.verseKey]}
          onClick={() => onAyahClick(ayah.verseKey)}
          isCurrentlyPlaying={currentPlayingAyah === index && isPlaying}
          onPlayAyah={() => onPlayAyah(index)}
        />
      ))}
    </div>
  );
};

export default AyahDisplay;
