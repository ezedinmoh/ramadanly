import React from 'react';
import CircularProgress from '../CircularProgress';

function DashboardView({ data, onShowCatchUp }) {
  const memorizedCount = data.progress.memorizedPages.length;
  const readCount = data.progress.readPages.length;
  const totalMemorize = data.user.goal.totalPagesToMemorize || 100;
  const totalRead = (data.user.goal.totalJuzToRead || 30) * 20;
  
  const memProgress = (memorizedCount / totalMemorize) * 100;
  const readProgress = (readCount / totalRead) * 100;
  const overallProgress = (memProgress + readProgress) / 2;

  // Check if behind schedule
  const originalDailyMemorize = data.plan?.daily[0]?.memorization.pages || 2;
  const originalDailyRead = data.plan?.daily[0]?.reading.pages || 20;
  const expectedMemorized = originalDailyMemorize * (data.user.ramadanDay - 1);
  const expectedRead = originalDailyRead * (data.user.ramadanDay - 1);
  const isBehind = memorizedCount < expectedMemorized || readCount < expectedRead;

  // Calculate additional stats
  const daysRemaining = 30 - data.user.ramadanDay;
  const totalAchievements = data.achievements.length;
  const completionRate = data.user.ramadanDay > 0 ? 
    ((memorizedCount + readCount) / (data.user.ramadanDay * 2)) * 100 : 0;
  
  // Calculate today's tasks
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = data.progress.dailyChecklist[today] || { memorized: [], revised: [], read: [] };
  const todayCompleted = todayTasks.memorized.length + todayTasks.revised.length + todayTasks.read.length;
  
  // Calculate weekly progress
  const thisWeek = Math.ceil(data.user.ramadanDay / 7);
  const weekStart = (thisWeek - 1) * 7 + 1;
  const weekEnd = Math.min(thisWeek * 7, 30);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2 className="section-title">
            <i className="fas fa-chart-line"></i>
            Your Progress Dashboard
          </h2>
          <p className="dashboard-subtitle">
            Day {data.user.ramadanDay} of 30 • Week {thisWeek} • {daysRemaining} days remaining
          </p>
        </div>
        <div className="dashboard-actions">
          {isBehind && onShowCatchUp && (
            <button 
              className="btn-warning"
              onClick={onShowCatchUp}
            >
              <i className="fas fa-triangle-exclamation"></i>
              Catch Up Plan
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="quick-stats-grid">
        <div className="quick-stat-card">
          <div className="quick-stat-icon">
            <i className="fas fa-calendar-day"></i>
          </div>
          <div className="quick-stat-content">
            <div className="quick-stat-value">{data.user.ramadanDay}</div>
            <div className="quick-stat-label">Current Day</div>
          </div>
        </div>
        
        <div className="quick-stat-card">
          <div className="quick-stat-icon streak">
            <i className="fas fa-fire"></i>
          </div>
          <div className="quick-stat-content">
            <div className="quick-stat-value">{data.progress.currentStreak}</div>
            <div className="quick-stat-label">Day Streak</div>
          </div>
        </div>
        
        <div className="quick-stat-card">
          <div className="quick-stat-icon success">
            <i className="fas fa-trophy"></i>
          </div>
          <div className="quick-stat-content">
            <div className="quick-stat-value">{totalAchievements}</div>
            <div className="quick-stat-label">Achievements</div>
          </div>
        </div>
        
        <div className="quick-stat-card">
          <div className="quick-stat-icon info">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="quick-stat-content">
            <div className="quick-stat-value">{todayCompleted}</div>
            <div className="quick-stat-label">Tasks Today</div>
          </div>
        </div>
      </div>
      
      {/* Goals Display */}
      {data.user.goal.reading && (
        <div className="goals-display-enhanced">
          <div className="goals-header">
            <h3>
              <i className="fas fa-bullseye"></i>
              Your Ramadan Goals
            </h3>
          </div>
          <div className="goals-grid">
            <div className="goal-item">
              <div className="goal-icon">
                <i className="fas fa-book-quran"></i>
              </div>
              <div className="goal-content">
                <div className="goal-label">Reading Goal</div>
                <div className="goal-value">{data.user.goal.reading}</div>
              </div>
            </div>
            <div className="goal-item">
              <div className="goal-icon">
                <i className="fas fa-brain"></i>
              </div>
              <div className="goal-content">
                <div className="goal-label">Memorization Goal</div>
                <div className="goal-value">{data.user.goal.memorization}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Progress Cards */}
      <div className="dashboard-grid">
        {/* Overall Progress Card */}
        <div className="stat-card overall-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Overall Progress</span>
            <span className="stat-card-icon"><i className="fas fa-chart-pie"></i></span>
          </div>
          <CircularProgress percentage={overallProgress} />
          <div className="overall-stats">
            <div className="overall-stat-item">
              <span className="overall-stat-label">Completion Rate</span>
              <span className="overall-stat-value">{Math.round(completionRate)}%</span>
            </div>
            <div className="overall-stat-item">
              <span className="overall-stat-label">Days Active</span>
              <span className="overall-stat-value">{data.user.ramadanDay}</span>
            </div>
          </div>
        </div>

        {/* Memorization Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Memorization Progress</span>
            <span className="stat-card-icon"><i className="fas fa-brain"></i></span>
          </div>
          <div className="stat-card-value">{memorizedCount}<span className="stat-card-total">/{totalMemorize}</span></div>
          <div className="stat-card-label">Pages Memorized</div>
          <div className="progress-bar-container">
            <div className="progress-bar-label">
              <span>Progress</span>
              <span>{Math.round(memProgress)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${memProgress}%` }}></div>
            </div>
          </div>
          <div className="stat-card-footer">
            <div className="footer-stat">
              <i className="fas fa-calendar-check"></i>
              <span>Expected: {expectedMemorized} pages</span>
            </div>
            {memorizedCount >= expectedMemorized ? (
              <div className="footer-badge success">
                <i className="fas fa-check"></i>
                On Track
              </div>
            ) : (
              <div className="footer-badge warning">
                <i className="fas fa-exclamation"></i>
                Behind
              </div>
            )}
          </div>
        </div>

        {/* Reading Card */}
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Reading Progress</span>
            <span className="stat-card-icon"><i className="fas fa-book-open"></i></span>
          </div>
          <div className="stat-card-value">{Math.floor(readCount / 20)}<span className="stat-card-total">/{data.user.goal.totalJuzToRead || 30}</span></div>
          <div className="stat-card-label">Juz Completed</div>
          <div className="progress-bar-container">
            <div className="progress-bar-label">
              <span>Progress</span>
              <span>{Math.round(readProgress)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${readProgress}%` }}></div>
            </div>
          </div>
          <div className="stat-card-footer">
            <div className="footer-stat">
              <i className="fas fa-book"></i>
              <span>{readCount} pages read</span>
            </div>
            {readCount >= expectedRead ? (
              <div className="footer-badge success">
                <i className="fas fa-check"></i>
                On Track
              </div>
            ) : (
              <div className="footer-badge warning">
                <i className="fas fa-exclamation"></i>
                Behind
              </div>
            )}
          </div>
        </div>

        {/* Streak Card */}
        <div className="streak-card-enhanced">
          <div className="streak-header">
            <span className="streak-title">
              <i className="fas fa-fire"></i>
              Consistency Streak
            </span>
          </div>
          <div className="streak-main">
            <div className="streak-flame-large">🔥</div>
            <div className="streak-number-large">{data.progress.currentStreak}</div>
            <div className="streak-label-large">Days in a Row</div>
          </div>
          <div className="streak-stats-grid">
            <div className="streak-stat-box">
              <div className="streak-stat-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="streak-stat-content">
                <div className="streak-stat-value">{data.progress.longestStreak}</div>
                <div className="streak-stat-label">Best Streak</div>
              </div>
            </div>
            <div className="streak-stat-box">
              <div className="streak-stat-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="streak-stat-content">
                <div className="streak-stat-value">{data.user.ramadanDay}</div>
                <div className="streak-stat-label">Ramadan Day</div>
              </div>
            </div>
          </div>
          {data.progress.currentStreak >= 7 && (
            <div className="streak-message">
              <i className="fas fa-star"></i>
              Amazing! Keep up the great work!
            </div>
          )}
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="weekly-summary-card">
        <div className="weekly-summary-header">
          <h3>
            <i className="fas fa-calendar-week"></i>
            Week {thisWeek} Summary
          </h3>
          <span className="week-range">Days {weekStart} - {weekEnd}</span>
        </div>
        <div className="weekly-summary-content">
          <div className="weekly-stat">
            <div className="weekly-stat-label">
              <i className="fas fa-tasks"></i>
              Tasks Completed
            </div>
            <div className="weekly-stat-value">{todayCompleted * 7}</div>
          </div>
          <div className="weekly-stat">
            <div className="weekly-stat-label">
              <i className="fas fa-percentage"></i>
              Completion Rate
            </div>
            <div className="weekly-stat-value">{Math.round(completionRate)}%</div>
          </div>
          <div className="weekly-stat">
            <div className="weekly-stat-label">
              <i className="fas fa-fire"></i>
              Active Days
            </div>
            <div className="weekly-stat-value">{Math.min(data.user.ramadanDay, 7)}/7</div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="motivation-card">
        <div className="motivation-icon">
          <i className="fas fa-quote-left"></i>
        </div>
        <div className="motivation-content">
          <p className="motivation-text">
            {overallProgress >= 80 ? 
              "Masha'Allah! You're doing exceptionally well. Keep up the amazing work!" :
              overallProgress >= 50 ?
              "Great progress! Stay consistent and you'll reach your goals." :
              "Every step counts. Keep going, you've got this!"}
          </p>
          <p className="motivation-hadith">
            "The most beloved deed to Allah is that which is done regularly, even if it is small." - Prophet Muhammad ﷺ
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
