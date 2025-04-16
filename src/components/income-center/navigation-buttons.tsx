import React from "react";
import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  onNext: () => void;
  onBack: () => void;
  onActivate: () => void;
  showBackButton?: boolean;
  showNextButton?: boolean;
}

export function NavigationButtons({ 
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
          onClick={() => {
            onBack();
          }}
          className="rounded-full"
        >
          Back
        </Button>
      ) : (
        <div></div> // Empty div to maintain flex spacing
      )}
      
      {showNextButton ? (
        <Button 
          onClick={() => {
            onNext();
          }} 
          className="rounded-full bg-amber-500 hover:bg-amber-600 text-white"
        >
          Continue
        </Button>
      ) : (
        <Button 
          onClick={() => {
            onActivate();
          }}
          className="bg-amber-500 hover:bg-amber-600 rounded-full text-white"
        >
          Activate Strategy
        </Button>
      )}
    </div>
  );
} 