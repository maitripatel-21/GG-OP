/**
 * Security Enums and System Defaults
 */
export const SAFETY_LEVELS = {
  SAFE: 'SAFE',
  WARNING: 'WARNING',
  DANGEROUS: 'DANGEROUS',
  UNKNOWN: 'UNKNOWN',
};

export const THREAT_TYPES = {
  UNENCRYPTED_HTTP: 'UNENCRYPTED_HTTP',
  SUSPICIOUS_IP_HOST: 'SUSPICIOUS_IP_HOST',
  URL_SHORTENER: 'URL_SHORTENER',
  EXCESSIVE_SUBDOMAINS: 'EXCESSIVE_SUBDOMAINS',
  PHISHING_KEYWORDS: 'PHISHING_KEYWORDS',
};

export const DEFAULT_SETTINGS = {
  protectionEnabled: true,
  autoWarnBanners: true,
  checkHttps: true,
  checkIpUrls: true,
  checkShorteners: true,
  checkKeywords: true,
  notificationsEnabled: true,
  darkMode: true,
};

export const MOCK_TAB_DATA = {
  url: 'https://github.com/facebook/react',
  domain: 'github.com',
  protocol: 'https:',
  isHttps: true,
  safetyScore: 98,
  safetyLevel: SAFETY_LEVELS.SAFE,
  threats: [],
  domainAge: '16+ years',
  sslIssuer: 'DigiCert Global Root CA',
};
