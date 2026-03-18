import React from 'react';

function CalendarView({ data, onShowModal }) {
  const days = [];
  
  for (let i = 1; i <= 30; i++) {
    const date = new Date(data.user.startDate);
    date.setDate(date.getDate() + i - 1);
    const dateKey = date.toISOString().split('T')[0];
    const dayData = data.progress.dailyChecklist[dateKey];
    
    let status = 'empty';
    let icon = '';
    
    if (dayData) {
      const totalTasks = Object.values(dayData).flat().length;
      if (totalTasks >= 5) {
        status = 'completed';
        icon = '✔';
      } else if (totalTasks > 0) {
        status = 'partial';
        icon = '~';
      } else {
        status = 'missed';
        icon = '✘';
      }
    }
    
    const isToday = i === data.user.ramadanDay;
    
    days.push({
      day: i,
      status,
      icon,
      isToday,
      dateKey,
      dayData
    });
  }

  const handleDayClick = (day) => {
    const date = new Date(data.user.startDate);
    date.setDate(date.getDate() + day.day - 1);
    
    let content = `<h3>Day ${day.day} - ${date.toLocaleDateString()}</h3>`;
    
    if (day.dayData) {
      content += `
        <p>Memorized: ${day.dayData.memorized.length} pages</p>
        <p>Revised: ${day.dayData.revised.length} pages</p>
        <p>Read: ${day.dayData.read.length} sections</p>
      `;
    } else {
      content += '<p>No activity recorded for this day.</p>';
    }
    
    onShowModal('Day Details', content);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="calendar-month">📅 Ramadan 1446</h2>
        <p style={{ color: '#b2ccd6' }}>Track your daily progress throughout the blessed month</p>
      </div>

      <div className="calendar-grid">
        <div className="calendar-day-header">Mon</div>
        <div className="calendar-day-header">Tue</div>
        <div className="calendar-day-header">Wed</div>
        <div className="calendar-day-header">Thu</div>
        <div className="calendar-day-header">Fri</div>
        <div className="calendar-day-header">Sat</div>
        <div className="calendar-day-header">Sun</div>
        
        {days.map(day => (
          <div 
            key={day.day}
            className={`calendar-day ${day.status} ${day.isToday ? 'today' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            <div className="calendar-day-number">{day.day}</div>
            <div className="calendar-day-icon">{day.icon}</div>
          </div>
        ))}
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-box" style={{ background: 'rgba(123, 177, 126, 0.2)', borderColor: '#7bb17e' }}></div>
          <span>Completed</span>
        </div>
        <div className="legend-item">
          <div className="legend-box" style={{ background: 'rgba(255, 193, 7, 0.2)', borderColor: '#ffc107' }}></div>
          <span>Partial</span>
        </div>
        <div className="legend-item">
          <div className="legend-box" style={{ background: 'rgba(244, 67, 54, 0.2)', borderColor: '#f44336' }}></div>
          <span>Missed</span>
        </div>
        <div className="legend-item">
          <div className="legend-box" style={{ borderColor: '#64b5f6', borderWidth: '3px' }}></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
