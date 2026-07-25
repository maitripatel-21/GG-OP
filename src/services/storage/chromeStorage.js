import { DEFAULT_SETTINGS } from '../../constants/securityConstants';

/**
 * Storage Service Wrapper supporting Chrome Storage API with localStorage fallback for web dev
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
      const item = localStorage.getItem(`gg_${key}`);
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
      localStorage.setItem(`gg_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage set failed in dev fallback', e);
    }
  },

  /**
   * Fetch current extension settings merged with system default settings
   * @returns {Promise<object>}
   */
  async getSettings() {
    const storedSettings = await this.get('settings', {});
    return { ...DEFAULT_SETTINGS, ...storedSettings };
  },

  /**
   * Update extension settings persistently
   * @param {object} newSettingsPartial
   * @returns {Promise<object>}
   */
  async saveSettings(newSettingsPartial) {
    const current = await this.getSettings();
    const updated = { ...current, ...newSettingsPartial };
    await this.set('settings', updated);
    return updated;
  },

  /**
   * Reset all settings back to initial factory defaults
   * @returns {Promise<object>}
   */
  async resetSettings() {
    await this.set('settings', DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS };
  },
};
