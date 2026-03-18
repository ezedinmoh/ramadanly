# Ramadanly User Guide

## Quick Start Guide

### First Time Setup

1. **Open the Application**
   - Open `index.html` in your web browser
   - The landing page will appear with an overview of features

2. **Grant Permissions**
   - Click "Allow" when prompted for notifications (optional but recommended)
   - This enables smart reminders throughout the day

3. **Start Your Journey**
   - Click "Start my plan" button to go to the dashboard
   - Your data will be automatically saved in your browser

## Daily Usage

### Morning Routine (5 minutes)

1. **Open Ramadanly** after Fajr prayer
2. **Navigate to Checklist** (click "Checklist" in top menu)
3. **Review Today's Tasks**:
   - Memorization: New page to learn
   - Revision: Pages to review
   - Reading: Juz to complete
4. **Plan Your Day** around these tasks

### Throughout the Day

1. **Complete Tasks** as you finish them
   - Click on any task to mark it complete
   - Watch the progress bar fill up
   - Get instant visual feedback

2. **Check Progress** anytime
   - Click "Dashboard" to see overall stats
   - View your current streak
   - See how close you are to goals

### Evening Review (5 minutes)

1. **Mark Remaining Tasks** as complete
2. **Check Your Streak** - don't break it!
3. **View Calendar** to see your consistency
4. **Celebrate Achievements** if any unlocked

## Feature Walkthroughs

### 📋 Using the Checklist

**Purpose**: Track daily memorization, revision, and reading tasks

**How to Use**:
1. Click "Checklist" in navigation
2. See three categories of tasks
3. Click any task to toggle completion
4. Watch progress bar update in real-time

**Tips**:
- Complete memorization tasks first (morning is best)
- Do revisions after memorization
- Spread reading throughout the day
- Don't leave everything for night

### 📊 Understanding the Dashboard

**Purpose**: Get a bird's-eye view of your progress

**What You See**:
- **Overall Progress**: Circular chart showing combined progress
- **Memorization Card**: Pages memorized vs. target
- **Reading Card**: Juz completed vs. target
- **Streak Card**: Current and longest streaks

**How to Read**:
- Green bars = good progress
- Numbers show actual vs. target
- Percentages show completion rate
- Flame icon = active streak

### 🔥 Building Your Streak

**What is a Streak?**
A streak is consecutive days of completing tasks.

**How It Works**:
- Complete at least one task daily
- Streak increases by 1 each day
- Miss a day = streak resets to 0
- Longest streak is always saved

**Benefits**:
- Builds consistency
- Unlocks achievements
- Motivates daily practice
- Creates lasting habits

**Tips**:
- Set daily reminders
- Complete at least one task even on busy days
- Check in before midnight
- Aim for 7-day milestones

### 🏆 Unlocking Achievements

**Available Badges**:

**Beginner Level**:
- 🎯 First Page: Memorize your first page
- 📖 First Juz: Complete reading first Juz
- ✨ First Week: Complete 7 days

**Progress Level**:
- 🔟 10 Pages: Memorize 10 pages
- 📚 5 Juz: Read 5 complete Juz
- ⭐ Halfway: Reach day 15 of Ramadan

**Expert Level**:
- 🎓 3 Juz Memorized: Complete memorization goal
- 👑 Quran Completed: Read entire Quran
- 🏅 Perfect Week: Achieve 7-day streak

**Special Badges**:
- 🌙 Laylatul Qadr: Special night achievement
- 🤲 Consistent Tracker: Check in every day
- 🚀 Revision Master: Complete all revisions

**How to Unlock**:
- Achievements unlock automatically
- You'll see a notification when unlocked
- "New!" badge appears on recent unlocks
- View all in Achievements page

### 📅 Using the Calendar

**Purpose**: Visual overview of your entire Ramadan

**Color Coding**:
- 🟢 Green: All tasks completed (great job!)
- 🟡 Yellow: Some tasks completed (good effort)
- 🔴 Red: No tasks completed (catch up!)
- 🔵 Blue border: Today

**How to Use**:
1. Click "Calendar" in navigation
2. See all 30 days at once
3. Click any day for details
4. Identify patterns and gaps

**Tips**:
- Aim for all green days
- Yellow is better than red
- Use it for weekly reviews
- Spot your best/worst days

### 📈 Reading Analytics

**Purpose**: Deep insights into your performance

**Metrics Explained**:
- **Avg Pages/Day**: Your daily average
- **Consistency Score**: How regular you are (0-100%)
- **Days Remaining**: Time left in Ramadan
- **Est. Completion**: Projected finish date

**Performance Insights**:
- **Best Day**: Your most productive day of week
- **Retention Rate**: How well you remember revisions
- **Pace**: Are you on track, ahead, or behind?

**How to Use**:
1. Check weekly to adjust pace
2. If behind, increase daily targets
3. If ahead, maintain consistency
4. Use insights to optimize schedule

## Advanced Features

### Setting Reminders

**Available Reminder Types**:
- Morning reminder (customizable time)
- Evening reminder (if tasks incomplete)
- Streak warning (if about to break)
- Motivational messages

**How to Enable**:
1. Click your avatar (top right)
2. Go to Settings
3. Toggle reminders ON
4. Set preferred time
5. Choose notification type

### Customizing Your Goals

