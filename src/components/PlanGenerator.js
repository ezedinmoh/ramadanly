import React, { useState, useEffect } from 'react';
import { generateRamadanPlan } from '../utils/planGenerator';

function PlanGenerator({ goals, onPlanGenerated, onClose }) {
  const [plan, setPlan] = useState(null);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    if (goals.totalJuzToRead > 0 || goals.totalPagesToMemorize > 0) {
      const generatedPlan = generateRamadanPlan(goals, startDate, duration);
      setPlan(generatedPlan);
    }
  }, [goals, startDate, duration]);

  const handleSavePlan = () => {
    if (plan) {
      onPlanGenerated(plan);
      onClose();
    }
  };

  if (!plan) {
    return (
      <div className="modal active">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h2 className="modal-title">📅 Generate Your Plan</h2>
          <p style={{ color: '#b2ccd6', textAlign: 'center' }}>
            Set your goals first to generate a personalized plan
          </p>
        </div>
      </div>
    );
  }

  const dailyReading = plan.daily[0]?.reading.pages || 0;
  const dailyMemorization = plan.daily[0]?.memorization.pages || 0;

  return (
    <div className="modal active">
      <div className="modal-content plan-generator-modal">
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        
        <h2 className="modal-title">📅 Your Personalized Ramadan Plan</h2>
        
        <div className="plan-summary">
          <div className="plan-stat">
            <i className="fa-solid fa-book-open"></i>
            <div>
              <div className="stat-value">{dailyReading}</div>
              <div className="stat-label">Pages to Read Daily</div>
            </div>
          </div>
          
          <div className="plan-stat">
            <i className="fa-solid fa-brain"></i>
            <div>
              <div className="stat-value">{dailyMemorization}</div>
              <div className="stat-label">Pages to Memorize Daily</div>
            </div>
          </div>
          
          <div className="plan-stat">
            <i className="fa-solid fa-calendar-days"></i>
            <div>
              <div className="stat-value">{duration}</div>
              <div className="stat-label">Days</div>
            </div>
          </div>
        </div>

        <div className="plan-details">
          <h3>📊 Weekly Breakdown</h3>
          <div className="weekly-breakdown">
            {plan.weekly.map((week, index) => (
              <div key={index} className="week-card">
                <div className="week-header">
                  <strong>Week {week.week}</strong>
                  <span>Days {week.days[0]?.day} - {week.days[week.days.length - 1]?.day}</span>
                </div>
                <div className="week-stats">
                  <div>📖 {week.totalReadingPages} pages reading</div>
                  <div>🧠 {week.totalMemorizationPages} pages memorization</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="plan-settings">
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Duration (days)</label>
            <input
              type="number"
              className="form-input"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
              max="30"
            />
          </div>
        </div>

        <div className="plan-actions">
          <button className="btn-primary" onClick={handleSavePlan}>
            <i className="fa-solid fa-check"></i> Use This Plan
          </button>
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>
        </div>

        <div className="plan-tips">
          <h4><i className="fa-solid fa-lightbulb"></i> Tips for Success</h4>
          <ul>
            <li>Break reading into smaller sessions throughout the day</li>
            <li>Memorize in the early morning for better retention</li>
            <li>Review previous memorization before starting new pages</li>
            <li>Use the catch-up feature if you fall behind</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlanGenerator;
