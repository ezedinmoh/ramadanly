import React, { useState } from 'react';

function WeeklyTracking({ weekData, onSaveNotes }) {
  const [notes, setNotes] = useState(weekData.notes || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSaveNotes(weekData.week, notes);
    setIsEditing(false);
  };

  const calculateWeekProgress = () => {
    const totalDays = weekData.days.length;
    const completedDays = weekData.days.filter(day => day.completed).length;
    const percentage = Math.round((completedDays / totalDays) * 100);
    
    const totalPagesRead = weekData.days.reduce((sum, day) => 
      sum + (day.completed ? day.reading.pages : 0), 0
    );
    
    const totalPagesMemorized = weekData.days.reduce((sum, day) => 
      sum + (day.completed ? day.memorization.pages : 0), 0
    );

    return {
      percentage,
      completedDays,
      totalDays,
      totalPagesRead,
      totalPagesMemorized
    };
  };

  const progress = calculateWeekProgress();

  return (
    <div className="weekly-tracking">
      <div className="week-header">
        <h3>
          <i className="fa-solid fa-calendar-week"></i> Week {weekData.week}
        </h3>
        <span className="week-dates">
          Day {weekData.days[0]?.day} - Day {weekData.days[weekData.days.length - 1]?.day}
        </span>
      </div>

      <div className="week-progress">
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress.percentage}%` }}
          >
            {progress.percentage}%
          </div>
        </div>
        <div className="progress-stats">
          <span>{progress.completedDays}/{progress.totalDays} days completed</span>
        </div>
      </div>

      <div className="week-stats-grid">
        <div className="stat-card">
          <i className="fa-solid fa-book-open"></i>
          <div>
            <div className="stat-value">{progress.totalPagesRead}</div>
            <div className="stat-label">Pages Read</div>
          </div>
        </div>
        
        <div className="stat-card">
          <i className="fa-solid fa-brain"></i>
          <div>
            <div className="stat-value">{progress.totalPagesMemorized}</div>
            <div className="stat-label">Pages Memorized</div>
          </div>
        </div>
        
        <div className="stat-card">
          <i className="fa-solid fa-fire"></i>
          <div>
            <div className="stat-value">{progress.completedDays}</div>
            <div className="stat-label">Active Days</div>
          </div>
        </div>
      </div>

      <div className="week-notes">
        <div className="notes-header">
          <h4><i className="fa-solid fa-note-sticky"></i> Weekly Notes & Reflections</h4>
          {!isEditing && (
            <button 
              className="btn-icon" 
              onClick={() => setIsEditing(true)}
              title="Edit notes"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
          )}
        </div>
        
        {isEditing ? (
          <div className="notes-editor">
            <textarea
              className="notes-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your reflections, challenges, and achievements for this week..."
              rows="6"
            />
            <div className="notes-actions">
              <button className="btn-primary btn-sm" onClick={handleSave}>
                <i className="fa-solid fa-check"></i> Save
              </button>
              <button 
                className="btn-outline btn-sm" 
                onClick={() => {
                  setNotes(weekData.notes || '');
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="notes-display">
            {notes ? (
              <p>{notes}</p>
            ) : (
              <p className="notes-empty">
                <i className="fa-solid fa-circle-info"></i> No notes yet. Click edit to add your reflections.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WeeklyTracking;
