# Installation Guide - Ramadanly

## Quick Start (30 seconds)

1. **Download** all files to a folder
2. **Open** `index.html` in your browser
3. **Start tracking** your Ramadan goals!

That's it! No installation, no build process, no dependencies.

---

## Detailed Installation

### Option 1: Direct Browser Use (Recommended)

**Requirements:**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No internet required after first load

**Steps:**
1. Download or clone all project files
2. Keep all files in the same folder:
   ```
   ramadanly/
   ├── index.html
   ├── styles.css
   ├── app.js
   ├── manifest.json
   ├── sw.js
   └── README.md
   ```
3. Double-click `index.html` or right-click → Open with → Your Browser
4. Grant notification permissions when prompted (optional)
5. Start using the app!

**First Time Setup:**
- The app will create default data automatically
- Your Ramadan start date will be set to today
- You can customize goals in the app.js file if needed

---

### Option 2: Install as PWA (Mobile/Desktop App)

**On Desktop (Chrome/Edge):**
1. Open `index.html` in Chrome or Edge
2. Look for install icon in address bar (⊕ or computer icon)
3. Click "Install Ramadanly"
4. App will open in its own window
5. Access from desktop/start menu like any app

**On Android:**
1. Open `index.html` in Chrome
2. Tap menu (⋮) → "Add to Home screen"
3. Confirm installation
4. App icon appears on home screen
5. Opens like a native app

**On iOS:**
1. Open `index.html` in Safari
2. Tap Share button (□↑)
3. Scroll and tap "Add to Home Screen"
4. Confirm
5. App icon appears on home screen

**Benefits of PWA Installation:**
- Works offline
- Faster loading
- No browser UI
- App-like experience
- Push notifications

---

### Option 3: Local Web Server (Advanced)

**Why use a server?**
- Better PWA features
- Proper service worker functionality
- Testing in production-like environment

**Using Python:**
```bash
# Python 3
cd ramadanly
python -m http.server 8000

# Open browser to: http://localhost:8000
```

**Using Node.js:**
```bash
# Install http-server globally
npm install -g http-server

# Run server
cd ramadanly
http-server -p 8000

# Open browser to: http://localhost:8000
```

**Using PHP:**
```bash
cd ramadanly
php -S localhost:8000

# Open browser to: http://localhost:8000
```

---

## File Structure

### Required Files
```
ramadanly/
├── index.html          # Main HTML file (REQUIRED)
├── styles.css          # All styling (REQUIRED)
├── app.js              # Application logic (REQUIRED)
├── manifest.json       # PWA manifest (REQUIRED for PWA)
└── sw.js              # Service worker (REQUIRED for offline)
```

### Optional Files
```
├── README.md          # Project documentation
├── USER_GUIDE.md      # User instructions
├── FEATURES.md        # Feature list
├── INSTALL.md         # This file
└── icon-*.png         # App icons (for PWA)
```

---

## Browser Compatibility

### Fully Supported ✅
- Chrome 90+ (Desktop & Mobile)
- Edge 90+
- Firefox 88+
- Safari 14+ (Desktop & iOS)
- Opera 76+
- Samsung Internet 14+

### Minimum Requirements
- ES6 JavaScript support
- CSS Grid support
- localStorage API
- Notification API (optional)
- Service Worker API (optional, for PWA)

### Check Compatibility
Open browser console (F12) and run:
```javascript
console.log('localStorage:', 'localStorage' in window);
console.log('Notifications:', 'Notification' in window);
console.log('ServiceWorker:', 'serviceWorker' in navigator);
```

All should return `true` for full functionality.

---

## Configuration

### Setting Your Start Date

**Option 1: Automatic (Default)**
- App uses today's date as Ramadan Day 1
- Automatically calculates current day

**Option 2: Manual Configuration**
1. Open `app.js` in text editor
2. Find line: `startDate: "2024-03-10"`
3. Change to your Ramadan start date
4. Save file
5. Reload app in browser

### Customizing Goals

**Default Goals:**
- Reading: 90 Juz (3 complete readings)
- Memorization: 100 pages (3 Juz from Surah 58-114)

**To Change:**
1. Open `app.js`
2. Find `defaultData` object
3. Modify these values:
   ```javascript
   goal: {
     reading: "complete 3 times",
     memorization: "3 juz from 58 to 114",
     totalPagesToMemorize: 100,  // Change this
     totalJuzToRead: 90           // Change this
   }
   ```
4. Save and reload

### Customizing Appearance

**Colors:**
Edit `styles.css`:
- Primary green: Search for `#7bb17e`
- Background: Search for `#0c1c2c`
- Accent gold: Search for `#ffd966`

**Fonts:**
Edit `styles.css`:
- Find `font-family` declarations
- Replace with your preferred fonts

---

## Troubleshooting Installation

### Issue: Page shows but no styling

