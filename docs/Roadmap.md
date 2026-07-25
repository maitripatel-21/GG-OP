# Browser Guard - Implementation Roadmap

## Development Milestones

### Phase 1: Baseline Architecture & Popup Security (Current)
- [x] Project directory hierarchy & baseline docs
- [ ] Build configuration (Vite, Tailwind, PostCSS, ESLint, Prettier, Manifest V3)
- [ ] Glassmorphic dark design system & reusable atomic components
- [ ] Active tab inspection & protocol detection (HTTPS vs HTTP)
- [ ] Real-time Safety Score engine (0 - 100)
- [ ] Popup interface with glassmorphic cards and dynamic status gauge

### Phase 2: Heuristic Threat Engine & Warning Injection
- [ ] IP-address host detection (`http://192.168.1.1/login`)
- [ ] URL shortener identifier (bit.ly, tinyurl, t.co, etc.)
- [ ] Excessive subdomain & entropy analyzer (`login.paypal.secure.account-update.xyz`)
- [ ] Phishing keyword heuristic scanner (verify, login, banking, update, account)
- [ ] Content script warning banner overlay on unsafe sites

### Phase 3: Analytics Dashboard & Security History
- [ ] Full-screen Options page security dashboard
- [ ] Browser history security auditor (identifying past visited risky domains)
- [ ] Safe site whitelisting engine
- [ ] Threat log analytics charts (Safe vs Suspicious vs Blocked metrics)

### Phase 4: Preferences & Customization
- [ ] Granular security toggle preferences (Toggle heuristics, HTTPS enforce, banners)
- [ ] Whitelist & Custom Rule manager
- [ ] Notification options & dark theme customizations
