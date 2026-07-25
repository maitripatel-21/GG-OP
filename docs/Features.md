# Browser Guard - Feature Specifications

## Overview of Capability Matrix

| Feature | Phase | Status | Module Path |
| :--- | :---: | :---: | :--- |
| Glassmorphic UI System | Phase 1 | In Progress | `src/components/common/` |
| HTTPS Security Inspector | Phase 1 | Planned | `src/services/security/urlAnalyzer.js` |
| Safety Score Gauge | Phase 1 | Planned | `src/components/cards/SecurityScoreCard.jsx` |
| IP URL Detection | Phase 2 | Planned | `src/services/security/heuristics.js` |
| Subdomain Bloat Inspector | Phase 2 | Planned | `src/services/security/heuristics.js` |
| URL Shortener Detection | Phase 2 | Planned | `src/services/security/heuristics.js` |
| Content Warning Overlay | Phase 2 | Planned | `src/content/warningBanner.js` |
| Full Security Dashboard | Phase 3 | Planned | `src/pages/Dashboard/` |
| Threat Analytics & Stats | Phase 3 | Planned | `src/services/security/analytics.js` |
| Custom Settings & Whitelist| Phase 4 | Planned | `src/pages/Settings/` |

---

## Detailed Specifications

### 1. Safety Score Algorithm
Safety score is computed dynamically on a range from 0 (Critical Risk) to 100 (Fully Secure):
- Base score: **100 points**
- Unencrypted HTTP connection: **-35 points**
- Direct IP Hostname: **-40 points**
- Suspicious Keyword Match: **-15 points per match**
- Excessive Subdomains (>3 levels): **-20 points**
- Known URL Shortener: **-15 points**

### 2. Glassmorphic UI Specifications
- Dark background tokens: `#0B0F19`, `#111827`, `#1F2937`
- Glass containers: `backdrop-blur-md`, `bg-white/5`, `border border-white/10`
- Gradient accents: Cyber Cyan (`#06B6D4`), Neon Emerald (`#10B981`), Crimson Warning (`#EF4444`)
