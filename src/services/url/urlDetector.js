import { THREAT_TYPES } from '../../constants/securityConstants';
import {
  isIpAddress,
  isShortenedUrl,
  isUnsafePort,
  isEncodedUrl,
  countSpecialChars,
} from '../../utils/urlUtils';

// Authoritative Top Verified Legit Domains
const TOP_LEGIT_DOMAINS = [
  'github.com',
  'google.com',
  'accounts.google.com',
  'microsoft.com',
  'live.com',
  'apple.com',
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
  'reddit.com',
];

/**
 * Intelligent URL Threat Detector Service
 * Completely eliminates false positive keyword flags on legitimate websites (GitHub, Google, etc.)
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
   * Detect real threat vectors without flagging standard URL paths (like /login)
   * @param {URL} parsedUrl
   * @param {string} rawUrl
   * @param {object} settings Active user security settings
   * @returns {Array<object>} List of detected threat objects
   */
  detectAll(parsedUrl, rawUrl, settings = {}) {
    const threats = [];
    const hostname = (parsedUrl.hostname || '').toLowerCase();
    const isLegitDomain = this.isTopLegitDomain(hostname);
    const isHttps = parsedUrl.protocol === 'https:';

    // Default settings if undefined
    const checkHttps = settings.checkHttps ?? true;
    const checkIpUrls = settings.checkIpUrls ?? true;
    const checkShorteners = settings.checkShorteners ?? true;
    const checkKeywords = settings.checkKeywords ?? true;

    // 1. Unencrypted HTTP Connection (Only flag if site lacks SSL/TLS)
    if (checkHttps && parsedUrl.protocol === 'http:') {
      threats.push({
        id: THREAT_TYPES.UNENCRYPTED_HTTP,
        title: 'Unencrypted HTTP Connection',
        description:
          'This website does not use SSL/TLS encryption. Data entered here can be intercepted.',
        severity: 'HIGH',
        penalty: 30,
      });
    }

    // 2. IP Address Hostname (e.g., http://192.168.1.1)
    if (checkIpUrls && isIpAddress(hostname)) {
      threats.push({
        id: THREAT_TYPES.SUSPICIOUS_IP_HOST,
        title: 'Numerical IP Hostname',
        description:
          'Websites using raw IP addresses instead of registered domain names are frequently used in phishing attacks.',
        severity: 'HIGH',
        penalty: 35,
      });
    }

    // 3. URL Shortener Link
    if (checkShorteners && isShortenedUrl(hostname)) {
      threats.push({
        id: THREAT_TYPES.URL_SHORTENER,
        title: 'URL Shortener Service Detected',
        description:
          'Link shorteners mask the true destination domain, hiding potential security risks.',
        severity: 'MEDIUM',
        penalty: 15,
      });
    }

    // 4. Excessive Subdomains (> 3 levels) - Never flag legit domains or subdomains
    const domainParts = hostname.split('.');
    if (!isLegitDomain && domainParts.length > 3) {
      threats.push({
        id: THREAT_TYPES.EXCESSIVE_SUBDOMAINS,
        title: 'Excessive Subdomains',
        description:
          'Contains more than 2 subdomain levels, which can be an indicator of brand impersonation.',
        severity: 'MEDIUM',
        penalty: 20,
      });
    }

    // 5. Deceptive Domain Phishing Spoofing (NOT standard URL paths like /login or /signin)
    // Only flag if the DOMAIN ITSELF contains deceptive compound spoofing patterns (e.g. github-verify-login.xyz)
    if (checkKeywords && !isLegitDomain) {
      const deceptiveDomainPatterns = [
        '-login-verify',
        '-signin-security',
        '-account-update',
        '-banking-verify',
        '-secure-login',
        '-update-password',
        '-wallet-connect',
        'paypal-security-',
        'appleid-verify-',
      ];

      const matchedPatterns = deceptiveDomainPatterns.filter((pattern) =>
        hostname.includes(pattern)
      );

      // ONLY flag if deceptive pattern is in domain AND connection is unencrypted or non-HTTPS
      if (matchedPatterns.length > 0 && !isHttps) {
        threats.push({
          id: THREAT_TYPES.PHISHING_KEYWORDS,
          title: 'Deceptive Domain Phishing Pattern',
          description: `Domain contains suspicious phishing spoofing patterns: "${matchedPatterns.join(', ')}".`,
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

    // 7. Excessive Deceptive URL Length (> 120 chars) - Exclude legit domains
    if (!isLegitDomain && !isHttps && rawUrl.length > 120) {
      threats.push({
        id: 'LONG_URL',
        title: 'Excessively Long Deceptive URL',
        description: `URL is ${rawUrl.length} characters long on an unencrypted connection.`,
        severity: 'LOW',
        penalty: 10,
      });
    }

    // 8. Percent-Encoded Obfuscation - Exclude HTTPS legit domains
    if (!isLegitDomain && !isHttps && isEncodedUrl(rawUrl)) {
      threats.push({
        id: 'ENCODED_URL',
        title: 'Percent-Encoded Obfuscation',
        description:
          'Contains hex-encoded characters hiding original text in the address bar.',
        severity: 'LOW',
        penalty: 10,
      });
    }

    // 9. Suspicious Special Characters - Exclude HTTPS legit domains
    if (!isLegitDomain && !isHttps) {
      const specialCount = countSpecialChars(rawUrl);
      if (specialCount > 8) {
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
