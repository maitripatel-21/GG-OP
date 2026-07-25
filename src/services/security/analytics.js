import { storageService } from '../storage/chromeStorage';

/**
 * Security Analytics & Browsing History Auditor Service
 */
export const analyticsService = {
  /**
   * Initial mock history data for Security Dashboard analytics
   */
  getMockHistory() {
    return [
      {
        id: 'h-1',
        domain: 'github.com',
        url: 'https://github.com/facebook/react',
        timestamp: '10 mins ago',
        safetyScore: 98,
        safetyLevel: 'SAFE',
        threatCount: 0,
      },
      {
        id: 'h-2',
        domain: 'paypal.account-verify-login.xyz',
        url: 'http://paypal.account-verify-login.xyz/auth',
        timestamp: '1 hour ago',
        safetyScore: 25,
        safetyLevel: 'DANGEROUS',
        threatCount: 3,
        threats: ['Unencrypted Connection', 'Phishing Keyword Indicator', 'Excessive Subdomains'],
      },
      {
        id: 'h-3',
        domain: '192.168.1.105',
        url: 'http://192.168.1.105/admin',
        timestamp: '3 hours ago',
        safetyScore: 40,
        safetyLevel: 'WARNING',
        threatCount: 2,
        threats: ['Suspicious IP Hostname', 'Unencrypted Connection'],
      },
      {
        id: 'h-4',
        domain: 'bit.ly',
        url: 'https://bit.ly/3xYz90a',
        timestamp: '5 hours ago',
        safetyScore: 65,
        safetyLevel: 'WARNING',
        threatCount: 1,
        threats: ['URL Shortener Detected'],
      },
      {
        id: 'h-5',
        domain: 'google.com',
        url: 'https://www.google.com',
        timestamp: 'Yesterday',
        safetyScore: 100,
        safetyLevel: 'SAFE',
        threatCount: 0,
      },
    ];
  },

  /**
   * Get aggregate metrics for the dashboard
   */
  async getMetrics() {
    const history = (await storageService.get('security_history')) || this.getMockHistory();
    const whitelist = (await storageService.get('whitelist')) || ['github.com', 'google.com', 'wikipedia.org'];

    const totalInspected = history.length;
    const safeCount = history.filter((h) => h.safetyLevel === 'SAFE').length;
    const riskyCount = history.filter((h) => h.safetyLevel !== 'SAFE').length;
    const avgScore = Math.round(
      history.reduce((acc, curr) => acc + curr.safetyScore, 0) / (totalInspected || 1)
    );

    return {
      totalInspected,
      safeCount,
      riskyCount,
      avgScore,
      whitelistCount: whitelist.length,
      history,
      whitelist,
    };
  },

  /**
   * Add domain to user whitelist
   * @param {string} domain
   */
  async addToWhitelist(domain) {
    const current = (await storageService.get('whitelist')) || ['github.com', 'google.com'];
    if (!current.includes(domain)) {
      const updated = [...current, domain];
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
