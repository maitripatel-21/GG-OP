import { storageService } from '../storage/chromeStorage';
import { urlAnalysisEngine } from '../url/urlAnalysisEngine';

/**
 * Real-Time Security Analytics & Chrome History Inspection Service
 * 100% Real Dynamic Data - Zero Mock or Stubbed Records
 */
export const analyticsService = {
  /**
   * Fetch real browsing history from Chrome History API and run live security analysis
   * @returns {Promise<Array<object>>} Real analyzed history items
   */
  async getRealBrowserHistory() {
    if (typeof chrome !== 'undefined' && chrome.history && chrome.history.search) {
      return new Promise((resolve) => {
        chrome.history.search({ text: '', maxResults: 30 }, (historyItems) => {
          if (!historyItems || historyItems.length === 0) {
            resolve([]);
            return;
          }

          const analyzedHistory = historyItems
            .filter((item) => item.url && item.url.startsWith('http'))
            .map((item) => {
              const analysis = urlAnalysisEngine.analyze(item.url);
              const visitDate = item.lastVisitTime
                ? new Date(item.lastVisitTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'Recently';

              return {
                id: item.id || `h-${Math.random()}`,
                domain: analysis.domain,
                url: item.url,
                title: item.title || analysis.domain,
                timestamp: visitDate,
                safetyScore: analysis.safetyScore,
                safetyLevel: analysis.safetyLevel,
                threatCount: analysis.threatCount,
                threats: analysis.threats.map((t) => t.title),
                visitCount: item.visitCount || 1,
              };
            });

          resolve(analyzedHistory);
        });
      });
    }

    // Dev mode fallback when running outside extension container (returns empty array if no real chrome API)
    return [];
  },

  /**
   * Get aggregate metrics computed from real user storage & browser history
   */
  async getMetrics() {
    const realHistory = await this.getRealBrowserHistory();
    const storedHistory = (await storageService.get('security_history')) || [];
    const whitelist = (await storageService.get('whitelist')) || [];

    // Merge real browser history with stored scan history (deduplicated by domain)
    const combinedMap = new Map();
    [...storedHistory, ...realHistory].forEach((item) => {
      if (item && item.domain && !combinedMap.has(item.domain)) {
        combinedMap.set(item.domain, item);
      }
    });

    const allHistory = Array.from(combinedMap.values());

    const totalInspected = allHistory.length;
    const safeCount = allHistory.filter((h) => h.safetyLevel === 'SAFE').length;
    const riskyCount = allHistory.filter((h) => h.safetyLevel !== 'SAFE').length;
    const avgScore = totalInspected > 0
      ? Math.round(allHistory.reduce((acc, curr) => acc + (curr.safetyScore || 100), 0) / totalInspected)
      : 100;

    return {
      totalInspected,
      safeCount,
      riskyCount,
      avgScore,
      whitelistCount: whitelist.length,
      history: allHistory,
      whitelist,
    };
  },

  /**
   * Add domain to user whitelist
   * @param {string} domain
   */
  async addToWhitelist(domain) {
    if (!domain) return [];
    const cleanDomain = domain.trim().toLowerCase();
    const current = (await storageService.get('whitelist')) || [];
    if (!current.includes(cleanDomain)) {
      const updated = [...current, cleanDomain];
      await storageService.set('whitelist', updated);
      return updated;
    }
    return current;
  },

  /**
   * Remove domain from whitelist
   * @param {string} domain
   */
  async removeFromWhitelist(domain) {
    const current = (await storageService.get('whitelist')) || [];
    const updated = current.filter((d) => d !== domain);
    await storageService.set('whitelist', updated);
    return updated;
  },
};
