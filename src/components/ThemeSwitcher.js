import React from 'react';

function ThemeSwitcher({ theme, onToggle }) {
  return (
    <button 
      className="theme-switcher" 
      onClick={onToggle}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <i className="fa-solid fa-sun"></i>
      ) : (
        <i className="fa-solid fa-moon"></i>
      )}
    </button>
  );
}

export default ThemeSwitcher;
