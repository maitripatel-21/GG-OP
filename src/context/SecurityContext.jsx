import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { browserService } from '../services/browser/chrome';
import { storageService } from '../services/storage/chromeStorage';
import { DEFAULT_SETTINGS, MOCK_TAB_DATA } from '../constants/securityConstants';

const SecurityContext = createContext(null);

export const SecurityProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [analysis, setAnalysis] = useState(MOCK_TAB_DATA);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Initialize and load settings & current tab
  const initializeSecurityContext = useCallback(async () => {
    setLoading(true);
    try {
      const loadedSettings = await storageService.getSettings();
      setSettings(loadedSettings);

      const tab = await browserService.getActiveTab();
      setActiveTab(tab);

      if (tab && tab.url) {
        // Request URL analysis from background worker or runtime service
        const response = await browserService.sendMessage({
          action: 'ANALYZE_URL',
          url: tab.url,
        });

        if (response && response.analysis) {
          setAnalysis(response.analysis);
        }
      }
    } catch (error) {
      console.error('Failed to initialize SecurityContext', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeSecurityContext();
  }, [initializeSecurityContext]);

  // Settings updater handler
  const updateSettings = async (newSettingsPartial) => {
    const updated = await storageService.saveSettings(newSettingsPartial);
    setSettings(updated);
  };

  return (
    <SecurityContext.Provider
      value={{
        activeTab,
        analysis,
        settings,
        loading,
        updateSettings,
        refreshAnalysis: initializeSecurityContext,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
