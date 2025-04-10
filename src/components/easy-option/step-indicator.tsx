import React from "react";

export type StepType = "protection-type" | "coverage-amount" | "coverage-period" | "select-policy" | "review-policy";

interface StepIndicatorProps {
  currentStep: StepType;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-between items-center mb-8 max-w-2xl mx-auto">
      <div className={`flex flex-col items-center w-1/5 ${currentStep === "protection-type" ? "text-primary" : "text-muted-foreground"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "protection-type" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>1</div>
        <span className="text-sm">Protection Type</span>
      </div>
      <div className="w-1/9 h-0.5 bg-muted"></div>
      <div className={`flex flex-col items-center w-1/5 ${currentStep === "coverage-amount" ? "text-primary" : "text-muted-foreground"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "coverage-amount" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>2</div>
        <span className="text-sm">Coverage Amount</span>
      </div>
      <div className="w-1/9 h-0.5 bg-muted"></div>
      <div className={`flex flex-col items-center w-1/5 ${currentStep === "coverage-period" ? "text-primary" : "text-muted-foreground"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "coverage-period" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>3</div>
        <span className="text-sm">Coverage Period</span>
      </div>
      <div className="w-1/9 h-0.5 bg-muted"></div>
      <div className={`flex flex-col items-center w-1/5 ${currentStep === "select-policy" ? "text-primary" : "text-muted-foreground"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "select-policy" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>4</div>
        <span className="text-sm">Select Policy</span>
      </div>
      <div className="w-1/9 h-0.5 bg-muted"></div>
      <div className={`flex flex-col items-center w-1/5 ${currentStep === "review-policy" ? "text-primary" : "text-muted-foreground"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "review-policy" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>5</div>
        <span className="text-sm">Review Policy</span>
      </div>
    </div>
  );
} 