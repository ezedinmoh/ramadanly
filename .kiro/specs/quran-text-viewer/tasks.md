# Quran Text Viewer - Implementation Tasks

## 📋 Task Overview

This document breaks down the implementation of the Quran Text Viewer feature into actionable tasks organized by week and priority.

**Total Estimated Time**: 3 weeks  
**Priority**: High  
**Dependencies**: Phase 1 (Quran Data), Phase 2 (Plan Generator)

---

## Week 1: Foundation & Basic Display

### 1. Setup & Infrastructure

- [ ] 1.1 Create QuranViewer component structure
  - Create `src/components/QuranViewer/QuranViewer.js`
  - Create `src/components/QuranViewer/QuranViewer.css`
  - Set up basic component skeleton with state management

- [ ] 1.2 Create API service layer
  - Create `src/services/quranAPI.js`
  - Implement `getVersesByPage()` method
  - Implement `getVersesByChapter()` method
  - Implement `getVersesByJuz()` method
  - Add error handling and retry logic

- [ ] 1.3 Create caching layer
  - Create `src/services/quranCache.js`
  - Implement `get()`, `set()`, `remove()`, `clear()` methods
  - Add cache expiry logic (7 days)
  - Test cache persistence

- [ ] 1.4 Create custom hooks
  - Create `src/hooks/useQuranData.js` for data fetching
  - Create `src/hooks/useQuranState.js` for state persistence
  - Add loading and error states

### 2. Header Components

- [ ] 2.1 Create QuranHeader component
  - Create `src/components/QuranViewer/QuranHeader.js`
  - Layout with left/center/right sections
  - Responsive design for mobile

- [ ] 2.2 Create SurahSelector component
  - Create `src/components/QuranViewer/SurahSelector.js`
  - Dropdown with all 114 Surahs
  - Multi-language support (Arabic, English, Amharic)
  - Use data from `src/data/quranData.js`

- [ ] 2.3 Create JuzSelector component
  - Create `src/components/QuranViewer/JuzSelector.js`
  - Dropdown with Juz 1-30
  - Show Juz boundaries

- [ ] 2.4 Create PageInput component
  - Create `src/components/QuranViewer/PageInput.js`
  - Input field with validation (1-604)
  - Display current page / total pages
  - Handle invalid input gracefully

### 3. Ayah Display Components

- [ ] 3.1 Create AyahDisplay container
  - Create `src/components/QuranViewer/AyahDisplay.js`
  - Handle loading state with spinner
  - Handle error state
  - Render list of AyahCard components

- [ ] 3.2 Create AyahCard component
  - Create `src/components/QuranViewer/AyahCard.js`
  - Display Ayah number in circular badge
  - Display Arabic text (RTL, proper font)
  - Display translation
  - Add hover effects

- [ ] 3.3 Create LoadingSpinner component
  - Create `src/components/QuranViewer/LoadingSpinner.js`
  - Animated spinner matching app theme
  - Center alignment

### 4. Basic Navigation

- [ ] 4.1 Create NavigationFooter component
  - Create `src/components/QuranViewer/NavigationFooter.js`
  - Previous/Next buttons
  - Disable buttons at boundaries
  - Responsive layout

- [ ] 4.2 Implement page navigation logic
  - Handle next page
  - Handle previous page
  - Update URL/state
  - Scroll to top on navigation

### 5. Styling & Theme Integration

- [ ] 5.1 Create base styles
  - Add QuranViewer.css with container styles
  - Match existing app theme (moon gold, night blue)
  - Add responsive breakpoints

- [ ] 5.2 Style header components
  - Style QuranHeader layout
  - Style dropdowns and inputs
  - Add hover/focus states

- [ ] 5.3 Style Ayah display
  - Style AyahCard with proper spacing
  - Configure Arabic font (Amiri or similar)
  - Style translation text
  - Add subtle borders and shadows

- [ ] 5.4 Style navigation footer
  - Style buttons with theme colors
  - Add icons (Font Awesome)
  - Add disabled states

---

## Week 2: Translations & Advanced Navigation

### 6. Translation Support

- [ ] 6.1 Add translation language selector
  - Create `src/components/QuranViewer/LanguageSelector.js`
  - Toggle between English/Amharic/Both
  - Update API calls with translation ID

- [ ] 6.2 Implement multi-translation display
  - Fetch multiple translations simultaneously
  - Display both English and Amharic when "Both" selected
  - Style multiple translations clearly

