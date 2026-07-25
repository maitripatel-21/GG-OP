import { useState, useCallback, useEffect } from 'react';
import { browserService } from '../services/browser/chrome';
import { urlAnalyzer } from '../services/security/urlAnalyzer';
import { scoreCalculator } from '../services/security/scoreCalculator';
import { MOCK_TAB_DATA } from '../constants/securityConstants';

/**
 * Custom React Hook for Extension Popup URL Security Analysis
 * Keeps business logic strictly separated from UI components
 */
export function useUrlAnalyzer() {
  const [currentTab, setCurrentTab] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Perform live scan on active browser tab
   */
  const scanActiveTab = useCallback(async () => {
    setIsScanning(true);
    setError(null);

    try {
      // Fetch active browser tab via abstract browserService
      const tab = await browserService.getActiveTab();
      setCurrentTab(tab);

      const targetUrl = tab?.url || MOCK_TAB_DATA.url;

      // Pure client-side security evaluation
      const rawAnalysis = urlAnalyzer.analyze(targetUrl);
      const scoreResult = scoreCalculator.evaluate(rawAnalysis);

      const fullAnalysis = {
        ...rawAnalysis,
        ...scoreResult,
        title: tab?.title || 'Active Browser Tab',
      };

      setAnalysisResult(fullAnalysis);
    } catch (err) {
      console.error('URL analysis failed:', err);
      setError('Failed to inspect current tab.');
      // Fallback mock analysis
      const rawAnalysis = urlAnalyzer.analyze(MOCK_TAB_DATA.url);
      setAnalysisResult({ ...rawAnalysis, ...scoreCalculator.evaluate(rawAnalysis) });
    } finally {
      setIsScanning(false);
    }
  }, []);

  useEffect(() => {
    scanActiveTab();
  }, [scanActiveTab]);

  return {
    currentTab,
    analysisResult,
    isScanning,
    error,
    scanActiveTab,
  };
}
