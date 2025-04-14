"use client";

import { useState, useEffect } from "react";
import { useMarketStore } from "@/store/market-store";
import { useToast } from "@/components/ui/use-toast";
import { INCOME_STEPS, INCOME_STEPS_TYPE } from "@/constants/steps";
import { useRouter } from "next/navigation";
import React from "react";

// Import step indicator and navigation components
import { StepIndicator, StepType } from "@/components/easy-option/step-indicator";
import { NavigationButtons } from "@/components/easy-option/navigation-buttons";
import { useWallet } from "@/hooks/wallet/useWallet";

// Import income center components
import { IncomeStrategySelector, IncomeStrategyType } from "@/components/income-center/income-strategy-selector";
import { RiskRewardTierSelector, RiskRewardTier } from "@/components/income-center/risk-reward-tier-selector";
import { CapitalCommitment } from "@/components/income-center/capital-commitment";
import { IncomePeriodSelector, IncomePeriod } from "@/components/income-center/income-period";
import { StrategySimulation } from "@/components/income-center/strategy-simulation";
import { StrategyReview } from "@/components/income-center/strategy-review";

// Define array of step names
const STEP_NAMES = [
  "Income Strategy",
  "Risk-Reward Tier",
  "Capital Commitment", 
  "Income Period",
  "Strategy Simulation",
  "Strategy Review & Activation",
];

