import React, { useState } from 'react';
import { allSurahs } from '../../data/quranData';

function NotesView({ data, onSaveNote, onDeleteNote }) {
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [noteText, setNoteText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const notes = data.notes || { daily: {}, surah: {}, ayah: {} };

  const handleSaveNote = () => {
    if (!noteText.trim()) return;

    const noteData = {
      text: noteText,
      timestamp: new Date().toISOString(),
      type: activeTab
    };

    if (activeTab === 'daily') {
      onSaveNote('daily', selectedDate, noteData);
    } else if (activeTab === 'surah') {
      onSaveNote('surah', selectedSurah, noteData);
    }

    setNoteText('');
  };

  const handleDeleteNote = (type, key) => {
    onDeleteNote(type, key);
  };

  const filterNotes = (notesObj) => {
    if (!searchQuery) return notesObj;
    
    const filtered = {};
    Object.keys(notesObj).forEach(key => {
      const note = notesObj[key];
      if (note.text && note.text.toLowerCase().includes(searchQuery.toLowerCase())) {
        filtered[key] = note;
      }
    });
    return filtered;
  };

  const exportNotes = () => {
    const allNotes = {
      daily: notes.daily,
      surah: notes.surah,
      ayah: notes.ayah,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(allNotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ramadan-notes-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const renderDailyNotes = () => {
    const filteredNotes = filterNotes(notes.daily);
    const sortedDates = Object.keys(filteredNotes).sort().reverse();

    return (
      <div className="notes-section">
        <div className="notes-input-section">
          <div className="form-group">
            <label className="form-label">Select Date</label>
            <input
              type="date"
              className="form-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Note</label>
            <textarea
              className="form-textarea"
              rows="4"
              placeholder="Write your daily reflection, thoughts, or reminders..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>
          
          <button className="btn-primary" onClick={handleSaveNote}>
            <i className="fa-solid fa-save"></i> Save Note
          </button>
        </div>

        <div className="notes-list">
          <h3>Previous Notes</h3>
          {sortedDates.length === 0 ? (
            <p className="empty-state">No daily notes yet. Start writing!</p>
          ) : (
            sortedDates.map(date => (
              <div key={date} className="note-card">
                <div className="note-header">
                  <span className="note-date">
                    <i className="fa-solid fa-calendar"></i> {new Date(date).toLocaleDateString()}
                  </span>
                  <button 
                    className="btn-icon"
                    onClick={() => handleDeleteNote('daily', date)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
                <div className="note-content">{filteredNotes[date].text}</div>
                <div className="note-footer">
                  <small>{new Date(filteredNotes[date].timestamp).toLocaleString()}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderSurahNotes = () => {
    const filteredNotes = filterNotes(notes.surah);
    const surahNumbers = Object.keys(filteredNotes).sort((a, b) => Number(a) - Number(b));

    return (
      <div className="notes-section">
        <div className="notes-input-section">
          <div className="form-group">
            <label className="form-label">Select Surah</label>
            <select
              className="form-input"
              value={selectedSurah}
              onChange={(e) => setSelectedSurah(Number(e.target.value))}
            >
              {allSurahs.map(surah => (
                <option key={surah.number} value={surah.number}>
                  {surah.number}. {surah.nameEnglish} ({surah.nameArabic})
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Note</label>
            <textarea
              className="form-textarea"
              rows="4"
              placeholder="Write notes about this Surah - themes, lessons, reflections..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>
          
          <button className="btn-primary" onClick={handleSaveNote}>
            <i className="fa-solid fa-save"></i> Save Note
          </button>
        </div>

        <div className="notes-list">
          <h3>Surah Notes</h3>
          {surahNumbers.length === 0 ? (
            <p className="empty-state">No Surah notes yet. Start writing!</p>
          ) : (
            surahNumbers.map(surahNum => {
              const surah = allSurahs.find(s => s.number === Number(surahNum));
              return (
                <div key={surahNum} className="note-card">
                  <div className="note-header">
                    <span className="note-date">
                      <i className="fa-solid fa-book-quran"></i> {surah.nameEnglish} ({surah.nameArabic})
                    </span>
                    <button 
                      className="btn-icon"
                      onClick={() => handleDeleteNote('surah', surahNum)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                  <div className="note-content">{filteredNotes[surahNum].text}</div>
                  <div className="note-footer">
                    <small>{new Date(filteredNotes[surahNum].timestamp).toLocaleString()}</small>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h2 className="section-title">📝 My Notes</h2>
        <div className="notes-actions">
          <button className="btn-outline btn-sm" onClick={exportNotes}>
            <i className="fa-solid fa-download"></i> Export Notes
          </button>
        </div>
      </div>

      <div className="search-bar">
        <i className="fa-solid fa-search"></i>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          <i className="fa-solid fa-calendar-day"></i> Daily Notes
        </button>
        <button
          className={`tab ${activeTab === 'surah' ? 'active' : ''}`}
          onClick={() => setActiveTab('surah')}
        >
          <i className="fa-solid fa-book-quran"></i> Surah Notes
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'daily' && renderDailyNotes()}
        {activeTab === 'surah' && renderSurahNotes()}
      </div>
    </div>
  );
}

export default NotesView;
