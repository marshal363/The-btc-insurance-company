import React, { useState } from "react";
import { useMarketStore } from "@/store/market-store";
import { Shield, ShieldCheck, AlertOctagon, Rocket, CircleDollarSign, ChevronDown, ChevronUp, BadgeCheck, Check, ArrowDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProtectedValueProps {
  optionType: "call" | "put";
  setStrikePrice: (price: string) => void;
  protectionStrategy: "maximum" | "standard" | "flexible" | "crash";
  setProtectionStrategy: (strategy: "maximum" | "standard" | "flexible" | "crash") => void;
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

export function ProtectedValue({ 
  optionType, 
  setStrikePrice,
  protectionStrategy,
  setProtectionStrategy,
}: ProtectedValueProps) {
  const { btcPrice = 48500 } = useMarketStore();
  const [isEducationExpanded, setIsEducationExpanded] = useState(false);
  
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
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold">How Much Protection Do You Need?</h2>
        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
          Step 2 of 6
        </Badge>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Select a protection strategy based on your risk tolerance and desired coverage level.
      </p>
      
      {/* Prominently displayed current Bitcoin price with enhanced design */}
      <div className="text-center mb-8 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
          <Badge variant="outline" className="bg-white">Live Market Price</Badge>
        </div>
        <p className="text-3xl font-bold text-gray-800">${btcPrice.toLocaleString()}</p>
      </div>
      
      {/* Strategy Selection with Enhanced Visuals */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategyOptions.map((strategy) => {
            const isSelected = protectionStrategy === strategy.id;
            const colorClass = strategy.id === "maximum" ? "blue" : 
                              strategy.id === "standard" ? "green" : 
                              strategy.id === "flexible" ? "yellow" : "orange";
            
            return (
              <motion.div
                key={strategy.id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card 
                  className={cn(
                    "overflow-hidden transition-all cursor-pointer group border-2 p-0 shadow-sm hover:shadow-md relative",
                    isSelected 
                      ? `ring-1 ring-${colorClass}-600 shadow-md border-${colorClass}-300`
                      : "hover:border-gray-300 border-transparent"
                  )}
                  onClick={() => handleStrategySelect(strategy)}
                >
                  {/* Top ribbon */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                      <div className={`absolute transform rotate-45 bg-${colorClass}-600 text-white text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center shadow-sm`}>
                        Selected
                      </div>
                    </div>
                  )}
                  
                  <div className="h-full w-full overflow-hidden relative">
                    {/* Enhanced header with gradient background */}
                    <div className={`bg-gradient-to-r from-${colorClass}-600 to-${colorClass}-700 p-4 text-white`}>
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full">
                          {strategy.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{strategy.name}</h3>
                          <p className={`text-${colorClass}-100 text-sm`}>
                            {optionType === "put" ? 
                              `${strategy.percentage}% of current value` : 
                              `${strategy.percentage}% of current price`}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="mb-5">
                        <p className="text-gray-700 mb-3">{strategy.description}</p>
                        
                        {/* Protected Value Visualization */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium text-gray-700">Protected Value</p>
                            <p className="text-lg font-bold">${strategy.value.toLocaleString()}</p>
                          </div>
                          
                          {/* Visual price bar */}
                          <div className="h-5 bg-gray-200 rounded-full overflow-hidden relative">
                            <div 
                              className={`absolute h-full bg-gradient-to-r from-${colorClass}-500 to-${colorClass}-600`}
                              style={{ 
                                width: `${optionType === "put" 
                                  ? 100 * (strategy.value / (btcPrice * 1.5))
                                  : 100 * (strategy.value / (btcPrice * 1.5))}%` 
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                              {optionType === "put" ? "Protected at this price" : "Locked at this price"}
                            </div>
                          </div>
                        </div>
                        
                        {/* Premium Indicator */}
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-700">Premium Cost</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={`h-3 w-3 rounded-full ${
                                  i < strategy.premiumLevel 
                                    ? `bg-${colorClass}-600` 
                                    : 'bg-gray-200'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Detail box at the bottom */}
                      <div className={`bg-${colorClass}-50 p-3 rounded-lg border border-${colorClass}-100 flex items-start gap-2`}>
                        <BadgeCheck className="h-4 w-4 mt-0.5" />
                        <p className="text-sm">{strategy.detail}</p>
                      </div>
                      
                      {/* Selected badge - positioned at bottom right */}
                      {isSelected && (
                        <Badge className="bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1 absolute bottom-3 right-3 shadow-sm">
                          <Check className="h-3 w-3" /> Selected
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Enhanced education section with consistent styling */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 shadow-sm">
        <button 
          className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
          onClick={() => setIsEducationExpanded(!isEducationExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-full">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-blue-800">Understanding Protection Levels</h3>
          </div>
          {isEducationExpanded ? (
            <ChevronUp className="w-4 h-4 text-blue-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-blue-600" />
          )}
        </button>
        
        {isEducationExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 pt-0 border-t border-blue-200"
          >
            <p className="text-sm text-blue-700 mb-3">
              Your protection level determines at what price your Bitcoin protection activates.
            </p>
            
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <ArrowDown className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-sm text-blue-700">Higher protection levels activate sooner but cost more</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <ArrowDown className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-sm text-blue-700">Lower protection levels are more affordable but activate only after larger price drops</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <Check className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-sm text-blue-700">Once activated, your protection guarantees the protected value regardless of how far prices fall</span>
              </li>
            </ul>
            
            {/* Added trust indicator */}
            <div className="mt-4 flex items-center p-2 bg-white rounded-lg border border-blue-200">
              <Badge variant="outline" className="mr-2 border-blue-300 bg-blue-50">
                <BadgeCheck className="h-3 w-3 mr-1 text-blue-600" />
                <span className="text-blue-700">Smart Contract Protected</span>
              </Badge>
              <p className="text-xs text-blue-700">
                Your protection is guaranteed through immutable blockchain contracts
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 