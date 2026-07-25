import { MOCK_TAB_DATA } from '../../constants/securityConstants';

/**
 * Chrome Extension API Service Wrapper
 * Provides safe abstractions around chrome.tabs, chrome.runtime, and chrome.action
 */
export const browserService = {
  /**
   * Get active browser tab details or fallback mock data
   * @returns {Promise<object>}
   */
  async getActiveTab() {
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
      return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs && tabs.length > 0) {
            resolve(tabs[0]);
          } else {
            resolve(null);
          }
        });
      });
    }

    // Standalone Web Dev Fallback
    return {
      id: 101,
      url: MOCK_TAB_DATA.url,
      title: 'React - A JavaScript library for building user interfaces',
    };
  },

  /**
   * Send runtime message to background service worker
   * @param {object} message
   * @returns {Promise<any>}
   */
  async sendMessage(message) {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      return new Promise((resolve) => {
        chrome.runtime.sendMessage(message, (response) => {
          resolve(response || { status: 'acknowledged' });
        });
      });
    }
    return { status: 'mock_acknowledged', data: null };
  },

  /**
   * Open full-screen Security Dashboard / Options page
   */
  openOptionsPage() {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open('/options.html', '_blank');
    }
  },
};
