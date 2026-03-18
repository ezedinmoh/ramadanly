import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LandingView from './components/views/LandingView';
import DashboardView from './components/views/DashboardView';
import ChecklistView from './components/views/ChecklistView';
import CalendarView from './components/views/CalendarView';
import AchievementsView from './components/views/AchievementsView';
import AnalyticsView from './components/views/AnalyticsView';
import NotesView from './components/views/NotesView';
import QuranBrowser from './components/QuranBrowser';
import QuranViewer from './components/QuranViewer/QuranViewer';
import GoalSetting from './components/GoalSetting';
import PlanGenerator from './components/PlanGenerator';
import SearchBar from './components/SearchBar';
import CatchUpCalculator from './components/CatchUpCalculator';
import Modal from './components/Modal';
import Toast from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotifications } from './hooks/useNotifications';
import { quranCache } from './services/quranCache';

// Expose cache clearing function globally for debugging
window.clearQuranCache = () => {
  quranCache.clear();
  console.log('✅ Quran cache cleared! Refresh the page to fetch fresh data.');
};

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [modalContent, setModalContent] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [showGoalSetting, setShowGoalSetting] = useState(false);
  const [showPlanGenerator, setShowPlanGenerator] = useState(false);
  const [showCatchUp, setShowCatchUp] = useState(false);
  const [quranViewerPage, setQuranViewerPage] = useState(1);
  const [quranViewerSurah, setQuranViewerSurah] = useState(null);
  const [quranViewerOptions, setQuranViewerOptions] = useState({});
  
  // Set dark mode as default (no theme switching)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);
  
  // Load data from localStorage
  const [data, setData] = useLocalStorage('ramadanTrackerData', {
    user: {
      name: "Abdullah",
      startDate: new Date().toISOString().split('T')[0],
      ramadanDay: 1,
      goal: {
        reading: "Set your reading goal",
        memorization: "Set your memorization goal",
        totalPagesToMemorize: 0,
        totalJuzToRead: 0,
        customReadingGoal: "",
        customMemorizationGoal: ""
      }
    },
    progress: {
      memorizedPages: [],
      readPages: [],
      dailyChecklist: {},
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null
    },
    achievements: [],
    plan: null,
    weeklyNotes: {},
    notes: {
      daily: {},
      surah: {},
      ayah: {}
    },
    settings: {
      reminders: true,
      reminderTime: "08:00",
      theme: "dark",
      notifications: "browser",
      dailyReminders: true,
      streakWarnings: true,
      motivationalMessages: true
    }
  });

  // Initialize notifications
  useNotifications(data.settings);

  // Update Ramadan day
  useEffect(() => {
    const start = new Date(data.user.startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const ramadanDay = Math.min(diffDays, 30);
    
    if (ramadanDay !== data.user.ramadanDay) {
      setData(prev => ({
        ...prev,
        user: { ...prev.user, ramadanDay }
      }));
    }
  }, [data.user.startDate, data.user.ramadanDay, setData]);

  // Check for daily reset and update streak
  useEffect(() => {
    const today = new Date().toDateString();
    if (data.progress.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = yesterday.toISOString().split('T')[0];
      
      let newStreak = data.progress.currentStreak;
      if (data.progress.dailyChecklist[yesterdayKey]) {
        newStreak++;
      } else {
        newStreak = 0;
      }
      
      setData(prev => ({
        ...prev,
        progress: {
          ...prev.progress,
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, prev.progress.longestStreak),
          lastActiveDate: today
        }
      }));
    }
  }, [data.progress, setData]);

  // Check for achievements
  useEffect(() => {
    const newAchievements = [];
    
    if (data.progress.memorizedPages.length >= 1 && !data.achievements.includes('first_page')) {
      newAchievements.push('first_page');
    }
    if (data.progress.memorizedPages.length >= 10 && !data.achievements.includes('10_pages')) {
      newAchievements.push('10_pages');
    }
    if (data.progress.currentStreak >= 7 && !data.achievements.includes('perfect_week')) {
      newAchievements.push('perfect_week');
    }
    if (data.user.ramadanDay >= 15 && !data.achievements.includes('halfway')) {
      newAchievements.push('halfway');
    }
    
    if (newAchievements.length > 0) {
      setData(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements]
      }));
      
      newAchievements.forEach(id => {
        showToast(`🎉 Achievement Unlocked: ${getAchievementName(id)}!`);
      });
    }
  }, [data.progress.memorizedPages.length, data.progress.currentStreak, data.user.ramadanDay, data.achievements, setData]);

  const getAchievementName = (id) => {
    const achievements = {
      'first_page': 'First Page',
      '10_pages': '10 Pages',
      'perfect_week': 'Perfect Week',
      'halfway': 'Halfway There'
    };
    return achievements[id] || id;
  };

  const showModal = (title, content) => {
    setModalContent({ title, content });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveGoals = (goals) => {
    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        goal: goals
      }
    }));
    setShowGoalSetting(false);
    showToast('Goals saved successfully!');
    
    // Prompt to generate plan
    setTimeout(() => {
      setShowPlanGenerator(true);
    }, 500);
  };

  const handlePlanGenerated = (plan) => {
    setData(prev => ({
      ...prev,
      plan: plan
    }));
    showToast('Plan generated successfully!');
  };

  const handleSaveWeeklyNotes = (weekNumber, notes) => {
    setData(prev => ({
      ...prev,
      weeklyNotes: {
        ...prev.weeklyNotes,
        [weekNumber]: notes
      }
    }));
    showToast('Notes saved!');
  };

  const toggleTask = (category, taskId) => {
    const today = new Date().toISOString().split('T')[0];
    
    setData(prev => {
      const newData = { ...prev };
      
      if (!newData.progress.dailyChecklist[today]) {
        newData.progress.dailyChecklist[today] = {
          memorized: [],
          revised: [],
          read: []
        };
      }
      
      const categoryMap = {
        'memorization': 'memorized',
        'revision': 'revised',
        'reading': 'read'
      };
      
      const dataCategory = categoryMap[category];
      const tasks = newData.progress.dailyChecklist[today][dataCategory];
      
      const index = tasks.indexOf(taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      } else {
        tasks.push(taskId);
        
        if (dataCategory === 'memorized' && !newData.progress.memorizedPages.includes(taskId)) {
          newData.progress.memorizedPages.push(taskId);
        }
      }
      
      return newData;
    });
    
    showToast('Task updated!');
  };

  const handleNavigateToQuranReader = (surahNumber, pageNumber, options = {}) => {
    setQuranViewerSurah(surahNumber);
    setQuranViewerPage(pageNumber);
    setQuranViewerOptions(options);
    setCurrentView('quran-viewer');
  };

  const handleSearchNavigate = (view, params) => {
    if (params.surah) {
      setQuranViewerSurah(params.surah);
    }
    if (params.page) {
      setQuranViewerPage(params.page);
    }
    setCurrentView(view);
  };

  const handleSaveNote = (type, key, noteData) => {
    setData(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [type]: {
          ...prev.notes[type],
          [key]: noteData
        }
      }
    }));
    showToast('Note saved!');
  };

  const handleDeleteNote = (type, key) => {
    setData(prev => {
      const newNotes = { ...prev.notes };
      delete newNotes[type][key];
      return {
        ...prev,
        notes: newNotes
      };
    });
    showToast('Note deleted!');
  };

  const handleUpdatePlan = (newPlan) => {
    setData(prev => ({
      ...prev,
      plan: newPlan
    }));
    showToast('Plan updated successfully!');
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView onNavigate={setCurrentView} onSetGoals={() => setShowGoalSetting(true)} />;
      case 'dashboard':
        return <DashboardView data={data} onShowCatchUp={() => setShowCatchUp(true)} />;
      case 'checklist':
        return <ChecklistView data={data} onToggleTask={toggleTask} onSaveWeeklyNotes={handleSaveWeeklyNotes} />;
      case 'calendar':
        return <CalendarView data={data} onShowModal={showModal} />;
      case 'achievements':
        return <AchievementsView data={data} />;
      case 'analytics':
        return <AnalyticsView data={data} />;
      case 'notes':
        return <NotesView data={data} onSaveNote={handleSaveNote} onDeleteNote={handleDeleteNote} />;
      case 'quran':
        return <QuranBrowser onNavigateToReader={handleNavigateToQuranReader} />;
      case 'quran-viewer':
        return <QuranViewer initialPage={quranViewerPage} initialSurah={quranViewerSurah} options={quranViewerOptions} />;
      default:
        return <LandingView onNavigate={setCurrentView} onSetGoals={() => setShowGoalSetting(true)} />;
    }
  };

  return (
    <div className="app">
      <div className="landing-container">
        <Navbar 
          currentView={currentView}
          onNavigate={setCurrentView}
        />
        
        {renderView()}
      </div>

      {modalContent && (
        <Modal
          title={modalContent.title}
          content={modalContent.content}
          onClose={closeModal}
        />
      )}

      {showGoalSetting && (
        <GoalSetting
          currentGoals={data.user.goal}
          onSave={handleSaveGoals}
          onClose={() => setShowGoalSetting(false)}
        />
      )}

      {showPlanGenerator && (
        <PlanGenerator
          goals={data.user.goal}
          onPlanGenerated={handlePlanGenerated}
          onClose={() => setShowPlanGenerator(false)}
        />
      )}

      {showCatchUp && (
        <CatchUpCalculator
          data={data}
          onUpdatePlan={handleUpdatePlan}
          onClose={() => setShowCatchUp(false)}
        />
      )}

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}

export default App;
