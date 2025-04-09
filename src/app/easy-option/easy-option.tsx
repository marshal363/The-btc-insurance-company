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
  const [currentStep, setCurrentStep] = useState<StepType>("type");
  
  // Option configuration state
  const [optionType, setOptionType] = useState<OptionType>("call");
  const [strikePrice, setStrikePrice] = useState<number>(btcPrice);
  const [expiryDays, setExpiryDays] = useState<number>(14);

  // PnL simulation panel state
  const [isPnlPanelOpen, setIsPnlPanelOpen] = useState(false);
  
  // Selected contract state
  const [selectedContract, setSelectedContract] = useState<OptionContract | null>(null);
  
  // Update strike price when BTC price changes (only on initial mount)
  useEffect(() => {
    setStrikePrice(btcPrice);
  }, []);

  // Step navigation functions
  const handleNext = () => {
    if (currentStep === "type") setCurrentStep("strike");
    else if (currentStep === "strike") setCurrentStep("expiry");
    else if (currentStep === "expiry") setCurrentStep("review");
    
    // When moving from type to strike, toggle PnL panel open
    if (currentStep === "type") {
      setIsPnlPanelOpen(true);
    }
  };

  const handleBack = () => {
    if (currentStep === "strike") setCurrentStep("type");
    else if (currentStep === "expiry") setCurrentStep("strike");
    else if (currentStep === "review") setCurrentStep("expiry");
    
    // When going back to type, close PnL panel
    if (currentStep === "strike") {
      setIsPnlPanelOpen(false);
    }
  };

  const handlePurchaseOption = () => {
    // In a real app, this would call an API to purchase the option
    alert("Option purchased successfully!");
  };

  const handleSelectContract = (contract: OptionContract) => {
    // Update state with the selected contract
    setSelectedContract(contract);
    setOptionType(contract.type);
    setStrikePrice(contract.strike);
    setExpiryDays(contract.daysToExpiry);
    // Open the PnL panel when a contract is selected
    setIsPnlPanelOpen(true);
  };

  // Check if we're past the first step to enable simulation panel
  const canShowPnlSimulation = currentStep !== "type";

  // Toggle PnL simulation panel
  const togglePnlPanel = () => {
    if (canShowPnlSimulation) {
      setIsPnlPanelOpen(!isPnlPanelOpen);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Easy Option Trading</h1>
      
      {/* Step Indicator Component */}
      <StepIndicator currentStep={currentStep} />

      {/* Main content area with optional simulation panel */}
      <div className="flex">
        {/* Main content */}
        <div className={`${isPnlPanelOpen ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
          {/* Card Content */}
          <div className="max-w-2xl mx-auto bg-card rounded-lg p-6 text-card-foreground shadow-sm mb-6">
            {/* Step Content */}
            {currentStep === "type" && (
              <OptionTypeSelector 
                optionType={optionType} 
                setOptionType={setOptionType} 
              />
            )}
  
            {currentStep === "strike" && (
              <StrikePriceSelector 
                strikePrice={strikePrice} 
                setStrikePrice={setStrikePrice} 
                currentBtcPrice={btcPrice}
                optionType={optionType}
              />
            )}
  
            {currentStep === "expiry" && (
              <ExpirySelector 
                expiryDays={expiryDays} 
                setExpiryDays={setExpiryDays} 
              />
            )}
  
            {currentStep === "review" && (
              <OptionReview 
                optionType={optionType} 
                strikePrice={strikePrice} 
                expiryDays={expiryDays}
                currentBtcPrice={btcPrice}
                premium={selectedContract?.premium || 50}
              />
            )}
            
            {/* Available Contracts after expiry selection */}
            {currentStep === "expiry" && (
              <AvailableContracts 
                optionType={optionType}
                strikePrice={strikePrice}
                expiryDays={expiryDays}
                currentBtcPrice={btcPrice}
                onSelectContract={handleSelectContract}
              />
            )}
            
            {/* PnL Panel Toggle Button (mobile only) */}
            {canShowPnlSimulation && (
              <div className="mt-4 md:hidden">
                <button
                  onClick={togglePnlPanel}
                  className="w-full bg-muted py-2 px-4 rounded-md text-sm font-medium"
                >
                  {isPnlPanelOpen ? "Hide P&L Simulation" : "Show P&L Simulation"}
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
          />
        </div>
        
        {/* PnL Simulation Panel (larger screens) */}
        <div className={`hidden md:block ${isPnlPanelOpen ? 'w-1/3' : 'w-0 overflow-hidden'} transition-all duration-300`}>
          <PnlSimulation 
            optionType={optionType}
            strikePrice={strikePrice}
            premium={selectedContract?.premium || 50}
            currentBtcPrice={btcPrice}
            isOpen={isPnlPanelOpen}
          />
        </div>
      </div>
      
      {/* Mobile PnL Simulation (shown when toggled) */}
      <div className={`md:hidden ${isPnlPanelOpen ? 'block' : 'hidden'} mt-6`}>
        <div className="bg-card rounded-lg shadow-sm">
          <PnlSimulation 
            optionType={optionType}
            strikePrice={strikePrice}
            premium={selectedContract?.premium || 50}
            currentBtcPrice={btcPrice}
            isOpen={true}
          />
        </div>
      </div>
    </div>
  );
} 