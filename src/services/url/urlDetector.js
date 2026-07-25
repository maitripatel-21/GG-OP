import { THREAT_TYPES } from '../../constants/securityConstants';
import {
  isIpAddress,
  isShortenedUrl,
  isUnsafePort,
  isEncodedUrl,
  countSpecialChars,
} from '../../utils/urlUtils';

// Authoritative Top Verified Legit Domains (Exempt from login keyword false positives)
const TOP_LEGIT_DOMAINS = [
  'github.com',
  'google.com',
  'accounts.google.com',
  'microsoft.com',
  'login.live.com',
  'login.microsoftonline.com',
  'apple.com',
  'idmsa.apple.com',
  'amazon.com',
  'youtube.com',
  'facebook.com',
  'twitter.com',
  'x.com',
  'linkedin.com',
  'wikipedia.org',
  'netflix.com',
  'instagram.com',
  'stackoverflow.com',
  'gitlab.com',
  'bitbucket.org',
  'paypal.com',
  'dropbox.com',
  'slack.com',
  'zoom.us',
  'notion.so',
  'figma.com',
  'atlassian.com',
  'adobe.com',
];

/**
 * Discrete URL Threat Detector Service
 * Eliminates false positives on legit websites (GitHub, Google, Microsoft, etc.)
 */
export const urlDetector = {
  /**
   * Check if domain is a verified legit popular domain
   * @param {string} hostname
   * @returns {boolean}
   */
  isTopLegitDomain(hostname) {
    if (!hostname) return false;
    const lower = hostname.toLowerCase();
    return TOP_LEGIT_DOMAINS.some((d) => lower === d || lower.endsWith(`.${d}`));
  },

  /**
   * Detect all threat vectors in URL with discrete scoring logic
   * @param {URL} parsedUrl
   * @param {string} rawUrl
   * @param {object} settings Active user security settings
   * @returns {Array<object>} List of detected threat objects
   */
  detectAll(parsedUrl, rawUrl, settings = {}) {
    const threats = [];
    const hostname = (parsedUrl.hostname || '').toLowerCase();
    const isLegitDomain = this.isTopLegitDomain(hostname);

    // Default settings if undefined
    const checkHttps = settings.checkHttps ?? true;
    const checkIpUrls = settings.checkIpUrls ?? true;
    const checkShorteners = settings.checkShorteners ?? true;
    const checkKeywords = settings.checkKeywords ?? true;

    // 1. Unencrypted HTTP Connection
    if (checkHttps && parsedUrl.protocol === 'http:') {
      threats.push({
        id: THREAT_TYPES.UNENCRYPTED_HTTP,
        title: 'Unencrypted HTTP Connection',
        description: 'This website does not use SSL/TLS encryption. Data entered here can be intercepted.',
        severity: 'HIGH',
        penalty: 30,
      });
    }

    // 2. IP Address Hostname
    if (checkIpUrls && isIpAddress(hostname)) {
      threats.push({
        id: THREAT_TYPES.SUSPICIOUS_IP_HOST,
        title: 'Numerical IP Hostname',
        description: 'Websites using raw IP addresses instead of registered domain names are frequently used in phishing attacks.',
        severity: 'HIGH',
        penalty: 35,
      });
    }

    // 3. URL Shortener Link
    if (checkShorteners && isShortenedUrl(hostname)) {
      threats.push({
        id: THREAT_TYPES.URL_SHORTENER,
        title: 'URL Shortener Service Detected',
        description: 'Link shorteners mask the true destination domain, hiding potential security risks.',
        severity: 'MEDIUM',
        penalty: 15,
      });
    }

    // 4. Excessive Subdomains (> 3 levels) - Ignore on legit domains like accounts.google.com
    const domainParts = hostname.split('.');
    if (!isLegitDomain && domainParts.length > 3) {
      threats.push({
        id: THREAT_TYPES.EXCESSIVE_SUBDOMAINS,
        title: 'Excessive Subdomains',
        description: 'Contains more than 2 subdomain levels, which can be an indicator of brand impersonation.',
        severity: 'MEDIUM',
        penalty: 20,
      });
    }

    // 5. Phishing Keywords in URL - EXEMPT verified legit domains (GitHub, Google, Microsoft, etc.)
    if (checkKeywords && !isLegitDomain) {
      const suspiciousKeywords = [
        'login-verify',
        'signin-security',
        'account-update',
        'banking-verify',
        'secure-login-attempt',
        'update-password-now',
        'wallet-connect-claim',
        'paypal-security-alert',
        'appleid-verify-user',
      ];
      const lowerUrl = rawUrl.toLowerCase();
      const matchedKeywords = suspiciousKeywords.filter((kw) => lowerUrl.includes(kw));

      if (matchedKeywords.length > 0) {
        threats.push({
          id: THREAT_TYPES.PHISHING_KEYWORDS,
          title: 'Suspicious Spoofing Keywords',
          description: `URL contains potential phishing spoofing phrases: "${matchedKeywords.join(', ')}".`,
          severity: 'HIGH',
          penalty: 25,
        });
      }
    }

    // 6. Unsafe Network Port
    if (parsedUrl.port && isUnsafePort(parsedUrl.port, parsedUrl.protocol)) {
      threats.push({
        id: 'UNSAFE_PORT',
        title: 'Non-Standard Network Port',
        description: `Website runs on non-standard port :${parsedUrl.port}, bypassing standard security filters.`,
        severity: 'HIGH',
        penalty: 25,
      });
    }

    // 7. Excessive URL Length (> 100 chars) - Ignore on legit domains
    if (!isLegitDomain && rawUrl.length > 100) {
      threats.push({
        id: 'LONG_URL',
        title: 'Excessively Long Deceptive URL',
        description: `URL is ${rawUrl.length} characters long, commonly used to hide deceptive domain names.`,
        severity: 'LOW',
        penalty: 10,
      });
    }

    // 8. Percent-Encoded Obfuscation
    if (!isLegitDomain && isEncodedUrl(rawUrl)) {
      threats.push({
        id: 'ENCODED_URL',
        title: 'Percent-Encoded Obfuscation',
        description: 'Contains hex-encoded characters hiding original text in the address bar.',
        severity: 'LOW',
        penalty: 10,
      });
    }

    // 9. Suspicious Special Characters
    if (!isLegitDomain) {
      const specialCount = countSpecialChars(rawUrl);
      if (specialCount > 6) {
        threats.push({
          id: 'SPECIAL_CHARACTERS',
          title: 'Excessive Special Characters',
          description: `Contains ${specialCount} special characters (@, %, -, _), commonly used to obscure links.`,
          severity: 'MEDIUM',
          penalty: 15,
        });
      }
    }

    return threats;
  },
};
