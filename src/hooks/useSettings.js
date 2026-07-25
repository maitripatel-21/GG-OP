import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storage/chromeStorage';
import { DEFAULT_SETTINGS } from '../constants/securityConstants';

/**
 * Custom React Hook for Settings Management
 * Isolates settings persistence and reset logic
 */
export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [resetSuccess, setResetSuccess] = useState(false);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    try {
      const stored = await storageService.getSettings();
      setSettings(stored);
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Update single or multiple setting keys and sync across runtime
  const updateSetting = async (keyOrPartial, value) => {
    let partial = {};
    if (typeof keyOrPartial === 'string') {
      partial = { [keyOrPartial]: value };
    } else {
      partial = keyOrPartial;
    }

    const updated = await storageService.saveSettings(partial);
    setSettings(updated);

    // Broadcast to runtime worker so background inspection updates settings live
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime
        .sendMessage({ action: 'SAVE_SETTINGS', settings: updated })
        .catch(() => {});
    }
  };

  // Reset all settings to default factory values
  const resetSettings = async () => {
    const defaultState = await storageService.resetSettings();
    setSettings(defaultState);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);

    // Broadcast reset to background worker
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime
        .sendMessage({ action: 'SAVE_SETTINGS', settings: defaultState })
        .catch(() => {});
    }
  };

  return {
    settings,
    loading,
    resetSuccess,
    updateSetting,
    resetSettings,
    refreshSettings: loadSettings,
  };
}
