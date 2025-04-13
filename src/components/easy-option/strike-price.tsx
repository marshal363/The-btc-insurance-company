import React, { useState, useEffect } from "react";
import { useMarketStore } from "@/store/market-store";
import { Shield, ArrowLeftRight, Check, ShieldCheck, AlertOctagon, Rocket, CircleDollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProtectionType } from "./protection-type-selector";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  strikePrice, 
  setStrikePrice,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <h2 className="text-2xl font-bold mb-4">Select Your Bitcoin Protection Strategy</h2>
      
      {/* Prominently displayed current Bitcoin price */}
      <div className="text-center mb-5 p-3 bg-gray-50 rounded-md border border-gray-200">
        <p className="text-sm text-gray-600 mb-1">Current Bitcoin Price</p>
        <p className="text-xl font-semibold">${btcPrice.toLocaleString()}</p>
      </div>
      
      {/* Strategy Selection */}
      {showStrategySelection && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {strategyOptions.map((strategy) => {
              const isSelected = protectionStrategy === strategy.id;
              return (
                <Card 
                  key={strategy.id}
                  className={cn(
                    "overflow-hidden transition-all cursor-pointer group border-2 p-0",
                    isSelected 
                      ? "ring-1 ring-black shadow-sm border-gray-300"
                      : "hover:border-gray-300 border-transparent shadow-sm hover:shadow"
                  )}
                  onClick={() => handleStrategySelect(strategy)}
                >
                  <div className="h-full w-full overflow-hidden relative">
                    <div className="px-4 py-3">
                      {/* Strategy Header with all essential info */}
                      <div className="flex items-start gap-2.5 pt-0.5">
                        <div className={cn(
                          "p-1.5 rounded-full flex-shrink-0",
                          isSelected 
                            ? `${strategy.color} text-black` 
                            : `${strategy.color} group-hover:bg-opacity-80`
                        )}>
                          <div className="w-4 h-4">{strategy.icon}</div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-semibold truncate pr-2">
                              {strategy.name}
                            </h4>
                          </div>
                          
                          <p className="text-xs text-gray-600 mt-1 mb-1">
                            {optionType === "put" ? 
                              `${strategy.percentage}% of current BTC value` : 
                              `${strategy.percentage}% of current BTC price`}
                          </p>

                          <p className="text-xs text-gray-600 mb-2">
                            {strategy.description}
                          </p>
                          
                          {/* Protected Value */}
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                              <p className="text-xs text-gray-500">Protected Value</p>
                              <p className="font-medium text-sm">
                                ${strategy.value.toLocaleString()}
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500">Premium</p>
                              <div className="flex items-center">
                                {Array.from({ length: 4 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`h-2 w-2 rounded-full mr-1 ${
                                      i < strategy.premiumLevel 
                                        ? 'bg-black' 
                                        : 'bg-gray-200'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Selected badge - positioned at bottom right */}
                      {isSelected && (
                        <Badge className="bg-black text-white px-1.5 py-0.5 text-xs font-medium flex items-center gap-1 absolute bottom-2 right-2">
                          <Check className="h-2.5 w-2.5" /> Selected
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
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