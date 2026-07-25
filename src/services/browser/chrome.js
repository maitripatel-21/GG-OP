import { MOCK_TAB_DATA } from '../../constants/securityConstants';

/**
 * Chrome Browser API Wrapper Service
 */
export const browserService = {
  /**
   * Get active tab details from Chrome browser or return mock in standalone dev mode
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

    // Return realistic mock data when running outside Chrome Extension context
    return {
      id: 101,
      url: MOCK_TAB_DATA.url,
      title: 'React - A JavaScript library for building user interfaces',
    };
  },

  /**
   * Send runtime message to extension background service worker
   * @param {object} message
   * @returns {Promise<any>}
   */
  async sendMessage(message) {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      return new Promise((resolve) => {
        chrome.runtime.sendMessage(message, (response) => {
          resolve(response);
        });
      });
    }
    return { status: 'mock_ack', data: null };
  },

  /**
   * Open Extension Dashboard / Options page in a new browser tab
   */
  openOptionsPage() {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open('/options.html', '_blank');
    }
  },
};
