# Ramadanly - Comprehensive Quran Habit Tracker

A complete web application for tracking Quran reading, memorization, and daily habits during Ramadan.

## 🚀 Quick Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

### Three Ways to Deploy:

1. **Via Netlify UI** (Recommended)
   - Push code to GitHub
   - Connect repository on Netlify
   - Auto-deploy on every push

2. **Via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   npm run build
   netlify deploy --prod
   ```

3. **Drag & Drop**
   - Run `npm run build`
   - Drag `build` folder to https://app.netlify.com/drop

📖 See [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md) for detailed instructions.

## 🌟 Features Implemented

### 1. 📋 Daily Checklist Tracker
- Interactive checklist with real-time updates
- Three categories: Memorization, Revision, Reading
- Auto-populated based on daily plan
- Visual feedback (strikethrough, color changes)
- Progress calculation on each check/uncheck
- Task persistence using localStorage

### 2. 📊 Progress Dashboard
- Circular progress bars for overall goals
- Linear progress bars for daily targets
- Comprehensive stats cards:
  - Total pages memorized / Target pages
  - Total Juz read / Target Juz
  - Completion percentages
  - Remaining pages and Juz
  - Ramadan day counter (1-30)
- Real-time progress updates

### 3. 🔥 Streak System
- Current streak counter with flame animation
- Longest streak record
- Visual flame animation for active streaks
- Streak milestones tracking
- Automatic streak calculation based on daily activity

### 4. 🏆 Achievement System
- 12 different achievement badges:
  - Beginner: First Page, First Juz, First Week
  - Progress: 10 Pages, 5 Juz, Halfway
  - Expert: 3 Juz Memorized, Quran Completed, Perfect Week
  - Special: Laylatul Qadr, Consistent Tracker, Revision Master
- Visual unlock animations
- "New" badge indicators
- Shimmer effect for unlocked achievements

### 5. 📅 Ramadan Calendar View
- 30-day month view
- Color-coded cells:
  - Green: All tasks completed
  - Yellow: Partially completed
  - Red: No tasks completed
  - Blue border: Today
- Click on day to view detailed progress
- Visual legend for easy understanding

### 6. 📈 Advanced Analytics
- Performance metrics:
  - Average pages per day
  - Consistency score
  - Days remaining
  - Estimated completion date
- Best performance day tracking
- Retention rate calculation
- Pace tracking (on track/behind/ahead)

### 7. 💾 Data Management
- Complete localStorage implementation
- Data structure includes:
  - User profile and goals
  - Progress tracking (memorized pages, read pages)
  - Daily checklist history
  - Streak information
  - Achievement unlocks
  - Settings and preferences
- Automatic data persistence
- No data loss on page refresh

### 8. 🔔 Smart Reminder System
- Browser notification support
- Notification permission request
- Time-based reminders
- Progress-based notifications
- Missed day warnings
- Customizable reminder settings

### 9. 🎨 Modern UI/UX
- Clean, distraction-free interface
- Islamic-inspired color scheme (moon gold, night blue)
- Smooth animations and transitions
- Responsive design (mobile-first)
- Glassmorphism effects
- Gradient backgrounds
- Hover effects and micro-interactions

### 10. 📱 Progressive Web App (PWA)
- PWA manifest included
- Installable on mobile devices
- Offline-capable structure
- App-like experience
- Custom theme colors

## 🚀 Getting Started

### Installation

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. No build process required - pure HTML, CSS, and JavaScript

### File Structure

```
ramadanly/
├── index.html          # Main HTML file with all views
├── styles.css          # Complete styling
├── app.js              # Application logic and state management
├── manifest.json       # PWA manifest
└── README.md          # This file
```

### Browser Requirements

- Modern browser with ES6 support
- localStorage enabled
- Notification API support (optional, for reminders)

## 📖 Usage Guide

### Navigation

Use the top navigation bar to switch between views:
- **Home**: Landing page with feature overview
- **Dashboard**: Progress overview with stats and charts
- **Checklist**: Daily task management
- **Calendar**: Month view of all Ramadan days
- **Achievements**: Badge collection and milestones
- **Analytics**: Detailed insights and predictions

### Daily Workflow

1. **Morning**: Check your daily checklist
2. **Throughout the day**: Mark tasks as completed
3. **Evening**: Review your progress on the dashboard
4. **Weekly**: Check calendar view for consistency

### Completing Tasks

- Click on any task in the checklist to toggle completion
- Completed tasks show a checkmark and strikethrough
- Progress bars update automatically
- Achievements unlock based on milestones

### Tracking Progress

- Dashboard shows real-time progress
- Circular progress for overall completion
- Linear bars for specific goals
- Streak counter updates daily

## 🎯 Goals Configuration

Default goals (can be customized in app.js):
- **Reading**: Complete Quran 3 times (90 Juz total)
- **Memorization**: 3 Juz (100 pages from Surah 58-114)
- **Duration**: 30 days of Ramadan

## 🔧 Customization

### Changing Goals

Edit the `defaultData` object in `app.js`:

```javascript
goal: {
  reading: "complete 3 times",
  memorization: "3 juz from 58 to 114",
  totalPagesToMemorize: 100,
  totalJuzToRead: 90
}
```

### Adjusting Colors

Modify CSS variables in `styles.css`:
- Primary green: `#7bb17e`
- Background: `#0c1c2c` to `#1d3445`
- Accent gold: `#ffd966`

