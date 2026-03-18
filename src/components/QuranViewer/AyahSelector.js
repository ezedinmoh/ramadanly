import React, { useState, useEffect, useRef } from 'react';
import { allSurahs } from '../../data/quranData';

const AyahSelector = ({ currentSurah, onAyahSelect }) => {
  const [selectedSurah, setSelectedSurah] = useState(currentSurah || 1);
  const [selectedAyah, setSelectedAyah] = useState(1);
  const [maxAyahs, setMaxAyahs] = useState(7);
  const [showAyahDropdown, setShowAyahDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAyahDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update max ayahs when surah changes
  useEffect(() => {
    const surah = allSurahs.find(s => s.number === selectedSurah);
    if (surah) {
      setMaxAyahs(surah.ayahs);
      // Reset ayah to 1 if current ayah exceeds new surah's ayah count
      if (selectedAyah > surah.ayahs) {
        setSelectedAyah(1);
      }
    }
  }, [selectedSurah, selectedAyah]);

  // Update selected surah when currentSurah prop changes
  useEffect(() => {
    if (currentSurah && currentSurah !== selectedSurah) {
      setSelectedSurah(currentSurah);
    }
  }, [currentSurah, selectedSurah]);

  const handleSurahChange = (e) => {
    const surahNum = parseInt(e.target.value);
    setSelectedSurah(surahNum);
  };

  const handleAyahChange = (ayahNum) => {
    setSelectedAyah(ayahNum);
    setShowAyahDropdown(false);
  };

  const handleGoToAyah = () => {
    if (onAyahSelect) {
      onAyahSelect(selectedSurah, selectedAyah);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGoToAyah();
    }
  };

  // Generate ayah options
  const ayahOptions = Array.from({ length: maxAyahs }, (_, i) => i + 1);

  return (
    <div className="ayah-selector-container">
      <div className="ayah-selector-inputs">
        <div className="ayah-input-group">
          <label htmlFor="surah-select" className="ayah-label">
            <i className="fa-solid fa-book-quran"></i>
            Surah
          </label>
          <select
            id="surah-select"
            className="ayah-select surah-select"
            value={selectedSurah}
            onChange={handleSurahChange}
          >
            {allSurahs.map(surah => (
              <option key={surah.number} value={surah.number}>
                {surah.number}. {surah.nameEnglish}
              </option>
            ))}
          </select>
        </div>

        <div className="ayah-input-group ayah-dropdown-group" ref={dropdownRef}>
          <label htmlFor="ayah-select" className="ayah-label">
            <i className="fa-solid fa-quote-right"></i>
            Ayah
          </label>
          <div className="ayah-dropdown-wrapper">
            <button
              type="button"
              className="ayah-dropdown-button"
              onClick={() => setShowAyahDropdown(!showAyahDropdown)}
              onKeyPress={handleKeyPress}
            >
              <span className="ayah-selected-value">{selectedAyah}</span>
              <span className="ayah-total-inline">/ {maxAyahs}</span>
              <i className={`fa-solid fa-chevron-${showAyahDropdown ? 'up' : 'down'}`}></i>
            </button>
            
            {showAyahDropdown && (
              <div className="ayah-dropdown-menu">
                <div className="ayah-dropdown-header">
                  Select Ayah (1-{maxAyahs})
                </div>
                <div className="ayah-dropdown-list">
                  {ayahOptions.map(ayahNum => (
                    <button
                      key={ayahNum}
                      type="button"
                      className={`ayah-dropdown-item ${selectedAyah === ayahNum ? 'active' : ''}`}
                      onClick={() => handleAyahChange(ayahNum)}
                    >
                      <span className="ayah-number-badge">{ayahNum}</span>
                      <span className="ayah-item-text">Ayah {ayahNum}</span>
                      {selectedAyah === ayahNum && (
                        <i className="fa-solid fa-check"></i>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          className="btn-go-to-ayah"
          onClick={handleGoToAyah}
          title="Go to this ayah"
        >
          <i className="fa-solid fa-arrow-right"></i>
          <span className="btn-text">Go</span>
        </button>
      </div>
    </div>
  );
};

export default AyahSelector;
