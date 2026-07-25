import { urlAnalyzer } from '../services/security/urlAnalyzer';
import { scoreCalculator } from '../services/security/scoreCalculator';

/**
 * Browser Guard - Background Service Worker (Manifest V3)
 */

// Tab Navigation Listener
if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.onUpdated) {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
      const rawAnalysis = urlAnalyzer.analyze(tab.url);
      const scoreResult = scoreCalculator.evaluate(rawAnalysis);

      // If dangerous domain, trigger warning banner via content script
      if (scoreResult.safetyScore < 50) {
        chrome.tabs.sendMessage(tabId, {
          action: 'SHOW_WARNING_BANNER',
          details: {
            reason: `High Security Risk Detected (Safety Score: ${scoreResult.safetyScore}/100)`,
          },
        }).catch(() => {
          // Ignore connection errors if content script is not injected yet
        });
      }
    }
  });
}

// Runtime Message Router
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'ANALYZE_URL') {
      const rawAnalysis = urlAnalyzer.analyze(request.url);
      const scoreResult = scoreCalculator.evaluate(rawAnalysis);

      const fullAnalysis = {
        ...rawAnalysis,
        ...scoreResult,
      };

      sendResponse({
        status: 'success',
        analysis: fullAnalysis,
      });
    }
    return true;
  });
}

console.log('[Gorillaz Guard Worker] Security Engine & Manifest V3 Worker Ready.');
