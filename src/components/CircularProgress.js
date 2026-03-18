import React from 'react';

function CircularProgress({ percentage }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress">
      <svg width="150" height="150">
        <circle className="circular-progress-bg" cx="75" cy="75" r="70"></circle>
        <circle 
          className="circular-progress-fill" 
          cx="75" 
          cy="75" 
          r="70"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: offset
          }}
        ></circle>
      </svg>
      <div className="circular-progress-text">{Math.round(percentage)}%</div>
    </div>
  );
}

export default CircularProgress;
