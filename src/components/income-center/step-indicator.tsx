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
  // Find active step and its index
  const activeStep = steps.find(step => step.active);
  const activeIndex = activeStep ? steps.indexOf(activeStep) : 0;
  
  // Determine which steps to show in carousel (prev, current, next)
  const visibleSteps = [];
  
  // Add previous step if it exists
  if (activeIndex > 0) {
    visibleSteps.push({
      step: steps[activeIndex - 1],
      index: activeIndex - 1,
      position: "previous"
    });
  }
  
  // Add current step
  visibleSteps.push({
    step: steps[activeIndex],
    index: activeIndex,
    position: "current"
  });
  
  // Add next step if it exists
  if (activeIndex < steps.length - 1) {
    visibleSteps.push({
      step: steps[activeIndex + 1],
      index: activeIndex + 1,
      position: "next"
    });
  }

  return (
    <div className="mb-6">
      {/* Carousel-style step indicator */}
      <div className="flex justify-center items-center mb-4">
        {/* Visible steps */}
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          {visibleSteps.map(({ step, index, position }) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${
                position === "current" 
                  ? "text-amber-600" 
                  : "text-muted-foreground"
              }`}
            >
              <div 
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mb-1.5 ${
                  step.completed ? "bg-amber-100 text-amber-600" : 
                  position === "current" ? "bg-amber-500 text-white" : 
                  "bg-muted"
                }`}
              >
                {step.completed ? "✓" : index + 1}
              </div>
              <span 
                className={`text-xs sm:text-sm whitespace-nowrap font-medium ${
                  position === "current" 
                    ? "opacity-100" 
                    : "opacity-70"
                }`}
              >
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dots for overall progress - visible on all screen sizes */}
      <div className="flex justify-center items-center gap-1.5">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              activeIndex === index 
                ? "w-3 bg-amber-500" 
                : step.completed 
                  ? "bg-amber-300" 
                  : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
} 