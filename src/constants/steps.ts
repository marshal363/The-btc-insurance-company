// Define step constants
export const STEPS = {
  PROTECTION_GOAL: "PROTECTION_GOAL",
  PROTECTED_VALUE_STRATEGY: "PROTECTED_VALUE_STRATEGY", // Added new step for strategy selection
  PROTECTION_AMOUNT: "PROTECTION_AMOUNT", // Added new step for amount selection
  PROTECTED_VALUE: "PROTECTED_VALUE", // Keep for backward compatibility
  PROTECTION_PERIOD: "PROTECTION_PERIOD",
  PROTECTION_SIMULATION: "PROTECTION_SIMULATION", // Added new step for protection simulation (4A)
  POLICY_PREVIEW: "POLICY_PREVIEW", // This becomes the final step with activation (4B)
  REVIEW_ACTIVATE: "REVIEW_ACTIVATE" // Keeping for backward compatibility
} as const;

// Export steps as a type
export type STEPS_TYPE = (typeof STEPS)[keyof typeof STEPS]; 