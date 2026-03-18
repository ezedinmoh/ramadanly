import React, { useState } from 'react';
import TaskCategory from '../TaskCategory';
import WeeklyTracking from '../WeeklyTracking';

function ChecklistView({ data, onToggleTask, onSaveWeeklyNotes }) {
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = data.progress.dailyChecklist[today] || {
    memorized: [],
    revised: [],
    read: []
  };

  // Generate daily tasks
  const lastMemorized = data.progress.memorizedPages.length > 0 
    ? Math.max(...data.progress.memorizedPages) 
    : 560;

  const memorizationTasks = [
    { id: lastMemorized + 1, text: `Memorize Page ${lastMemorized + 1} (New)`, type: 'new' }
  ];

  const revisionTasks = [
    { id: lastMemorized, text: `Revise Page ${lastMemorized} (Yesterday's)`, type: 'yesterday' },
    { id: lastMemorized - 1, text: `Revise Page ${lastMemorized - 1} (2 days ago)`, type: '2days' },
    { id: lastMemorized - 6, text: `Revise Page ${lastMemorized - 6} (1 week ago)`, type: 'week' }
  ];

  const readingTasks = [
    { id: 'juz1', text: 'Read 1 Juz (20 pages)', type: 'daily' },
    { id: 'juz2', text: 'Read 1 Juz (20 pages)', type: 'daily' },
    { id: 'juz3', text: 'Read 1 Juz (20 pages)', type: 'daily' }
  ];

  const totalTasks = memorizationTasks.length + revisionTasks.length + readingTasks.length;
  const completedTasks = todayTasks.memorized.length + todayTasks.revised.length + todayTasks.read.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const [showWeeklyView, setShowWeeklyView] = useState(false);

  // Calculate current week
  const currentWeek = Math.ceil(data.user.ramadanDay / 7);
  
  // Generate week data if plan exists
  const getWeekData = () => {
    if (!data.plan || !data.plan.weekly) {
      // Generate basic week data
      const weekStart = (currentWeek - 1) * 7 + 1;
      const weekEnd = Math.min(currentWeek * 7, 30);
      const days = [];
      
      for (let day = weekStart; day <= weekEnd; day++) {
        const date = new Date(data.user.startDate);
        date.setDate(date.getDate() + day - 1);
        const dateKey = date.toISOString().split('T')[0];
        const dayChecklist = data.progress.dailyChecklist[dateKey];
        
        days.push({
          day,
          date: dateKey,
          completed: dayChecklist && (
            dayChecklist.memorized.length > 0 ||
            dayChecklist.revised.length > 0 ||
            dayChecklist.read.length > 0
          ),
          reading: { pages: 20 },
          memorization: { pages: 2 }
        });
      }
      
      return {
        week: currentWeek,
        days,
        totalReadingPages: 20 * days.length,
        totalMemorizationPages: 2 * days.length,
        notes: data.weeklyNotes?.[currentWeek] || ''
      };
    }
    
    const weekData = data.plan.weekly[currentWeek - 1];
    return {
      ...weekData,
      notes: data.weeklyNotes?.[currentWeek] || weekData.notes || ''
    };
  };

  return (
    <div className="checklist-container">
      <div className="checklist-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="checklist-title">📋 {showWeeklyView ? 'Weekly Summary' : "Today's Checklist"}</h2>
          <button 
            className="btn-outline btn-sm"
            onClick={() => setShowWeeklyView(!showWeeklyView)}
          >
            <i className={`fa-solid fa-${showWeeklyView ? 'list-check' : 'calendar-week'}`}></i>
            {showWeeklyView ? 'Daily View' : 'Weekly View'}
          </button>
        </div>
        <div className="checklist-subtitle">
          <span>Day {data.user.ramadanDay} of Ramadan</span>
          <span>•</span>
          <span>🔥 {data.progress.currentStreak} day streak</span>
        </div>
        <div className="progress-bar-container" style={{ marginTop: '1rem' }}>
          <div className="progress-bar-label">
            <span>{completedTasks}/{totalTasks} tasks completed</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {showWeeklyView ? (
        <WeeklyTracking 
          weekData={getWeekData()} 
          onSaveNotes={onSaveWeeklyNotes}
        />
      ) : (
        <>
          <TaskCategory
        title="Memorization"
        icon="fa-solid fa-brain"
        tasks={memorizationTasks}
        completedIds={todayTasks.memorized}
        onToggle={(taskId) => onToggleTask('memorization', taskId)}
      />

      <TaskCategory
        title="Revision"
        icon="fa-solid fa-rotate"
        tasks={revisionTasks}
        completedIds={todayTasks.revised}
        onToggle={(taskId) => onToggleTask('revision', taskId)}
      />

          <TaskCategory
            title="Reading"
            icon="fa-solid fa-book-open"
            tasks={readingTasks}
            completedIds={todayTasks.read}
            onToggle={(taskId) => onToggleTask('reading', taskId)}
          />
        </>
      )}
    </div>
  );
}

export default ChecklistView;
