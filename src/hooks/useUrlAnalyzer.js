import { useState, useEffect, useCallback } from 'react';
import { browserService } from '../services/browser/chrome';
import { urlAnalysisEngine } from '../services/url/urlAnalysisEngine';
import { storageService } from '../services/storage/chromeStorage';

/**
 * Custom React Hook for Popup URL Analysis & Live VirusTotal API Sync
 */
export function useUrlAnalyzer() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [activeTabUrl, setActiveTabUrl] = useState('');

  const scanActiveTab = useCallback(async () => {
    setIsScanning(true);
    try {
      const activeTab = await browserService.getActiveTab();
      const settings = await storageService.getSettings();
      const whitelist = (await storageService.get('whitelist')) || [];
      const targetUrl = activeTab?.url || 'https://github.com';
      setActiveTabUrl(targetUrl);

      // 1. Instant local heuristic analysis
      const initialReport = urlAnalysisEngine.analyze(targetUrl, { ...settings, whitelist });
      setAnalysisResult(initialReport);
      setIsScanning(false);

      // 2. Live VirusTotal v3 API Threat Intelligence lookup
      const fullReport = await urlAnalysisEngine.analyzeAsync(targetUrl, { ...settings, whitelist });
      setAnalysisResult(fullReport);
    } catch (err) {
      console.error('[useUrlAnalyzer] Error scanning tab:', err);
      setIsScanning(false);
    }
  }, []);

  useEffect(() => {
    scanActiveTab();

    // Listen for tab switches or URL updates while popup is open
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      const handleTabActivated = () => scanActiveTab();
      const handleTabUpdated = (tabId, changeInfo) => {
        if (changeInfo.status === 'complete' || changeInfo.url) {
          scanActiveTab();
        }
      };

      if (chrome.tabs.onActivated) chrome.tabs.onActivated.addListener(handleTabActivated);
      if (chrome.tabs.onUpdated) chrome.tabs.onUpdated.addListener(handleTabUpdated);

      return () => {
        if (chrome.tabs.onActivated) chrome.tabs.onActivated.removeListener(handleTabActivated);
        if (chrome.tabs.onUpdated) chrome.tabs.onUpdated.removeListener(handleTabUpdated);
      };
    }
  }, [scanActiveTab]);

  return {
    analysisResult,
    isScanning,
    activeTabUrl,
    scanActiveTab,
  };
}