**Cause:** CSS file not loading

**Solution:**
1. Ensure `styles.css` is in same folder as `index.html`
2. Check file name spelling (case-sensitive on some systems)
3. Open browser console (F12) for errors
4. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Features not working

**Cause:** JavaScript not loading

**Solution:**
1. Ensure `app.js` is in same folder
2. Check browser console for errors
3. Verify JavaScript is enabled in browser
4. Try different browser

### Issue: Data not saving

**Cause:** localStorage disabled or full

**Solution:**
1. Check browser privacy settings
2. Enable localStorage/cookies
3. Clear browser data if storage full
4. Try incognito/private mode to test

### Issue: Notifications not working

**Cause:** Permissions not granted

**Solution:**
1. Check browser notification settings
2. Grant permission when prompted
3. Ensure site not muted
4. Check system notification settings

### Issue: PWA not installing

**Cause:** Various PWA requirements

**Solution:**
1. Use HTTPS or localhost
2. Ensure manifest.json is valid
3. Check service worker registration
4. Try Chrome/Edge (best PWA support)
5. Clear cache and retry

### Issue: Icons not showing

**Cause:** Font Awesome not loading

**Solution:**
1. Check internet connection (first load)
2. Icons cached after first load
3. Use local Font Awesome if needed
4. Check browser console for CDN errors

---

## Updating the App

### Manual Update
1. Download new version files
2. Replace old files (keep same folder)
3. Hard refresh browser (Ctrl+Shift+R)
4. Your data is preserved (in localStorage)

### Clearing Cache
If update doesn't show:
1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Clear site data
4. Reload page
5. Data will be preserved

---

## Uninstalling

### Remove PWA
**Desktop:**
- Right-click app icon → Uninstall
- Or: Browser settings → Apps → Remove

**Mobile:**
- Long-press app icon → Remove/Uninstall
- Like any other app

### Clear All Data
1. Open browser settings
2. Go to Privacy/Storage
3. Find site data for Ramadanly
4. Clear/Delete
5. Or run in console: `localStorage.clear()`

### Complete Removal
1. Uninstall PWA (if installed)
2. Clear browser data for site
3. Delete downloaded files
4. Clear browser cache

---

## Backup & Restore

### Backup Your Data

**Method 1: Console**
1. Open browser console (F12)
2. Run: `localStorage.getItem('ramadanTrackerData')`
3. Copy output
4. Save to text file

**Method 2: Export (Future Feature)**
- Will be added in future version
- One-click backup to file

### Restore Data

**Method 1: Console**
1. Open browser console
2. Run: `localStorage.setItem('ramadanTrackerData', 'PASTE_DATA_HERE')`
3. Reload page

**Method 2: Import (Future Feature)**
- Will be added in future version
- One-click restore from file

---

## Multiple Devices

### Sync Across Devices (Manual)
1. Backup data from Device 1
2. Transfer backup file to Device 2
3. Restore data on Device 2
4. Both devices now have same data

### Automatic Sync (Not Available)
- Currently no cloud sync
- All data stored locally
- Manual backup/restore only
- Future feature consideration

---

## Performance Tips

### For Best Performance
1. Use modern browser (latest version)
2. Close unnecessary tabs
3. Clear browser cache periodically
4. Don't open multiple instances
5. Use PWA version (faster)

### For Slow Devices
1. Disable animations (edit CSS)
2. Reduce data history
3. Clear old checklist data
4. Use lightweight browser

---

## Security & Privacy

### Data Storage
- All data stored locally in browser
- No server communication
- No data collection
- No tracking
- Complete privacy

### Recommendations
1. Use trusted device
2. Don't share device without backup
3. Regular backups recommended
4. Use browser password protection
5. Clear data if selling device

---

## Getting Help

### Resources
1. Read USER_GUIDE.md for usage help
2. Check FEATURES.md for feature list
3. Review README.md for technical details
4. Check browser console for errors

### Common Solutions
- **Not working?** → Hard refresh (Ctrl+Shift+R)
- **Data lost?** → Check localStorage in console
- **Slow?** → Clear cache and reload
- **Broken?** → Try different browser

---

## Next Steps

After installation:
1. ✅ Grant notification permissions
2. ✅ Set your Ramadan start date (if needed)
3. ✅ Customize goals (if needed)
4. ✅ Read USER_GUIDE.md
5. ✅ Start tracking!

---

## Quick Reference

### Essential Commands

**Check if working:**
```javascript
// In browser console (F12)
console.log(app); // Should show RamadanTracker object
```

**View your data:**
```javascript
console.log(app.data);
```

**Backup data:**
```javascript
console.log(localStorage.getItem('ramadanTrackerData'));
```

**Clear data (careful!):**
```javascript
localStorage.clear();
location.reload();
```

---

**Installation complete! May Allah accept your efforts! 🌙**