- [ ] 6.3 Add translation toggle
  - Button to show/hide translations
  - Persist preference in localStorage
  - Smooth transition animation

### 7. Enhanced Navigation

- [ ] 7.1 Implement Surah navigation
  - Navigate to Surah start page
  - Update page/Juz when Surah changes
  - Smooth transition

- [ ] 7.2 Implement Juz navigation
  - Navigate to Juz start page
  - Update page/Surah when Juz changes
  - Show Juz boundaries

- [ ] 7.3 Add keyboard shortcuts
  - Arrow Left/Right for prev/next page
  - Home/End for first/last page
  - Numbers for quick page jump
  - Document shortcuts in help modal

- [ ] 7.4 Add mobile swipe gestures
  - Detect swipe left/right
  - Navigate pages on swipe
  - Add visual feedback

### 8. Highlighting System

- [ ] 8.1 Create highlight state management
  - Add highlights state to QuranViewer
  - Persist highlights in localStorage
  - Load highlights on mount

- [ ] 8.2 Implement Ayah click handler
  - Detect click on AyahCard
  - Show highlight color picker
  - Apply highlight with selected color

- [ ] 8.3 Create HighlightControls component
  - Create `src/components/QuranViewer/HighlightControls.js`
  - Color picker (yellow, green, blue, pink)
  - Remove highlight option
  - Show in modal or popover

- [ ] 8.4 Style highlighted Ayahs
  - Add background color to highlighted Ayahs
  - Add border to indicate highlight
  - Ensure text remains readable

### 9. Bookmark System

- [ ] 9.1 Create bookmark state management
  - Add bookmarks state to QuranViewer
  - Persist bookmarks in localStorage
  - Load bookmarks on mount

- [ ] 9.2 Implement bookmark button
  - Add bookmark button to NavigationFooter
  - Toggle bookmark on/off
  - Show active state when bookmarked

- [ ] 9.3 Create BookmarksList component
  - Create `src/components/QuranViewer/BookmarksList.js`
  - Display all bookmarks
  - Navigate to bookmark on click
  - Delete bookmark option

- [ ] 9.4 Add bookmark notes
  - Optional note field when bookmarking
  - Display notes in BookmarksList
  - Edit/delete notes

---

## Week 3: Integration, Search & Polish

### 10. Search Functionality

- [ ] 10.1 Create SearchBar component
  - Create `src/components/QuranViewer/SearchBar.js`
  - Input field with search icon
  - Clear button
  - Keyboard shortcut (/)

- [ ] 10.2 Implement search by Surah name
  - Filter Surahs by name
  - Show dropdown with results
  - Navigate to selected Surah

- [ ] 10.3 Implement search by Ayah reference
  - Parse "Surah:Ayah" format (e.g., "2:255")
  - Navigate to specific Ayah
  - Highlight searched Ayah

- [ ] 10.4 Implement keyword search
  - Add `searchVerses()` to quranAPI
  - Search in translation text
  - Display search results
  - Navigate to result on click

### 11. Reading Preferences

- [ ] 11.1 Create SettingsModal component
  - Create `src/components/QuranViewer/SettingsModal.js`
  - Modal overlay with settings form
  - Close button and backdrop click

- [ ] 11.2 Add font size controls
  - Small/Medium/Large options
  - Apply to Arabic text
  - Persist preference

- [ ] 11.3 Add reading mode toggle
  - Page mode (current)
  - Continuous scroll mode (future)
  - Persist preference

- [ ] 11.4 Add theme toggle integration
  - Use existing useTheme hook
  - Apply to QuranViewer components
  - Ensure readability in both themes

### 12. Progress Integration

- [ ] 12.1 Track pages read
  - Update pagesRead array on page view
  - Store in localStorage
  - Avoid duplicates

- [ ] 12.2 Track reading time
  - Start timer on page load
  - Stop timer on page change
  - Accumulate total reading time
  - Store in localStorage

- [ ] 12.3 Sync with Dashboard
  - Update Dashboard stats with Quran reading data
  - Show "Pages Read" stat
  - Show "Reading Time" stat
  - Update progress percentage

- [ ] 12.4 Update Checklist integration
  - Mark pages as read in Checklist
  - Show Quran reading in daily tasks
  - Link to QuranViewer from Checklist

### 13. Mobile Optimization

