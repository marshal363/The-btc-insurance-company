import React from "react";

export interface StepType {
  name: string;
  active: boolean;
  completed: boolean;
}

export interface StepIndicatorProps {
  steps: StepType[];
}

export function StepIndicator({ steps }: StepIndicatorProps) {
  return (
    <div className="flex justify-between items-center mb-8 max-w-2xl mx-auto">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={`flex flex-col items-center w-1/5 ${step.active ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              step.completed ? "bg-primary/20 text-primary" : 
              step.active ? "bg-primary text-primary-foreground" : 
              "bg-muted"
            }`}>
              {step.completed ? "✓" : index + 1}
            </div>
            <span className="text-sm">{step.name}</span>
          </div>
          
          {index < steps.length - 1 && (
            <div className={`w-1/9 h-0.5 ${
              steps[index + 1].active || steps[index + 1].completed || step.completed 
                ? "bg-primary/20" 
                : "bg-muted"
            }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
} 