import { storageService } from '../storage/chromeStorage';
import { urlAnalysisEngine } from '../url/urlAnalysisEngine';

/**
 * Real-Time Security Analytics, Export/Import, & Chrome History Service
 * 100% Real Dynamic Data - Zero Stubs
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

  /**
   * Export Security Audit Report as JSON File
   */
  exportJSONReport(metrics, historyList) {
    const reportData = {
      title: 'Gorillaz Guard Security Audit Report',
      generatedAt: new Date().toISOString(),
      summary: {
        totalInspected: metrics?.totalInspected || 0,
        safeWebsites: metrics?.safeCount || 0,
        unsafeWebsites: metrics?.riskyCount || 0,
        averageSafetyScore: metrics?.avgScore || 100,
        whitelistCount: metrics?.whitelistCount || 0,
      },
      inspectedDomains: historyList.map((item) => ({
        domain: item.domain,
        url: item.url,
        safetyScore: item.safetyScore,
        safetyLevel: item.safetyLevel,
        threatCount: item.threatCount,
        threats: item.threats,
      })),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GorillazGuard_SecurityReport_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  /**
   * Export Whitelist as JSON Backup File
   */
  exportWhitelistJSON(whitelist) {
    const data = {
      app: 'Gorillaz Guard',
      type: 'whitelist_backup',
      exportedAt: new Date().toISOString(),
      whitelist,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GorillazGuard_Whitelist_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  /**
   * Import Whitelist from JSON file
   */
  async importWhitelistJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          const importedDomains = Array.isArray(parsed) ? parsed : parsed.whitelist;
          if (!Array.isArray(importedDomains)) {
            reject(new Error('Invalid whitelist format'));
            return;
          }

          const current = (await storageService.get('whitelist')) || [];
          const merged = Array.from(new Set([...current, ...importedDomains.map((d) => d.trim().toLowerCase())])).filter(Boolean);
          await storageService.set('whitelist', merged);
          resolve(merged);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsText(file);
    });
  },
};
