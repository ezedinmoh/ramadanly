import React, { useState } from 'react';
import { allSurahs, juzInfo } from '../data/quranData';
import SearchBar from './SearchBar';

function QuranBrowser({ onNavigateToReader }) {
  const [viewMode, setViewMode] = useState('surah'); // surah, juz, search
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [selectedJuz, setSelectedJuz] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('english'); // english, arabic, amharic

  const filteredSurahs = allSurahs.filter(surah => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      surah.nameEnglish.toLowerCase().includes(term) ||
      surah.nameArabic.includes(term) ||
      surah.nameAmharic.includes(term) ||
      surah.number.toString().includes(term)
    );
  });

  const getSurahName = (surah) => {
    switch(language) {
      case 'arabic': return surah.nameArabic;
      case 'amharic': return surah.nameAmharic;
      default: return surah.nameEnglish;
    }
  };

  return (
    <div className="quran-browser-container">
      <div className="browser-header">
        <h2 className="section-title">📖 Quran Browser</h2>
        
        {/* Search Bar - Always visible in Quran section */}
        <SearchBar onNavigate={(view, params) => {
          if (params.surah) {
            onNavigateToReader(params.surah, params.page);
          } else if (params.page) {
            onNavigateToReader(null, params.page);
          }
        }} />
        
        <div className="browser-controls">
          <div className="view-mode-buttons">
            <button 
              className={`btn-mode ${viewMode === 'surah' ? 'active' : ''}`}
              onClick={() => setViewMode('surah')}
            >
              By Surah
            </button>
            <button 
              className={`btn-mode ${viewMode === 'juz' ? 'active' : ''}`}
              onClick={() => setViewMode('juz')}
            >
              By Juz
            </button>
          </div>

          <div className="language-selector">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="form-select"
            >
              <option value="english">English</option>
              <option value="arabic">العربية</option>
              <option value="amharic">አማርኛ</option>
            </select>
          </div>
        </div>
      </div>

      <div className="browser-content">
        {viewMode === 'surah' && (
          <SurahList 
            surahs={filteredSurahs} 
            onSelect={setSelectedSurah}
            getSurahName={getSurahName}
          />
        )}

        {viewMode === 'juz' && (
          <JuzList 
            juzInfo={juzInfo}
            onSelectJuz={setSelectedJuz}
            getSurahName={getSurahName}
          />
        )}

        {viewMode === 'search' && (
          <SurahList 
            surahs={filteredSurahs} 
            onSelect={setSelectedSurah}
            getSurahName={getSurahName}
          />
        )}
      </div>

      {selectedSurah && (
        <SurahDetails 
          surah={selectedSurah} 
          onClose={() => setSelectedSurah(null)}
          getSurahName={getSurahName}
          onNavigateToReader={onNavigateToReader}
        />
      )}
    </div>
  );
}

function SurahList({ surahs, onSelect, getSurahName }) {
  return (
    <div className="surah-list">
      {surahs.map(surah => (
        <div 
          key={surah.number}
          className="surah-card"
          onClick={() => onSelect(surah)}
        >
          <div className="surah-number">{surah.number}</div>
          <div className="surah-info">
            <h3 className="surah-name">{getSurahName(surah)}</h3>
            <div className="surah-meta">
              <span>Juz {surah.juz.join(', ')}</span>
              <span>•</span>
              <span>{surah.ayahs} Ayahs</span>
              <span>•</span>
              <span>Pages {surah.pageStart}-{surah.pageEnd}</span>
            </div>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      ))}
    </div>
  );
}

function JuzList({ juzInfo, onSelectJuz, getSurahName }) {
  return (
    <div className="juz-list">
      {juzInfo.map(juz => (
        <div key={juz.number} className="juz-card">
          <h3 className="juz-title">Juz {juz.number}</h3>
          <div className="juz-surahs">
            {juz.surahs.map(surah => (
              <div key={surah.number} className="juz-surah-item">
                <span className="surah-number-small">{surah.number}</span>
                <span>{getSurahName(surah)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SurahDetails({ surah, onClose, getSurahName, onNavigateToReader }) {
  const handleReadSurah = () => {
    // Navigate to QuranViewer with the Surah's start page
    if (onNavigateToReader) {
      onNavigateToReader(surah.number, surah.pageStart);
    }
    onClose();
  };

  const handleListen = () => {
    // Navigate to QuranViewer with audio enabled
    if (onNavigateToReader) {
      onNavigateToReader(surah.number, surah.pageStart, { autoPlayAudio: true });
    }
    onClose();
  };

  const handleAddToPlan = () => {
    // TODO: Integrate with plan generator
    alert('Add to plan feature coming soon!');
  };

  return (
    <div className="modal active">
      <div className="modal-content surah-details-modal">
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        
        <h2 className="modal-title">{getSurahName(surah)}</h2>
        
        <div className="surah-details-grid">
          <div className="detail-item">
            <span className="detail-label">Surah Number</span>
            <span className="detail-value">{surah.number}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">English Name</span>
            <span className="detail-value">{surah.nameEnglish}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Arabic Name</span>
            <span className="detail-value">{surah.nameArabic}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Amharic Name</span>
            <span className="detail-value">{surah.nameAmharic}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Juz</span>
            <span className="detail-value">{surah.juz.join(', ')}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total Ayahs</span>
            <span className="detail-value">{surah.ayahs}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Page Range</span>
            <span className="detail-value">{surah.pageStart} - {surah.pageEnd}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total Pages</span>
            <span className="detail-value">{surah.pageEnd - surah.pageStart + 1}</span>
          </div>
        </div>

        <div className="surah-actions">
          <button className="btn-primary" onClick={handleReadSurah}>
            <i className="fa-solid fa-book-open"></i> Read Surah
          </button>
          <button className="btn-outline" onClick={handleListen}>
            <i className="fa-solid fa-headphones"></i> Listen
          </button>
          <button className="btn-outline" onClick={handleAddToPlan}>
            <i className="fa-solid fa-calendar-plus"></i> Add to Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuranBrowser;
