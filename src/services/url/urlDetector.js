import { THREAT_TYPES } from '../../constants/securityConstants';
import {
  isIpAddress,
  isShortenedUrl,
  isUnsafePort,
  containsEncodedCharacters,
  countSpecialCharacters,
} from '../../utils/urlUtils';

/**
 * URL Threat Detector Service
 * Evaluates individual threat vectors respecting user settings preferences
 */
export const urlDetector = {
  /**
   * Detect all threat vectors in URL
   * @param {URL} parsedUrl
   * @param {string} rawUrl
   * @param {object} settings Active user security settings
   * @returns {Array<object>} List of detected threat objects
   */
  detectAll(parsedUrl, rawUrl, settings = {}) {
    const threats = [];
    const hostname = parsedUrl.hostname || '';

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

    // 4. Excessive Subdomains (> 2 levels)
    const domainParts = hostname.split('.');
    if (domainParts.length > 3) {
      threats.push({
        id: THREAT_TYPES.EXCESSIVE_SUBDOMAINS,
        title: 'Excessive Subdomains',
        description: 'Contains more than 2 subdomain levels, which can be an indicator of brand impersonation.',
        severity: 'MEDIUM',
        penalty: 20,
      });
    }

    // 5. Phishing Keywords in URL
    if (checkKeywords) {
      const suspiciousKeywords = [
        'login',
        'signin',
        'account',
        'banking',
        'verify',
        'secure-login',
        'update-password',
        'wallet-connect',
        'paypal-security',
        'appleid-verify',
      ];
      const lowerUrl = rawUrl.toLowerCase();
      const matchedKeywords = suspiciousKeywords.filter((kw) => lowerUrl.includes(kw));

      if (matchedKeywords.length > 0 && !hostname.includes('google.com') && !hostname.includes('github.com')) {
        threats.push({
          id: THREAT_TYPES.PHISHING_KEYWORDS,
          title: 'Suspicious Credential Keywords',
          description: `URL contains potential phishing keywords: "${matchedKeywords.join(', ')}".`,
          severity: 'HIGH',
          penalty: 25,
        });
      }
    }

    // 6. Unsafe Network Port
    if (parsedUrl.port && isUnsafePort(parsedUrl.port)) {
      threats.push({
        id: 'UNSAFE_PORT',
        title: 'Non-Standard Network Port',
        description: `Website runs on non-standard port :${parsedUrl.port}, bypassing standard security filters.`,
        severity: 'HIGH',
        penalty: 25,
      });
    }

    // 7. Excessive URL Length (> 75 chars)
    if (rawUrl.length > 75) {
      threats.push({
        id: 'LONG_URL',
        title: 'Excessively Long URL',
        description: `URL length is ${rawUrl.length} characters long. Long URLs are often used to hide deceptive domain names.`,
        severity: 'LOW',
        penalty: 15,
      });
    }

    // 8. Percent-Encoded Obfuscation
    if (containsEncodedCharacters(rawUrl)) {
      threats.push({
        id: 'ENCODED_URL',
        title: 'Percent-Encoded Obfuscation',
        description: 'Contains hex-encoded characters hiding original text in the address bar.',
        severity: 'LOW',
        penalty: 10,
      });
    }

    // 9. Suspicious Special Characters
    const specialCount = countSpecialCharacters(rawUrl);
    if (specialCount > 5) {
      threats.push({
        id: 'SPECIAL_CHARACTERS',
        title: 'Excessive Special Characters',
        description: `Contains ${specialCount} special characters (@, %, -, _), commonly used to obscure links.`,
        severity: 'MEDIUM',
        penalty: 15,
      });
    }

    return threats;
  },
};