### Adding Achievements

Add new achievements in the `getAllAchievements()` method in `app.js`.

## 📊 Data Structure

```javascript
{
  user: {
    name: "Abdullah",
    startDate: "2024-03-10",
    ramadanDay: 12,
    goal: { ... }
  },
  progress: {
    memorizedPages: [561, 562, ...],
    readPages: [1, 2, 3, ...],
    dailyChecklist: {
      "2024-03-10": {
        memorized: [561],
        revised: [560, 559],
        read: ["juz1", "juz2"]
      }
    },
    currentStreak: 7,
    longestStreak: 15,
    lastActiveDate: "2024-03-21"
  },
  achievements: ["first_page", "perfect_week", ...],
  settings: {
    reminders: true,
    reminderTime: "08:00",
    theme: "dark",
    notifications: "browser"
  }
}
```

## 🌐 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 🔐 Privacy

- All data stored locally in browser
- No server communication
- No data collection
- Complete privacy

## 🎨 Design Philosophy

- **Minimalist**: Clean interface without distractions
- **Motivational**: Visual feedback and achievements
- **Consistent**: Islamic design patterns
- **Accessible**: Clear typography and contrast
- **Responsive**: Works on all devices

## 🚧 Future Enhancements

Potential features for future versions:
- Quran text viewer with Uthmani script
- Audio playback for memorization
- Spaced repetition algorithm
- Social features (friend leaderboards)
- Export/import data
- Multiple user profiles
- Dark/light theme toggle
- Advanced analytics charts
- Voice recognition for recitation
- Teacher/parent dashboard

## 📝 License

Free to use for personal and educational purposes.

## 🤲 Credits

Inspired by Quranly.app and built for the Muslim community to help achieve their Ramadan goals.

## 💡 Tips for Success

1. **Be Consistent**: Check in daily, even if you complete just one task
2. **Set Realistic Goals**: Adjust targets based on your capacity
3. **Use Reminders**: Enable notifications to stay on track
4. **Track Everything**: The more you log, the better insights you get
5. **Celebrate Milestones**: Enjoy unlocking achievements
6. **Review Weekly**: Use the calendar view to spot patterns
7. **Don't Break the Streak**: Consistency is key to habit formation

## 🆘 Troubleshooting

### Data Not Saving
- Ensure localStorage is enabled in browser settings
- Check browser console for errors
- Try clearing cache and reloading

### Notifications Not Working
- Grant notification permissions when prompted
- Check browser notification settings
- Ensure site is not muted

### Display Issues
- Update to latest browser version
- Clear browser cache
- Check screen zoom level (should be 100%)

## 📞 Support

For issues or suggestions, please check the browser console for error messages.

---

**May Allah accept your efforts this Ramadan! 🌙**


## 🆕 Phase 2 Features (NEW!)

### 📅 Personalized Plan Generator
- Custom Ramadan plans based on your goals
- Automatic daily target calculations
- Weekly breakdown and summaries
- Adjustable start date and duration
- Spaced repetition for memorization
- Visual progress tracking
- Helpful tips and recommendations

### 📊 Weekly Tracking with Notes
- Toggle between daily and weekly views
- Weekly progress summaries
- Completion percentages per week
- Statistics: pages read, memorized, active days
- Notes and reflections section
- Edit and save weekly insights
- Track patterns and improvements

### 🌓 Theme Switcher
- Light and Dark mode support
- Persistent theme preference
- Smooth theme transitions
- Optimized for day and night use
- Floating toggle button
- CSS variables for customization

**See PHASE2_USER_GUIDE.md for detailed usage instructions!**

