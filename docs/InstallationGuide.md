# Gorillaz Guard - Production Installation & Setup Guide

This guide provides step-by-step instructions to load **Gorillaz Guard** into Chromium browsers (Google Chrome, Brave, Microsoft Edge) or run local development servers.

---

## 🛠️ Option 1: Load Extension Unpacked (Chrome / Brave / Edge)

Gorillaz Guard is built using **Chromium Manifest V3**. You can load the compiled production extension directly into your browser:

### Step 1: Open Extension Management Page
- **Google Chrome**: Type `chrome://extensions` in the address bar.
- **Brave Browser**: Type `brave://extensions` in the address bar.
- **Microsoft Edge**: Type `edge://extensions` in the address bar.

### Step 2: Enable Developer Mode
- Turn on the **Developer mode** toggle switch located in the **top-right corner**.

### Step 3: Load the Unpacked Extension Bundle
- Click the **"Load unpacked"** button in the top toolbar.
- Select the `dist/` directory inside your Gorillaz Guard project folder:
  `C:\Users\91910\.gemini\antigravity-ide\scratch\GorillazGuard\dist`

### Step 4: Pin & Launch Extension
- Click the puzzle icon (Extensions) in your browser toolbar next to the address bar.
- Click the pin icon next to **Gorillaz Guard**.
- Click the extension icon to view the security popup!

---

## 💻 Option 2: Local Developer Setup & Hot Reload

To run the local Vite development web server for interface testing:

```bash
# 1. Clone the repository
git clone https://github.com/maitripatel-21/GG-OP.git
cd GG-OP

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open preview URL
# Open http://localhost:5173/options.html or http://localhost:5173/popup.html
```

---

## 📦 Production Build Commands

To build the production bundle or check code quality:

```bash
# Run production Vite build (outputs to dist/)
npm run build

# Run ESLint code quality audit
npm run lint

# Format codebase using Prettier
npm run format
```
