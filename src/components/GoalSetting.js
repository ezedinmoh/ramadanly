import React, { useState } from 'react';

function GoalSetting({ currentGoals, onSave, onClose }) {
  const [readingGoal, setReadingGoal] = useState(currentGoals.reading || '');
  const [memorizationGoal, setMemorizationGoal] = useState(currentGoals.memorization || '');
  const [readingType, setReadingType] = useState('completions'); // completions, juz, pages
  const [readingValue, setReadingValue] = useState(currentGoals.totalJuzToRead / 30 || 1);
  const [memorizationType, setMemorizationType] = useState('juz'); // juz, surahs, pages
  const [memorizationValue, setMemorizationValue] = useState(currentGoals.totalPagesToMemorize / 20 || 1);

  const handleSave = () => {
    let totalJuzToRead = 0;
    let totalPagesToMemorize = 0;
    let readingDescription = '';
    let memorizationDescription = '';

    // Calculate reading goal
    switch(readingType) {
      case 'completions':
        totalJuzToRead = readingValue * 30;
        readingDescription = `Complete Qur'an ${readingValue} time${readingValue > 1 ? 's' : ''}`;
        break;
      case 'juz':
        totalJuzToRead = readingValue;
        readingDescription = `Read ${readingValue} Juz`;
        break;
      case 'pages':
        totalJuzToRead = readingValue / 20;
        readingDescription = `Read ${readingValue} pages`;
        break;
      default:
        readingDescription = readingGoal;
    }

    // Calculate memorization goal
    switch(memorizationType) {
      case 'juz':
        totalPagesToMemorize = memorizationValue * 20;
        memorizationDescription = `Memorize ${memorizationValue} Juz`;
        break;
      case 'surahs':
        totalPagesToMemorize = memorizationValue * 2; // Approximate
        memorizationDescription = `Memorize ${memorizationValue} Surahs`;
        break;
      case 'pages':
        totalPagesToMemorize = memorizationValue;
        memorizationDescription = `Memorize ${memorizationValue} pages`;
        break;
      default:
        memorizationDescription = memorizationGoal;
    }

    const goals = {
      reading: readingDescription || readingGoal,
      memorization: memorizationDescription || memorizationGoal,
      totalJuzToRead,
      totalPagesToMemorize,
      customReadingGoal: readingGoal,
      customMemorizationGoal: memorizationGoal
    };

    onSave(goals);
  };

  return (
    <div className="modal active">
      <div className="modal-content goal-setting-modal">
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        
        <h2 className="modal-title">🎯 Set Your Ramadan Goals</h2>
        <p style={{ color: '#b2ccd6', marginBottom: '2rem' }}>
          Customize your reading and memorization targets for this blessed month
        </p>

        {/* Reading Goal Section */}
        <div className="goal-section">
          <h3 className="goal-section-title">
            <i className="fa-solid fa-book-open"></i> Reading Goal
          </h3>
          
          <div className="form-group">
            <label className="form-label">Goal Type</label>
            <select 
              className="form-select"
              value={readingType}
              onChange={(e) => setReadingType(e.target.value)}
            >
              <option value="completions">Complete Qur'an (Khatm)</option>
              <option value="juz">Number of Juz</option>
              <option value="pages">Number of Pages</option>
              <option value="custom">Custom Goal</option>
            </select>
          </div>

          {readingType !== 'custom' && (
            <div className="form-group">
              <label className="form-label">
                {readingType === 'completions' && 'How many times?'}
                {readingType === 'juz' && 'How many Juz?'}
                {readingType === 'pages' && 'How many pages?'}
              </label>
              <input
                type="number"
                className="form-input"
                value={readingValue}
                onChange={(e) => setReadingValue(Number(e.target.value))}
                min="1"
                max={readingType === 'completions' ? 10 : readingType === 'juz' ? 30 : 604}
              />
              <div className="goal-preview">
                {readingType === 'completions' && `= ${readingValue * 30} Juz (${readingValue * 604} pages)`}
                {readingType === 'juz' && `= ${Math.round(readingValue * 20)} pages`}
                {readingType === 'pages' && `= ${Math.round(readingValue / 20)} Juz`}
              </div>
            </div>
          )}

          {readingType === 'custom' && (
            <div className="form-group">
              <label className="form-label">Describe your goal</label>
              <input
                type="text"
                className="form-input"
                value={readingGoal}
                onChange={(e) => setReadingGoal(e.target.value)}
                placeholder="e.g., Read Juz Amma daily"
              />
            </div>
          )}
        </div>

        {/* Memorization Goal Section */}
        <div className="goal-section">
          <h3 className="goal-section-title">
            <i className="fa-solid fa-brain"></i> Memorization Goal
          </h3>
          
          <div className="form-group">
            <label className="form-label">Goal Type</label>
            <select 
              className="form-select"
              value={memorizationType}
              onChange={(e) => setMemorizationType(e.target.value)}
            >
              <option value="juz">Number of Juz</option>
              <option value="surahs">Number of Surahs</option>
              <option value="pages">Number of Pages</option>
              <option value="custom">Custom Goal</option>
            </select>
          </div>

          {memorizationType !== 'custom' && (
            <div className="form-group">
              <label className="form-label">
                {memorizationType === 'juz' && 'How many Juz?'}
                {memorizationType === 'surahs' && 'How many Surahs?'}
                {memorizationType === 'pages' && 'How many pages?'}
              </label>
              <input
                type="number"
                className="form-input"
                value={memorizationValue}
                onChange={(e) => setMemorizationValue(Number(e.target.value))}
                min="1"
                max={memorizationType === 'juz' ? 30 : memorizationType === 'surahs' ? 114 : 604}
              />
              <div className="goal-preview">
                {memorizationType === 'juz' && `= ${memorizationValue * 20} pages (approx.)`}
                {memorizationType === 'surahs' && `Varies by Surah length`}
                {memorizationType === 'pages' && `= ${Math.round(memorizationValue / 20)} Juz (approx.)`}
              </div>
            </div>
          )}

          {memorizationType === 'custom' && (
            <div className="form-group">
              <label className="form-label">Describe your goal</label>
              <input
                type="text"
                className="form-input"
                value={memorizationGoal}
                onChange={(e) => setMemorizationGoal(e.target.value)}
                placeholder="e.g., Memorize Surah Al-Mulk"
              />
            </div>
          )}
        </div>

        {/* Popular Presets */}
        <div className="goal-presets">
          <h4 style={{ color: '#c7e6ca', marginBottom: '1rem' }}>
            <i className="fa-solid fa-star"></i> Popular Goals
          </h4>
          <div className="preset-buttons">
            <button 
              className="btn-preset"
              onClick={() => {
                setReadingType('completions');
                setReadingValue(1);
                setMemorizationType('juz');
                setMemorizationValue(1);
              }}
            >
              Beginner
              <span>1 Khatm + 1 Juz</span>
            </button>
            <button 
              className="btn-preset"
              onClick={() => {
                setReadingType('completions');
                setReadingValue(2);
                setMemorizationType('juz');
                setMemorizationValue(2);
              }}
            >
              Intermediate
              <span>2 Khatm + 2 Juz</span>
            </button>
            <button 
              className="btn-preset"
              onClick={() => {
                setReadingType('completions');
                setReadingValue(3);
                setMemorizationType('juz');
                setMemorizationValue(3);
              }}
            >
              Advanced
              <span>3 Khatm + 3 Juz</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="goal-actions">
          <button className="btn-primary" onClick={handleSave}>
            <i className="fa-solid fa-check"></i> Save Goals
          </button>
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalSetting;
