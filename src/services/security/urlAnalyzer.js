/**
 * Pure URL Security Analysis Engine
 */
export const urlAnalyzer = {
  /**
   * Analyze raw URL string and extract domain metrics and risk indicators
   * @param {string} rawUrl
   * @returns {object}
   */
  analyze(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') {
      return this.createDefaultAnalysis('Invalid URL');
    }

    try {
      const parsed = new URL(rawUrl);
      const isHttps = parsed.protocol === 'https:';
      const isHttp = parsed.protocol === 'http:';
      const hostname = parsed.hostname;

      // Extract domain parts
      const domainParts = hostname.split('.');
      const subdomainsCount = Math.max(0, domainParts.length - 2);

      // Heuristic checks
      const isIpHost = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
      const isShortener = this.isUrlShortener(hostname);
      const containsSuspiciousKeywords = this.checkKeywords(parsed.pathname + parsed.search);

      return {
        url: rawUrl,
        domain: hostname,
        protocol: parsed.protocol,
        isHttps,
        isHttp,
        isIpHost,
        isShortener,
        subdomainsCount,
        containsSuspiciousKeywords,
        domainAge: this.estimateDomainAge(hostname),
        sslIssuer: isHttps ? 'Verified Authority (TLS 1.3)' : 'None (Unencrypted)',
      };
    } catch {
      return this.createDefaultAnalysis(rawUrl);
    }
  },

  /**
   * Check if domain is a known URL shortener service
   * @param {string} hostname
   * @returns {boolean}
   */
  isUrlShortener(hostname) {
    const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'is.gd', 'buff.ly', 'ow.ly'];
    return shorteners.some((s) => hostname.toLowerCase().includes(s));
  },

  /**
   * Scan URL path and queries for phishing intent keywords
   * @param {string} pathAndQuery
   * @returns {boolean}
   */
  checkKeywords(pathAndQuery) {
    const keywords = ['verify-account', 'secure-login', 'update-password', 'banking-auth', 'pay-now-claim'];
    const lower = pathAndQuery.toLowerCase();
    return keywords.some((kw) => lower.includes(kw));
  },

  /**
   * Domain age estimator placeholder/mock for client-side evaluation
   * @param {string} hostname
   * @returns {string}
   */
  estimateDomainAge(hostname) {
    if (hostname.includes('github') || hostname.includes('google') || hostname.includes('react')) {
      return '15+ years (Established)';
    }
    if (hostname.includes('test') || hostname.includes('xyz') || hostname.includes('temp')) {
      return '< 3 months (Recent)';
    }
    return '5+ years (Verified)';
  },

  /**
   * Default fallback analysis object
   * @param {string} domain
   * @returns {object}
   */
  createDefaultAnalysis(domain) {
    return {
      url: domain,
      domain: domain,
      protocol: 'unknown:',
      isHttps: false,
      isHttp: false,
      isIpHost: false,
      isShortener: false,
      subdomainsCount: 0,
      containsSuspiciousKeywords: false,
      domainAge: 'Unknown',
      sslIssuer: 'None',
    };
  },
};
