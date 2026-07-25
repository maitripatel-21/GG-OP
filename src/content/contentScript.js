/**
 * Gorillaz Guard - Content Script
 * 1. Glassmorphic Warning Banner Overlay
 * 2. Feature 3: Real-Time Password & Form Input Protection Guard
 * 3. Feature 4: On-Page Floating Security Status Badge Widget
 */

(() => {
  if (window.__ggContentScriptLoaded) return;
  window.__ggContentScriptLoaded = true;

  console.log('[Gorillaz Guard Content Script] Active on current web page.');

  let currentSettings = { showFloatingBadge: true };

  // Listen for runtime messages from background service worker
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'SHOW_WARNING_BANNER') {
        renderSecurityBanner(message.details);
      } else if (message.action === 'REMOVE_WARNING_BANNER') {
        removeSecurityBanner();
      } else if (message.action === 'UPDATE_FLOATING_BADGE') {
        renderFloatingBadge(message.details);
      }
    });
  }

  // Feature 3: Password & Form Input Protection Guard
  function initFormInputProtection() {
    const isUnencrypted = window.location.protocol === 'http:';

    document.addEventListener('focusin', (e) => {
      const target = e.target;
      if (
        target &&
        target.tagName === 'INPUT' &&
        (target.type === 'password' || target.name?.toLowerCase().includes('pass') || target.autocomplete?.includes('password'))
      ) {
        if (isUnencrypted) {
          showInputWarningTooltip(target, '⚠️ Gorillaz Guard Warning: Unencrypted HTTP connection. Avoid entering passwords here!');
        }
      }
    });

    document.addEventListener('focusout', (e) => {
      const target = e.target;
      if (target && target.tagName === 'INPUT') {
        removeInputWarningTooltip();
      }
    });
  }

  function removeInputWarningTooltip() {
    const existing = document.getElementById('gg-input-warning-tooltip');
    if (existing) existing.remove();
  }

  function showInputWarningTooltip(inputElement, text) {
    removeInputWarningTooltip();
    const rect = inputElement.getBoundingClientRect();

    const tooltip = document.createElement('div');
    tooltip.id = 'gg-input-warning-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      top: ${window.scrollY + rect.top - 36}px;
      left: ${window.scrollX + rect.left}px;
      background: #E2454A;
      color: #FFFFFF;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 11px;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 8px;
      z-index: 2147483647;
      box-shadow: 0 4px 14px rgba(226, 69, 74, 0.4);
      pointer-events: none;
    `;
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
  }

  // Feature 4: On-Page Floating Security Status Badge Widget
  function renderFloatingBadge(details) {
    const existing = document.getElementById('gg-floating-status-badge');
    if (existing) existing.remove();

    if (!details || currentSettings.showFloatingBadge === false) return;

    const badge = document.createElement('div');
    badge.id = 'gg-floating-status-badge';
    const isSafe = (details.safetyScore || 100) >= 80;
    const color = isSafe ? '#10B981' : '#E2454A';

    badge.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(22, 25, 34, 0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #F5F5F5;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 11px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 9999px;
      z-index: 2147483646;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      transition: transform 0.2s;
    `;

    badge.innerHTML = `
      <span style="width: 8px; height: 8px; border-radius: 9999px; background: ${color}; display: inline-block;"></span>
      <span>Gorillaz Guard: ${details.safetyScore || 100}/100</span>
    `;

    badge.addEventListener('mouseover', () => { badge.style.transform = 'scale(1.05)'; });
    badge.addEventListener('mouseout', () => { badge.style.transform = 'scale(1)'; });

    document.body.appendChild(badge);
  }

  function removeSecurityBanner() {
    const existing = document.getElementById('gg-security-warning-banner');
    if (existing) existing.remove();
  }

  function renderSecurityBanner(details) {
    removeSecurityBanner();

    const banner = document.createElement('div');
    banner.id = 'gg-security-warning-banner';
    banner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: rgba(22, 25, 34, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 2px solid rgba(226, 69, 74, 0.8);
      color: #F5F5F5;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      font-weight: 500;
      padding: 10px 20px;
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
      box-sizing: border-box;
    `;

    const domainName = details?.domain || window.location.hostname;
    const safetyScore = details?.safetyScore ?? 35;

    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="padding: 6px 10px; border-radius: 9999px; background: rgba(226, 69, 74, 0.2); border: 1px solid rgba(226, 69, 74, 0.5); color: #E2454A; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 6px;">
          <span>⚠️</span>
          <span>DANGEROUS SITE (Score: ${safetyScore}/100)</span>
        </div>
        <span style="color: #F5F5F5;">
          <strong>Gorillaz Guard Alert:</strong> High risk security indicators detected on <strong>${domainName}</strong>. Avoid entering passwords or sensitive information.
        </span>
      </div>

      <div style="display: flex; align-items: center; gap: 8px;">
        <button id="gg-trust-domain-btn" style="background: rgba(226, 69, 74, 0.2); border: 1px solid rgba(226, 69, 74, 0.5); color: #E2454A; padding: 5px 12px; border-radius: 8px; font-weight: 600; font-size: 12px; cursor: pointer; transition: all 0.2s;">
          Trust Domain
        </button>
        <button id="gg-dismiss-banner-btn" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.15); color: #DADADA; padding: 5px 12px; border-radius: 8px; font-weight: 600; font-size: 12px; cursor: pointer; transition: all 0.2s;">
          Dismiss
        </button>
      </div>
    `;

    document.body.prepend(banner);

    document.getElementById('gg-dismiss-banner-btn')?.addEventListener('click', () => {
      removeSecurityBanner();
    });

    document.getElementById('gg-trust-domain-btn')?.addEventListener('click', () => {
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({
          action: 'ADD_WHITELIST',
          domain: domainName,
        }).then(() => {
          removeSecurityBanner();
        }).catch(() => {
          removeSecurityBanner();
        });
      } else {
        removeSecurityBanner();
      }
    });
  }

  // Initialize Form Guard
  initFormInputProtection();
})();
