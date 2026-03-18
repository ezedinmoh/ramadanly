import React from 'react';

const AyahCard = ({
  ayah,
  ayahIndex,
  showTranslation,
  fontSize,
  highlight,
  onClick,
  isCurrentlyPlaying,
  onPlayAyah
}) => {
  const cardStyle = highlight ? { backgroundColor: highlight.color } : {};

  // Debug logging for first ayah
  if (ayahIndex === 0) {
    console.log('🔍 AyahCard Debug:', {
      verseKey: ayah.verseKey,
      hasText: !!ayah.text,
      textLength: ayah.text?.length,
      hasTranslation: !!ayah.translation,
      translationLength: ayah.translation?.length,
      translationPreview: ayah.translation?.substring(0, 50),
      showTranslation: showTranslation,
      fullAyah: ayah
    });
  }

  return (
    <div
      className={`ayah-card ${highlight ? 'highlighted' : ''} ${isCurrentlyPlaying ? 'playing' : ''}`}
      style={cardStyle}
      role="article"
      aria-label={`Ayah ${ayah.ayah} of Surah ${ayah.surah}`}
    >
      <div className="ayah-header">
        <div className="ayah-number" title={`Surah ${ayah.surah}, Ayah ${ayah.ayah}`}>
          {ayah.ayah}
        </div>
        <div className="ayah-reference">
          {ayah.surah}:{ayah.ayah}
        </div>
        <div className="ayah-actions">
          <button
            className="ayah-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onPlayAyah();
            }}
            title={isCurrentlyPlaying ? 'Playing...' : 'Listen to this ayah'}
          >
            <i className={`fa-solid ${isCurrentlyPlaying ? 'fa-volume-high' : 'fa-play'}`}></i>
          </button>
          <button
            className="ayah-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            title="Highlight this ayah"
          >
            <i className="fa-solid fa-highlighter"></i>
          </button>
        </div>
      </div>

      <div className={`ayah-text-arabic ${fontSize}`} dir="rtl" lang="ar">
        {ayah.text || 'Loading...'}
      </div>

      {showTranslation && ayah.translation && (
        <div className="ayah-translation">
          <div className="translation-text">{ayah.translation}</div>
        </div>
      )}

      {showTranslation && !ayah.translation && (
        <div className="ayah-translation">
          <div className="translation-text" style={{color: '#ff6b6b', fontStyle: 'italic'}}>
            Translation not available
          </div>
        </div>
      )}

      {highlight && (
        <div className="ayah-highlight-indicator" title="Click to remove highlight">
          <i className="fa-solid fa-highlighter"></i>
        </div>
      )}
    </div>
  );
};

export default AyahCard;
