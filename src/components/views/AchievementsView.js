import React from 'react';

function AchievementsView({ data }) {
  const achievements = [
    { id: 'first_page', icon: '🎯', title: 'First Page', description: 'Memorized your first page' },
    { id: 'first_juz', icon: '📖', title: 'First Juz', description: 'Completed reading first Juz' },
    { id: 'first_week', icon: '✨', title: 'First Week', description: 'Completed first week' },
    { id: '10_pages', icon: '🔟', title: '10 Pages', description: 'Memorized 10 pages' },
    { id: '5_juz', icon: '📚', title: '5 Juz Read', description: 'Read 5 complete Juz' },
    { id: 'halfway', icon: '⭐', title: 'Halfway There', description: 'Reached day 15' },
    { id: '3_juz_memorized', icon: '🎓', title: '3 Juz Memorized', description: 'Completed memorization goal' },
    { id: 'quran_completed', icon: '👑', title: 'Quran Completed', description: 'Read entire Quran' },
    { id: 'perfect_week', icon: '🏅', title: 'Perfect Week', description: '7 day streak achieved' },
    { id: 'laylatul_qadr', icon: '🌙', title: 'Laylatul Qadr', description: 'Special night achievement' },
    { id: 'consistent_tracker', icon: '🤲', title: 'Consistent Tracker', description: 'Checked every day' },
    { id: 'revision_master', icon: '🚀', title: 'Revision Master', description: 'Completed all revisions' }
  ];

  const isNewAchievement = (id) => {
    const index = data.achievements.indexOf(id);
    return index >= 0 && index < 2;
  };

  return (
    <>
      <h2 className="section-title">🏆 Achievements</h2>
      <p style={{ textAlign: 'center', color: '#b2ccd6', marginBottom: '2rem' }}>
        Unlock badges by completing milestones
      </p>
      
      <div className="achievements-grid">
        {achievements.map(achievement => {
          const isUnlocked = data.achievements.includes(achievement.id);
          const isNew = isNewAchievement(achievement.id);
          
          return (
            <div 
              key={achievement.id}
              className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
            >
              {isNew && <span className="achievement-badge-new">New!</span>}
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-title">{achievement.title}</div>
              <div className="achievement-description">{achievement.description}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AchievementsView;
