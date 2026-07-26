# Gorillaz Guard 🦍🛡️

<div align="center">

![Gorillaz Guard Banner](public/assets/icon-128.png)

### **Enterprise Manifest V3 Browser Security & Dual-Engine Threat Intelligence**

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-10B981?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![React 18](https://img.shields.io/badge/React-18.3.1-06B6D4?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![VirusTotal API v3](https://img.shields.io/badge/VirusTotal-API_v3-E2454A?style=for-the-badge&logo=virustotal&logoColor=white)](https://www.virustotal.com/)
[![License](https://img.shields.io/badge/License-MIT-slate?style=for-the-badge)](LICENSE)

</div>

---

## ⚡ Overview

**Gorillaz Guard** is a next-generation Chrome & Chromium browser security extension designed to protect users against web phishing, unencrypted data interception, credential theft, and deceptive domain spoofing in real time. 

Powered by a **Hybrid Dual-Engine Architecture**, Gorillaz Guard combines **instant on-device heuristic risk checks (< 1ms)** with live **VirusTotal v3 REST API threat intelligence** across 70+ global antivirus scanners.

---

## 🔥 Key Differentiators & Unique Capabilities

### 🛡️ 1. Hybrid Dual Security Engine
- **Stage 1 (Local Risk Engine)**: Evaluates SSL/TLS encryption, raw IP address hostnames, link shorteners, non-standard network ports, and deceptive domain spoofing locally in under 1 millisecond.
- **Stage 2 (VirusTotal v3 API Intelligence)**: Dynamically queries VirusTotal's database of 70+ antivirus engines (**Kaspersky**, **Sophos**, **Bitdefender**, **Symantec**, **Google Safe Browsing**, **ESET**) in real time.

### 🔑 2. Password & Credential Exposure Guard
- Automatically injects a floating DOM-level security warning tooltip directly above password and credit card input fields if you attempt to enter credentials on unencrypted or high-risk websites.

### 🎯 3. Zero False Positives for Major Platforms
- Intelligent brand verification guarantees a **100 SAFE** rating for standard login paths on verified platforms (`https://github.com/login`, `https://accounts.google.com`, `https://login.live.com`). Keyword spoofing penalties are strictly reserved for deceptive domain clones (e.g. `github-login-verify.xyz`).

### 🔒 4. 100% On-Device Zero-Knowledge Privacy
- All browsing URL checks and threat detections execute locally inside your browser process. **Zero browsing history or URLs are ever transmitted to tracking clouds**.

### 📄 5. Executive PDF Security Audit Exporter
- One-click printable **PDF Security Audit Report** generator featuring executive KPI summary cards (*Inspected Domains*, *Safe Websites %*, *Risky Domains*, *Average Safety Rating*), color-coded risk distribution, and technical justifications.

### 🔄 6. Side-by-Side Domain Risk Comparison Tool
- Interactively compare security parameters between two domains side-by-side (SSL certificates, threat counts, VirusTotal flags, and score breakdowns) to identify typosquatting lookalikes.

---

## 📊 Composite Safety Score Mathematical Model

$$\text{Safety Score} = \max\left(0, \, 100 - \sum \text{Local Penalties} - \text{VirusTotal Penalty}\right)$$

| Threat Vector | Detection Condition | Severity | Penalty |
| :--- | :--- | :---: | :---: |
| **Unencrypted HTTP** | Web connection uses `http://` instead of `https://` | `HIGH` | **-30 Pts** |
| **Numerical IP Hostname** | Hostname is a raw IPv4/IPv6 address (e.g. `192.168.1.1`) | `HIGH` | **-35 Pts** |
| **Link Shortener** | Domain masks real destination (`bit.ly`, `tinyurl.com`, `t.co`) | `MEDIUM` | **-15 Pts** |
| **Excessive Subdomains** | Subdomain depth exceeds 2 levels on unverified domains | `MEDIUM` | **-20 Pts** |
| **Unsafe Port** | Uses non-standard network ports (e.g. `:8888`, `:8080`) | `HIGH` | **-25 Pts** |
| **Domain Spoofing** | Domain contains deceptive phrases (e.g. `github-login-verify.xyz`) | `HIGH` | **-25 Pts** |
| **VirusTotal Malicious Flag** | Antivirus scanners on VirusTotal detect malicious activity | `HIGH` | **-40 Pts** |

---

## 🏗️ Project Folder Structure

```text
GorillazGuard/
├── .env.example                 # Public Environment Variable Template
├── .eslintrc.cjs                # ESLint Quality Configuration
├── .gitignore                   # Local Secrets & Exclusions (.env, dist/)
├── LICENSE                      # MIT Open-Source License
├── README.md                     # Root Architectural README
├── options.html                 # Security Dashboard Entry Point
├── package.json                 # Project Dependencies & Scripts
├── popup.html                   # Extension Popup Entry Point
├── tailwind.config.js           # Custom Minimal Dark Palette
├── vite.config.js               # Multi-Entry Vite Manifest V3 Config
├── docs/                        # Technical Documentation Suite
│   ├── Architecture.md
│   ├── Changelog.md
│   ├── EngineArchitecture.md    # Detailed Risk Engine & VirusTotal API Spec
│   ├── Features.md
│   ├── InstallationGuide.md
│   ├── JudgeNotes.md
│   └── ProjectOverview.md
├── public/                      # Static Extension Assets
│   ├── assets/                  # Official Concept Icons (16x16, 32x32, 48x48, 128x128)
│   └── manifest.json            # Manifest V3 Extension Declaration
└── src/                         # React 18 Application Codebase
    ├── App.jsx                  # Root Application & ErrorBoundary
    ├── background/              # Manifest V3 Event Service Worker
    │   └── serviceWorker.js
    ├── components/              # Flat Minimal Component System
    │   ├── animations/
    │   ├── buttons/
    │   ├── cards/
    │   ├── common/
    │   ├── landing/
    │   ├── layout/
    │   └── settings/
    ├── constants/               # System Enums & Defaults
    ├── content/                 # Injected Warning Banner & Form Guard
    │   └── contentScript.js
    ├── context/                 # Global Security State Context
    ├── hooks/                   # Custom Hooks (useUrlAnalyzer, useDashboardData, useSettings)
    ├── options/                 # Options Entry Mount
    ├── pages/                   # Popup, Dashboard, Landing, Settings, Help Pages
    ├── popup/                   # Popup Entry Mount
    ├── services/                # URL Engine, VirusTotal API, Storage, Browser APIs
    ├── styles/                  # Tailwind CSS Directives & Custom Theme
    └── utils/                   # URL Parsing & Regex Utilities
```

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- Node.js **v18.0.0** or higher
- npm **v9.0.0** or higher
- Google Chrome, Brave, Microsoft Edge, or any Chromium-based browser

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/maitripatel-21/GG-OP.git
cd GG-OP
npm install
```

### 3. Environment Configuration
Create a `.env` file in the project root directory (referenced in `.env.example`):
```env
VITE_VIRUSTOTAL_API_KEY=your_virustotal_api_key_here
```

### 4. Build Extension Production Bundle
```bash
npm run build
```
The compiled, ready-to-load Manifest V3 extension bundle will be output to the `dist/` directory.

### 5. Load Extension into Chrome / Edge
1. Open Google Chrome and navigate to `chrome://extensions`.
2. Toggle **Developer mode** in the top-right corner.
3. Click **Load unpacked**.
4. Select the `dist/` folder inside the `GG-OP` directory.
5. **Gorillaz Guard** 🦍🛡️ is now active in your browser toolbar!

---

## 💻 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Starts Vite local development server |
| **Production Build** | `npm run build` | Compiles Manifest V3 extension bundle to `dist/` |
| **Linting** | `npm run lint` | Runs ESLint code quality & security checks |
| **Code Formatting** | `npm run format` | Formats codebase using Prettier |

---

## 🤝 Contributing & License

Distributed under the **MIT License**. See `LICENSE` for details. Created with ❤️ by **[maitripatel-21](https://github.com/maitripatel-21)**.
