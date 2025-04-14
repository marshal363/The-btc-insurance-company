import React, { useState } from "react";
import { Shield, Check, ChevronDown, ChevronUp, BadgeCheck, TrendingDown, Lock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export type ProtectionType = "hodl" | "purchase";

interface ProtectionTypeSelectorProps {
  protectionType: ProtectionType;
  setProtectionType: (type: ProtectionType) => void;
}

export function ProtectionTypeSelector({ 
  protectionType, 
  setProtectionType 
}: ProtectionTypeSelectorProps) {
  const [isEducationExpanded, setIsEducationExpanded] = useState(false);
  const [expandedCard, setExpandedCard] = useState<ProtectionType | null>(null);
  
  const toggleCardExpand = (type: ProtectionType, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCard(expandedCard === type ? null : type);
  };

  // Handle card selection - only allow hodl selection
  const handleCardSelect = (type: ProtectionType) => {
    if (type === "hodl") {
      setProtectionType(type);
    }
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold">What are you looking to protect against?</h2>
        <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-700 rounded-full">
          Step 1 of 6
        </Badge>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Select the type of Bitcoin protection that best matches your needs.
      </p>
      
      {!protectionType && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 flex items-center gap-2 shadow-sm">
          <Shield className="h-4 w-4 flex-shrink-0 text-amber-600" />
          <p>Please select a protection goal to continue to the next step.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* HODL Protection Card - Styled like Policy Buyer but with correct title */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card 
            className={cn(
              "overflow-hidden transition-all cursor-pointer group border p-0 shadow-sm hover:shadow-md relative",
              protectionType === "hodl" 
                ? "ring-1 ring-slate-700 shadow-md border-slate-700/20"
                : "hover:border-slate-300 border-transparent"
            )}
            onClick={() => handleCardSelect("hodl")}
          >
            {/* Top ribbon for selected state - updated to slate */}
            {protectionType === "hodl" && (
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                <div className="absolute transform rotate-45 bg-slate-900 text-white text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center shadow-sm">
                  Selected
                </div>
              </div>
            )}
            
            <div className={cn(
              "h-full w-full overflow-hidden relative rounded-lg",
              protectionType === "hodl" ? "bg-gradient-to-br from-slate-100 to-white" : "bg-gradient-to-br from-slate-100 to-white"
            )}>
              {/* Card header with correct title */}
              <div className="bg-slate-900 text-white p-6 flex flex-col items-center justify-center">
                <div className="bg-blue-100 rounded-full p-3 mb-4 relative">
                  <Shield className="w-6 h-6 text-blue-600" />
                  {protectionType === "hodl" && (
                    <span className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping"></span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1">Price Drop Protection</h3>
                <p className="text-slate-300 text-sm">For Bitcoin holders</p>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-4 w-4 text-blue-600" />
                    <p className="font-medium text-sm">Protects against market drops</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Guarantee a minimum selling price for your Bitcoin while maintaining unlimited upside potential.
                  </p>
                </div>
                
                {/* Enhanced visual elements styled like landing page */}
                <div className="bg-slate-200/50 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <BadgeCheck className="h-4 w-4 text-slate-700" />
                    <p className="text-sm font-medium text-slate-900">Ideal for HODLers</p>
                  </div>
                  <p className="text-xs text-slate-700">
                    Bitcoin owners wanting to protect against market downturns while maintaining ownership
                  </p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="ghost" 
                    size="sm" 
                    className="text-xs flex items-center gap-1 text-slate-600 p-0 rounded-full"
                    onClick={(e) => toggleCardExpand("hodl", e)}
                  >
                    {expandedCard === "hodl" ? "Show less" : "Learn more"}
                    {expandedCard === "hodl" ? 
                      <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : 
                      <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                    }
                  </Button>
                  
                  {protectionType === "hodl" ? (
                    <Badge className="bg-slate-900 text-white px-2 py-1 text-xs shadow-sm rounded-full">
                      <Check className="h-3 w-3 mr-1" /> Selected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                      Select <ArrowRight className="h-3 w-3 ml-1" />
                    </Badge>
                  )}
                </div>
                
                {/* Expandable details with smooth animation */}
                {expandedCard === "hodl" && (
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
                        <div className="bg-slate-200 rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3 text-slate-700" />
                        </div>
                        <span>One-time premium payment for unlimited protection</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="bg-slate-200 rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3 text-slate-700" />
                        </div>
                        <span>Protection activates when price drops below your threshold</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="bg-slate-200 rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3 text-slate-700" />
                        </div>
                        <span>Keep full ownership of your Bitcoin at all times</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Purchase Protection Card - Styled like Smart Contracts but with correct title, non-selectable */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card 
            className="overflow-hidden transition-all group border p-0 shadow-sm hover:shadow-md relative opacity-90 hover:opacity-100"
          >
            {/* Coming Soon Badge - changed to white */}
            <div className="absolute top-0 right-0 z-10 w-32 h-32">
              <div className="absolute transform rotate-45 bg-white text-slate-700 text-xs font-bold py-1 right-[-30px] top-[32px] w-[140px] text-center shadow-sm">
                Coming Soon
              </div>
            </div>
            
            <div className="h-full w-full overflow-hidden relative rounded-lg bg-gradient-to-br from-slate-50 to-gray-50">
              {/* Card header with correct title */}
              <div className="bg-slate-700 text-white p-6 flex flex-col items-center justify-center">
                <div className="bg-gray-100 rounded-full p-3 mb-4">
                  <Lock className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold mb-1">Purchase Price Lock</h3>
                <p className="text-slate-300 text-sm">For future buyers</p>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-4 w-4 text-slate-600 rotate-180" />
                    <p className="font-medium text-sm">Protects against price increases</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Secure the right to buy Bitcoin at today&apos;s price regardless of how high the market rises in future.
                  </p>
                </div>
                
                {/* Enhanced visual elements styled like landing page */}
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <BadgeCheck className="h-4 w-4 text-slate-700" />
                    <p className="text-sm font-medium text-slate-900">Ideal for Future Buyers</p>
                  </div>
                  <p className="text-xs text-slate-700">
                    Future Bitcoin buyers who want to ensure they don&apos;t miss out on potential price increases
                  </p>
                </div>
                
                <div className="flex justify-start items-center mt-4">
                  <Button
                    variant="ghost" 
                    size="sm" 
                    className="text-xs flex items-center gap-1 text-slate-600 p-0 rounded-full"
                    onClick={(e) => toggleCardExpand("purchase", e)}
                  >
                    {expandedCard === "purchase" ? "Show less" : "Learn more"}
                    {expandedCard === "purchase" ? 
                      <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : 
                      <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                    }
                  </Button>
                </div>
                
                {/* Expandable details with smooth animation */}
                {expandedCard === "purchase" && (
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
                        <div className="bg-slate-200 rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3 text-slate-700" />
                        </div>
                        <span>One-time lock-in fee guarantees your purchase price</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="bg-slate-200 rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3 text-slate-700" />
                        </div>
                        <span>Lock becomes valuable when price rises above your threshold</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="bg-slate-200 rounded-full p-1 mt-0.5">
                          <Check className="h-3 w-3 text-slate-700" />
                        </div>
                        <span>No obligation to purchase if price goes down</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Enhanced education section with consistent styling */}
      <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg border border-slate-300 shadow-sm">
        <button 
          className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
          onClick={() => setIsEducationExpanded(!isEducationExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-2 rounded-full">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">How Bitcoin Protection Works</h3>
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
              Bitcoin protection policies give you financial security against adverse price movements while maintaining your Bitcoin&apos;s potential upside.
            </p>
            <ul className="text-sm text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <Check className="h-3 w-3 text-slate-600" />
                </div>
                <span>Pay a one-time premium for guaranteed value protection</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <Check className="h-3 w-3 text-slate-600" />
                </div>
                <span>Choose your protected value and protection period</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <Check className="h-3 w-3 text-slate-600" />
                </div>
                <span>Activate your protection only when market conditions are unfavorable</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <Check className="h-3 w-3 text-slate-600" />
                </div>
                <span>Keep control of your Bitcoin with non-custodial protection</span>
              </li>
            </ul>
            
            {/* Added trust indicator */}
            <div className="mt-4 flex items-center p-2 bg-white rounded-lg border border-slate-300">
              <Badge variant="outline" className="mr-2 border-slate-300 bg-slate-100 rounded-full">
                <BadgeCheck className="h-3 w-3 mr-1 text-slate-600" />
                <span className="text-slate-700">Verified</span>
              </Badge>
              <p className="text-xs text-slate-700">
                Your protection is backed by smart contracts on the Stacks blockchain
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 