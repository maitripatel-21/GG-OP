# Gorillaz Guard - Technical Project Overview

## Overview
**Gorillaz Guard** is a modern Chromium browser extension designed to protect users against malicious websites, phishing attempts, suspicious URL structures, unencrypted HTTP connections, and deceptive domains in real time.

Built with **Manifest V3**, **React 18**, **Tailwind CSS**, and **Framer Motion**, Gorillaz Guard delivers high-performance security checks without slowing down page load times or compromising user privacy.

---

## Core Mission & Architectural Goals
1. **Real-time Threat Detection**: Inspect active URLs instantly using deterministic client-side heuristic engines.
2. **Minimal Footprint**: Background service worker executes on-demand without memory leaks or continuous polling.
3. **Glassmorphic Modern Design**: Premium dark-mode user experience with micro-animations and zero clutter.
4. **Privacy-First Architecture**: All primary checks run on-device. Zero browsing history is transmitted externally.
5. **Production Ready & Modular**: Separation of concerns between UI layers, security engines, extension message bus, and persistent storage wrappers.

---

## Technical Stack Summary
- **Extension Standard**: Manifest V3 (`public/manifest.json`)
- **UI Framework**: React 18 (JavaScript ES6+)
- **Styling Engine**: Tailwind CSS (Custom Dark Glassmorphism Design System)
- **Animation Framework**: Framer Motion
- **Build System**: Vite Multi-Entry Point Compiler
- **Icon Library**: Lucide React
- **Quality Assurance**: ESLint & Prettier
