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
      badgeColor = '#E2454A'; // Crimson Red for DANGEROUS
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
  if (!analysis || !analysis.domain || analysis.domain === 'Internal Browser Page' || analysis.isWhitelisted) return;

  try {
    const existingHistory = (await storageService.get('security_history')) || [];
    const newLogItem = {
      id: `h-${Date.now()}`,
      domain: analysis.domain,
      url: analysis.url,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return;

  try {
    const settings = await storageService.getSettings();
    if (!settings.protectionEnabled) return;

    const whitelist = (await storageService.get('whitelist')) || [];

    // Run master URL analysis engine with active whitelist
    const analysis = urlAnalysisEngine.analyze(url, { ...settings, whitelist });

    // Update action badge (100 SAFE for whitelisted platforms)
    updateActionBadge(tabId, analysis.safetyScore, analysis.safetyLevel);

    if (analysis.isWhitelisted || analysis.isLegitDomain) {
      // Remove any warning banner on whitelisted or legit sites
      chrome.tabs.sendMessage(tabId, { action: 'REMOVE_WARNING_BANNER' }).catch(() => {});
      return;
    }

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
      }).catch(() => {});
    }
  } catch (e) {
    console.error('[Gorillaz Guard Worker] Tab inspection failed:', e);
  }
}

// 1. Tab Updated Listener (Navigation / Reload)
if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.onUpdated) {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab && tab.url) {
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
      const settings = await storageService.getSettings();
      const whitelist = (await storageService.get('whitelist')) || [];

      switch (request.action) {
        case 'ANALYZE_URL': {
          const analysis = urlAnalysisEngine.analyze(request.url, { ...settings, whitelist });
          return { status: 'success', analysis };
        }
        case 'GET_SETTINGS': {
          return { status: 'success', settings };
        }
        case 'SAVE_SETTINGS': {
          const updatedSettings = await storageService.saveSettings(request.settings);
          return { status: 'success', settings: updatedSettings };
        }
        case 'ADD_WHITELIST': {
          const cleanDomain = (request.domain || '').trim().toLowerCase();
          if (cleanDomain && !whitelist.includes(cleanDomain)) {
            const updated = [...whitelist, cleanDomain];
            await storageService.set('whitelist', updated);

            // Update badge & remove banner if currently viewing this tab
            if (sender && sender.tab && sender.tab.id) {
              updateActionBadge(sender.tab.id, 100, 'SAFE');
              chrome.tabs.sendMessage(sender.tab.id, { action: 'REMOVE_WARNING_BANNER' }).catch(() => {});
            }

            return { status: 'success', whitelist: updated };
          }
          return { status: 'success', whitelist };
        }
        case 'REMOVE_WHITELIST': {
          const updated = whitelist.filter((d) => d !== request.domain);
          await storageService.set('whitelist', updated);
          return { status: 'success', whitelist: updated };
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
