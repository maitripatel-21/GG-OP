import { SAFETY_LEVELS, THREAT_TYPES } from '../../constants/securityConstants';

/**
 * Deterministic Safety Score & Threat Engine
 */
export const scoreCalculator = {
  /**
   * Calculate safety score and threat breakdown from raw URL analysis metrics
   * @param {object} analysis
   * @returns {{ safetyScore: number, safetyLevel: string, threats: Array }}
   */
  evaluate(analysis) {
    if (!analysis) {
      return { safetyScore: 50, safetyLevel: SAFETY_LEVELS.WARNING, threats: [] };
    }

    let score = 100;
    const threats = [];

    // Check 1: HTTPS Encryption (-35 points for HTTP)
    if (!analysis.isHttps && analysis.isHttp) {
      score -= 35;
      threats.push({
        id: THREAT_TYPES.UNENCRYPTED_HTTP,
        severity: 'MEDIUM',
        title: 'Unencrypted Connection (HTTP)',
        description: 'This connection is not encrypted. Data transmitted may be visible to network eavesdroppers.',
      });
    }

    // Check 2: Raw IP Hostname (-40 points)
    if (analysis.isIpHost) {
      score -= 40;
      threats.push({
        id: THREAT_TYPES.SUSPICIOUS_IP_HOST,
        severity: 'HIGH',
        title: 'Suspicious IP Hostname',
        description: 'Host uses a raw IP address instead of a domain name, a common phishing pattern.',
      });
    }

    // Check 3: URL Shorteners (-15 points)
    if (analysis.isShortener) {
      score -= 15;
      threats.push({
        id: THREAT_TYPES.URL_SHORTENER,
        severity: 'LOW',
        title: 'URL Shortener Detected',
        description: 'Original destination domain is obscured behind a URL shortening service.',
      });
    }

    // Check 4: Excessive Subdomains (>3 subdomains) (-20 points)
    if (analysis.subdomainsCount > 2) {
      score -= 20;
      threats.push({
        id: THREAT_TYPES.EXCESSIVE_SUBDOMAINS,
        severity: 'MEDIUM',
        title: 'Excessive Subdomain Levels',
        description: `Domain contains ${analysis.subdomainsCount} subdomain levels, which may indicate domain spoofing.`,
      });
    }

    // Check 5: Suspicious Keywords (-25 points)
    if (analysis.containsSuspiciousKeywords) {
      score -= 25;
      threats.push({
        id: THREAT_TYPES.PHISHING_KEYWORDS,
        severity: 'HIGH',
        title: 'Phishing Keyword Indicator',
        description: 'URL contains words frequently associated with credentials theft or fake logins.',
      });
    }

    // Clamp score within [0, 100]
    const finalScore = Math.max(0, Math.min(100, score));

    // Determine safety level
    let safetyLevel = SAFETY_LEVELS.SAFE;
    if (finalScore < 50) {
      safetyLevel = SAFETY_LEVELS.DANGEROUS;
    } else if (finalScore < 80) {
      safetyLevel = SAFETY_LEVELS.WARNING;
    }

    return {
      safetyScore: finalScore,
      safetyLevel,
      threats,
    };
  },
};
