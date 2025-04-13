"use client";

import { useState, useEffect } from "react";
import { useMarketStore } from "@/store/market-store";
import { useToast } from "@/components/ui/use-toast";
import { STEPS, STEPS_TYPE } from "@/constants/steps";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Import our component modules
import { StepIndicator, StepType } from "@/components/easy-option/step-indicator";
import { NavigationButtons } from "@/components/easy-option/navigation-buttons";
import { ProtectionTypeSelector, ProtectionType } from "@/components/easy-option/protection-type-selector";
import { QuantityAndDuration } from "@/components/easy-option/quantity-and-duration";
import { PolicyPreview } from "@/components/easy-option/policy-preview";
import { PnlSimulation } from "@/components/easy-option/pnl-simulation";
import { ProtectionAmount } from "@/components/easy-option/protection-amount";
import { ProtectedValue } from "@/components/easy-option/strike-price-protective";
import { useWallet } from "@/hooks/wallet/useWallet";

// Define array of step names
const STEP_NAMES = [
  "Protection Goal",
  "Protected Value",
  "Protection Amount", 
  "Protection Period",
  "Protection Simulation",
  "Policy Review & Activation",
];

// Now we can use STEPS directly as it already contains our custom steps
const CUSTOM_STEPS = STEPS;

export default function EasyOption() {
  const { toast } = useToast();
  const router = useRouter();

  // Get wallet data from hook
  const { isConnected, balance } = useWallet();

  // State from market store
  const { btcPrice = 48500 } = useMarketStore();

  // Step state - updated to use the steps from constants
  const [currentStep, setCurrentStep] = useState<STEPS_TYPE>(STEPS.PROTECTION_GOAL);

  // Protection type state
  const [protectionType, setProtectionType] = useState<ProtectionType>("hodl");
  
  // Option selection state (derived from protection type)
  const [optionType, setOptionType] = useState<"call" | "put">("put");
  
  // Protection strategy state
  const [protectionStrategy, setProtectionStrategy] = useState<"maximum" | "standard" | "flexible" | "crash">("standard");
  
  // Strike price selection state (now determined by strategy)
  const [protectedValue, setProtectedValue] = useState<string>(Math.round(btcPrice * 0.9).toString());
  
  // Bitcoin amount state 
  const [amount, setAmount] = useState<string>("0.25");
  
  // Protection period state
  const [duration, setDuration] = useState<"30" | "60" | "90" | "180" | "365" | "halving" | "custom">("30");

  // PnL simulation panel state - no longer needed as a panel toggle since it's a dedicated step
  const [isPnlPanelOpen, setIsPnlPanelOpen] = useState(false);
  
  // Policy state - directly derived from strategy rather than contract selection
  const [policy, setPolicy] = useState<{
    premium: number;
    fees: number;
    total: number;
    protectionLevel: string; // Added to track protection level description
  }>({
    premium: 0,
    fees: 0,
    total: 0,
    protectionLevel: "Standard Protection (90% of current value)"
  });
  
  // Update protected value when BTC price changes (only on initial mount)
  useEffect(() => {
    const initialProtectedValue = Math.round(btcPrice * 0.9).toString(); // Default to standard protection (90%)
    setProtectedValue(initialProtectedValue);
  }, [btcPrice]);

  // Update premium calculation when moving to simulation or policy preview
  React.useEffect(() => {
    if (currentStep === CUSTOM_STEPS.PROTECTION_SIMULATION || 
        currentStep === CUSTOM_STEPS.POLICY_PREVIEW) {
      calculatePayment();
    }
  }, [currentStep]);

  // Calculate protected value based on strategy
  const setProtectionStrategyAndValue = (strategy: "maximum" | "standard" | "flexible" | "crash") => {
    setProtectionStrategy(strategy);
    
    // Calculate protected value based on selected strategy
    let protectionPercentage = 1.0; // Maximum (100%)
    
    switch(strategy) {
      case "maximum":
        protectionPercentage = 1.0; // 100% of current value
        break;
      case "standard":
        protectionPercentage = 0.9; // 90% of current value
        break;
      case "flexible":
        protectionPercentage = 0.8; // 80% of current value
        break;
      case "crash":
        protectionPercentage = 0.7; // 70% of current value
        break;
    }
    
    const newProtectedValue = Math.round(btcPrice * protectionPercentage).toString();
    setProtectedValue(newProtectedValue);
    
    // Update policy protection level description
    const protectionLevel = {
      "maximum": "Maximum Protection (100% of current value)",
      "standard": "Standard Protection (90% of current value)",
      "flexible": "Flexible Protection (80% of current value)",
      "crash": "Crash Insurance (70% of current value)"
    }[strategy];
    
    setPolicy(prev => ({
      ...prev,
      protectionLevel
    }));
  };

  // Step navigation functions
  const handleNextStep = () => {
    // Validate current step
    if (currentStep === CUSTOM_STEPS.PROTECTION_GOAL) {
      // Validation for protection type
      if (!protectionType) {
        toast({
          title: "Please select a protection goal",
          description: "Select the type of protection you need for your Bitcoin.",
          variant: "destructive",
        });
        return;
      }
      // Map protection type to option type
      setOptionType(protectionType === "hodl" ? "put" : "call");
      setCurrentStep(CUSTOM_STEPS.PROTECTED_VALUE_STRATEGY);
    } 
    else if (currentStep === CUSTOM_STEPS.PROTECTED_VALUE_STRATEGY) {
      // Validation for protected value strategy
      if (!protectedValue || isNaN(parseFloat(protectedValue))) {
        toast({
          title: "Please select a valid protection strategy",
          description: "Choose a protection strategy that best fits your needs.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(CUSTOM_STEPS.PROTECTION_AMOUNT);
    }
    else if (currentStep === CUSTOM_STEPS.PROTECTION_AMOUNT) {
      // Validation for amount
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) < 0.01) {
        toast({
          title: "Please enter a valid Bitcoin amount",
          description: "Amount should be at least 0.01 BTC.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(CUSTOM_STEPS.PROTECTION_PERIOD);
    }
    else if (currentStep === CUSTOM_STEPS.PROTECTION_PERIOD) {
      // Validate duration
      if (!duration) {
        toast({
          title: "Please select a protection period",
          description: "Choose how long you want your protection to remain active.",
          variant: "destructive",
        });
        return;
      }
      
      // Calculate policy based on selected parameters
      calculatePayment();
      setCurrentStep(CUSTOM_STEPS.PROTECTION_SIMULATION);
    } 
    else if (currentStep === CUSTOM_STEPS.PROTECTION_SIMULATION) {
      // Move from simulation to policy preview
      calculatePayment();
      setCurrentStep(CUSTOM_STEPS.POLICY_PREVIEW);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep === CUSTOM_STEPS.PROTECTED_VALUE_STRATEGY) {
      setCurrentStep(CUSTOM_STEPS.PROTECTION_GOAL);
    } 
    else if (currentStep === CUSTOM_STEPS.PROTECTION_AMOUNT) {
      setCurrentStep(CUSTOM_STEPS.PROTECTED_VALUE_STRATEGY);
    }
    else if (currentStep === CUSTOM_STEPS.PROTECTION_PERIOD) {
      setCurrentStep(CUSTOM_STEPS.PROTECTION_AMOUNT);
    }
    else if (currentStep === CUSTOM_STEPS.PROTECTION_SIMULATION) {
      setCurrentStep(CUSTOM_STEPS.PROTECTION_PERIOD);
    } 
    else if (currentStep === CUSTOM_STEPS.POLICY_PREVIEW) {
      setCurrentStep(CUSTOM_STEPS.PROTECTION_SIMULATION);
    }
  };
  
  const handleActivate = () => {
    toast({
      title: "Protection Activated!",
      description: "Your Bitcoin protection is now active.",
    });
    
    // Redirect to home page
    router.push("/home");
  };

  // Check if we're past the first step to enable simulation panel
  const canShowPnlSimulation = currentStep !== CUSTOM_STEPS.PROTECTION_GOAL;

  // Toggle PnL simulation panel
  const togglePnlPanel = () => {
    if (canShowPnlSimulation) {
      // If we're in the policy preview, go back to simulation step
      if (currentStep === CUSTOM_STEPS.POLICY_PREVIEW) {
        setCurrentStep(CUSTOM_STEPS.PROTECTION_SIMULATION);
      } else {
        setIsPnlPanelOpen(!isPnlPanelOpen);
      }
    }
  };

  // For the auto-filled values in the Payment Details component
  const calculatePayment = () => {
    // Get effective duration days
    let durationValue = 30; 
    
    // Calculate effective days for premium calculation
    if (duration === "30") durationValue = 30;
    else if (duration === "60") durationValue = 60;
    else if (duration === "90") durationValue = 90;
    else if (duration === "180") durationValue = 180;
    else if (duration === "365") durationValue = 365;
    else if (duration === "halving") durationValue = 200; // Approximate days until next halving
    else if (duration === "custom") durationValue = 120; // Default for custom

    // Enhanced premium calculation with multiple factors
    const btcAmountValue = parseFloat(amount);
    const protectedValueNumber = parseFloat(protectedValue);
    
    // Volatility factor (normally this would come from market data)
    const annualVolatility = 0.65; // 65% annual volatility for Bitcoin
    const volatilityFactor = Math.sqrt(durationValue / 365) * annualVolatility;
    
    // Calculate strike distance from current price
    const protectedValueDelta = Math.abs(protectedValueNumber - btcPrice) / btcPrice;
    
    // Calculate moneyness factor (premium increases for ITM options)
    let moneynessFactor = 1;
    const isPut = optionType === "put";
    const isITM = (isPut && protectedValueNumber > btcPrice) || (!isPut && protectedValueNumber < btcPrice);
    
    if (isITM) {
      // In-the-money options have higher premiums
      moneynessFactor = 1 + (protectedValueDelta * 1.5);
    } else {
      // Out-of-the-money options have lower premiums
      moneynessFactor = 1 - (protectedValueDelta * 0.5);
      // Ensure minimum value
      moneynessFactor = Math.max(moneynessFactor, 0.3);
    }
    
    // Duration scaling (longer durations have slightly discounted rates per day)
    const durationScaling = (durationValue / 30) * (1 - (Math.log(durationValue) / 100));
    
    // Base rate (percentage of protected amount)
    const baseRate = 0.05; // 5%
    
    // Calculate premium
    const premium = btcAmountValue * baseRate * durationScaling * volatilityFactor * moneynessFactor;
    
    // Calculate fees (2% of premium)
    const fees = premium * 0.02;
    const total = premium + fees;
    
    setPolicy(prev => ({
      ...prev,
      premium,
      fees,
      total
    }));
  };

  // Effect to recalculate payment whenever relevant values change
  React.useEffect(() => {
    calculatePayment();
  }, [protectedValue, amount, duration, protectionStrategy]);
  
  // Function for PnL simulation to use correct premium value
  const getCorrectPremium = () => {
    return policy.premium;
  };

  // Get step number from enum (updated to use custom steps and new flow)
  const currentStepNumber: number = 
    currentStep === CUSTOM_STEPS.PROTECTION_GOAL ? 1 :
    currentStep === CUSTOM_STEPS.PROTECTED_VALUE_STRATEGY ? 2 :
    currentStep === CUSTOM_STEPS.PROTECTION_AMOUNT ? 3 :
    currentStep === CUSTOM_STEPS.PROTECTION_PERIOD ? 4 :
    currentStep === CUSTOM_STEPS.PROTECTION_SIMULATION ? 5 :
    currentStep === CUSTOM_STEPS.POLICY_PREVIEW ? 6 : 1;
  
  // Array of step objects for StepIndicator component
  const steps: StepType[] = STEP_NAMES.map((name, index) => {
    return {
      name,
      active: currentStepNumber === index + 1,
      completed: currentStepNumber > index + 1,
    };
  });
  
  // Determine if back button should be shown
  const showBackButton = currentStep !== CUSTOM_STEPS.PROTECTION_GOAL;
  
  // Determine if next button should be shown and what it should say
  const showNextButton = currentStep !== CUSTOM_STEPS.POLICY_PREVIEW;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-medium hidden sm:block">Bitcoin Protection Center</h1>
      </div>
      
      <div className="mb-8">
        <StepIndicator steps={steps} />  
      </div>
    
      <div className="border rounded-lg p-8 mb-8">
        {currentStep === CUSTOM_STEPS.PROTECTION_GOAL && (
          <ProtectionTypeSelector 
            protectionType={protectionType} 
            setProtectionType={setProtectionType} 
          />
        )}
  
        {currentStep === CUSTOM_STEPS.PROTECTED_VALUE_STRATEGY && (
          <ProtectedValue 
            optionType={optionType}
            strikePrice={protectedValue} 
            setStrikePrice={setProtectedValue}
            protectionType={protectionType}
            protectionStrategy={protectionStrategy}
            setProtectionStrategy={setProtectionStrategyAndValue}
          />
        )}

        {currentStep === CUSTOM_STEPS.PROTECTION_AMOUNT && (
          <ProtectionAmount 
            amount={amount}
            setAmount={setAmount}
            walletBalance={balance?.sbtc?.toString() || "0.1"}
            walletConnected={isConnected}
          />
        )}

        {currentStep === CUSTOM_STEPS.PROTECTION_PERIOD && (
          <div>
            <QuantityAndDuration 
              amount={amount}
              duration={duration}
              setDuration={setDuration}
              hideSummary={true}
            />
          </div>
        )}

        {currentStep === CUSTOM_STEPS.PROTECTION_SIMULATION && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Protection Value Simulator</h2>
              <p className="text-muted-foreground mb-6">
                See how your protection performs under different market scenarios.
              </p>
            </div>
            
            <PnlSimulation 
              optionType={optionType}
              strikePrice={parseFloat(protectedValue)}
              currentPrice={btcPrice}
              premium={getCorrectPremium()}
              amount={parseFloat(amount)}
            />
          </div>
        )}
        
        {currentStep === CUSTOM_STEPS.POLICY_PREVIEW && (
          <div>
            
            <PolicyPreview 
              policy={policy}
              optionType={optionType}
              protectedValue={protectedValue}
              amount={amount}
              duration={duration}
              togglePnlPanel={togglePnlPanel}
            />
            
            {/* Add activation button directly in the policy preview step */}
         
          </div>
        )}
      </div>
      
      <NavigationButtons
        currentStep={currentStepNumber}
        totalSteps={STEP_NAMES.length}
        onNext={handleNextStep}
        onBack={handlePreviousStep}
        onActivate={handleActivate}
        showBackButton={showBackButton}
        showNextButton={showNextButton}
      />
    </div>
  );
} 