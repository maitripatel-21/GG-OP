# Gorillaz Guard - Feature Specifications & Threat Engine Breakdown

## Capability Matrix

| Feature Module | Implementation Status | Path |
| :--- | :---: | :--- |
| HTTPS & SSL Inspector | Production Ready | `src/services/url/urlDetector.js` |
| IP Address Host Detector | Production Ready | `src/utils/urlUtils.js` |
| Excessive Subdomains Check | Production Ready | `src/services/url/urlDetector.js` |
| Phishing Keyword Scanner | Production Ready | `src/services/url/urlDetector.js` |
| URL Shortener Identifier | Production Ready | `src/utils/urlUtils.js` |
| Unsafe Port Check | Production Ready | `src/utils/urlUtils.js` |
| Percent-Encoding Check | Production Ready | `src/utils/urlUtils.js` |
| Radial Safety Score Meter | Production Ready | `src/components/cards/SecurityScoreCard.jsx` |
| Content Warning Overlay | Production Ready | `src/content/contentScript.js` |
| Security Dashboard & Charts | Production Ready | `src/pages/Dashboard/DashboardPage.jsx` |
| Settings & Storage Sync | Production Ready | `src/pages/Settings/SettingsPage.jsx` |

---

## Safety Score Calculation Formula

The Safety Score is dynamically computed on a scale from **0 (Critical Risk)** to **100 (Fully Secure)**:

$$\text{Safety Score} = \max\left(0, 100 - \sum \text{Threat Penalties}\right)$$

### Threat Penalty Table:
1. **Unencrypted HTTP Protocol**: -30 points
2. **Numerical IP Address Host**: -35 points
3. **Phishing Keyword Match**: -25 points
4. **Unsafe Network Port**: -25 points
5. **Excessive Subdomains (>2 levels)**: -20 points
6. **URL Shortener Link**: -15 points
7. **Excessively Long URL (>75 chars)**: -15 points
8. **Suspicious Special Characters**: -15 points
9. **Percent-Encoded Sequence**: -10 points

---

## Safety Levels Classification
- **SAFE (80 - 100)**: Green badge & action indicator. Verified encryption and clean domain parameters.
- **WARNING (50 - 79)**: Amber badge. Potential security risks detected; exercise caution.
- **DANGEROUS (0 - 49)**: Red badge & warning banner. High risk of phishing or unencrypted credential harvesting.
