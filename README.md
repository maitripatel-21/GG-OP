# Gorillaz Guard 🦍🛡️

> Modern Chromium Manifest V3 browser extension for real-time web security, URL threat analysis, HTTPS inspection, and phishing prevention.

![Manifest V3](https://img.shields.io/badge/Manifest-V3-06B6D4?style=for-the-badge&logo=googlechrome&logoColor=white)
![React 18](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)

---

## 🌟 Overview

**Gorillaz Guard** is a high-performance, privacy-first Chromium browser extension built to detect online threats in real time before users input credentials or sensitive data. 

All URL security checks run **100% on-device** within milliseconds using pure deterministic heuristic algorithms. Zero browsing history is transmitted externally.

---

## 🚀 Key Features

- 🔒 **HTTPS & SSL Certificate Check**: Flags unencrypted `http://` connections lacking TLS encryption.
- 🌐 **IP Address Host Identifier**: Detects raw numerical IPv4 or IPv6 hostnames (e.g. `http://192.168.1.1`).
- ⚡ **URL Shortener Identification**: Unmasks redirection services (`bit.ly`, `tinyurl.com`, `t.co`, `rb.gy`).
- 🛡️ **Phishing Keyword Engine**: Scans URL paths for credential harvesting keywords (`login`, `verify`, `banking`, `wallet-connect`).
- 📊 **Dynamic Safety Score (0 - 100)**: Visual radial SVG gauge meter showing real-time safety rating.
- ⚠️ **Content Warning Banner**: Injects modern glassmorphism warning overlays on high-risk domains with one-click trust actions.
- 📈 **Security Analytics Dashboard**: Complete dashboard with weekly scan trend charts, risk category breakdown, safe vs unsafe websites categorizer, and whitelist manager.
- ⚙️ **Persistent Storage & Engine Settings**: Configurable security rule toggles synced asynchronously to `chrome.storage.local`.

---

## 🏗️ Architecture Blueprint

```text
GorillazGuard/
├── docs/                        # Complete Technical Documentation
│   ├── Architecture.md
│   ├── Changelog.md
│   ├── Features.md
│   ├── InstallationGuide.md
│   ├── JudgeNotes.md
│   ├── ProjectOverview.md
│   └── Roadmap.md
├── public/                      # Manifest V3 Extension Manifest
│   └── manifest.json
├── src/                         # React 18 Source Code
│   ├── background/              # Manifest V3 Event Service Worker
│   │   └── serviceWorker.js
│   ├── components/              # Modular Glassmorphic Design System
│   │   ├── animations/
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── common/
│   │   ├── landing/
│   │   ├── layout/
│   │   └── settings/
│   ├── constants/
│   ├── content/                 # Injected Warning Banner Content Script
│   │   └── contentScript.js
│   ├── context/                 # Global Security State Context
│   ├── hooks/                   # Custom Hooks (useUrlAnalyzer, useDashboardData, useSettings)
│   ├── pages/                   # Popup, Dashboard, Landing, Settings Pages
│   ├── services/                # URL Engine, Storage, and Browser API Services
│   └── utils/                   # URL Parsing & Regex Utilities
├── .eslintrc.cjs                # ESLint Configuration
├── .gitignore                   # Git Exclusions
├── LICENSE                      # MIT Open-Source License
├── package.json                 # Project Dependencies & Scripts
├── popup.html                   # Popup Window Entry Point
├── options.html                 # Security Dashboard Entry Point
└── vite.config.js               # Multi-Entry Chrome Extension Vite Config
```

---

## 🛠️ Installation & Setup

### Option 1: Load Extension in Chrome / Brave / Edge
1. Open `chrome://extensions` (or `brave://extensions` / `edge://extensions`) in your browser.
2. Enable **Developer mode** using the toggle switch in the top-right corner.
3. Click **Load unpacked** and select the `dist/` directory inside this project folder:
   `C:\Users\91910\.gemini\antigravity-ide\scratch\GorillazGuard\dist`
4. Pin **Gorillaz Guard** and click the extension icon to view the security popup!

### Option 2: Local Web Server Preview
```bash
# Clone the repository
git clone https://github.com/maitripatel-21/GG-OP.git
cd GG-OP

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173/options.html
```

---

## 📜 Scripts & Commands

| Command | Action |
| :--- | :--- |
| `npm run build` | Compiles production extension bundle to `dist/` |
| `npm run dev` | Launches local Vite development server |
| `npm run lint` | Runs ESLint code quality audit |
| `npm run format` | Formats codebase using Prettier |

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
Created by [maitripatel-21](https://github.com/maitripatel-21).
