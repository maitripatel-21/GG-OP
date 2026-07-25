import { urlAnalysisEngine } from '../url/urlAnalysisEngine';

/**
 * Security Service Wrapper delegating to services/url/urlAnalysisEngine
 */
export const urlAnalyzer = {
  /**
   * Analyze raw URL using master urlAnalysisEngine
   * @param {string} rawUrl
   * @returns {object} Structured JSON Security Analysis Report
   */
  analyze(rawUrl) {
    return urlAnalysisEngine.analyze(rawUrl);
  },
};
