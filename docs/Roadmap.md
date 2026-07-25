# Gorillaz Guard - Future Development Roadmap

## Project Milestones & Future Engineering Goals

### Phase 1: Core Extension & Baseline UI (Completed)
- [x] Chromium Manifest V3 baseline setup
- [x] Decoupled React + Vite multi-entry architecture
- [x] Tailwind CSS glassmorphic dark design system
- [x] Radial SVG Safety Score meter
- [x] Basic popup interface

### Phase 2: Complete Heuristic Engine & DOM Alerts (Completed)
- [x] HTTP vs HTTPS check
- [x] IP address hostname detector
- [x] Excessive subdomain inspector
- [x] Phishing keyword scanner
- [x] URL shortener identifier
- [x] Unsafe port check
- [x] Percent-encoding & special character checks
- [x] Glassmorphic content warning overlay injection

### Phase 3: Analytics Dashboard & Security History (Completed)
- [x] Full-screen Security Dashboard
- [x] Browsing history auditor log
- [x] Safe vs Unsafe websites breakdown
- [x] Weekly scan analytics trend chart
- [x] Risk category breakdown metrics
- [x] Trusted domain whitelist manager

### Phase 4: Production Settings & Storage (Completed)
- [x] Granular heuristic engine toggles
- [x] Notifications & alert banner options
- [x] Persistent `chrome.storage.local` sync
- [x] Factory reset settings action
- [x] ErrorBoundary & LoadingSkeletons integration
- [x] 100% clean ESLint audit & production build

---

## 🔮 Phase 5 & Beyond (Future Engineering Expansion)

1. **Optional Backend Cloud API Integration**:
   - Microservice backend for real-time threat intelligence lookup (e.g. Google Safe Browsing API, VirusTotal API).
   - Zero-knowledge hash-based URL lookup to preserve user privacy.

2. **Machine Learning Phishing Classifier**:
   - On-device lightweight WebAssembly (Wasm) or TensorFlow.js model for detecting zero-day visual phishing site clones.

3. **Team & Enterprise Whitelist Sync**:
   - Sync whitelisted corporate domains across organization devices via encrypted cloud storage.
