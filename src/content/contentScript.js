/**
 * Gorillaz Guard - Content Script
 * Injected on web pages to render glassmorphic security warning overlays on high-risk domains
 */

(() => {
  console.log('[Gorillaz Guard Content Script] Active on current web page.');

  // Listen for runtime messages from background service worker
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'SHOW_WARNING_BANNER') {
        renderSecurityBanner(message.details);
      } else if (message.action === 'REMOVE_WARNING_BANNER') {
        removeSecurityBanner();
      }
    });
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
      background: rgba(17, 24, 39, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 2px solid rgba(244, 63, 94, 0.8);
      color: #FFFFFF;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      font-weight: 500;
      padding: 10px 20px;
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      box-sizing: border-box;
    `;

    const domainName = details?.domain || window.location.hostname;
    const safetyScore = details?.safetyScore ?? 35;

    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="padding: 6px 10px; border-radius: 9999px; background: rgba(244, 63, 94, 0.2); border: 1px solid rgba(244, 63, 94, 0.4); color: #F43F5E; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 6px;">
          <span>⚠️</span>
          <span>DANGEROUS SITE (Score: ${safetyScore}/100)</span>
        </div>
        <span style="color: #E2E8F0;">
          <strong>Gorillaz Guard Alert:</strong> High risk security indicators detected on <strong>${domainName}</strong>. Avoid entering passwords or sensitive information.
        </span>
      </div>

      <div style="display: flex; align-items: center; gap: 8px;">
        <button id="gg-trust-domain-btn" style="background: rgba(6, 182, 212, 0.2); border: 1px solid rgba(6, 182, 212, 0.4); color: #06B6D4; padding: 5px 12px; border-radius: 8px; font-weight: 600; font-size: 12px; cursor: pointer; transition: all 0.2s;">
          Trust Domain
        </button>
        <button id="gg-dismiss-banner-btn" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.15); color: #CBD5E1; padding: 5px 12px; border-radius: 8px; font-weight: 600; font-size: 12px; cursor: pointer; transition: all 0.2s;">
          Dismiss
        </button>
      </div>
    `;

    document.body.prepend(banner);

    // Event listener for Dismiss button
    document.getElementById('gg-dismiss-banner-btn')?.addEventListener('click', () => {
      removeSecurityBanner();
    });

    // Event listener for Trust Domain (Whitelist) button
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
})();
