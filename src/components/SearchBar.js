import React, { useState, useEffect, useRef } from 'react';
import { allSurahs } from '../data/quranData';

function SearchBar({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchResults = searchQuran(query);
    setResults(searchResults);
    setShowResults(true);
    setActiveIndex(0);
  }, [query]);

  const searchQuran = (searchQuery) => {
    const q = searchQuery.toLowerCase().trim();
    const results = [];

    // Search by Ayah (format: surah:ayah, e.g., "2:255")
    const ayahMatch = q.match(/^(\d+):(\d+)$/);
    if (ayahMatch) {
      const surahNum = parseInt(ayahMatch[1]);
      const ayahNum = parseInt(ayahMatch[2]);
      
      if (surahNum >= 1 && surahNum <= 114) {
        const surah = allSurahs.find(s => s.number === surahNum);
        if (surah && ayahNum >= 1 && ayahNum <= surah.ayahs) {
          results.push({
            type: 'ayah',
            surah: surah,
            ayahNumber: ayahNum,
            highlight: `Surah ${surahNum}, Ayah ${ayahNum}`
          });
        }
      }
    }

    // Search by Surah number
    if (!isNaN(q) && Number(q) >= 1 && Number(q) <= 114) {
      const surah = allSurahs.find(s => s.number === Number(q));
      if (surah) {
        results.push({
          type: 'surah',
          surah: surah,
          highlight: `Surah ${surah.number}`
        });
      }
    }

    // Search by Surah name (English, Arabic, Amharic)
    allSurahs.forEach(surah => {
      const matchEnglish = surah.nameEnglish.toLowerCase().includes(q);
      const matchArabic = surah.nameArabic.includes(q);
      const matchAmharic = surah.nameAmharic && surah.nameAmharic.includes(q);

      if (matchEnglish || matchArabic || matchAmharic) {
        results.push({
          type: 'surah',
          surah: surah,
          highlight: matchEnglish ? surah.nameEnglish : 
                     matchArabic ? surah.nameArabic : 
                     surah.nameAmharic
        });
      }
    });

    // Search by Juz
    if (q.includes('juz') || q.includes('جزء')) {
      const juzNum = parseInt(q.replace(/[^0-9]/g, ''));
      if (juzNum >= 1 && juzNum <= 30) {
        const juzSurahs = allSurahs.filter(s => s.juz.includes(juzNum));
        results.push({
          type: 'juz',
          juzNumber: juzNum,
          surahs: juzSurahs,
          highlight: `Juz ${juzNum}`
        });
      }
    }

    // Search by page number
    if (q.includes('page') || q.includes('صفحة')) {
      const pageNum = parseInt(q.replace(/[^0-9]/g, ''));
      if (pageNum >= 1 && pageNum <= 604) {
        const pageSurah = allSurahs.find(s => 
          pageNum >= s.pageStart && pageNum <= s.pageEnd
        );
        if (pageSurah) {
          results.push({
            type: 'page',
            pageNumber: pageNum,
            surah: pageSurah,
            highlight: `Page ${pageNum}`
          });
        }
      }
    }

    // Remove duplicates
    const unique = results.filter((result, index, self) =>
      index === self.findIndex((r) => 
        r.type === result.type && 
        (r.surah?.number === result.surah?.number || r.juzNumber === result.juzNumber)
      )
    );

    return unique.slice(0, 10); // Limit to 10 results
  };

  const handleKeyDown = (e) => {
    if (!showResults || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelectResult(results[activeIndex]);
    } else if (e.key === 'Escape') {
      setShowResults(false);
    }
  };

  const handleSelectResult = (result) => {
    if (!result) return;

    if (result.type === 'surah') {
      onNavigate('quran-viewer', { surah: result.surah.number, page: result.surah.pageStart });
    } else if (result.type === 'ayah') {
      // Navigate to the page containing this ayah
      onNavigate('quran-viewer', { surah: result.surah.number, page: result.surah.pageStart, ayah: result.ayahNumber });
    } else if (result.type === 'page') {
      onNavigate('quran-viewer', { page: result.pageNumber });
    } else if (result.type === 'juz') {
      onNavigate('quran-viewer', { page: result.surahs[0].pageStart });
    }

    setQuery('');
    setShowResults(false);
  };

  const getResultIcon = (type) => {
    switch (type) {
      case 'surah': return 'fa-book-quran';
      case 'ayah': return 'fa-quote-right';
      case 'juz': return 'fa-layer-group';
      case 'page': return 'fa-file';
      default: return 'fa-search';
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <i className="fa-solid fa-search search-icon"></i>
        <input
          type="text"
          className="search-input"
          placeholder="Search Surah, Ayah (e.g., 2:255), Juz, or Page..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowResults(true)}
        />
        {query && (
          <button 
            className="search-clear"
            onClick={() => {
              setQuery('');
              setResults([]);
              setShowResults(false);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((result, index) => (
            <div
              key={index}
              className={`search-result-item ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleSelectResult(result)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <i className={`fa-solid ${getResultIcon(result.type)}`}></i>
              <div className="result-content">
                <div className="result-title">
                  {result.type === 'surah' && (
                    <>
                      <strong>{result.surah.number}. {result.surah.nameEnglish}</strong>
                      <span className="result-arabic">{result.surah.nameArabic}</span>
                    </>
                  )}
                  {result.type === 'ayah' && (
                    <>
                      <strong>Surah {result.surah.number}, Ayah {result.ayahNumber}</strong>
                      <span className="result-arabic">{result.surah.nameArabic}</span>
                    </>
                  )}
                  {result.type === 'juz' && (
                    <strong>Juz {result.juzNumber}</strong>
                  )}
                  {result.type === 'page' && (
                    <strong>Page {result.pageNumber}</strong>
                  )}
                </div>
                <div className="result-meta">
                  {result.type === 'surah' && (
                    <span>Juz {result.surah.juz.join(', ')} • {result.surah.ayahs} Ayahs • Pages {result.surah.pageStart}-{result.surah.pageEnd}</span>
                  )}
                  {result.type === 'ayah' && (
                    <span>{result.surah.nameEnglish} • Page {result.surah.pageStart}</span>
                  )}
                  {result.type === 'juz' && (
                    <span>{result.surahs.length} Surahs</span>
                  )}
                  {result.type === 'page' && (
                    <span>In {result.surah.nameEnglish}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showResults && query.trim().length >= 2 && results.length === 0 && (
        <div className="search-results">
          <div className="search-no-results">
            <i className="fa-solid fa-magnifying-glass"></i>
            <p>No results found for "{query}"</p>
            <small>Try searching by Surah name, number, Ayah (e.g., 2:255), Juz, or page</small>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