**Default Goals**:
- Reading: 90 Juz (3 complete readings)
- Memorization: 100 pages (3 Juz)
- Duration: 30 days

**To Customize** (requires editing app.js):
1. Open app.js in text editor
2. Find `defaultData` object
3. Modify goal values
4. Save and reload page

### Data Management

**Your Data is Safe**:
- Stored locally in your browser
- No internet required
- Complete privacy
- No data collection

**Backup Your Data**:
1. Open browser console (F12)
2. Type: `localStorage.getItem('ramadanTrackerData')`
3. Copy the output
4. Save to a text file

**Restore Data**:
1. Open browser console
2. Type: `localStorage.setItem('ramadanTrackerData', 'PASTE_YOUR_DATA')`
3. Reload page

## Best Practices

### For Memorization

1. **Morning is Best**: Memorize after Fajr
2. **Small Chunks**: 5-7 lines at a time
3. **Repeat Often**: 20-30 times per line
4. **Revise Daily**: Use the revision tasks
5. **Test Yourself**: Recite without looking

### For Reading

1. **Spread Throughout Day**: After each prayer
2. **Use Translation**: Understand what you read
3. **Maintain Pace**: 3 Juz daily for 3x completion
4. **Quality Over Speed**: Focus on tajweed
5. **Track Progress**: Mark completed sections

### For Consistency

1. **Set Fixed Times**: Same time each day
2. **Start Small**: Better to do little daily than lot occasionally
3. **Use Reminders**: Enable all notifications
4. **Track Everything**: Log all activities
5. **Review Weekly**: Check calendar every Friday
6. **Adjust Goals**: If too hard/easy, modify
7. **Celebrate Wins**: Enjoy achievements

## Troubleshooting

### Common Issues

**Problem**: Tasks not saving
**Solution**: 
- Check if localStorage is enabled
- Try different browser
- Clear cache and retry

**Problem**: Notifications not working
**Solution**:
- Grant permission when prompted
- Check browser settings
- Ensure site not muted

**Problem**: Progress not updating
**Solution**:
- Refresh the page
- Check browser console for errors
- Clear cache

**Problem**: Calendar showing wrong dates
**Solution**:
- Verify start date in settings
- Check system date/time
- Reload application

### Getting Help

1. Check browser console (F12) for errors
2. Review this guide
3. Check README.md for technical details
4. Verify browser compatibility

## Tips for Maximum Benefit

### Week 1: Foundation
- Focus on building the habit
- Complete at least one task daily
- Get comfortable with the interface
- Set up reminders

### Week 2: Momentum
- Increase task completion
- Aim for full checklist daily
- Build your streak
- Unlock first achievements

### Week 3: Consistency
- Maintain daily routine
- Review progress regularly
- Adjust pace if needed
- Stay motivated with achievements

### Week 4: Strong Finish
- Push for completion
- Focus on Laylatul Qadr nights
- Complete remaining goals
- Celebrate your success

## Ramadan Schedule Suggestions

### Early Morning (Fajr - Sunrise)
- ✅ Memorize new page
- ✅ Revise yesterday's page
- ✅ Read 1 Juz

### Morning (After Sunrise)
- ✅ Revise older pages
- ✅ Read 1 Juz

### Afternoon (Dhuhr - Asr)
- ✅ Light revision
- ✅ Read 1 Juz

### Evening (Maghrib - Isha)
- ✅ Final revisions
- ✅ Check progress
- ✅ Update checklist

### Night (After Taraweeh)
- ✅ Review day's progress
- ✅ Plan tomorrow
- ✅ Make dua

## Motivation & Mindset

### Remember

- **Consistency > Intensity**: Daily small efforts beat occasional big efforts
- **Progress > Perfection**: Some progress is better than none
- **Quality > Quantity**: Focus on understanding and retention
- **Intention Matters**: Renew your intention daily
- **Dua is Key**: Ask Allah for help and consistency

### When You Feel Overwhelmed

1. Take a break (it's okay!)
2. Reduce daily targets temporarily
3. Focus on one task at a time
4. Remember why you started
5. Make sincere dua
6. Start fresh tomorrow

### Celebrating Success

- Unlock achievements
- Share progress (if comfortable)
- Reward yourself (halal ways)
- Make shukr to Allah
- Inspire others
- Plan for after Ramadan

## After Ramadan

### Maintaining Habits

1. **Continue Daily Reading**: Even 1 page
2. **Keep Revising**: Don't forget what you memorized
3. **Set New Goals**: Build on Ramadan momentum
4. **Use the App**: Continue tracking progress
5. **Make it Lifestyle**: Not just Ramadan

### Reviewing Your Journey

1. Check final statistics
2. Review calendar (how many green days?)
3. Count achievements unlocked
4. Reflect on lessons learned
5. Plan improvements for next year

---

## Quick Reference

### Keyboard Shortcuts
- None currently (click-based interface)

### Daily Checklist
- [ ] Open app after Fajr
- [ ] Review today's tasks
- [ ] Complete memorization
- [ ] Complete revisions
- [ ] Complete reading
- [ ] Check progress
- [ ] Update checklist

### Weekly Review
- [ ] Check calendar view
- [ ] Review analytics
- [ ] Adjust goals if needed
- [ ] Celebrate achievements
- [ ] Plan next week

---

**May Allah make it easy for you and accept your efforts! 🤲**

**Ramadan Mubarak! 🌙**
