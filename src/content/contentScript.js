/**
 * Browser Guard - Content Script
 * Injected into active web pages to present security alerts if necessary.
 */

(() => {
  console.log('[Gorillaz Guard Content Script] Active on current domain.');

  // Listen for potential security actions broadcast from background worker
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'SHOW_WARNING_BANNER') {
        renderWarningBanner(message.details);
      }
    });
  }

  function renderWarningBanner(details) {
    if (document.getElementById('browser-guard-warning-banner')) return;

    const bannerContainer = document.createElement('div');
    bannerContainer.id = 'browser-guard-warning-banner';
    bannerContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: rgba(244, 63, 94, 0.95);
      color: #FFFFFF;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 14px;
      font-weight: 600;
      padding: 12px 20px;
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    `;

    bannerContainer.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 18px;">⚠️</span>
        <div><strong>Gorillaz Guard Alert:</strong> ${details?.reason || 'Unsafe domain detected. Proceed with caution.'}</div>
      </div>
      <button id="bg-dismiss-banner" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 4px 12px; border-radius: 4px; cursor: pointer;">Dismiss</button>
    `;

    document.body.prepend(bannerContainer);

    document.getElementById('bg-dismiss-banner')?.addEventListener('click', () => {
      bannerContainer.remove();
    });
  }
})();
