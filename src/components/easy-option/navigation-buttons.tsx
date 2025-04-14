import React from "react";
import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onActivate: () => void;
  showBackButton?: boolean;
  showNextButton?: boolean;
}

export function NavigationButtons({ 
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onActivate,
  showBackButton = true,
  showNextButton = true
}: NavigationButtonsProps) {
  
  return (
    <div className="flex justify-between mt-6">
      {showBackButton ? (
        <Button 
          variant="outline" 
          onClick={onBack}
          className="rounded-full"
        >
          Back
        </Button>
      ) : (
        <div></div> // Empty div to maintain flex spacing
      )}
      
      {showNextButton ? (
        <Button onClick={onNext} className="rounded-full">
          Continue
        </Button>
      ) : (
        <Button 
          onClick={onActivate}
          className="bg-primary rounded-full"
        >
          Activate Protection
        </Button>
      )}
    </div>
  );
} 