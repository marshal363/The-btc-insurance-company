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
  return (
    <div className="flex justify-between max-w-2xl mx-auto">
      {currentStep !== "type" ? (
        <button
          onClick={handleBack}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Back
        </button>
      ) : (
        <Link
          href="/home"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Back to Home
        </Link>
      )}
      
      {currentStep !== "review" ? (
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Next
        </button>
      ) : (
        <button
          onClick={handlePurchase}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Purchase Option
        </button>
      )}
    </div>
  );
} 