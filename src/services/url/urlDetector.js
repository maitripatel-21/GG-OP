import {
  isIpAddress,
  isShortenedUrl,
  isUnsafePort,
  isEncodedUrl,
  countSpecialChars,
} from '../../utils/urlUtils';

/**
 * Suspicious keyword dictionary for phishing intent scanning
 */
const SUSPICIOUS_KEYWORDS = [
  'login',
  'verify',
  'account',
  'update-password',
  'secure-auth',
  'banking',
  'confirm-identity',
  'wallet-connect',
  'web3-claim',
  'credential',
  'pay-now',
  'security-alert',
  'signin',
  'support-ticket',
];

export const urlDetector = {
  /**
   * Run all 9 security checks against parsed URL object
   * @param {URL} parsedUrl
   * @param {string} rawUrl
   * @returns {Array<object>} Detected threat findings
   */
  detectAll(parsedUrl, rawUrl) {
    const threats = [];

    // 1. HTTP vs HTTPS Check
    if (parsedUrl.protocol === 'http:') {
      threats.push({
        id: 'UNENCRYPTED_HTTP',
        type: 'HTTP_PROTOCOL',
        severity: 'MEDIUM',
        penalty: 30,
        title: 'Unencrypted HTTP Connection',
        description: 'Connection lacks SSL/TLS encryption. Sensitive data transmitted may be intercepted.',
      });
    }

    // 2. IP Address Hostname Check
    if (isIpAddress(parsedUrl.hostname)) {
      threats.push({
        id: 'SUSPICIOUS_IP_HOST',
        type: 'IP_ADDRESS',
        severity: 'HIGH',
        penalty: 35,
        title: 'Numerical IP Address Host',
        description: 'URL uses a raw IP address instead of a domain name, a signature phishing indicator.',
      });
    }

    // 3. Excessive Subdomains Check
    const domainParts = parsedUrl.hostname.split('.');
    const subdomainsCount = Math.max(0, domainParts.length - 2);
    if (subdomainsCount > 2) {
      threats.push({
        id: 'EXCESSIVE_SUBDOMAINS',
        type: 'SUBDOMAIN_BLOAT',
        severity: 'MEDIUM',
        penalty: 20,
        title: 'Excessive Subdomain Levels',
        description: `Host contains ${subdomainsCount} subdomain levels, often used to disguise fake brand domains.`,
      });
    }

    // 4. Suspicious Keywords Check
    const fullPath = (parsedUrl.hostname + parsedUrl.pathname + parsedUrl.search).toLowerCase();
    const matchedKeywords = SUSPICIOUS_KEYWORDS.filter((kw) => fullPath.includes(kw));
    if (matchedKeywords.length > 0) {
      threats.push({
        id: 'SUSPICIOUS_KEYWORDS',
        type: 'PHISHING_KEYWORDS',
        severity: 'HIGH',
        penalty: 25,
        title: 'Phishing Keyword Indicator',
        description: `URL contains suspicious keywords: "${matchedKeywords.join(', ')}".`,
      });
    }

    // 5. Very Long URL Check (> 75 characters)
    if (rawUrl.length > 75) {
      threats.push({
        id: 'EXCESSIVE_URL_LENGTH',
        type: 'LONG_URL',
        severity: 'LOW',
        penalty: 15,
        title: 'Excessively Long URL',
        description: `URL is ${rawUrl.length} characters long, which may obscure the true destination.`,
      });
    }

    // 6. Shortened URL Check
    if (isShortenedUrl(parsedUrl.hostname)) {
      threats.push({
        id: 'URL_SHORTENER',
        type: 'SHORTENED_URL',
        severity: 'LOW',
        penalty: 15,
        title: 'Shortened URL Service',
        description: 'Destination domain is obscured behind a URL shortening redirection service.',
      });
    }

    // 7. Unsafe Network Port Check
    if (isUnsafePort(parsedUrl.port, parsedUrl.protocol)) {
      threats.push({
        id: 'UNSAFE_PORT',
        type: 'NON_STANDARD_PORT',
        severity: 'HIGH',
        penalty: 25,
        title: 'Unsafe Network Port',
        description: `Connection targets non-standard network port ${parsedUrl.port}.`,
      });
    }

    // 8. Suspicious Special Characters Check (> 3 occurrences)
    const specialCharCount = countSpecialChars(rawUrl);
    if (specialCharCount > 3) {
      threats.push({
        id: 'SPECIAL_CHARACTERS',
        type: 'OBFUSCATED_CHARS',
        severity: 'MEDIUM',
        penalty: 15,
        title: 'Suspicious Special Characters',
        description: `URL contains ${specialCharCount} special characters (@, %, $, !), indicating potential obfuscation.`,
      });
    }

    // 9. Encoded URL Check
    if (isEncodedUrl(rawUrl)) {
      threats.push({
        id: 'ENCODED_URL',
        type: 'PERCENT_ENCODING',
        severity: 'LOW',
        penalty: 10,
        title: 'Percent-Encoded Characters',
        description: 'URL contains percent-encoded hex sequences, hiding destination path elements.',
      });
    }

    return threats;
  },
};
