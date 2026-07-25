import { urlAnalysisEngine } from '../services/url/urlAnalysisEngine';
import { storageService } from '../services/storage/chromeStorage';

/**
 * Gorillaz Guard - Manifest V3 Background Service Worker
 * Manages tab listeners, real-time URL inspection, action badges, and runtime message bus
 */

// Update toolbar action badge based on safety score
function updateActionBadge(tabId, safetyScore, safetyLevel) {
  if (typeof chrome === 'undefined' || !chrome.action) return;

  try {
    let badgeText = `${safetyScore}`;
    let badgeColor = '#10B981'; // Green for SAFE

    if (safetyLevel === 'DANGEROUS' || safetyScore < 50) {
      badgeText = 'RISK';
      badgeColor = '#F43F5E'; // Red for DANGEROUS
    } else if (safetyLevel === 'WARNING' || safetyScore < 80) {
      badgeText = 'WARN';
      badgeColor = '#F59E0B'; // Amber for WARNING
    }

    chrome.action.setBadgeText({ tabId, text: badgeText });
    chrome.action.setBadgeBackgroundColor({ tabId, color: badgeColor });
  } catch (e) {
    console.warn('[Gorillaz Guard Worker] Badge update failed:', e);
  }
}

// Save inspected site into persistent history log
async function logSiteToHistory(analysis) {
  if (!analysis || !analysis.domain) return;

  try {
    const existingHistory = (await storageService.get('security_history')) || [];
    const newLogItem = {
      id: `h-${Date.now()}`,
      domain: analysis.domain,
      url: analysis.url,
      timestamp: 'Just now',
      safetyScore: analysis.safetyScore,
      safetyLevel: analysis.safetyLevel,
      threatCount: analysis.threatCount,
      threats: analysis.threats.map((t) => t.title),
    };

    // Keep latest 50 logs
    const updatedHistory = [newLogItem, ...existingHistory.filter((item) => item.domain !== analysis.domain)].slice(0, 50);
    await storageService.set('security_history', updatedHistory);
  } catch (e) {
    console.warn('[Gorillaz Guard Worker] Failed to save history log:', e);
  }
}

// Active URL Inspector Handler
async function inspectTabUrl(tabId, url) {
  if (!url || !url.startsWith('http')) return;

  try {
    const settings = await storageService.getSettings();
    if (!settings.protectionEnabled) return;

    // Check if domain is whitelisted
    const whitelist = (await storageService.get('whitelist')) || [];
    let domain = '';
    try {
      domain = new URL(url).hostname;
    } catch {
      domain = url;
    }

    if (whitelist.includes(domain)) {
      updateActionBadge(tabId, 100, 'SAFE');
      return;
    }

    // Run master URL analysis engine
    const analysis = urlAnalysisEngine.analyze(url);
    updateActionBadge(tabId, analysis.safetyScore, analysis.safetyLevel);

    // Save to history logs
    await logSiteToHistory(analysis);

    // If site is dangerous and autoWarnBanners is enabled, send message to content script
    if (analysis.safetyScore < 50 && settings.autoWarnBanners) {
      chrome.tabs.sendMessage(tabId, {
        action: 'SHOW_WARNING_BANNER',
        details: {
          domain: analysis.domain,
          safetyScore: analysis.safetyScore,
          threatCount: analysis.threatCount,
          reason: `High Risk Site (Safety Score: ${analysis.safetyScore}/100)`,
        },
      }).catch(() => {
        // Ignore connection errors if content script is still initializing
      });
    }
  } catch (e) {
    console.error('[Gorillaz Guard Worker] Tab inspection failed:', e);
  }
}

// 1. Tab Updated Listener (Navigation / Reload)
if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.onUpdated) {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      inspectTabUrl(tabId, tab.url);
    }
  });
}

// 2. Tab Activated Listener (Tab Switch)
if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.onActivated) {
  chrome.tabs.onActivated.addListener(({ tabId }) => {
    chrome.tabs.get(tabId, (tab) => {
      if (tab && tab.url) {
        inspectTabUrl(tabId, tab.url);
      }
    });
  });
}

// 3. Runtime Message Router (Popup, Content Scripts, Options Dashboard)
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const handleAsync = async () => {
      switch (request.action) {
        case 'ANALYZE_URL': {
          const analysis = urlAnalysisEngine.analyze(request.url);
          return { status: 'success', analysis };
        }
        case 'GET_SETTINGS': {
          const settings = await storageService.getSettings();
          return { status: 'success', settings };
        }
        case 'SAVE_SETTINGS': {
          const settings = await storageService.saveSettings(request.settings);
          return { status: 'success', settings };
        }
        case 'ADD_WHITELIST': {
          const whitelist = (await storageService.get('whitelist')) || [];
          if (!whitelist.includes(request.domain)) {
            const updated = [...whitelist, request.domain];
            await storageService.set('whitelist', updated);
            return { status: 'success', whitelist: updated };
          }
          return { status: 'success', whitelist };
        }
        default:
          return { status: 'unknown_action' };
      }
    };

    handleAsync().then((response) => sendResponse(response));
    return true; // Keep message channel open for async response
  });
}

console.log('[Gorillaz Guard Worker] Manifest V3 Event Service Worker Active.');
