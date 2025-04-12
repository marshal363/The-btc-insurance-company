import React, { useState, useEffect } from "react";
import { useMarketStore } from "@/store/market-store";
import { ArrowUp, ArrowDown, Shield, ArrowLeftRight, Check, ShieldCheck, AlertOctagon, Rocket, CircleDollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProtectionType } from "./protection-type-selector";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StrikePriceProps {
  optionType: "call" | "put";
  strikePrice: string;
  setStrikePrice: (price: string) => void;
  protectionType: ProtectionType;
  amount: string;
  setAmount: (amount: string) => void;
  protectionStrategy: "maximum" | "standard" | "flexible" | "crash";
  setProtectionStrategy: (strategy: "maximum" | "standard" | "flexible" | "crash") => void;
  showAmountSelection?: boolean;
  showStrategySelection?: boolean;
}

// Type for strategy options
type StrategyOption = {
  id: "maximum" | "standard" | "flexible" | "crash";
  name: string;
  percentage: number;
  value: number;
  description: string;
  icon: React.ReactNode;
  premiumLevel: number;
  color: string;
  detail: string;
};

// Constants for BTC<->sats conversion
const SATS_PER_BTC = 100000000;

export function StrikePrice({ 
  optionType, 
  // We need strikePrice and setStrikePrice for API compatibility
  // even if we don't directly use strikePrice in this component
  strikePrice: _strikePrice, 
  setStrikePrice,
  protectionType,
  amount,
  setAmount,
  protectionStrategy,
  setProtectionStrategy,
  showAmountSelection = true,
  showStrategySelection = true
}: StrikePriceProps) {
  const { btcPrice = 48500 } = useMarketStore();
  
  // State for tracking if user is entering in BTC or sats
  const [isInSats, setIsInSats] = useState<boolean>(false);
  
  // Local state for the displayed amount based on current unit
  const [displayAmount, setDisplayAmount] = useState<string>(amount);
  
  // Calculate the USD value of Bitcoin amount
  const btcUsdValue = parseFloat(amount) * btcPrice || 0;
  
  // Convert between BTC and sats
  const btcToSats = (btc: number): number => {
    return Math.round(btc * SATS_PER_BTC);
  };
  
  const satsToBtc = (sats: number): number => {
    return sats / SATS_PER_BTC;
  };
  
  // Toggle between BTC and sats
  const toggleUnit = () => {
    if (isInSats) {
      // Converting from sats to BTC
      const satsValue = parseFloat(displayAmount) || 0;
      const btcValue = satsToBtc(satsValue);
      setDisplayAmount(btcValue.toString());
      setAmount(btcValue.toString());
    } else {
      // Converting from BTC to sats
      const btcValue = parseFloat(displayAmount) || 0;
      const satsValue = btcToSats(btcValue);
      setDisplayAmount(satsValue.toString());
    }
    setIsInSats(!isInSats);
  };
  
  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayAmount(inputValue);
    
    // If in sats mode, convert to BTC for internal storage
    if (isInSats) {
      const satsValue = parseFloat(inputValue) || 0;
      const btcValue = satsToBtc(satsValue);
      setAmount(btcValue.toString());
    } else {
      setAmount(inputValue);
    }
  };
  
  // Update display amount when isInSats changes
  useEffect(() => {
    if (isInSats) {
      const btcValue = parseFloat(amount) || 0;
      setDisplayAmount(btcToSats(btcValue).toString());
    } else {
      setDisplayAmount(amount);
    }
  }, [isInSats, amount]);
  
  // Get title and description based on protection type and option type
  const getTitle = () => {
    if (showAmountSelection && !showStrategySelection) {
      return protectionType === "hodl" 
        ? "How Much Bitcoin Do You Want to Protect?" 
        : "How Much Bitcoin Do You Want to Purchase?";
    } else {
      return protectionType === "hodl" 
        ? "Select Your Bitcoin Protection Strategy" 
        : "Select Your Price Lock Strategy";
    }
  };
  
  const getDescription = () => {
    if (showAmountSelection && !showStrategySelection) {
      return "Enter the amount of Bitcoin you want to protect or use the quick selection options.";
    } else {
      return protectionType === "hodl" 
        ? "Choose a protection strategy and the amount of Bitcoin you want to protect." 
        : "Choose a price lock strategy and the amount of Bitcoin you want to purchase.";
    }
  };

  // Strategy options with descriptions, tailored to the protection type
  const getStrategyOptions = (): StrategyOption[] => {
    if (optionType === "put") {
      // Price Drop Protection strategies
      return [
        {
          id: "maximum",
          name: "Maximum Protection",
          percentage: 100,
          value: Math.round(btcPrice),
          description: "Lock in today's exact Bitcoin value",
          icon: <ShieldCheck className="w-5 h-5" />,
          premiumLevel: 4,
          color: "bg-blue-100 text-blue-700",
          detail: "Activates immediately with any price decrease"
        },
        {
          id: "standard",
          name: "Standard Protection",
          percentage: 90,
          value: Math.round(btcPrice * 0.9),
          description: "Allow for 10% natural movement before protection activates",
          icon: <Shield className="w-5 h-5" />,
          premiumLevel: 3,
          color: "bg-green-100 text-green-700",
          detail: "Recommended for most Bitcoin holders"
        },
        {
          id: "flexible",
          name: "Flexible Protection",
          percentage: 80,
          value: Math.round(btcPrice * 0.8),
          description: "Balance between protection and premium cost",
          icon: <CircleDollarSign className="w-5 h-5" />,
          premiumLevel: 2,
          color: "bg-yellow-100 text-yellow-700",
          detail: "Lower premium, activates after moderate drops"
        },
        {
          id: "crash",
          name: "Crash Insurance",
          percentage: 70,
          value: Math.round(btcPrice * 0.7),
          description: "Protection against major market downturns only",
          icon: <AlertOctagon className="w-5 h-5" />,
          premiumLevel: 1,
          color: "bg-orange-100 text-orange-700",
          detail: "Lowest premium, ideal for long-term HODLers"
        }
      ];
    } else {
      // Price Lock strategies
      return [
        {
          id: "maximum",
          name: "Value Lock",
          percentage: 100,
          value: Math.round(btcPrice),
          description: "Lock in today's exact Bitcoin price",
          icon: <ShieldCheck className="w-5 h-5" />,
          premiumLevel: 4,
          color: "bg-blue-100 text-blue-700",
          detail: "Guarantees today's price regardless of increases"
        },
        {
          id: "standard",
          name: "Standard Lock",
          percentage: 110,
          value: Math.round(btcPrice * 1.1),
          description: "Allow for 10% price increase with lower fee",
          icon: <Shield className="w-5 h-5" />,
          premiumLevel: 3,
          color: "bg-green-100 text-green-700",
          detail: "Recommended for most future buyers"
        },
        {
          id: "flexible",
          name: "Flexible Lock",
          percentage: 120,
          value: Math.round(btcPrice * 1.2),
          description: "Balance between guarantee and fee cost",
          icon: <CircleDollarSign className="w-5 h-5" />,
          premiumLevel: 2,
          color: "bg-yellow-100 text-yellow-700",
          detail: "Lower fee, activates after moderate increases"
        },
        {
          id: "crash",
          name: "Opportunity Lock",
          percentage: 130,
          value: Math.round(btcPrice * 1.3),
          description: "Protection against major bull runs only",
          icon: <Rocket className="w-5 h-5" />,
          premiumLevel: 1,
          color: "bg-orange-100 text-orange-700",
          detail: "Lowest fee, ideal for long-horizon buyers"
        }
      ];
    }
  };
  
  // Get appropriate input validation attributes based on unit
  const getInputAttributes = () => {
    if (isInSats) {
      return {
        step: "1",
        min: "1000000", // 0.01 BTC = 1,000,000 sats
        placeholder: "1000000"
      };
    } else {
      return {
        step: "0.01",
        min: "0.01",
        placeholder: "0.1"
      };
    }
  };
  
  const inputAttributes = getInputAttributes();
  const strategyOptions = getStrategyOptions();
  
  // Handle strategy selection with proper typing
  const handleStrategySelect = (strategy: StrategyOption) => {
    setProtectionStrategy(strategy.id);
    if (setStrikePrice) {
      setStrikePrice(strategy.value.toString());
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{getTitle()}</h2>
      <p className="text-muted-foreground mb-4">
        {getDescription()}
      </p>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${optionType === "put" ? "bg-red-100" : "bg-green-100"}`}>
              {optionType === "put" 
                ? <ArrowDown className="w-4 h-4 text-red-500" /> 
                : <ArrowUp className="w-4 h-4 text-green-500" />}
            </div>
            <h3 className="font-medium">
              {optionType === "put" ? "Price Drop Protection" : "Purchase Price Lock"}
            </h3>
          </div>
          <div className="text-sm text-muted-foreground">
            Current Bitcoin Price: ${btcPrice.toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* Strategy Selection */}
      {showStrategySelection && (
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-3">Choose Your Protection Strategy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {strategyOptions.map((strategy) => {
              const isSelected = protectionStrategy === strategy.id;
              return (
                <Card 
                  key={strategy.id}
                  className={`overflow-hidden transition-all hover:shadow-md cursor-pointer ${
                    isSelected ? "ring-1 ring-black shadow-sm" : "border"
                  }`}
                  onClick={() => handleStrategySelect(strategy)}
                >
                  <div className="relative p-6">
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-black text-white px-2 py-1 text-xs font-medium flex items-center gap-1">
                          <Check className="h-3 w-3" /> Selected
                        </Badge>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-full ${strategy.color}`}>
                        {strategy.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {strategy.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {optionType === "put" ? 
                            `${strategy.percentage}% of current BTC value` : 
                            `${strategy.percentage}% of current BTC price`}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {strategy.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Protected Value</p>
                        <p className="font-medium">
                          ${strategy.value.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Premium</p>
                        <div className="flex">
                          {[...Array(strategy.premiumLevel)].map((_, i) => (
                            <div key={i} className="h-2 w-2 bg-gray-800 rounded-full mr-1" />
                          ))}
                          {[...Array(4 - strategy.premiumLevel)].map((_, i) => (
                            <div key={i} className="h-2 w-2 bg-gray-200 rounded-full mr-1" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-3">
                      {strategy.detail}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Chart visualization - simplified chart showing protection levels */}
      {showStrategySelection && (
        <div className="bg-gray-50 p-6 rounded-lg mb-8 flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-4 text-center">
            Price chart visualization with protection levels will appear here
          </p>
          <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-xs text-gray-400">Price chart coming soon</p>
          </div>
        </div>
      )}
      
      {/* Amount Selection */}
      {showAmountSelection && (
        <div className="mb-8">
          <h3 className="font-medium text-lg mb-3">Coverage Amount</h3>
          <p className="text-sm text-gray-600 mb-4">
            Enter the amount of Bitcoin you want to protect.
          </p>
          
          <div className="p-5 border rounded-lg mb-5">
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
              <div className="flex-grow">
                <div className="mb-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">
                      Amount to Protect
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={toggleUnit}
                    >
                      <ArrowLeftRight className="h-3 w-3 mr-1" />
                      {isInSats ? "BTC" : "Sats"}
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    value={displayAmount}
                    onChange={handleAmountChange}
                    className="pr-16"
                    {...inputAttributes}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                    {isInSats ? "sats" : "BTC"}
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="mb-2">
                  <label className="text-sm font-medium">
                    USD Value
                  </label>
                </div>
                <div className="bg-gray-50 border rounded px-3 py-2 text-right">
                  ${btcUsdValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Quick select:
              </label>
              <div className="flex gap-2 flex-wrap">
                {["0.1", "0.25", "0.5", "1"].map((val) => (
                  <Button
                    key={val}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAmount(val);
                      setIsInSats(false);
                      setDisplayAmount(val);
                    }}
                  >
                    {val} BTC
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium mb-1">Minimum Amount</p>
              <p className="text-xs text-gray-600">0.01 BTC = 1,000,000 sats</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium mb-1">Your Wallet</p>
              <p className="text-xs text-gray-600">Connect wallet to see your balance</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 