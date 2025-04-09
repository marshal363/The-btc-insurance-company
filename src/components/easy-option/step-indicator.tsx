import React from "react";

export type StepType = "type" | "strike" | "expiry" | "review";

interface StepIndicatorProps {
  currentStep: StepType;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-between items-center mb-8 max-w-2xl mx-auto">
      <div className={`flex flex-col items-center w-1/4 ${currentStep === "type" ? "text-primary" : "text-muted-foreground"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "type" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>1</div>
        <span className="text-sm">Choose</span>
      </div>
      <div className="w-1/6 h-0.5 bg-muted"></div>
      <div className={`flex flex-col items-center w-1/4 ${currentStep === "strike" || currentStep === "expiry" ? "text-primary" : "text-muted-foreground"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "strike" || currentStep === "expiry" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>2</div>
        <span className="text-sm">Configure</span>
      </div>
      <div className="w-1/6 h-0.5 bg-muted"></div>
      <div className={`flex flex-col items-center w-1/4 ${currentStep === "review" ? "text-primary" : "text-muted-foreground"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "review" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>3</div>
        <span className="text-sm">Review</span>
      </div>
    </div>
  );
} 