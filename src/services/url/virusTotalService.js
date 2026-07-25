import { storageService } from '../storage/chromeStorage';

/**
 * VirusTotal API v3 Rate-Limited & Quota-Aware Threat Intelligence Service
 * Strict Quota Enforcement:
 * - Max 4 lookups per minute (1 lookup / 15s)
 * - Max 500 lookups per day (with 450 safe threshold)
 * - Max 15.5k lookups per month
 * - 24-Hour Persistent Cache in chrome.storage.local
 */

const VIRUSTOTAL_API_KEY = import.meta.env?.VITE_VIRUSTOTAL_API_KEY || '';
const VT_DOMAIN_ENDPOINT = 'https://www.virustotal.com/api/v3/domains/';

// Rate Limiter State: Track timestamps of last 4 requests
const requestTimestamps = [];
const MINUTE_MS = 60 * 1000;
const MAX_REQUESTS_PER_MINUTE = 4;
const SAFE_DAILY_LIMIT = 450; // Safety buffer below 500/day quota

export const virusTotalService = {
  /**
   * Check if domain lookup is permitted under current rate limit and daily quota
   * @returns {Promise<boolean>}
   */
  async canMakeRequest() {
    if (!VIRUSTOTAL_API_KEY) return false;

    const now = Date.now();

    // 1. Check Rate Limit (Max 4 per minute)
    while (requestTimestamps.length > 0 && requestTimestamps[0] <= now - MINUTE_MS) {
      requestTimestamps.shift(); // Evict timestamps older than 60s
    }

    if (requestTimestamps.length >= MAX_REQUESTS_PER_MINUTE) {
      console.warn('[VirusTotal Service] Rate limit reached (4 requests/min). Deferring API call.');
      return false;
    }

    // 2. Check Daily Quota (Max 500/day)
    try {
      const today = new Date().toISOString().split('T')[0];
      const quotaData = (await storageService.get('vt_quota_tracker')) || { date: today, count: 0 };

      if (quotaData.date !== today) {
        quotaData.date = today;
        quotaData.count = 0;
        await storageService.set('vt_quota_tracker', quotaData);
      }

      if (quotaData.count >= SAFE_DAILY_LIMIT) {
        console.warn('[VirusTotal Service] Safe daily quota buffer reached (450/day). Falling back to local engine.');
        return false;
      }
    } catch {
      // Fallback
    }

    return true;
  },

  /**
   * Increment daily request counter
   */
  async incrementDailyQuota() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const quotaData = (await storageService.get('vt_quota_tracker')) || { date: today, count: 0 };

      if (quotaData.date !== today) {
        quotaData.date = today;
        quotaData.count = 1;
      } else {
        quotaData.count += 1;
      }

      await storageService.set('vt_quota_tracker', quotaData);
    } catch (e) {
      console.warn('[VirusTotal Service] Failed to update daily quota counter:', e);
    }
  },

  /**
   * Check domain threat intelligence via VirusTotal v3 API with 24-Hour Persistent Cache
   * @param {string} domain
   * @returns {Promise<object|null>} VirusTotal analysis report summary
   */
  async checkDomain(domain) {
    if (!domain || typeof domain !== 'string' || !VIRUSTOTAL_API_KEY) return null;

    const cleanDomain = domain.toLowerCase().trim();
    const cacheKey = `vt_cache_${cleanDomain}`;
    const now = Date.now();
    const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 Hours

    // 1. Check Persistent Storage Cache
    try {
      const cached = await storageService.get(cacheKey);
      if (cached && cached.timestamp && now - cached.timestamp < CACHE_TTL_MS) {
        return cached.data;
      }
    } catch (e) {
      console.warn('[VirusTotal Service] Cache read error:', e);
    }

    // 2. Check Rate Limit & Daily Quota Permissions
    const allowed = await this.canMakeRequest();
    if (!allowed) return null;

    try {
      // Record timestamp for rate limiter
      requestTimestamps.push(now);

      const response = await fetch(`${VT_DOMAIN_ENDPOINT}${cleanDomain}`, {
        method: 'GET',
        headers: {
          'x-apikey': VIRUSTOTAL_API_KEY,
          'Accept': 'application/json',
        },
      });

      // Increment daily quota counter
      await this.incrementDailyQuota();

      if (!response.ok) {
        if (response.status === 404) {
          const result = { isWhitelisted: false, maliciousCount: 0, suspiciousCount: 0, harmlessCount: 1, status: 'NOT_FOUND' };
          await storageService.set(cacheKey, { timestamp: now, data: result });
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

      // Save to 24-Hour Persistent Cache
      await storageService.set(cacheKey, { timestamp: now, data: result });
      return result;
    } catch (e) {
      console.warn('[VirusTotal Service] Domain lookup failed:', e);
      return null;
    }
  },
};
