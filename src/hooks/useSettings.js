import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storage/chromeStorage';
import { DEFAULT_SETTINGS } from '../constants/securityConstants';

/**
 * Custom React Hook for Settings Management
 * Isolates settings persistence, dark mode toggling, and reset logic from UI
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

  // Update a single or multiple setting keys
  const updateSetting = async (keyOrPartial, value) => {
    let partial = {};
    if (typeof keyOrPartial === 'string') {
      partial = { [keyOrPartial]: value };
    } else {
      partial = keyOrPartial;
    }

    const updated = await storageService.saveSettings(partial);
    setSettings(updated);
  };

  // Reset all settings to default values
  const resetSettings = async () => {
    const defaultState = await storageService.resetSettings();
    setSettings(defaultState);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
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
