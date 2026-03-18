import React from 'react';
import SurahSelector from './SurahSelector';
import JuzSelector from './JuzSelector';
import AyahSelector from './AyahSelector';

const QuranHeader = ({
  currentPage,
  currentSurah,
  currentJuz,
  onPageChange,
  onSurahChange,
  onJuzChange,
  onAyahSelect,
  showTranslation,
  onShowTranslationToggle
}) => {
  return (
    <div className="quran-header">
      <div className="header-left">
        <SurahSelector
          value={currentSurah}
          onChange={onSurahChange}
          language="english"
        />
        <JuzSelector
          value={currentJuz}
          onChange={onJuzChange}
        />
      </div>

      <div className="header-center">
        <AyahSelector
          currentSurah={currentSurah}
          onAyahSelect={onAyahSelect}
        />
      </div>

      <div className="header-right">
        <button
          className={`btn-toggle-translation ${showTranslation ? 'active' : ''}`}
          onClick={onShowTranslationToggle}
          title={showTranslation ? 'Hide translation' : 'Show translation'}
        >
          <i className={`fa-solid ${showTranslation ? 'fa-eye' : 'fa-eye-slash'}`}></i>
          <span className="btn-text">{showTranslation ? 'Hide' : 'Show'} Translation</span>
        </button>
      </div>
    </div>
  );
};

export default QuranHeader;
