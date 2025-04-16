import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, Check, ChevronDown, ChevronUp, ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Define Income Strategy Type
export type IncomeStrategyType = "stability" | "upside";

interface IncomeStrategySelectorProps {
  incomeStrategy: IncomeStrategyType;
  setIncomeStrategy: (strategy: IncomeStrategyType) => void;
}

export function IncomeStrategySelector({
  incomeStrategy,
  setIncomeStrategy,
}: IncomeStrategySelectorProps) {
  const [expandedCard, setExpandedCard] = useState<IncomeStrategyType | null>(null);
  
  const toggleCardExpand = (type: IncomeStrategyType, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCard(expandedCard === type ? null : type);
  };

  // Select only stability strategy
  const handleSelectStrategy = (strategy: IncomeStrategyType) => {
    if (strategy === "stability") {
      setIncomeStrategy(strategy);
    }
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold">Select Income Strategy</h2>
        <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-700 rounded-full">
          Step 1 of 6
        </Badge>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Choose how you want to generate income with your Bitcoin strategy.
      </p>
      
      {!incomeStrategy && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 flex items-center gap-2 shadow-sm">
          <TrendingUp className="h-4 w-4 flex-shrink-0 text-amber-600" />
          <p>Please select an income strategy to continue to the next step.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Stability Income Card */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card 
            className={cn(
              "overflow-hidden transition-all cursor-pointer group border p-0 shadow-sm hover:shadow-md relative",
              incomeStrategy === "stability" 
                ? "ring-1 ring-amber-700 shadow-md border-amber-700/20"
                : "hover:border-amber-300 border-transparent"
            )}
            onClick={() => handleSelectStrategy("stability")}
          >
            {/* Top ribbon for selected state */}
            {incomeStrategy === "stability" && (
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                <div className="absolute transform rotate-45 bg-amber-500 text-white text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center shadow-sm">
                  Selected
                </div>
              </div>
            )}
            
            <div className={cn(
              "h-full w-full overflow-hidden relative rounded-lg",
              incomeStrategy === "stability" ? "bg-gradient-to-br from-amber-50 to-white" : "bg-gradient-to-br from-amber-50 to-white"
            )}>
              {/* Card header */}
              <div className="bg-amber-900 text-white p-6 flex flex-col items-center justify-center">
                <div className="bg-amber-100 rounded-full p-3 mb-4 relative">
                  <TrendingDown className="w-6 h-6 text-amber-600" />
                  {incomeStrategy === "stability" && (
                    <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping"></span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1">Bitcoin Stability Income</h3>
                <p className="text-amber-100 text-sm">Generate income when Bitcoin remains stable or increases in value</p>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-4 w-4 text-amber-600" />
                    <p className="font-medium text-sm">Earn yield by providing downside protection</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Receive premiums for offering to buy Bitcoin at lower prices if the market drops.
                  </p>
                </div>
                
                {/* Enhanced visual elements */}
                <div className="bg-amber-100/50 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <BadgeCheck className="h-4 w-4 text-amber-700" />
                    <p className="text-sm font-medium text-amber-900">Best During Stable Markets</p>
                  </div>
                  <p className="text-xs text-amber-800">
                    Ideal when you expect sideways movement or would be happy to acquire Bitcoin at lower prices
                  </p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="ghost" 
                    size="sm" 
                    className="text-xs flex items-center gap-1 text-amber-600 p-0 rounded-full"
                    onClick={(e) => toggleCardExpand("stability", e)}
                  >
                    {expandedCard === "stability" ? "Show less" : "Learn more"}
                    {expandedCard === "stability" ? 
                      <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : 
                      <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                    }
                  </Button>
                  
                  {incomeStrategy === "stability" ? (
                    <Badge className="bg-amber-500 text-white px-2 py-1 text-xs shadow-sm rounded-full">
                      <Check className="h-3 w-3 mr-1" /> Selected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                      Select <ArrowRight className="h-3 w-3 ml-1" />
                    </Badge>
                  )}
                </div>
                
                {/* Expandable details with smooth animation */}
                {expandedCard === "stability" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <h4 className="text-sm font-medium mb-2">Key Benefits:</h4>
                    <ul className="space-y-2 pl-1">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3 text-amber-700" />
                        </div>
                        <span>Higher yields than traditional income strategies</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3 text-amber-700" />
                        </div>
                        <span>May acquire Bitcoin at a discount if prices fall</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3 text-amber-700" />
                        </div>
                        <span>Premium income paid upfront immediately</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Upside Income Card with Coming Soon label */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card 
            className={cn(
              "overflow-hidden transition-all group border p-0 shadow-sm relative opacity-90",
              "hover:border-amber-300 border-transparent"
            )}
            // Removed onClick handler to disable selection
          >
            {/* Coming Soon ribbon */}
            <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden z-10">
              <div className="absolute transform rotate-45 bg-slate-700 text-white text-xs font-bold py-1 right-[-35px] top-[32px] w-[170px] text-center shadow-sm">
                Coming Soon
              </div>
            </div>
            
            <div className="h-full w-full overflow-hidden relative rounded-lg bg-gradient-to-br from-amber-50 to-white">
              {/* Card header */}
              <div className="bg-amber-700 text-white p-6 flex flex-col items-center justify-center">
                <div className="bg-amber-100 rounded-full p-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-1">Bitcoin Upside Income</h3>
                <p className="text-amber-100 text-sm">Generate income by lending out potential Bitcoin price upside</p>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-amber-600" />
                    <p className="font-medium text-sm">Earn yield by providing upside potential</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Receive premiums for offering to sell Bitcoin at higher prices if the market rises.
                  </p>
                </div>
                
                {/* Enhanced visual elements */}
                <div className="bg-amber-100/50 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <BadgeCheck className="h-4 w-4 text-amber-700" />
                    <p className="text-sm font-medium text-amber-900">Best With Target Sell Prices</p>
                  </div>
                  <p className="text-xs text-amber-800">
                    Ideal when you would be happy to sell some Bitcoin at target higher prices
                  </p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="ghost" 
                    size="sm" 
                    className="text-xs flex items-center gap-1 text-amber-600 p-0 rounded-full"
                    onClick={(e) => toggleCardExpand("upside", e)}
                  >
                    {expandedCard === "upside" ? "Show less" : "Learn more"}
                    {expandedCard === "upside" ? 
                      <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : 
                      <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                    }
                  </Button>
                </div>
                
                {/* Expandable details with smooth animation */}
                {expandedCard === "upside" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <h4 className="text-sm font-medium mb-2">Key Benefits:</h4>
                    <ul className="space-y-2 pl-1">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3 text-amber-700" />
                        </div>
                        <span>Earn income while continuing to hold for long term</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3 text-amber-700" />
                        </div>
                        <span>May sell Bitcoin at a premium if prices rise</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3 text-amber-700" />
                        </div>
                        <span>Automate your future selling strategy</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 