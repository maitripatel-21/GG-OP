# Gorillaz Guard - Evaluator & Judge Notes

## Architectural & Technical Highlights

1. **Manifest V3 Service Worker Architecture**: Non-blocking background event service worker without persistent background pages.
2. **100% On-Device Zero-Knowledge Privacy**: Zero browsing history or URLs transmitted to cloud servers. Pure local WebAssembly/JS heuristic execution.
3. **Decoupled Architecture**: Clean separation between UI layers, custom React hooks, security services, and persistent storage abstractions.
4. **Form Credential Exposure Guard**: DOM-level password input protection tooltip preventing credential theft on unencrypted/risky sites.
5. **Side-by-Side Risk Comparison**: Real-time side-by-side URL risk analysis for identifying phishing spoof lookalikes.
