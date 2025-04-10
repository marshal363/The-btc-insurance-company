"use client";

import { useState, useEffect } from "react";
import { useMarketStore } from "@/store/market-store";

// Import our component modules
import { StepIndicator, StepType } from "@/components/easy-option/step-indicator";
import { OptionTypeSelector, OptionType } from "@/components/easy-option/option-type-selector";
import { StrikePriceSelector } from "@/components/easy-option/strike-price-selector";
import { ExpirySelector } from "@/components/easy-option/expiry-selector";
import { OptionReview } from "@/components/easy-option/option-review";
import { NavigationButtons } from "@/components/easy-option/navigation-buttons";
import { PnlSimulation } from "@/components/easy-option/pnl-simulation";
import { AvailableContracts, OptionContract } from "@/components/easy-option/available-contracts";

export default function EasyOption() {
  // State from market store
  const { btcPrice = 48500 } = useMarketStore();

  // Step navigation state
  const [currentStep, setCurrentStep] = useState<StepType>("protection-type");
  
  // Option configuration state
  const [optionType, setOptionType] = useState<OptionType>("call");
  const [strikePrice, setStrikePrice] = useState<number>(btcPrice);
  const [expiryDays, setExpiryDays] = useState<number>(14);

  // PnL simulation panel state
  const [isPnlPanelOpen, setIsPnlPanelOpen] = useState(false);
  
  // Selected contract state
  const [selectedContract, setSelectedContract] = useState<OptionContract | null>(null);
  
  // Step validation state
  const [isTypeValid, setIsTypeValid] = useState(true); // Type is pre-selected so valid by default
  const [isStrikeValid, setIsStrikeValid] = useState(true); // Strike is pre-set so valid by default
  const [isExpiryValid, setIsExpiryValid] = useState(true); // Expiry is pre-set so valid by default
  const [isContractValid, setIsContractValid] = useState(false); // Contract must be selected
  
  // Update strike price when BTC price changes (only on initial mount)
  useEffect(() => {
    setStrikePrice(btcPrice);
  }, []);

  // Check validation for current step
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case "protection-type": return isTypeValid;
      case "coverage-amount": return isStrikeValid;
      case "coverage-period": return isExpiryValid;
      case "select-policy": return isContractValid || selectedContract !== null;
      case "review-policy": return true; // Review step just displays info, always valid
      default: return false;
    }
  };

  // Step navigation functions
  const handleNext = () => {
    if (!isCurrentStepValid()) return;
    
    if (currentStep === "protection-type") setCurrentStep("coverage-amount");
    else if (currentStep === "coverage-amount") setCurrentStep("coverage-period");
    else if (currentStep === "coverage-period") setCurrentStep("select-policy");
    else if (currentStep === "select-policy") setCurrentStep("review-policy");
    
    // When moving from type to strike, toggle PnL panel open
    if (currentStep === "protection-type") {
      setIsPnlPanelOpen(true);
    }
  };

  const handleBack = () => {
    if (currentStep === "coverage-amount") setCurrentStep("protection-type");
    else if (currentStep === "coverage-period") setCurrentStep("coverage-amount");
    else if (currentStep === "select-policy") setCurrentStep("coverage-period");
    else if (currentStep === "review-policy") setCurrentStep("select-policy");
    
    // When going back to type, close PnL panel
    if (currentStep === "coverage-amount") {
      setIsPnlPanelOpen(false);
    }
  };

  const handlePurchaseOption = () => {
    // In a real app, this would call an API to purchase the option
    alert("Protection policy activated successfully!");
  };

  const handleSelectContract = (contract: OptionContract) => {
    // Update state with the selected contract
    setSelectedContract(contract);
    setOptionType(contract.type);
    setStrikePrice(contract.strike);
    setExpiryDays(contract.daysToExpiry);
    setIsContractValid(true);
    // Open the PnL panel when a contract is selected
    setIsPnlPanelOpen(true);
  };

  // Check if we're past the first step to enable simulation panel
  const canShowPnlSimulation = currentStep !== "protection-type";

  // Toggle PnL simulation panel
  const togglePnlPanel = () => {
    if (canShowPnlSimulation) {
      setIsPnlPanelOpen(!isPnlPanelOpen);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Bitcoin Protection Center</h1>
      
      {/* Step Indicator Component */}
      <StepIndicator currentStep={currentStep} />

      {/* Main content area with optional simulation panel */}
      <div className="flex">
        {/* Main content */}
        <div className={`${isPnlPanelOpen ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
          {/* Card Content */}
          <div className="max-w-2xl mx-auto bg-card rounded-lg p-6 text-card-foreground shadow-sm mb-6">
            {/* Step Content */}
            {currentStep === "protection-type" && (
              <OptionTypeSelector 
                optionType={optionType} 
                setOptionType={(type) => {
                  setOptionType(type);
                  setIsTypeValid(true);
                }} 
              />
            )}
  
            {currentStep === "coverage-amount" && (
              <StrikePriceSelector 
                strikePrice={strikePrice} 
                setStrikePrice={(price) => {
                  setStrikePrice(price);
                  setIsStrikeValid(true);
                }} 
                currentBtcPrice={btcPrice}
                optionType={optionType}
              />
            )}
  
            {currentStep === "coverage-period" && (
              <ExpirySelector 
                expiryDays={expiryDays} 
                setExpiryDays={(days) => {
                  setExpiryDays(days);
                  setIsExpiryValid(true);
                }} 
              />
            )}
            
            {currentStep === "select-policy" && (
              <AvailableContracts 
                optionType={optionType}
                strikePrice={strikePrice}
                expiryDays={expiryDays}
                currentBtcPrice={btcPrice}
                onSelectContract={handleSelectContract}
              />
            )}
  
            {currentStep === "review-policy" && (
              <OptionReview 
                optionType={optionType} 
                strikePrice={strikePrice} 
                expiryDays={expiryDays}
                currentBtcPrice={btcPrice}
                premium={selectedContract?.premium || 50}
              />
            )}
            
            {/* Protection Calculator Toggle Button (mobile only) */}
            {canShowPnlSimulation && (
              <div className="mt-4 md:hidden">
                <button
                  onClick={togglePnlPanel}
                  className="w-full bg-muted py-2 px-4 rounded-md text-sm font-medium"
                >
                  {isPnlPanelOpen ? "Hide Protection Calculator" : "View Protection Calculator"}
                </button>
              </div>
            )}
            
            {/* Show Protection Calculator Toggle Button on desktop too */}
            {canShowPnlSimulation && !isPnlPanelOpen && (
              <div className="hidden md:block mt-4">
                <button
                  onClick={togglePnlPanel}
                  className="ml-auto flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                  View Protection Calculator
                </button>
              </div>
            )}
          </div>
  
          {/* Navigation Buttons */}
          <NavigationButtons
            currentStep={currentStep}
            handleBack={handleBack}
            handleNext={handleNext}
            handlePurchase={handlePurchaseOption}
            isNextDisabled={!isCurrentStepValid()}
          />
        </div>
        
        {/* Protection Calculator Panel (larger screens) */}
        <div className={`hidden md:block ${isPnlPanelOpen ? 'w-1/3' : 'w-0 overflow-hidden'} transition-all duration-300`}>
          <PnlSimulation 
            optionType={optionType}
            strikePrice={strikePrice}
            premium={selectedContract?.premium || 50}
            currentBtcPrice={btcPrice}
            isOpen={isPnlPanelOpen}
            onToggle={togglePnlPanel}
          />
        </div>
      </div>
      
      {/* Mobile Protection Calculator (shown when toggled) */}
      <div className={`md:hidden ${isPnlPanelOpen ? 'block' : 'hidden'} mt-6`}>
        <div className="bg-card rounded-lg shadow-sm">
          <PnlSimulation 
            optionType={optionType}
            strikePrice={strikePrice}
            premium={selectedContract?.premium || 50}
            currentBtcPrice={btcPrice}
            isOpen={true}
            onToggle={togglePnlPanel}
          />
        </div>
      </div>
    </div>
  );
} 