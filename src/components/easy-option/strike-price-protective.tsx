import React, { useState } from "react";
import { useMarketStore } from "@/store/market-store";
import { Shield, ShieldCheck, AlertOctagon, Rocket, CircleDollarSign, ChevronDown, ChevronUp, BadgeCheck, Check } from "lucide-react";
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
  bgColor: string;
  textColor: string;
  headerBg: string;
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
          bgColor: "bg-slate-200",
          textColor: "text-slate-900",
          headerBg: "bg-slate-900",
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
          bgColor: "bg-slate-200/70",
          textColor: "text-slate-900",
          headerBg: "bg-slate-800",
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
          bgColor: "bg-slate-100",
          textColor: "text-slate-800",
          headerBg: "bg-slate-700",
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
          bgColor: "bg-slate-100/70",
          textColor: "text-slate-700",
          headerBg: "bg-slate-600",
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
          bgColor: "bg-slate-200",
          textColor: "text-slate-900",
          headerBg: "bg-slate-900",
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
          bgColor: "bg-slate-200/70",
          textColor: "text-slate-900",
          headerBg: "bg-slate-800",
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
          bgColor: "bg-slate-100",
          textColor: "text-slate-800",
          headerBg: "bg-slate-700",
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
          bgColor: "bg-slate-100/70",
          textColor: "text-slate-700",
          headerBg: "bg-slate-600",
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
        <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-700 rounded-full">
          Step 2 of 6
        </Badge>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Select a protection strategy based on your risk tolerance and desired coverage level.
      </p>
      
      {/* Prominently displayed current Bitcoin price with enhanced design */}
      <div className="text-center mb-8 p-5 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center justify-center gap-2 text-slate-600 mb-1">
          <Badge variant="outline" className="bg-white border-slate-200">Live Market Price</Badge>
        </div>
        <p className="text-3xl font-bold text-slate-800">${btcPrice.toLocaleString()}</p>
      </div>
      
      {/* Strategy Selection with Enhanced Visuals */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategyOptions.map((strategy) => {
            const isSelected = protectionStrategy === strategy.id;
            
            return (
              <motion.div
                key={strategy.id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card 
                  className={cn(
                    "overflow-hidden transition-all cursor-pointer group border p-0 shadow-sm hover:shadow-md relative",
                    isSelected 
                      ? "ring-1 ring-slate-700 shadow-md border-slate-700/20"
                      : "hover:border-slate-300 border-transparent"
                  )}
                  onClick={() => handleStrategySelect(strategy)}
                >
                  {/* Top ribbon */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                      <div className="absolute transform rotate-45 bg-slate-900 text-white text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center shadow-sm">
                        Selected
                      </div>
                    </div>
                  )}
                  
                  <div className="h-full w-full overflow-hidden relative rounded-lg">
                    {/* Card header with consistent styling */}
                    <div className={`${strategy.headerBg} text-white p-6 flex flex-col items-center justify-center`}>
                      <div className="bg-white p-3 rounded-full mb-4 relative">
                        <div className="text-slate-700">
                          {strategy.icon}
                        </div>
                        {isSelected && (
                          <span className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping"></span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-1">{strategy.name}</h3>
                      <p className="text-slate-300 text-sm">
                        {optionType === "put" ? 
                          `${strategy.percentage}% of current value` : 
                          `${strategy.percentage}% of current price`}
                      </p>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-5">
                        <p className="text-gray-700 mb-3">{strategy.description}</p>
                        
                        {/* Protected Value Visualization */}
                        <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium text-slate-700">Protected Value</p>
                            <p className="text-lg font-bold">${strategy.value.toLocaleString()}</p>
                          </div>
                          
                          {/* Visual price bar */}
                          <div className="h-5 bg-slate-200 rounded-full overflow-hidden relative">
                            <div 
                              className={`absolute h-full ${strategy.headerBg}`}
                              style={{ 
                                width: `${optionType === "put" 
                                  ? 100 * (strategy.value / (btcPrice * 1.5))
                                  : 100 * (strategy.value / (btcPrice * 1.5))}%` 
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                              {optionType === "put" ? "Protected at this price" : "Locked at this price"}
                            </div>
                          </div>
                        </div>
                        
                        {/* Premium Indicator */}
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-slate-700">Premium Cost</p>
                          <div className="flex items-center">
                            {Array(4).fill(0).map((_, i) => (
                              <div 
                                key={i} 
                                className={`w-2 h-2 rounded-full mx-0.5 ${
                                  i < strategy.premiumLevel 
                                    ? 'bg-slate-700' 
                                    : 'bg-slate-200'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* Strategy Details */}
                        <div className={`${strategy.bgColor} p-3 rounded-lg border border-slate-200 mt-4`}>
                          <div className="flex items-start gap-2">
                            <BadgeCheck className={`h-4 w-4 ${strategy.textColor} mt-0.5`} />
                            <p className={`text-xs ${strategy.textColor}`}>{strategy.detail}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
                        {isSelected ? (
                          <Badge className="bg-slate-900 text-white px-2 py-1 text-xs shadow-sm rounded-full">
                            <Check className="h-3 w-3 mr-1" /> Selected
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-full border-slate-300">
                            Select
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Education Section with consistent styling */}
      <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg border border-slate-300 shadow-sm">
        <button 
          className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
          onClick={() => setIsEducationExpanded(!isEducationExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-2 rounded-full">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">How Protection Value Works</h3>
          </div>
          {isEducationExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-600" />
          )}
        </button>
        
        {isEducationExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 pt-0 border-t border-slate-300"
          >
            <p className="text-sm text-slate-700 mb-3">
              {optionType === "put" 
                ? "Your protected value determines at what price your Bitcoin protection activates. When the market price falls below this value, you can claim the difference."
                : "Your locked purchase price determines the maximum you'll pay for Bitcoin regardless of market increases. If the price rises above this value, you can purchase at your locked price."}
            </p>
            <ul className="text-sm text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <Check className="h-3 w-3 text-slate-600" />
                </div>
                <span>Higher protection levels provide more security but cost more in premium</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <Check className="h-3 w-3 text-slate-600" />
                </div>
                <span>Lower protection levels cost less but activate only after larger price movements</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <Check className="h-3 w-3 text-slate-600" />
                </div>
                <span>Standard Protection (90%) offers a balanced approach for most users</span>
              </li>
            </ul>
            
            {/* Added trust indicator */}
            <div className="mt-4 flex items-center p-2 bg-white rounded-lg border border-slate-300">
              <Badge variant="outline" className="mr-2 border-slate-300 bg-slate-100 rounded-full">
                <BadgeCheck className="h-3 w-3 mr-1 text-slate-600" />
                <span className="text-slate-700">Smart Contracts</span>
              </Badge>
              <p className="text-xs text-slate-700">
                Your protection level is precisely encoded in secure blockchain contracts
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 