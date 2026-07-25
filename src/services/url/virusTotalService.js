/**
 * VirusTotal API v3 Threat Intelligence Service
 * Integrates live VirusTotal domain security lookups
 */

const VIRUSTOTAL_API_KEY = 'c9b5b7f592338d5d683a704ebc246b8b9b048a8a9e003ab4a57e7b99464fa610';
const VT_DOMAIN_ENDPOINT = 'https://www.virustotal.com/api/v3/domains/';

// In-memory lookup cache to avoid unnecessary API rate limit calls
const vtCache = new Map();

export const virusTotalService = {
  /**
   * Check domain threat intelligence via VirusTotal v3 API
   * @param {string} domain
   * @returns {Promise<object|null>} VirusTotal analysis report summary
   */
  async checkDomain(domain) {
    if (!domain || typeof domain !== 'string') return null;

    const cleanDomain = domain.toLowerCase().trim();

    // Check local cache first
    if (vtCache.has(cleanDomain)) {
      return vtCache.get(cleanDomain);
    }

    try {
      const response = await fetch(`${VT_DOMAIN_ENDPOINT}${cleanDomain}`, {
        method: 'GET',
        headers: {
          'x-apikey': VIRUSTOTAL_API_KEY,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          const result = { isWhitelisted: false, maliciousCount: 0, suspiciousCount: 0, harmlessCount: 1, status: 'NOT_FOUND' };
          vtCache.set(cleanDomain, result);
          return result;
        }
        return null;
      }

      const json = await response.json();
      const stats = json?.data?.attributes?.last_analysis_stats || {};

      const maliciousCount = stats.malicious || 0;
      const suspiciousCount = stats.suspicious || 0;
      const harmlessCount = stats.harmless || 0;

      const result = {
        domain: cleanDomain,
        maliciousCount,
        suspiciousCount,
        harmlessCount,
        totalEngines: maliciousCount + suspiciousCount + harmlessCount + (stats.undetected || 0),
        isMalicious: maliciousCount > 0,
        isSuspicious: suspiciousCount > 1,
        reputation: json?.data?.attributes?.reputation || 0,
        status: 'ANALYZED',
      };

      vtCache.set(cleanDomain, result);
      return result;
    } catch (e) {
      console.warn('[VirusTotal Service] Domain lookup failed:', e);
      return null;
    }
  },
};
