import { SAFETY_LEVELS } from '../../constants/securityConstants';

/**
 * Score Calculator & Evaluator Wrapper
 */
export const scoreCalculator = {
  /**
   * Evaluate analysis object and return safety score details
   * @param {object} analysis
   * @returns {{ safetyScore: number, safetyLevel: string, threats: Array }}
   */
  evaluate(analysis) {
    if (!analysis) {
      return { safetyScore: 50, safetyLevel: SAFETY_LEVELS.WARNING, threats: [] };
    }

    return {
      safetyScore: analysis.safetyScore ?? 100,
      safetyLevel: analysis.safetyLevel ?? SAFETY_LEVELS.SAFE,
      threats: analysis.threats || [],
    };
  },
};
