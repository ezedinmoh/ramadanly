import React, { useState } from 'react';

function CatchUpCalculator({ data, onUpdatePlan, onClose }) {
  const [adjustedPlan, setAdjustedPlan] = useState(null);

  const calculateCatchUp = () => {
    const today = data.user.ramadanDay;
    const daysRemaining = 30 - today + 1;
    
    // Calculate current progress
    const memorizedPages = data.progress.memorizedPages.length;
    const readPages = data.progress.readPages.length;
    
    // Calculate targets
    const totalMemorizeTarget = data.user.goal.totalPagesToMemorize || 100;
    const totalReadTarget = (data.user.goal.totalJuzToRead || 30) * 20;
    
    // Calculate remaining
    const memorizeRemaining = Math.max(0, totalMemorizeTarget - memorizedPages);
    const readRemaining = Math.max(0, totalReadTarget - readPages);
    
    // Calculate new daily targets
    const newDailyMemorize = daysRemaining > 0 ? Math.ceil(memorizeRemaining / daysRemaining) : 0;
    const newDailyRead = daysRemaining > 0 ? Math.ceil(readRemaining / daysRemaining) : 0;
    
    // Calculate if behind schedule
    const originalDailyMemorize = data.plan?.daily[0]?.memorization.pages || 2;
    const originalDailyRead = data.plan?.daily[0]?.reading.pages || 20;
    
    const expectedMemorized = originalDailyMemorize * (today - 1);
    const expectedRead = originalDailyRead * (today - 1);
    
    const memorizeDeficit = Math.max(0, expectedMemorized - memorizedPages);
    const readDeficit = Math.max(0, expectedRead - readPages);
    
    const isBehind = memorizeDeficit > 0 || readDeficit > 0;
    
    const plan = {
      daysRemaining,
      current: {
        memorized: memorizedPages,
        read: readPages
      },
      targets: {
        memorize: totalMemorizeTarget,
        read: totalReadTarget
      },
      remaining: {
        memorize: memorizeRemaining,
        read: readRemaining
      },
      newDaily: {
        memorize: newDailyMemorize,
        read: newDailyRead
      },
      original: {
        memorize: originalDailyMemorize,
        read: originalDailyRead
      },
      deficit: {
        memorize: memorizeDeficit,
        read: readDeficit
      },
      isBehind,
      percentComplete: {
        memorize: (memorizedPages / totalMemorizeTarget) * 100,
        read: (readPages / totalReadTarget) * 100
      }
    };
    
    setAdjustedPlan(plan);
  };

  useState(() => {
    calculateCatchUp();
    // eslint-disable-next-line
  }, []);

  const handleApplyPlan = () => {
    if (!adjustedPlan) return;
    
    // Generate new plan with adjusted targets
    const newPlan = {
      ...data.plan,
      daily: data.plan.daily.map((day, index) => {
        if (index >= data.user.ramadanDay - 1) {
          return {
            ...day,
            reading: { pages: adjustedPlan.newDaily.read },
            memorization: { pages: adjustedPlan.newDaily.memorize }
          };
        }
        return day;
      })
    };
    
    onUpdatePlan(newPlan);
    onClose();
  };

  if (!adjustedPlan) {
    return (
      <div className="modal active">
        <div className="modal-content">
          <div className="loading-spinner">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Calculating catch-up plan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal active">
      <div className="modal-content catchup-modal">
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        
        <h2 className="modal-title">
          {adjustedPlan.isBehind ? '⚠️ Catch-Up Plan' : '✅ On Track!'}
        </h2>

        {adjustedPlan.isBehind ? (
          <div className="alert alert-warning">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>You're behind schedule. Here's an adjusted plan to help you catch up!</p>
          </div>
        ) : (
          <div className="alert alert-success">
            <i className="fa-solid fa-check-circle"></i>
            <p>Great job! You're on track with your goals.</p>
          </div>
        )}

        <div className="catchup-stats">
          <div className="stat-row">
            <div className="stat-col">
              <h4>📊 Current Progress</h4>
              <div className="progress-item">
                <span>Memorized:</span>
                <strong>{adjustedPlan.current.memorized} / {adjustedPlan.targets.memorize} pages</strong>
                <div className="mini-progress">
                  <div style={{ width: `${adjustedPlan.percentComplete.memorize}%` }}></div>
                </div>
              </div>
              <div className="progress-item">
                <span>Read:</span>
                <strong>{adjustedPlan.current.read} / {adjustedPlan.targets.read} pages</strong>
                <div className="mini-progress">
                  <div style={{ width: `${adjustedPlan.percentComplete.read}%` }}></div>
                </div>
              </div>
            </div>

            <div className="stat-col">
              <h4>⏰ Time Remaining</h4>
              <div className="time-stat">
                <div className="big-number">{adjustedPlan.daysRemaining}</div>
                <div className="label">Days Left</div>
              </div>
            </div>
          </div>

          {adjustedPlan.isBehind && (
            <div className="deficit-section">
              <h4>📉 Behind By:</h4>
              <div className="deficit-items">
                {adjustedPlan.deficit.memorize > 0 && (
                  <div className="deficit-item">
                    <i className="fa-solid fa-brain"></i>
                    <span>{adjustedPlan.deficit.memorize} pages memorization</span>
                  </div>
                )}
                {adjustedPlan.deficit.read > 0 && (
                  <div className="deficit-item">
                    <i className="fa-solid fa-book-open"></i>
                    <span>{adjustedPlan.deficit.read} pages reading</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="comparison-section">
            <h4>📅 Daily Target Comparison</h4>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Original Plan</th>
                  <th>Adjusted Plan</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><i className="fa-solid fa-brain"></i> Memorization</td>
                  <td>{adjustedPlan.original.memorize} pages/day</td>
                  <td><strong>{adjustedPlan.newDaily.memorize} pages/day</strong></td>
                  <td className={adjustedPlan.newDaily.memorize > adjustedPlan.original.memorize ? 'increase' : 'same'}>
                    {adjustedPlan.newDaily.memorize > adjustedPlan.original.memorize ? '+' : ''}
                    {adjustedPlan.newDaily.memorize - adjustedPlan.original.memorize}
                  </td>
                </tr>
                <tr>
                  <td><i className="fa-solid fa-book-open"></i> Reading</td>
                  <td>{adjustedPlan.original.read} pages/day</td>
                  <td><strong>{adjustedPlan.newDaily.read} pages/day</strong></td>
                  <td className={adjustedPlan.newDaily.read > adjustedPlan.original.read ? 'increase' : 'same'}>
                    {adjustedPlan.newDaily.read > adjustedPlan.original.read ? '+' : ''}
                    {adjustedPlan.newDaily.read - adjustedPlan.original.read}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="remaining-section">
            <h4>🎯 Remaining to Complete</h4>
            <div className="remaining-items">
              <div className="remaining-item">
                <i className="fa-solid fa-brain"></i>
                <div>
                  <strong>{adjustedPlan.remaining.memorize} pages</strong>
                  <small>to memorize</small>
                </div>
              </div>
              <div className="remaining-item">
                <i className="fa-solid fa-book-open"></i>
                <div>
                  <strong>{adjustedPlan.remaining.read} pages</strong>
                  <small>to read</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="catchup-tips">
          <h4><i className="fa-solid fa-lightbulb"></i> Tips to Catch Up</h4>
          <ul>
            <li>Break your daily target into smaller sessions (morning, afternoon, evening)</li>
            <li>Focus on quality over quantity - better to do less with full concentration</li>
            <li>Use weekends for extra catch-up time</li>
            <li>Review previous memorization while commuting or during breaks</li>
            <li>Ask for help from family to minimize distractions</li>
          </ul>
        </div>

        <div className="modal-actions">
          {adjustedPlan.isBehind ? (
            <>
              <button className="btn-primary" onClick={handleApplyPlan}>
                <i className="fa-solid fa-check"></i> Apply Adjusted Plan
              </button>
              <button className="btn-outline" onClick={onClose}>
                Keep Original Plan
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={onClose}>
              <i className="fa-solid fa-check"></i> Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatchUpCalculator;
