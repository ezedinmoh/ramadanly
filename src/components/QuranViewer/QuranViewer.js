import React, { useState, useEffect } from 'react';
import { useQuranData } from '../../hooks/useQuranData';
import { useQuranState } from '../../hooks/useQuranState';
import { useQuranAudio } from '../../hooks/useQuranAudio';
import QuranHeader from './QuranHeader';
import AyahDisplay from './AyahDisplay';
import NavigationFooter from './NavigationFooter';
import AudioControls from './AudioControls';
import './QuranViewer.css';

const QuranViewer = ({ initialPage = 1, initialSurah = null, options = {} }) => {
  // Navigation state
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentSurah, setCurrentSurah] = useState(initialSurah || 1);
  const [currentJuz, setCurrentJuz] = useState(1);
  const [viewMode, setViewMode] = useState('page'); // 'page' or 'ayah'
  const [selectedAyah, setSelectedAyah] = useState(null);

  // Update page when initialPage prop changes
  useEffect(() => {
    if (initialPage && initialPage !== currentPage) {
      setCurrentPage(initialPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage]);

  // Update surah when initialSurah prop changes
  useEffect(() => {
    if (initialSurah && initialSurah !== currentSurah) {
      setCurrentSurah(initialSurah);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSurah]);

  // Preferences state (persisted)
  const [showTranslation, setShowTranslation] = useQuranState('show_translation', true);
  const [fontSize, setFontSize] = useQuranState('font_size', 'medium');

  // User data state (persisted)
  const [highlights, setHighlights] = useQuranState('highlights', {});
  const [bookmarks, setBookmarks] = useQuranState('bookmarks', []);
  const [progress, setProgress] = useQuranState('progress', {
    lastPage: 1,
    pagesRead: [],
    totalReadingTime: 0,
    lastReadDate: null
  });

  // Fetch Quran data with both translations (only in page mode)
  const { ayahs, loading, error } = useQuranData(viewMode === 'page' ? currentPage : 1);

  // Handle ayah selection
  const handleAyahSelect = async (surahNumber, ayahNumber) => {
    try {
      const { quranAPI } = await import('../../services/quranAPI');
      const response = await quranAPI.getSpecificAyah(surahNumber, ayahNumber);
      
      if (response.verse) {
        const [surah, ayah] = response.verse.verse_key.split(':');
        const englishTrans = response.verse.translations?.find(t => t.resource_id === 131);
        
        const transformedAyah = {
          surah: parseInt(surah),
          ayah: parseInt(ayah),
          text: response.verse.text_uthmani,
          translation: englishTrans?.text || '',
          page: response.verse.page_number,
          juz: response.verse.juz_number,
          verseKey: response.verse.verse_key
        };
        setSelectedAyah(transformedAyah);
        setCurrentSurah(parseInt(surah));
        setCurrentJuz(response.verse.juz_number);
        setViewMode('ayah');
      }
    } catch (err) {
      console.error('Error fetching ayah:', err);
    }
  };

  // Switch back to page view
  const handleBackToPage = () => {
    setViewMode('page');
    setSelectedAyah(null);
  };

  // Get display ayahs based on view mode
  const displayAyahs = viewMode === 'ayah' && selectedAyah ? [selectedAyah] : ayahs;

  // Audio playback
  const audioControls = useQuranAudio(ayahs);

  // Debug logging
  useEffect(() => {
    console.log('QuranViewer State:', {
      currentPage,
      currentSurah,
      currentJuz,
      ayahsCount: ayahs.length,
      loading,
      error,
      initialPage,
      initialSurah
    });
  }, [currentPage, currentSurah, currentJuz, ayahs, loading, error, initialPage, initialSurah]);

  // Update current Surah and Juz based on page
  useEffect(() => {
    if (ayahs.length > 0) {
      setCurrentSurah(ayahs[0].surah);
      setCurrentJuz(ayahs[0].juz);
    }
  }, [ayahs]);

  // Track page read and update progress
  useEffect(() => {
    if (currentPage && !loading) {
      const newPagesRead = [...new Set([...progress.pagesRead, currentPage])];
      setProgress({
        ...progress,
        lastPage: currentPage,
        pagesRead: newPagesRead,
        lastReadDate: new Date().toISOString()
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, loading]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Navigation handlers
  const handlePageChange = (page) => {
    const pageNum = parseInt(page);
    if (pageNum >= 1 && pageNum <= 604) {
      setCurrentPage(pageNum);
    }
  };

  const handleSurahChange = (surahNumber) => {
    // Switch back to page view
    setViewMode('page');
    setSelectedAyah(null);
    
    // Import quranData to get Surah start page
    import('../../data/quranData').then(({ allSurahs }) => {
      const surah = allSurahs.find(s => s.number === surahNumber);
      if (surah) {
        setCurrentPage(surah.pageStart);
        setCurrentSurah(surahNumber);
      }
    });
  };

  const handleJuzChange = (juzNumber) => {
    // Switch back to page view
    setViewMode('page');
    setSelectedAyah(null);
    
    // Juz start pages (approximate)
    const juzStartPages = [1, 22, 42, 62, 82, 102, 121, 142, 162, 182, 201, 222, 242, 262, 282, 302, 322, 342, 362, 382, 402, 422, 442, 462, 482, 502, 522, 542, 562, 582];
    if (juzNumber >= 1 && juzNumber <= 30) {
      setCurrentPage(juzStartPages[juzNumber - 1]);
      setCurrentJuz(juzNumber);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < 604) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Highlight handlers
  const handleAyahClick = (verseKey) => {
    // Toggle highlight or show color picker
    if (highlights[verseKey]) {
      // Remove highlight
      const newHighlights = { ...highlights };
      delete newHighlights[verseKey];
      setHighlights(newHighlights);
    } else {
      // Add default yellow highlight
      setHighlights({
        ...highlights,
        [verseKey]: { color: 'rgba(244, 208, 63, 0.3)', date: new Date().toISOString() }
      });
    }
  };

  // Bookmark handlers
  const handleBookmarkToggle = () => {
    const existingBookmark = bookmarks.find(b => b.page === currentPage);
    
    if (existingBookmark) {
      // Remove bookmark
      setBookmarks(bookmarks.filter(b => b.page !== currentPage));
    } else {
      // Add bookmark
      const newBookmark = {
        id: `bookmark_${Date.now()}`,
        page: currentPage,
        surah: currentSurah,
        date: new Date().toISOString(),
        note: ''
      };
      setBookmarks([...bookmarks, newBookmark]);
    }
  };

  const isBookmarked = bookmarks.some(b => b.page === currentPage);

  // Stop audio when changing pages
  useEffect(() => {
    audioControls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Auto-play audio if requested
  useEffect(() => {
    if (options.autoPlayAudio && ayahs.length > 0 && !loading) {
      // Start playing the first ayah after a short delay
      const timer = setTimeout(() => {
        audioControls.playAyah(0);
      }, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.autoPlayAudio, ayahs.length, loading]);

  return (
    <div className="quran-viewer">
      <QuranHeader
        currentPage={currentPage}
        currentSurah={currentSurah}
        currentJuz={currentJuz}
        onPageChange={handlePageChange}
        onSurahChange={handleSurahChange}
        onJuzChange={handleJuzChange}
        onAyahSelect={handleAyahSelect}
        showTranslation={showTranslation}
        onShowTranslationToggle={() => setShowTranslation(!showTranslation)}
      />

      {viewMode === 'ayah' && (
        <div className="ayah-view-header">
          <button className="btn-back-to-page" onClick={handleBackToPage}>
            <i className="fa-solid fa-arrow-left"></i>
            Back to Page View
          </button>
          <div className="ayah-view-info">
            Viewing: Surah {selectedAyah?.surah}, Ayah {selectedAyah?.ayah}
          </div>
        </div>
      )}

      <AudioControls audioControls={audioControls} />

      <AyahDisplay
        ayahs={displayAyahs}
        loading={loading}
        error={error}
        showTranslation={showTranslation}
        fontSize={fontSize}
        highlights={highlights}
        onAyahClick={handleAyahClick}
        currentPlayingAyah={audioControls.currentAyahIndex}
        isPlaying={audioControls.isPlaying}
        onPlayAyah={audioControls.playAyah}
      />

      {viewMode === 'page' && (
        <NavigationFooter
          currentPage={currentPage}
          totalPages={604}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
          onBookmark={handleBookmarkToggle}
          isBookmarked={isBookmarked}
        />
      )}
    </div>
  );
};

export default QuranViewer;
