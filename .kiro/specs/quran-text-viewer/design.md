# Quran Text Viewer - Design Document

## 📐 Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     QuranViewer                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │              QuranHeader                          │ │
│  │  [Surah ▼] [Juz ▼] [Page: 1/604] [Search] [⚙]  │ │
│  └───────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────┐ │
│  │              AyahDisplay                          │ │
│  │  ① Arabic Text                                    │ │
│  │     English Translation                           │ │
│  │  ② Arabic Text                                    │ │
│  │     English Translation                           │ │
│  └───────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────┐ │
│  │           NavigationFooter                        │ │
│  │  [← Previous] [🔖 Bookmark] [Next →]            │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
QuranViewer (Container)
├── QuranHeader
│   ├── SurahSelector
│   ├── JuzSelector
│   ├── PageInput
│   ├── SearchBar
│   └── SettingsButton
├── AyahDisplay
│   ├── AyahCard (repeated)
│   │   ├── AyahNumber
│   │   ├── ArabicText
│   │   ├── Translation
│   │   └── HighlightOverlay
│   └── LoadingSpinner
├── NavigationFooter
│   ├── PreviousButton
│   ├── BookmarkButton
│   └── NextButton
└── Sidebar (collapsible)
    ├── BookmarksList
    ├── HighlightControls
    └── ReadingSettings
```

## 🎨 Component Design

### 1. QuranViewer (Main Container)

**Purpose**: Main container managing state and data flow

**State Management**:
```javascript
const [currentPage, setCurrentPage] = useState(1);
const [currentSurah, setCurrentSurah] = useState(1);
const [currentJuz, setCurrentJuz] = useState(1);
const [ayahs, setAyahs] = useState([]);
const [loading, setLoading] = useState(false);
const [translationLanguage, setTranslationLanguage] = useState('english');
const [showTranslation, setShowTranslation] = useState(true);
const [fontSize, setFontSize] = useState('medium');
const [highlights, setHighlights] = useState({});
const [bookmarks, setBookmarks] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
```

**Key Methods**:
- `loadPage(pageNumber)` - Fetch and display page
- `loadSurah(surahNumber)` - Load specific Surah
- `loadJuz(juzNumber)` - Load specific Juz
- `highlightAyah(surahAyah, color)` - Add highlight
- `addBookmark(page, note)` - Save bookmark
- `searchAyahs(query)` - Search functionality
- `updateProgress(page)` - Sync with dashboard

**Props**: None (top-level component)

**Data Flow**:
```
API/Cache → QuranViewer → Child Components
User Action → QuranViewer → Update State → Re-render
State Change → localStorage → Persist
```

### 2. QuranHeader

**Purpose**: Navigation controls and settings

**Props**:
```javascript
{
  currentPage: number,
  currentSurah: number,
  currentJuz: number,
  onPageChange: (page) => void,
  onSurahChange: (surah) => void,
  onJuzChange: (juz) => void,
  onSearch: (query) => void,
  onSettingsOpen: () => void
}
```

**Layout**:
```jsx
<div className="quran-header">
  <div className="header-left">
    <SurahSelector value={currentSurah} onChange={onSurahChange} />
    <JuzSelector value={currentJuz} onChange={onJuzChange} />
  </div>
  <div className="header-center">
    <PageInput value={currentPage} onChange={onPageChange} />
  </div>
  <div className="header-right">
    <SearchBar onSearch={onSearch} />
    <SettingsButton onClick={onSettingsOpen} />
  </div>
</div>
```

### 3. SurahSelector

**Purpose**: Dropdown to select Surah

**Props**:
```javascript
{
  value: number,
  onChange: (surahNumber) => void,
  language: 'english' | 'arabic' | 'amharic'
}
```

**Implementation**:
```jsx
<select className="surah-selector" value={value} onChange={e => onChange(Number(e.target.value))}>
  {allSurahs.map(surah => (
    <option key={surah.number} value={surah.number}>
      {surah.number}. {getSurahName(surah, language)}
    </option>
  ))}
