// Define step constants
export const STEPS = {
  PROTECTION_GOAL: "PROTECTION_GOAL",
  PROTECTED_VALUE_STRATEGY: "PROTECTED_VALUE_STRATEGY", // Added new step for strategy selection
  PROTECTION_AMOUNT: "PROTECTION_AMOUNT", // Added new step for amount selection
  PROTECTED_VALUE: "PROTECTED_VALUE", // Keep for backward compatibility
  PROTECTION_PERIOD: "PROTECTION_PERIOD",
  PROTECTION_SIMULATION: "PROTECTION_SIMULATION", // Added new step for protection simulation (4A)
  POLICY_PREVIEW: "POLICY_PREVIEW", // This becomes the final step with activation (4B)
  REVIEW_ACTIVATE: "REVIEW_ACTIVATE", // Keeping for backward compatibility
  
  // Income Center Steps
  INCOME_STRATEGY: "INCOME_STRATEGY", // Income Strategy Selection (PUT/CALL)
  RISK_REWARD_TIER: "RISK_REWARD_TIER", // Risk-Reward Tier Selection
  CAPITAL_COMMITMENT: "CAPITAL_COMMITMENT", // Capital Commitment Selection
  INCOME_PERIOD: "INCOME_PERIOD", // Income Period Selection
  STRATEGY_SIMULATION: "STRATEGY_SIMULATION", // Summary and Expected Returns
  STRATEGY_REVIEW: "STRATEGY_REVIEW" // Review & Activate
} as const;

// Export steps as a type
export type STEPS_TYPE = (typeof STEPS)[keyof typeof STEPS]; 

// Define Income Center specific steps for clarity
export const INCOME_STEPS = {
  INCOME_STRATEGY: STEPS.INCOME_STRATEGY,
  RISK_REWARD_TIER: STEPS.RISK_REWARD_TIER,
  CAPITAL_COMMITMENT: STEPS.CAPITAL_COMMITMENT,
  INCOME_PERIOD: STEPS.INCOME_PERIOD,
  STRATEGY_SIMULATION: STEPS.STRATEGY_SIMULATION,
  STRATEGY_REVIEW: STEPS.STRATEGY_REVIEW
} as const;

export type INCOME_STEPS_TYPE = (typeof INCOME_STEPS)[keyof typeof INCOME_STEPS]; 