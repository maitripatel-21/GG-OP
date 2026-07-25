/**
 * Utility functions for URL parsing, string inspection, and security pattern matching
 */

/**
 * Check if string is a valid IPv4 or IPv6 address hostname
 * @param {string} hostname
 * @returns {boolean}
 */
export function isIpAddress(hostname) {
  if (!hostname) return false;
  // IPv4 regex pattern
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  // IPv6 regex pattern
  const ipv6Regex = /^\[?([a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}\]?$/;
  return ipv4Regex.test(hostname) || ipv6Regex.test(hostname);
}

/**
 * Check if domain belongs to known URL shortening services
 * @param {string} hostname
 * @returns {boolean}
 */
export function isShortenedUrl(hostname) {
  if (!hostname) return false;
  const shortenerDomains = [
    'bit.ly',
    'tinyurl.com',
    't.co',
    'goo.gl',
    'is.gd',
    'buff.ly',
    'ow.ly',
    'cutt.ly',
    'rb.gy',
    'tiny.cc',
    'bl.ink',
    'shorturl.at',
  ];
  const lowerHost = hostname.toLowerCase();
  return shortenerDomains.some((d) => lowerHost === d || lowerHost.endsWith(`.${d}`));
}

/**
 * Check for non-standard or unsafe network ports
 * @param {string} port
 * @param {string} protocol
 * @returns {boolean}
 */
export function isUnsafePort(port, protocol) {
  if (!port) return false;
  const numPort = parseInt(port, 10);
  if (isNaN(numPort)) return false;

  // Standard web ports
  if (protocol === 'https:' && numPort === 443) return false;
  if (protocol === 'http:' && (numPort === 80 || numPort === 8080)) return false;

  // Known dangerous or non-standard ports
  const dangerousPorts = [
    21, 22, 23, 25, 53, 110, 143, 445, 1433, 3306, 3389, 5432, 6379, 6667, 8000, 8888,
    9000,
  ];
  return dangerousPorts.includes(numPort) || numPort > 1024;
}

/**
 * Detect percent-encoded hex characters in URL (e.g. %20, %2F)
 * @param {string} urlString
 * @returns {boolean}
 */
export function isEncodedUrl(urlString) {
  if (!urlString) return false;
  const percentEncodingRegex = /%[0-9a-fA-F]{2}/;
  return percentEncodingRegex.test(urlString);
}

/**
 * Count occurrence of suspicious special characters in hostname & pathname
 * @param {string} urlString
 * @returns {number}
 */
export function countSpecialChars(urlString) {
  if (!urlString) return 0;
  const matches = urlString.match(/[@%$_~!$*^=;]/g);
  return matches ? matches.length : 0;
}