</select>
```

**Data Source**: `src/data/quranData.js`

### 4. AyahDisplay

**Purpose**: Render Ayahs with translations

**Props**:
```javascript
{
  ayahs: Array<Ayah>,
  showTranslation: boolean,
  translationLanguage: string,
  fontSize: 'small' | 'medium' | 'large',
  highlights: Object,
  onAyahClick: (surahAyah) => void,
  loading: boolean
}
```

**Ayah Data Structure**:
```javascript
{
  surah: 1,
  ayah: 1,
  text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  translation: {
    english: "In the name of Allah...",
    amharic: "በአላህ ስም..."
  },
  page: 1,
  juz: 1
}
```

**Rendering Logic**:
```jsx
<div className="ayah-display">
  {loading ? (
    <LoadingSpinner />
  ) : (
    ayahs.map(ayah => (
      <AyahCard
        key={`${ayah.surah}:${ayah.ayah}`}
        ayah={ayah}
        showTranslation={showTranslation}
        translationLanguage={translationLanguage}
        fontSize={fontSize}
        highlight={highlights[`${ayah.surah}:${ayah.ayah}`]}
        onClick={() => onAyahClick(`${ayah.surah}:${ayah.ayah}`)}
      />
    ))
  )}
</div>
```

### 5. AyahCard

**Purpose**: Display single Ayah with styling

**Props**:
```javascript
{
  ayah: Ayah,
  showTranslation: boolean,
  translationLanguage: string,
  fontSize: string,
  highlight: { color: string } | null,
  onClick: () => void
}
```

**Layout**:
```jsx
<div 
  className={`ayah-card ${highlight ? 'highlighted' : ''}`}
  style={{ backgroundColor: highlight?.color }}
  onClick={onClick}
>
  <div className="ayah-number">{ayah.ayah}</div>
  <div className={`ayah-text-arabic ${fontSize}`}>
    {ayah.text}
  </div>
  {showTranslation && (
    <div className="ayah-translation">
      {ayah.translation[translationLanguage]}
    </div>
  )}
</div>
```

### 6. NavigationFooter

**Purpose**: Page navigation controls

**Props**:
```javascript
{
  currentPage: number,
  totalPages: number,
  onPrevious: () => void,
  onNext: () => void,
  onBookmark: () => void,
  isBookmarked: boolean
}
```

**Layout**:
```jsx
<div className="navigation-footer">
  <button 
    className="btn-nav" 
    onClick={onPrevious}
    disabled={currentPage === 1}
  >
    <i className="fa-solid fa-chevron-left"></i> Previous
  </button>
  
  <button 
    className={`btn-bookmark ${isBookmarked ? 'active' : ''}`}
    onClick={onBookmark}
  >
    <i className="fa-solid fa-bookmark"></i>
    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
  </button>
  
  <button 
    className="btn-nav" 
    onClick={onNext}
    disabled={currentPage === totalPages}
  >
    Next <i className="fa-solid fa-chevron-right"></i>
  </button>
</div>
```

## 🔌 API Integration

### Quran.com API Service

**File**: `src/services/quranAPI.js`

```javascript
const BASE_URL = 'https://api.quran.com/api/v4';

// Translation IDs
const TRANSLATIONS = {
  english: 131, // Sahih International
  amharic: 174  // Amharic translation
};

