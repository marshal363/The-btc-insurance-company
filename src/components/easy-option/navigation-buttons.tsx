import React from "react";
import Link from "next/link";
import { StepType } from "./step-indicator";

interface NavigationButtonsProps {
  currentStep: StepType;
  handleBack: () => void;
  handleNext: () => void;
  handlePurchase?: () => void;
  isNextDisabled?: boolean;
}

export function NavigationButtons({ 
  currentStep, 
  handleBack, 
  handleNext,
  handlePurchase,
  isNextDisabled = false
}: NavigationButtonsProps) {
  // Get context-aware button text based on current step
  const getNextButtonText = () => {
    switch (currentStep) {
      case "protection-type": return "Choose Coverage Amount";
      case "coverage-amount": return "Select Coverage Period";
      case "coverage-period": return "View Available Policies";
      case "select-policy": return "Review Policy";
      default: return "Continue";
    }
  };
  
  return (
    <div className="flex justify-between max-w-2xl mx-auto">
      {currentStep !== "protection-type" ? (
        <button
          onClick={handleBack}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Previous Step
        </button>
      ) : (
        <Link
          href="/home"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Back to Home
        </Link>
      )}
      
      {currentStep !== "review-policy" ? (
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {getNextButtonText()}
        </button>
      ) : (
        <button
          onClick={handlePurchase}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Activate Protection
        </button>
      )}
    </div>
  );
} 