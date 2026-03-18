<div align="center">

<img src="https://img.shields.io/badge/Ramadan-2025-gold?style=for-the-badge&logo=crescent&logoColor=white" />
<img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" />
<img src="https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />

<br/><br/>

# 🌙 Ramadanly

### Your personal Quran habit tracker for Ramadan

Track your reading, memorization, and daily streaks — all in one beautiful app.

<br/>

**[🚀 Live Demo → ramadanly.netlify.app](https://ramadanly.netlify.app)**

<br/>

</div>

---

## ✨ What is Ramadanly?

Ramadanly is a full-featured Ramadan companion app built with React. It helps you stay consistent with your Quran goals throughout the holy month — whether you're memorizing, reading, or just trying to build a daily habit.

Everything runs in the browser. No account needed. No data leaves your device.

---

## 🖼️ Features at a Glance

| Feature | Description |
|---|---|
| 📖 **Quran Viewer** | Read the full Quran with Uthmani script + English translation |
| 🎧 **Audio Playback** | Listen to recitations from multiple reciters via EveryAyah |
| 📋 **Daily Checklist** | Track memorization, revision, and reading tasks every day |
| 📊 **Progress Dashboard** | Circular & linear progress bars with real-time stats |
| 🔥 **Streak System** | Gamified daily streaks to keep you consistent |
| 🏆 **Achievements** | 12 unlockable badges for hitting milestones |
| 📅 **Ramadan Calendar** | 30-day color-coded view of your entire month |
| 📈 **Analytics** | Consistency score, pace tracking, and completion estimates |
| 📝 **Notes** | Save notes per day, surah, or ayah |
| 🔔 **Smart Reminders** | Browser notifications for daily check-ins |
| 📱 **PWA** | Install on your phone like a native app |
| 🌙 **Dark Mode** | Beautiful dark-first design, easy on the eyes |

---

## 🚀 Getting Started

### Run locally

```bash
# Clone the repo
git clone https://github.com/ezedinmoh/ramadanly.git
cd ramadanly

# Install dependencies
npm install

# Start the dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

The `build/` folder is ready to deploy anywhere.

---

## 🗂️ Project Structure

```
ramadanly/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── _redirects
├── src/
│   ├── components/
│   │   ├── QuranViewer/       # Full Quran reader with audio
│   │   ├── views/             # Dashboard, Checklist, Calendar, etc.
│   │   └── ...                # Shared UI components
│   ├── hooks/                 # Custom React hooks
│   ├── services/              # Quran API + caching layer
│   ├── data/                  # Surah/Juz metadata
│   └── utils/                 # Plan generator logic
├── netlify.toml               # Netlify config
└── sw.js                      # Service worker (PWA)
```

---

## 🔌 APIs Used

- **[Quran.com API v4](https://api.quran.com/api/v4)** — Arabic text (Uthmani script) + English translation
- **[EveryAyah.com](https://everyayah.com)** — Audio recitations (Abdul Basit, Alafasy, and more)

All API calls are cached in localStorage for 7 days to minimize requests and support offline use.

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **localStorage** — All data persistence, no backend
- **Service Worker** — Offline support & PWA
- **CSS3** — Custom animations, glassmorphism, dark theme
- **Font Awesome** — Icons
- **Google Fonts** — Amiri (Arabic), Noto Sans Ethiopic

---

## 🌐 Deployment

The app is live at **[ramadanly.netlify.app](https://ramadanly.netlify.app)**

Deployed via Netlify with:
- Automatic SPA redirect rules
- Security headers (X-Frame-Options, XSS protection, etc.)
- Long-term caching for static assets

To deploy your own fork:

1. Push to GitHub
2. Connect repo on [netlify.com](https://netlify.com)
3. Build command: `npm run build` | Publish dir: `build`
4. Done — auto-deploys on every push

---

## 🔐 Privacy

- All data is stored **locally in your browser**
- Zero server communication for user data
- No accounts, no tracking, no analytics
- You own your data completely

---

## 🤲 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## 📝 License

Free to use for personal and educational purposes.

---

<div align="center">

**May Allah accept your efforts this Ramadan 🌙**

[ramadanly.netlify.app](https://ramadanly.netlify.app)

</div>