- [ ] 13.1 Optimize touch targets
  - Ensure buttons are min 44x44px
  - Increase spacing on mobile
  - Test on various screen sizes

- [ ] 13.2 Optimize layout for mobile
  - Stack header elements vertically
  - Adjust font sizes for readability
  - Optimize navigation footer

- [ ] 13.3 Add pull-to-refresh (optional)
  - Refresh current page data
  - Show loading indicator
  - Clear cache if needed

- [ ] 13.4 Test on real devices
  - Test on iOS Safari
  - Test on Android Chrome
  - Fix any device-specific issues

### 14. Accessibility

- [ ] 14.1 Add ARIA labels
  - Label all interactive elements
  - Add role attributes
  - Add aria-disabled states

- [ ] 14.2 Implement keyboard navigation
  - Test all keyboard shortcuts
  - Ensure focus management
  - Add focus indicators

- [ ] 14.3 Add screen reader support
  - Test with screen reader
  - Add live regions for updates
  - Ensure proper heading hierarchy

- [ ] 14.4 Test accessibility
  - Run Lighthouse accessibility audit
  - Fix any issues
  - Aim for 90+ score

### 15. Testing & Bug Fixes

- [ ] 15.1 Write unit tests
  - Test QuranViewer component
  - Test API service
  - Test cache service
  - Test custom hooks

- [ ] 15.2 Write integration tests
  - Test navigation flow
  - Test highlight/bookmark flow
  - Test search functionality
  - Test offline mode

- [ ] 15.3 Manual testing
  - Test all features end-to-end
  - Test on different browsers
  - Test on different devices
  - Create bug list

- [ ] 15.4 Fix bugs
  - Fix critical bugs
  - Fix high-priority bugs
  - Fix medium-priority bugs
  - Document known issues

### 16. Performance Optimization

- [ ] 16.1 Optimize API calls
  - Implement request debouncing
  - Batch requests where possible
  - Add request cancellation

- [ ] 16.2 Optimize rendering
  - Memoize AyahCard components
  - Use React.memo for expensive components
  - Optimize re-renders

- [ ] 16.3 Optimize bundle size
  - Code split QuranViewer
  - Lazy load heavy components
  - Analyze bundle with webpack-bundle-analyzer

- [ ] 16.4 Performance testing
  - Run Lighthouse performance audit
  - Measure load times
  - Measure navigation times
  - Optimize bottlenecks

### 17. Documentation & Polish

- [ ] 17.1 Add inline documentation
  - Add JSDoc comments to components
  - Document props and state
  - Add usage examples

- [ ] 17.2 Create user guide
  - Document all features
  - Add screenshots
  - Create quick start guide
  - Add to help section

- [ ] 17.3 Update main navigation
  - Add "Quran" link to Navbar
  - Add icon for Quran section
  - Update routing in App.js

- [ ] 17.4 Final polish
  - Review all animations
  - Check all edge cases
  - Ensure consistent styling
  - Final QA pass

---

## 🎯 Definition of Done

Each task is considered complete when:

- [ ] Code is written and follows project conventions
- [ ] Component is styled and matches design
- [ ] Functionality works as expected
- [ ] No console errors or warnings
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessible (keyboard + screen reader)
- [ ] Data persists correctly in localStorage
- [ ] Integrated with existing features
- [ ] Tested manually
- [ ] Code reviewed (if applicable)

## 📊 Progress Tracking

- **Week 1**: Tasks 1-5 (Foundation & Basic Display)
- **Week 2**: Tasks 6-9 (Translations & Advanced Navigation)
- **Week 3**: Tasks 10-17 (Integration, Search & Polish)

**Current Status**: Not Started  
**Completed Tasks**: 0 / 85  
**Progress**: 0%

---

## 🚀 Getting Started

To begin implementation:

1. Start with Task 1.1 (Create QuranViewer component structure)
2. Work through tasks sequentially within each week
3. Test each component as you build it
4. Update this file as tasks are completed
5. Mark tasks with `[x]` when done

## 📝 Notes

- Use existing `src/data/quranData.js` for Surah metadata
- Follow existing component patterns in `src/components/`
- Match styling with `src/App.css` theme
- Use existing hooks pattern from `src/hooks/`
- Test with real API early to catch issues
- Keep components small and focused
- Prioritize mobile experience

---

**Last Updated**: 2024-02-18  
**Status**: Ready for Implementation ✅
