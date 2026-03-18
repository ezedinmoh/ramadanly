import React from 'react';

function AnalyticsView({ data }) {
  const avgPagesPerDay = data.user.ramadanDay > 0 
    ? (data.progress.memorizedPages.length / data.user.ramadanDay).toFixed(1)
    : 0;
  
  const consistencyScore = data.user.ramadanDay > 0
    ? Math.round((Object.keys(data.progress.dailyChecklist).length / data.user.ramadanDay) * 100)
    : 0;
  
  const daysRemaining = 30 - data.user.ramadanDay;
  
  const estimatedCompletion = new Date(data.user.startDate);
  estimatedCompletion.setDate(estimatedCompletion.getDate() + 30);

  return (
    <div className="analytics-container">
      <h2 className="section-title">📊 Analytics & Insights</h2>
      
      <div className="metrics-grid">
        <div className="metric-box">
          <div className="metric-value">{avgPagesPerDay}</div>
          <div className="metric-label">Avg Pages/Day</div>
        </div>
        <div className="metric-box">
          <div className="metric-value">{consistencyScore}%</div>
          <div className="metric-label">Consistency Score</div>
        </div>
        <div className="metric-box">
          <div className="metric-value">{daysRemaining}</div>
          <div className="metric-label">Days Remaining</div>
        </div>
        <div className="metric-box">
          <div className="metric-value">{estimatedCompletion.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          <div className="metric-label">Est. Completion</div>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Daily Progress Trend</h3>
        <p style={{ color: '#9bbac8', marginBottom: '1rem' }}>
          Your memorization and reading activity over time
        </p>
        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: '#b2ccd6' }}>
          <i className="fa-solid fa-chart-line" style={{ fontSize: '3rem', marginBottom: '1rem', color: '#8bbf8e' }}></i>
          <p>Chart visualization would appear here</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Showing daily completion rates and trends</p>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Performance Insights</h3>
        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Best Day</span>
              <span className="stat-card-icon">⭐</span>
            </div>
            <div className="stat-card-value">Friday</div>
            <div className="stat-card-label">Most productive day</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Retention Rate</span>
              <span className="stat-card-icon">🧠</span>
            </div>
            <div className="stat-card-value">92%</div>
            <div className="stat-card-label">Revision success</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Pace</span>
              <span className="stat-card-icon">⚡</span>
            </div>
            <div className="stat-card-value">On Track</div>
            <div className="stat-card-label">Goal projection</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsView;
