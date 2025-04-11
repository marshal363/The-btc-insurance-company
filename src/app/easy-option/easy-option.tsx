"use client";

import { useState, useEffect } from "react";
import { useMarketStore } from "@/store/market-store";
import { useToast } from "@/components/ui/use-toast";
import { STEPS, STEPS_TYPE } from "@/constants/steps";
import { useRouter } from "next/navigation";
import React from "react";

// Import our component modules
import { StepIndicator, StepType } from "@/components/easy-option/step-indicator";
import { NavigationButtons } from "@/components/easy-option/navigation-buttons";
import { ProtectionTypeSelector, ProtectionType } from "@/components/easy-option/protection-type-selector";
import { StrikePrice } from "@/components/easy-option/strike-price";
import { AvailableContracts, OptionContract } from "@/components/easy-option/available-contracts";
import { QuantityAndDuration } from "@/components/easy-option/quantity-and-duration";
import { ReviewAndActivate } from "@/components/easy-option/review-and-activate";
import { PnlSimulation } from "@/components/easy-option/pnl-simulation";

// Define array of step names
const STEP_NAMES = [
  "Protection Type",
  "Coverage Details",
  "Policy Duration",
  "Available Policies",
  "Activate Protection",
];

export default function EasyOption() {
  const { toast } = useToast();
  const router = useRouter();

  // State from market store
  const { btcPrice = 48500 } = useMarketStore();

  // Step state
  const [currentStep, setCurrentStep] = useState<STEPS_TYPE>(STEPS.PROTECTION_TYPE);

  // Protection type state
  const [protectionType, setProtectionType] = useState<ProtectionType>("hodl");
  
  // Option selection state (derived from protection type)
  const [optionType, setOptionType] = useState<"call" | "put">("put");
  
  // Strike price selection state
  const [strikePrice, setStrikePrice] = useState<string>("34000");
  
  // Bitcoin amount and duration state 
  const [amount, setAmount] = useState<string>("0.25");
  const [duration, setDuration] = useState<"30" | "60" | "90" | "180" | "365" | "halving" | "custom">("30");

  // PnL simulation panel state
  const [isPnlPanelOpen, setIsPnlPanelOpen] = useState(false);
  
  // Selected contract state
  const [selectedContract, setSelectedContract] = useState<OptionContract | null>(null);
  
  // Policy payment state
  const [policy, setPolicy] = useState<{
    premium: number;
    fees: number;
    total: number;
  }>({
    premium: 0,
    fees: 0,
    total: 0,
  });
  
  // Update strike price when BTC price changes (only on initial mount)
  useEffect(() => {
    setStrikePrice(btcPrice.toString());
  }, [btcPrice]);

  // Update premium calculation when moving to review step or showing PnL
  React.useEffect(() => {
    if (currentStep === STEPS.REVIEW_ACTIVATE || isPnlPanelOpen) {
      calculatePayment();
    }
  }, [currentStep, isPnlPanelOpen]);

  // Step navigation functions
  const handleNextStep = () => {
    // Validate current step
    if (currentStep === STEPS.PROTECTION_TYPE) {
      // Validation for protection type
      if (!protectionType) {
        toast({
          title: "Please select a protection type",
          description: "Select the type of protection you need for your Bitcoin.",
          variant: "destructive",
        });
        return;
      }
      // Map protection type to option type and go directly to strike price
      setOptionType(protectionType === "hodl" ? "put" : "call");
      setCurrentStep(STEPS.STRIKE_PRICE);
    } 
    else if (currentStep === STEPS.STRIKE_PRICE) {
      // Validation for strike price and amount
      if (!strikePrice || isNaN(parseFloat(strikePrice))) {
        toast({
          title: "Please enter a valid protected value",
          description: "Protected value should be a number.",
          variant: "destructive",
        });
        return;
      }
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) < 0.01) {
        toast({
          title: "Please enter a valid Bitcoin amount",
          description: "Amount should be at least 0.01 BTC.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(STEPS.QUANTITY_DURATION);
    } 
    else if (currentStep === STEPS.QUANTITY_DURATION) {
      // Validate duration
      if (!duration) {
        toast({
          title: "Please select a policy duration",
          description: "Choose how long you want your protection to remain active.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(STEPS.AVAILABLE_CONTRACTS);
    } 
    else if (currentStep === STEPS.AVAILABLE_CONTRACTS) {
      // Validation for selected contract
      if (!selectedContract) {
        toast({
          title: "Please select a protection policy",
          description: "Choose a policy that best fits your needs.",
          variant: "destructive",
        });
        return;
      }
      
      // Calculate premium based on selections
      calculatePayment();
      setCurrentStep(STEPS.REVIEW_ACTIVATE);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep === STEPS.STRIKE_PRICE) {
      setCurrentStep(STEPS.PROTECTION_TYPE);
    } 
    else if (currentStep === STEPS.QUANTITY_DURATION) {
      setCurrentStep(STEPS.STRIKE_PRICE);
    }
    else if (currentStep === STEPS.AVAILABLE_CONTRACTS) {
      setCurrentStep(STEPS.QUANTITY_DURATION);
    } 
    else if (currentStep === STEPS.REVIEW_ACTIVATE) {
      setCurrentStep(STEPS.AVAILABLE_CONTRACTS);
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

  // Handle contract selection
  const handleSelectContract = (contract: OptionContract) => {
    setSelectedContract(contract);
    setOptionType(contract.type);
    setStrikePrice(contract.strike.toString());
    
    // Update policy with selected contract's premium
    setPolicy({
      premium: contract.premium,
      fees: contract.premium * 0.02, // 2% fee
      total: contract.premium + (contract.premium * 0.02)
    });
    
    // Open the PnL panel when a contract is selected
    setIsPnlPanelOpen(true);
  };

  // Check if we're past the first step to enable simulation panel
  const canShowPnlSimulation = currentStep !== STEPS.PROTECTION_TYPE;

  // Toggle PnL simulation panel
  const togglePnlPanel = () => {
    if (canShowPnlSimulation) {
      setIsPnlPanelOpen(!isPnlPanelOpen);
    }
  };

  // For the auto-filled values in the Payment Details component
  const calculatePayment = () => {
    // If a contract has been selected, use its premium
    if (selectedContract) {
      setPolicy({
        premium: selectedContract.premium,
        fees: selectedContract.premium * 0.02, // 2% fee
        total: selectedContract.premium + (selectedContract.premium * 0.02)
      });
      return;
    }
    
    // Otherwise, calculate using our model
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
    const strikeValue = parseFloat(strikePrice);
    
    // Volatility factor (normally this would come from market data)
    const annualVolatility = 0.65; // 65% annual volatility for Bitcoin
    const volatilityFactor = Math.sqrt(durationValue / 365) * annualVolatility;
    
    // Calculate strike distance from current price
    const strikePriceDelta = Math.abs(strikeValue - btcPrice) / btcPrice;
    
    // Calculate moneyness factor (premium increases for ITM options)
    let moneynessFactor = 1;
    const isPut = optionType === "put";
    const isITM = (isPut && strikeValue > btcPrice) || (!isPut && strikeValue < btcPrice);
    
    if (isITM) {
      // In-the-money options have higher premiums
      moneynessFactor = 1 + (strikePriceDelta * 1.5);
    } else {
      // Out-of-the-money options have lower premiums
      moneynessFactor = 1 - (strikePriceDelta * 0.5);
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
    
    setPolicy({
      premium,
      fees,
      total,
    });
  };

  // Effect to recalculate payment whenever relevant values change
  React.useEffect(() => {
    calculatePayment();
  }, [strikePrice, amount, duration, selectedContract]);
  
  // Function for PnL simulation to use correct premium value
  const getCorrectPremium = () => {
    if (selectedContract) {
      return selectedContract.premium;
    }
    return policy.premium;
  };

  // Get step number from enum
  const currentStepNumber: number = 
    currentStep === STEPS.PROTECTION_TYPE ? 1 :
    currentStep === STEPS.STRIKE_PRICE ? 2 :
    currentStep === STEPS.QUANTITY_DURATION ? 3 :
    currentStep === STEPS.AVAILABLE_CONTRACTS ? 4 :
    currentStep === STEPS.REVIEW_ACTIVATE ? 5 : 1;
  
  // Array of step objects for StepIndicator component
  const steps: StepType[] = STEP_NAMES.map((name, index) => {
    return {
      name,
      active: currentStepNumber === index + 1,
      completed: currentStepNumber > index + 1,
    };
  });
  
  // Determine if back button should be shown
  const showBackButton = currentStep !== STEPS.PROTECTION_TYPE;
  
  // Determine if next button should be shown
  const showNextButton = currentStep !== STEPS.REVIEW_ACTIVATE;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-medium">Bitcoin Protection Center</h1>
      </div>
      
      <div className="mb-8">
        <StepIndicator steps={steps} />  
      </div>
    
      <div className="border rounded-lg p-8 mb-8">
        {currentStep === STEPS.PROTECTION_TYPE && (
          <ProtectionTypeSelector 
            protectionType={protectionType} 
            setProtectionType={setProtectionType} 
          />
        )}
  
        {currentStep === STEPS.STRIKE_PRICE && (
          <StrikePrice 
            optionType={optionType}
                strikePrice={strikePrice} 
            setStrikePrice={setStrikePrice}
            protectionType={protectionType}
            amount={amount}
            setAmount={setAmount}
          />
        )}

        {currentStep === STEPS.QUANTITY_DURATION && (
          <QuantityAndDuration 
            amount={amount}
            setAmount={setAmount}
            duration={duration}
            setDuration={setDuration}
          />
        )}

        {currentStep === STEPS.AVAILABLE_CONTRACTS && (
          <AvailableContracts 
            optionType={optionType}
            strikePrice={strikePrice}
            duration={duration}
            customDays={duration === "custom" ? 120 : undefined}
            onSelectContract={handleSelectContract}
            selectedContract={selectedContract}
            togglePnlPanel={togglePnlPanel}
          />
        )}
        
        {currentStep === STEPS.REVIEW_ACTIVATE && (
          <ReviewAndActivate 
            optionType={optionType}
            protectionType={protectionType}
            strikePrice={strikePrice}
            amount={amount}
            duration={duration}
            policy={policy}
            onActivate={handleActivate}
            togglePnlPanel={togglePnlPanel}
          />
        )}
      </div>
      
      {isPnlPanelOpen && canShowPnlSimulation && (
        <div className="mb-6">
          <PnlSimulation 
            optionType={optionType}
            strikePrice={parseFloat(strikePrice)}
            currentPrice={btcPrice}
            premium={getCorrectPremium()}
            amount={parseFloat(amount)}
            onClose={() => setIsPnlPanelOpen(false)}
          />
        </div>
      )}
      
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