export default function IncomeCenter() {
  const { toast } = useToast();
  const router = useRouter();

  // Get wallet data from hook
  const { isConnected, balance } = useWallet();

  // State from market store
  const { btcPrice = 48500 } = useMarketStore();

  // Step state
  const [currentStep, setCurrentStep] = useState<INCOME_STEPS_TYPE>(INCOME_STEPS.INCOME_STRATEGY);

  // Income strategy state (PUT/CALL selling)
  const [incomeStrategy, setIncomeStrategy] = useState<IncomeStrategyType>("stability");
  
  // Option selection state (derived from income strategy)
  const [optionType, setOptionType] = useState<"put" | "call">("put");
  
  // Risk-reward tier state
  const [riskTier, setRiskTier] = useState<RiskRewardTier>("balanced");
  
  // Strike price selection state (determined by risk tier)
  const [strikePrice, setStrikePrice] = useState<string>(Math.round(btcPrice * 0.9).toString());
  
  // Capital commitment state (amount of STX/sBTC)
  const [amount, setAmount] = useState<string>("250");
  
  // Income period state
  const [period, setPeriod] = useState<IncomePeriod>("30");

  // Simulation panel state
  const [isSimulationPanelOpen, setIsSimulationPanelOpen] = useState(false);
  
  // Strategy state
  const [strategy, setStrategy] = useState<{
    premium: number;
    fees: number;
    total: number;
    strategylLevel: string;
  }>({
    premium: 0,
    fees: 0,
    total: 0,
    strategylLevel: "Balanced Yield (moderate risk)"
  });
  
  // Update strike price and option type when income strategy or risk tier changes
  useEffect(() => {
    // Map income strategy to option type
    setOptionType(incomeStrategy === "stability" ? "put" : "call");
    
    // Calculate strike price based on risk tier
    updateStrikePriceFromTier(riskTier);
  }, [incomeStrategy, riskTier, btcPrice]);

  // Update strike price based on selected tier
  const updateStrikePriceFromTier = (tier: RiskRewardTier) => {
    let strikePricePercent = 0.9; // Default balanced tier (10% below current price)
    
    // Calculate strike price based on selected tier
    if (incomeStrategy === "stability") {
      // For PUT selling, strike price is below current price
      switch(tier) {
        case "conservative":
          strikePricePercent = 0.8; // 20% below current price (less risk)
          break;
        case "balanced":
          strikePricePercent = 0.9; // 10% below current price
          break;
        case "aggressive":
          strikePricePercent = 0.95; // 5% below current price (more risk)
          break;
      }
    } else {
      // For CALL selling, strike price is above current price
      switch(tier) {
        case "conservative":
          strikePricePercent = 1.2; // 20% above current price (less risk)
          break;
        case "balanced":
          strikePricePercent = 1.1; // 10% above current price
          break;
        case "aggressive":
          strikePricePercent = 1.05; // 5% above current price (more risk)
          break;
      }
    }
    
    const newStrikePrice = Math.round(btcPrice * strikePricePercent).toString();
    setStrikePrice(newStrikePrice);
    
    // Update strategy tier description
    setStrategy(prev => ({
      ...prev,
      strategylLevel: `${
        tier === "conservative" ? "Conservative" :
        tier === "balanced" ? "Balanced" :
        "Aggressive"
      } Yield (${
        tier === "conservative" ? "lower" :
        tier === "balanced" ? "moderate" :
        "higher"
      } risk)`
    }));
  };

  // Update premium calculation when relevant parameters change
  React.useEffect(() => {
    if (currentStep === INCOME_STEPS.STRATEGY_SIMULATION || 
        currentStep === INCOME_STEPS.STRATEGY_REVIEW) {
      calculatePayment();
    }
  }, [currentStep]);

  // Step navigation functions
  const handleNextStep = () => {
    // Validate current step
    if (currentStep === INCOME_STEPS.INCOME_STRATEGY) {
      // Validation for income strategy
      if (!incomeStrategy) {
        toast({
          title: "Please select an income strategy",
          description: "Choose how you want to generate income with your Bitcoin strategy.",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep(INCOME_STEPS.RISK_REWARD_TIER);
    } 
    else if (currentStep === INCOME_STEPS.RISK_REWARD_TIER) {
      // Validation for risk-reward tier
      if (!riskTier) {
        toast({
          title: "Please select a risk-reward tier",
          description: "Choose your preferred balance between yield and risk.",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep(INCOME_STEPS.CAPITAL_COMMITMENT);
    }
    else if (currentStep === INCOME_STEPS.CAPITAL_COMMITMENT) {
      // Validation for capital commitment
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) < 10) {
        toast({
          title: "Please enter a valid amount",
          description: "Amount should be at least 10 STX.",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep(INCOME_STEPS.INCOME_PERIOD);
    }
    else if (currentStep === INCOME_STEPS.INCOME_PERIOD) {
      // Validate period
      if (!period) {
        toast({
          title: "Please select an income period",
          description: "Choose how long you want to commit your capital.",
          variant: "destructive",
        });
        return;
      }
      
      // Calculate strategy based on selected parameters
      calculatePayment();
      setCurrentStep(INCOME_STEPS.STRATEGY_SIMULATION);
    } 
    else if (currentStep === INCOME_STEPS.STRATEGY_SIMULATION) {
      // Move from simulation to strategy review
      calculatePayment();
      setCurrentStep(INCOME_STEPS.STRATEGY_REVIEW);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep === INCOME_STEPS.RISK_REWARD_TIER) {
      setCurrentStep(INCOME_STEPS.INCOME_STRATEGY);
    } 
    else if (currentStep === INCOME_STEPS.CAPITAL_COMMITMENT) {
      setCurrentStep(INCOME_STEPS.RISK_REWARD_TIER);
    }
    else if (currentStep === INCOME_STEPS.INCOME_PERIOD) {
      setCurrentStep(INCOME_STEPS.CAPITAL_COMMITMENT);
    }
    else if (currentStep === INCOME_STEPS.STRATEGY_SIMULATION) {
      setCurrentStep(INCOME_STEPS.INCOME_PERIOD);
    } 
    else if (currentStep === INCOME_STEPS.STRATEGY_REVIEW) {
      setCurrentStep(INCOME_STEPS.STRATEGY_SIMULATION);
    }
  };
  
  const handleActivate = () => {
    toast({
      title: "Income Strategy Activated!",
      description: "Your Bitcoin income strategy is now active.",
    });
    
    // Redirect to home page
    router.push("/home");
  };

  // Toggle simulation panel
  const toggleSimulationPanel = () => {
    if (currentStep === INCOME_STEPS.STRATEGY_REVIEW) {
      setCurrentStep(INCOME_STEPS.STRATEGY_SIMULATION);
    } else {
      setIsSimulationPanelOpen(!isSimulationPanelOpen);
    }
  };

  // Calculate strategy payments
  const calculatePayment = () => {
    // Get effective period in days
    const periodValue = parseInt(period);
    
    // Enhanced premium calculation with multiple factors
    const stxAmountValue = parseFloat(amount);
    const strikePriceNumber = parseFloat(strikePrice);
    
    // Volatility factor (normally this would come from market data)
    const annualVolatility = 0.65; // 65% annual volatility for Bitcoin
    const volatilityFactor = Math.sqrt(periodValue / 365) * annualVolatility;
    
    // Calculate strike distance from current price
    const strikePriceDelta = Math.abs(strikePriceNumber - btcPrice) / btcPrice;
    
    // Calculate moneyness factor
    let moneynessFactor = 1;
    const isPut = optionType === "put";
    const isITM = (isPut && strikePriceNumber > btcPrice) || (!isPut && strikePriceNumber < btcPrice);
    
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
    const durationScaling = (periodValue / 30) * (1 - (Math.log(periodValue) / 100));
    
    // Base rate (percentage of amount)
    const baseRate = 0.05; // 5%
    
    // STX to BTC conversion factor (simplified for demo)
    // Assuming 1 STX = 0.00005 BTC (hypothetical value)
    const stxToBtcFactor = 0.00005;
    
    // Calculate strategy value in BTC terms for premium calculation
    const effectiveBtcAmount = stxAmountValue * stxToBtcFactor;
    
    // Calculate premium
    const premium = effectiveBtcAmount * btcPrice * baseRate * durationScaling * volatilityFactor * moneynessFactor;
    
    // Calculate fees (2% of premium)
    const fees = premium * 0.02;
    const total = premium + fees;
    
    setStrategy(prev => ({
      ...prev,
      premium,
      fees,
      total
    }));
  };

  // Effect to recalculate payment whenever relevant values change
  React.useEffect(() => {
    calculatePayment();
  }, [strikePrice, amount, period, riskTier, incomeStrategy]);
  
  // Function to get premium for simulation
  const getCorrectPremium = () => {
    return strategy.premium;
  };

  // Get current step number for UI
  const currentStepNumber: number = 
    currentStep === INCOME_STEPS.INCOME_STRATEGY ? 1 :
    currentStep === INCOME_STEPS.RISK_REWARD_TIER ? 2 :
    currentStep === INCOME_STEPS.CAPITAL_COMMITMENT ? 3 :
    currentStep === INCOME_STEPS.INCOME_PERIOD ? 4 :
    currentStep === INCOME_STEPS.STRATEGY_SIMULATION ? 5 :
    currentStep === INCOME_STEPS.STRATEGY_REVIEW ? 6 : 1;
  
  // Array of step objects for StepIndicator component
  const steps: StepType[] = STEP_NAMES.map((name, index) => {
    return {
      name,
      active: currentStepNumber === index + 1,
      completed: currentStepNumber > index + 1,
    };
  });
  
  // Determine if back button should be shown
  const showBackButton = currentStep !== INCOME_STEPS.INCOME_STRATEGY;
  
  // Determine if next button should be shown and what it should say
  const showNextButton = currentStep !== INCOME_STEPS.STRATEGY_REVIEW;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-medium hidden sm:block">Bitcoin Income Center</h1>
      </div>
      
      <div className="mb-8">
        <StepIndicator steps={steps} />  
      </div>
    
      <div className="border rounded-lg p-8 mb-8">
        {currentStep === INCOME_STEPS.INCOME_STRATEGY && (
          <IncomeStrategySelector 
            incomeStrategy={incomeStrategy} 
            setIncomeStrategy={setIncomeStrategy} 
          />
        )}
  
        {currentStep === INCOME_STEPS.RISK_REWARD_TIER && (
          <RiskRewardTierSelector 
            tier={riskTier}
            setTier={setRiskTier}
            btcPrice={btcPrice}
          />
        )}

        {currentStep === INCOME_STEPS.CAPITAL_COMMITMENT && (
          <CapitalCommitment 
            amount={amount}
            setAmount={setAmount}
            walletBalance={balance?.stx?.toString() || "500"}
            walletConnected={isConnected}
          />
        )}

        {currentStep === INCOME_STEPS.INCOME_PERIOD && (
          <IncomePeriodSelector 
            period={period}
            setPeriod={setPeriod}
            amount={amount}
          />
        )}

        {currentStep === INCOME_STEPS.STRATEGY_SIMULATION && (
          <div className="space-y-6">
            <StrategySimulation 
              optionType={optionType}
              strikePrice={parseFloat(strikePrice)}
              currentPrice={btcPrice}
              premium={getCorrectPremium()}
              amount={parseFloat(amount)}
              riskTier={riskTier}
            />
          </div>
        )}
        
        {currentStep === INCOME_STEPS.STRATEGY_REVIEW && (
          <StrategyReview 
            strategy={strategy}
            incomeStrategy={incomeStrategy}
            optionType={optionType}
            strikePrice={strikePrice}
            amount={amount}
            period={period}
            riskTier={riskTier}
            toggleSimulation={toggleSimulationPanel}
          />
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