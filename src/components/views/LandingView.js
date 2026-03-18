import React from 'react';

function LandingView({ onNavigate, onSetGoals }) {
  return (
    <>
      <div className="hero-section">
        <div className="hero-text">
          <span className="ramadan-badge">
            <i className="fas fa-star"></i>
            Ramadan 1446 · 30 days of barakah
          </span>
          <h1>Achieve Your Qur'an Goals This Ramadan</h1>
          <p className="hero-description">
            The most beloved deed to Allah is that which is consistent, even if small. 
            Set your own reading and memorization goals, track your progress, and build lasting habits — all in one place.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => onNavigate('dashboard')}>
              <i className="fas fa-check-circle"></i>
              Start Tracking
            </button>
            <button className="btn-outline" onClick={onSetGoals}>
              <i className="fas fa-bullseye"></i>
              Set Your Goals
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-sliders-h"></i>
              </div>
              <span className="stat-number">Custom</span>
              <span className="stat-label">Your Goals</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <span className="stat-number">Track</span>
              <span className="stat-label">Daily Progress</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <span className="stat-number">30</span>
              <span className="stat-label">Days of Ramadan</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="preview-card">
            <div className="preview-header">
              <span>
                <i className="fas fa-calendar"></i>
                Today's Track
              </span>
              <span className="preview-day">
                Day 12 · <i className="fas fa-fire"></i> 7 day streak
              </span>
            </div>
            <div className="preview-tasks">
              <div className="task-item completed">
                <i className="fas fa-check-square"></i>
                <span>Memorize page 561</span>
                <i className="fas fa-check task-check"></i>
              </div>
              <div className="task-item">
                <i className="far fa-square"></i>
                <span>Revise page 560</span>
              </div>
              <div className="task-item">
                <i className="far fa-square"></i>
                <span>Read pages 500–520</span>
              </div>
            </div>
            <div className="progress-example">
              <div className="progress-fill"></div>
            </div>
            <div className="progress-labels">
              <span>Memorization 45%</span>
              <span>Reading 60%</span>
            </div>
            <div className="streak-row">
              <i className="fas fa-fire"></i>
              <span>Current streak: 7 days</span>
              <span className="longest-streak">
                <i className="fas fa-trophy"></i> longest: 15
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* New: Key Features Highlight */}
      <div className="features-highlight">
        <div className="feature-highlight-card">
          <i className="fas fa-book-quran"></i>
          <h3>Complete Quran</h3>
          <p>All 114 Surahs with Arabic, English & Amharic translations</p>
        </div>
        <div className="feature-highlight-card">
          <i className="fas fa-headphones"></i>
          <h3>Audio Recitations</h3>
          <p>Listen to 6 world-renowned reciters with playback controls</p>
        </div>
        <div className="feature-highlight-card">
          <i className="fas fa-sticky-note"></i>
          <h3>Personal Notes</h3>
          <p>Document your reflections and insights for each Surah</p>
        </div>
        <div className="feature-highlight-card">
          <i className="fas fa-search"></i>
          <h3>Smart Search</h3>
          <p>Find any Surah instantly by name, number, Juz, or page</p>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">
          <i className="fas fa-sparkles"></i>
          Features to keep you consistent
        </h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-list-check"></i>
            </div>
            <h3>Daily Checklist</h3>
            <p>Track memorized pages, revisions & reading — auto-calculates progress.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-calendar-week"></i>
            </div>
            <h3>Ramadan Calendar</h3>
            <p>Visual day-by-day progress: ✔ completed, ✘ missed, ~ partial.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-medal"></i>
            </div>
            <h3>Achievements</h3>
            <p>Earn badges: first juz, 7-day streak, Laylatul Qadr, and more.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-bell"></i>
            </div>
            <h3>Smart Reminders</h3>
            <p>Get notified: "Only 5 pages left" or "Don't break your streak!"</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-fire"></i>
            </div>
            <h3>Streak System</h3>
            <p>Build consistency with daily streaks and milestone rewards.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <h3>Analytics</h3>
            <p>Deep insights into your progress with charts and predictions.</p>
          </div>
        </div>
      </div>

      {/* New: How It Works Section */}
      <div className="how-it-works-section">
        <h2 className="section-title">
          <i className="fas fa-route"></i>
          How It Works
        </h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">
              <i className="fas fa-bullseye"></i>
            </div>
            <h3>Set Your Goals</h3>
            <p>Choose your reading and memorization targets for Ramadan</p>
          </div>
          <div className="step-arrow">
            <i className="fas fa-arrow-right"></i>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <h3>Get Your Plan</h3>
            <p>Receive a personalized daily and weekly schedule</p>
          </div>
          <div className="step-arrow">
            <i className="fas fa-arrow-right"></i>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <h3>Track Progress</h3>
            <p>Check off tasks daily and watch your progress grow</p>
          </div>
          <div className="step-arrow">
            <i className="fas fa-arrow-right"></i>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-icon">
              <i className="fas fa-trophy"></i>
            </div>
            <h3>Achieve Goals</h3>
            <p>Complete your Ramadan journey and earn achievements</p>
          </div>
        </div>
      </div>

      {/* New: Testimonials/Benefits Section */}
      <div className="benefits-section">
        <h2 className="section-title">
          <i className="fas fa-heart"></i>
          Why Ramadanly?
        </h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <i className="fas fa-mobile-alt"></i>
            <h3>Works Offline</h3>
            <p>Access your data anytime, anywhere - no internet required after first load</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-lock"></i>
            <h3>100% Private</h3>
            <p>All your data stays on your device. No accounts, no tracking, no servers</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-globe"></i>
            <h3>Multi-Language</h3>
            <p>Read Quran in Arabic with English and Amharic translations</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-bolt"></i>
            <h3>Lightning Fast</h3>
            <p>Optimized performance with instant loading and smooth interactions</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-sync"></i>
            <h3>Auto-Sync</h3>
            <p>Your progress is automatically saved as you go - never lose your data</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-gift"></i>
            <h3>Completely Free</h3>
            <p>No subscriptions, no ads, no hidden costs - just pure barakah</p>
          </div>
        </div>
      </div>

      {/* New: Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Make This Ramadan Your Best Yet?</h2>
          <p>Join thousands of Muslims worldwide in achieving their Quran goals</p>
          <div className="cta-buttons-large">
            <button className="btn-primary-large" onClick={() => onNavigate('dashboard')}>
              <i className="fas fa-rocket"></i>
              Start Your Journey
            </button>
            <button className="btn-outline-large" onClick={onSetGoals}>
              <i className="fas fa-info-circle"></i>
              Learn More
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>
              <i className="fas fa-moon"></i>
              Ramadanly
            </h4>
            <p>Your companion for a blessed Ramadan journey</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <button onClick={() => onNavigate('dashboard')}>Dashboard</button>
            <button onClick={() => onNavigate('quran')}>Quran</button>
            <button onClick={() => onNavigate('checklist')}>Checklist</button>
            <button onClick={() => onNavigate('analytics')}>Analytics</button>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <button onClick={onSetGoals}>Set Goals</button>
            <button onClick={() => onNavigate('achievements')}>Achievements</button>
            <button onClick={() => onNavigate('notes')}>Notes</button>
            <button onClick={() => onNavigate('calendar')}>Calendar</button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 Ramadanly — Made with <i className="fas fa-heart"></i> for the Ummah</span>
          <span>
            <i className="fas fa-moon"></i> Ramadan 1446
          </span>
        </div>
      </footer>
    </>
  );
}

export default LandingView;
