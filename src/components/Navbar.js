import React, { useState, useEffect } from 'react';

function Navbar({ currentView, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (view) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.nav-menu') && !event.target.closest('.mobile-menu-toggle')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)}></div>}
      
      <nav className="navbar">
        <div className="logo-area">
          <span className="logo-icon"><i className="fas fa-moon"></i></span>
          <span className="logo-text">Ramadanly</span>
        </div>

        {/* Navigation Menu */}
        <div className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <button 
            className={`nav-link ${currentView === 'landing' ? 'active' : ''}`}
            onClick={() => handleNavigate('landing')}
          >
            <i className="fas fa-home nav-icon-mobile"></i>
            <span>Home</span>
          </button>
          <button 
            className={`nav-link ${currentView === 'quran' || currentView === 'quran-viewer' ? 'active' : ''}`}
            onClick={() => handleNavigate('quran')}
          >
            <i className="fas fa-book-quran nav-icon-mobile"></i>
            <span>Quran</span>
          </button>
          <button 
            className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavigate('dashboard')}
          >
            <i className="fas fa-chart-line nav-icon-mobile"></i>
            <span>Dashboard</span>
          </button>
          <button 
            className={`nav-link ${currentView === 'checklist' ? 'active' : ''}`}
            onClick={() => handleNavigate('checklist')}
          >
            <i className="fas fa-tasks nav-icon-mobile"></i>
            <span>Checklist</span>
          </button>
          <button 
            className={`nav-link ${currentView === 'calendar' ? 'active' : ''}`}
            onClick={() => handleNavigate('calendar')}
          >
            <i className="fas fa-calendar-alt nav-icon-mobile"></i>
            <span>Calendar</span>
          </button>
          <button 
            className={`nav-link ${currentView === 'achievements' ? 'active' : ''}`}
            onClick={() => handleNavigate('achievements')}
          >
            <i className="fas fa-trophy nav-icon-mobile"></i>
            <span>Achievements</span>
          </button>
          <button 
            className={`nav-link ${currentView === 'analytics' ? 'active' : ''}`}
            onClick={() => handleNavigate('analytics')}
          >
            <i className="fas fa-chart-bar nav-icon-mobile"></i>
            <span>Analytics</span>
          </button>
          <button 
            className={`nav-link ${currentView === 'notes' ? 'active' : ''}`}
            onClick={() => handleNavigate('notes')}
          >
            <i className="fas fa-sticky-note nav-icon-mobile"></i>
            <span>Notes</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Only */}
        <div className="user-profile">
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