export const quranAPI = {
  // Fetch all chapters
  async getChapters() {
    const response = await fetch(`${BASE_URL}/chapters`);
    return response.json();
  },

  // Fetch verses by chapter
  async getVersesByChapter(chapterNumber, translationId) {
    const response = await fetch(
      `${BASE_URL}/verses/by_chapter/${chapterNumber}?translations=${translationId}`
    );
    return response.json();
  },

  // Fetch verses by page
  async getVersesByPage(pageNumber, translationId) {
    const response = await fetch(
      `${BASE_URL}/verses/by_page/${pageNumber}?translations=${translationId}`
    );
    return response.json();
  },

  // Fetch verses by Juz
  async getVersesByJuz(juzNumber, translationId) {
    const response = await fetch(
      `${BASE_URL}/verses/by_juz/${juzNumber}?translations=${translationId}`
    );
    return response.json();
  },

  // Search verses
  async searchVerses(query, translationId) {
    const response = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}&translation=${translationId}`
    );
    return response.json();
  }
};
```

### Caching Layer

**File**: `src/services/quranCache.js`

```javascript
const CACHE_KEY_PREFIX = 'quran_cache_';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

export const quranCache = {
  // Get from cache
  get(key) {
    const cached = localStorage.getItem(CACHE_KEY_PREFIX + key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      this.remove(key);
      return null;
    }
    
    return data;
  },

  // Set to cache
  set(key, data) {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(cacheData));
  },

  // Remove from cache
  remove(key) {
    localStorage.removeItem(CACHE_KEY_PREFIX + key);
  },

  // Clear all cache
  clear() {
    Object.keys(localStorage)
      .filter(key => key.startsWith(CACHE_KEY_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
};
```

### Data Fetching Hook

**File**: `src/hooks/useQuranData.js`

```javascript
import { useState, useEffect } from 'react';
import { quranAPI } from '../services/quranAPI';
import { quranCache } from '../services/quranCache';

export const useQuranData = (page, translationLanguage) => {
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAyahs = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check cache first
        const cacheKey = `page_${page}_${translationLanguage}`;
        const cached = quranCache.get(cacheKey);
        
        if (cached) {
          setAyahs(cached);
          setLoading(false);
          return;
        }

        // Fetch from API
        const translationId = TRANSLATIONS[translationLanguage];
        const response = await quranAPI.getVersesByPage(page, translationId);
        
        // Transform data
        const transformedAyahs = response.verses.map(verse => ({
          surah: verse.verse_key.split(':')[0],
          ayah: verse.verse_key.split(':')[1],
          text: verse.text_uthmani,
          translation: {
            [translationLanguage]: verse.translations[0].text
          },
          page: verse.page_number,
          juz: verse.juz_number
        }));

        // Cache the data
        quranCache.set(cacheKey, transformedAyahs);
        setAyahs(transformedAyahs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAyahs();
  }, [page, translationLanguage]);

  return { ayahs, loading, error };
};
```

## 💾 State Management

### Local Storage Structure

```javascript
{
  // Highlights
  quran_highlights: {
    "1:1": { color: "yellow", date: "2024-02-18" },
    "2:255": { color: "green", date: "2024-02-19" }
  },

  // Bookmarks
  quran_bookmarks: [
    {
      id: "bookmark_1",
      page: 50,
      surah: 3,
      ayah: 100,
      date: "2024-02-18",
      note: "Continue reading here"
    }
  ],

  // Reading preferences
  quran_preferences: {
    fontSize: "medium",
    showTranslation: true,
    translationLanguage: "english",
    showTransliteration: false,
    readingMode: "page",
    theme: "dark"
  },

  // Reading progress
  quran_progress: {
    lastPage: 50,
    lastSurah: 3,
    lastAyah: 100,
    pagesRead: [1, 2, 3, ...],
    totalReadingTime: 3600, // seconds
    lastReadDate: "2024-02-18"
  }
}
```

### State Persistence Hook

**File**: `src/hooks/useQuranState.js`

```javascript
import { useState, useEffect } from 'react';

export const useQuranState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(`quran_${key}`);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(`quran_${key}`, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
```

## 🎨 Styling Design

### CSS Structure

**File**: `src/components/QuranViewer/QuranViewer.css`

```css
/* Container */
.quran-viewer {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

/* Header */
.quran-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: rgba(20, 38, 48, 0.6);
  border-radius: 16px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Ayah Display */
.ayah-display {
  background: rgba(20, 38, 48, 0.4);
  border-radius: 16px;
  padding: 2rem;
  min-height: 500px;
}

/* Ayah Card */
.ayah-card {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.ayah-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(123, 177, 126, 0.3);
}

.ayah-card.highlighted {
  border-width: 2px;
}

/* Ayah Number */
.ayah-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background: linear-gradient(145deg, #7bb17e, #8fc592);
  color: #0c1c2c;
  border-radius: 50%;
  font-weight: 700;
  margin-bottom: 1rem;
}

/* Arabic Text */
.ayah-text-arabic {
  font-family: 'Amiri', 'Traditional Arabic', serif;
  font-size: 2rem;
  line-height: 2.5;
  text-align: right;
  direction: rtl;
  color: #ffffff;
  margin-bottom: 1rem;
}

.ayah-text-arabic.small { font-size: 1.5rem; }
.ayah-text-arabic.medium { font-size: 2rem; }
.ayah-text-arabic.large { font-size: 2.5rem; }

/* Translation */
.ayah-translation {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #b2ccd6;
  text-align: left;
}

/* Navigation Footer */
.navigation-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: rgba(20, 38, 48, 0.6);
  border-radius: 16px;
  margin-top: 2rem;
  gap: 1rem;
}

.btn-nav {
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: rgba(123, 177, 126, 0.2);
  border: 1px solid rgba(123, 177, 126, 0.4);
  border-radius: 12px;
  color: #c7e6ca;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-nav:hover:not(:disabled) {
  background: rgba(123, 177, 126, 0.3);
  transform: translateY(-2px);
}

.btn-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.btn-bookmark {
  padding: 0.75rem 1.5rem;
  background: rgba(244, 208, 63, 0.2);
  border: 1px solid rgba(244, 208, 63, 0.4);
  border-radius: 12px;
  color: #f4d03f;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-bookmark.active {
  background: rgba(244, 208, 63, 0.4);
  border-color: #f4d03f;
}

/* Loading Spinner */
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(123, 177, 126, 0.2);
  border-top-color: #7bb17e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .quran-header {
    flex-direction: column;
  }
  
  .ayah-text-arabic {
    font-size: 1.5rem;
  }
  
  .navigation-footer {
    flex-direction: column;
  }
  
  .btn-nav {
    width: 100%;
  }
}
```

## 🔄 Data Flow Diagram

```
User Action (Select Page)
        ↓
QuranViewer.loadPage(pageNumber)
        ↓
useQuranData Hook
        ↓
Check quranCache
        ↓
    Cache Hit? ──Yes──→ Return Cached Data
        ↓ No                    ↓
    quranAPI.getVersesByPage    ↓
        ↓                       ↓
    Transform Data              ↓
        ↓                       ↓
    Save to Cache               ↓
        ↓                       ↓
    Return Data ←───────────────┘
        ↓
Update State (setAyahs)
        ↓
Re-render AyahDisplay
        ↓
Update Progress (localStorage)
        ↓
Sync with Dashboard
```

## 🧪 Testing Strategy

### Unit Tests

**Test Files**:
- `QuranViewer.test.js`
- `AyahDisplay.test.js`
- `quranAPI.test.js`
- `quranCache.test.js`

**Test Cases**:
```javascript
describe('QuranViewer', () => {
  test('loads page 1 on mount', () => {});
  test('navigates to next page', () => {});
  test('navigates to previous page', () => {});
  test('changes Surah', () => {});
  test('adds highlight', () => {});
  test('adds bookmark', () => {});
  test('persists state', () => {});
});

describe('quranAPI', () => {
  test('fetches verses by page', async () => {});
  test('handles API errors', async () => {});
  test('caches responses', async () => {});
});
```

### Integration Tests

**Scenarios**:
1. User navigates through pages
2. User highlights multiple Ayahs
3. User bookmarks pages
4. User searches for Ayahs
5. Offline mode works
6. Progress syncs with dashboard

## 📱 Mobile Optimization

### Touch Gestures

```javascript
// Swipe navigation
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};

const handleTouchEnd = (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // Swipe left - next page
      handleNextPage();
    } else {
      // Swipe right - previous page
      handlePreviousPage();
    }
  }
};
```

### Mobile-Specific Features

- Larger touch targets (min 44x44px)
- Swipe gestures for navigation
- Bottom sheet for settings
- Sticky header on scroll
- Optimized font sizes
- Reduced animations

## ♿ Accessibility

### ARIA Labels

```jsx
<button 
  aria-label="Go to next page"
  aria-disabled={currentPage === 604}
>
  Next
</button>

<div 
  role="article"
  aria-label={`Ayah ${ayah.ayah} of Surah ${ayah.surah}`}
>
  {/* Ayah content */}
</div>
```

### Keyboard Navigation

- `Arrow Left/Right`: Previous/Next page
- `Home/End`: First/Last page
- `Tab`: Navigate through controls
- `Enter/Space`: Activate buttons
- `/`: Focus search
- `Esc`: Close modals

### Screen Reader Support

- Semantic HTML
- Proper heading hierarchy
- Alt text for icons
- ARIA live regions for updates
- Focus management

## 🚀 Performance Optimization

### Lazy Loading

```javascript
// Load Ayahs on demand
const AyahCard = React.lazy(() => import('./AyahCard'));

// Virtualized list for long pages
import { FixedSizeList } from 'react-window';
```

### Memoization

```javascript
const MemoizedAyahCard = React.memo(AyahCard, (prev, next) => {
  return prev.ayah.text === next.ayah.text &&
         prev.highlight === next.highlight;
});
```

### Code Splitting

```javascript
// Split by route
const QuranViewer = lazy(() => import('./components/QuranViewer'));

// Split by feature
const BookmarkPanel = lazy(() => import('./components/BookmarkPanel'));
```

## 🔐 Security Considerations

### Input Validation

```javascript
// Validate page number
const isValidPage = (page) => {
  return Number.isInteger(page) && page >= 1 && page <= 604;
};

// Sanitize search input
const sanitizeSearch = (query) => {
  return query.replace(/<[^>]*>/g, '').trim();
};
```

### XSS Prevention

- Use React's built-in escaping
- Sanitize user input
- No `dangerouslySetInnerHTML`
- Validate API responses

## 📊 Analytics & Tracking

### Events to Track

```javascript
// Page views
trackEvent('quran_viewer_page_view', { page: currentPage });

// Navigation
trackEvent('quran_viewer_navigate', { 
  from: previousPage, 
  to: currentPage,
  method: 'button' // button, swipe, keyboard
});

// Highlights
trackEvent('quran_viewer_highlight', { 
  surah: ayah.surah,
  ayah: ayah.ayah,
  color: highlightColor
});

// Bookmarks
trackEvent('quran_viewer_bookmark', { 
  page: currentPage,
  surah: currentSurah
});

// Reading time
trackEvent('quran_viewer_reading_time', { 
  duration: readingTime,
  pages: pagesRead
});
```

## 🎯 Success Metrics

### Performance Metrics
- Initial load: < 2s
- Page navigation: < 500ms
- API response: < 1s
- Cache hit rate: > 80%

### User Engagement
- Pages per session: > 10
- Session duration: > 15 min
- Return rate: > 70%
- Bookmark usage: > 50%

### Quality Metrics
- Error rate: < 1%
- Crash rate: < 0.1%
- Accessibility score: > 90
- Lighthouse score: > 90

## 🔄 Future Enhancements

### Phase 3.1 (Post-Launch)
- Audio recitation
- Tafsir integration
- Word-by-word translation
- Tajweed highlighting

### Phase 3.2 (Advanced)
- Offline sync
- Multiple translations side-by-side
- Notes on Ayahs
- Share Ayahs
- Print functionality

---

**Design Status**: Complete ✅  
**Next Step**: Create tasks.md  
**Ready for**: Implementation breakdown
