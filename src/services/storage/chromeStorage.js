import { DEFAULT_SETTINGS } from '../../constants/securityConstants';

/**
 * Storage service wrapper supporting Chrome Storage API with localStorage fallback for web dev
 */
export const storageService = {
  /**
   * Get value by key from chrome.storage.local or fallback
   * @param {string} key
   * @param {any} defaultValue
   * @returns {Promise<any>}
   */
  async get(key, defaultValue = null) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
          resolve(result[key] !== undefined ? result[key] : defaultValue);
        });
      });
    }

    // Dev Fallback (localStorage)
    try {
      const item = localStorage.getItem(`bg_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  /**
   * Set value in chrome.storage.local or fallback
   * @param {string} key
   * @param {any} value
   * @returns {Promise<void>}
   */
  async set(key, value) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, () => resolve());
      });
    }

    // Dev Fallback
    try {
      localStorage.setItem(`bg_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage set failed in dev fallback', e);
    }
  },

  /**
   * Fetch current extension settings merged with default settings
   * @returns {Promise<object>}
   */
  async getSettings() {
    const storedSettings = await this.get('settings', {});
    return { ...DEFAULT_SETTINGS, ...storedSettings };
  },

  /**
   * Update extension settings
   * @param {object} newSettings
   * @returns {Promise<object>}
   */
  async saveSettings(newSettings) {
    const current = await this.getSettings();
    const updated = { ...current, ...newSettings };
    await this.set('settings', updated);
    return updated;
  },
};
