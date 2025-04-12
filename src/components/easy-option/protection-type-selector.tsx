import React, { useState } from "react";
import { Shield, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What are you looking to protect against?</h2>
      
      {!protectionType && (
        <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-md text-xs text-yellow-700 flex items-center gap-2">
          <Shield className="h-3 w-3 flex-shrink-0" />
          <p>Please select a protection goal to continue to the next step.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {/* HODL Protection Card - With expandable section */}
        <Card 
          className={cn(
            "overflow-hidden transition-all cursor-pointer group border-2 p-0",
            protectionType === "hodl" 
              ? "ring-1 ring-blue-500 shadow-md border-blue-500/20"
              : "hover:border-blue-300 border-transparent shadow-sm hover:shadow"
          )}
          onClick={() => setProtectionType("hodl")}
        >
          <div className={cn(
            "h-full w-full overflow-hidden relative",
            protectionType === "hodl" ? "bg-gradient-to-br from-blue-50 to-white" : ""
          )}>
            <div className="px-4 py-3">
              {/* Compact header with all essential info */}
              <div className="flex items-start gap-2.5 pt-0.5">
                <div className={cn(
                  "p-1.5 rounded-full transition-all flex-shrink-0",
                  protectionType === "hodl" 
                    ? "bg-blue-100 text-blue-600" 
                    : "bg-blue-50 text-blue-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                )}>
                  <Shield className="w-4 h-4" />
                </div>
              
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold truncate pr-2">Protect against price drops</h3>
                  </div>
              
                  <p className="text-xs text-gray-600 mt-1.5 mb-1">
                    Guarantee a minimum selling price for your Bitcoin while maintaining unlimited upside potential.
                  </p>
                  
                  {/* Info button for mobile - expands card */}
                  <button 
                    onClick={(e) => toggleCardExpand("hodl", e)}
                    className="mt-2 text-xs flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {expandedCard === "hodl" ? "Show less" : "Learn more"}
                    {expandedCard === "hodl" ? 
                      <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : 
                      <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                    }
                  </button>
                </div>
              </div>
              
              {/* Selected badge - positioned at bottom right */}
              {protectionType === "hodl" && (
                <Badge className="bg-blue-600 text-white px-1.5 py-0.5 text-xs font-medium flex items-center gap-1 absolute bottom-2 right-2">
                  <Check className="h-2.5 w-2.5" /> Selected
                </Badge>
              )}
              
              {/* Expandable details */}
              {expandedCard === "hodl" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 pt-2 border-t border-gray-100 px-3 pb-3"
                >
                  <div className="bg-blue-50 p-2.5 rounded-md border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-xs text-blue-900">Ideal for:</span>
                    </div>
                    <p className="text-xs text-blue-800">
                      Bitcoin HODLers wanting protection against market downturns while maintaining ownership
                    </p>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-600">
                    <ul className="space-y-1 pl-5 list-disc">
                      <li>One-time premium payment</li>
                      <li>Protection activates when price drops below your threshold</li>
                      <li>Maintain full ownership of your Bitcoin</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </Card>
        
        {/* Purchase Protection Card - With expandable section */}
        <Card 
          className={cn(
            "overflow-hidden transition-all cursor-pointer group border-2 p-0",
            protectionType === "purchase" 
              ? "ring-1 ring-green-500 shadow-md border-green-500/20"
              : "hover:border-green-300 border-transparent shadow-sm hover:shadow"
          )}
          onClick={() => setProtectionType("purchase")}
        >
          <div className={cn(
            "h-full w-full overflow-hidden relative",
            protectionType === "purchase" ? "bg-gradient-to-br from-green-50 to-white" : ""
          )}>
            <div className="px-4 py-3">
              {/* Compact header with all essential info */}
              <div className="flex items-start gap-2.5 pt-0.5">
                <div className={cn(
                  "p-1.5 rounded-full transition-all flex-shrink-0",
                  protectionType === "purchase" 
                    ? "bg-green-100 text-green-600" 
                    : "bg-green-50 text-green-500 group-hover:bg-green-100 group-hover:text-green-600"
                )}>
                  <Shield className="w-4 h-4" />
                </div>
              
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold truncate pr-2">Lock in purchase price now</h3>
                  </div>
              
                  <p className="text-xs text-gray-600 mt-1.5 mb-1">
                    Secure the right to buy Bitcoin at today&apos;s price regardless of how high the market rises in future.
                  </p>
                  
                  {/* Info button for mobile - expands card */}
                  <button 
                    onClick={(e) => toggleCardExpand("purchase", e)}
                    className="mt-2 text-xs flex items-center text-green-600 hover:text-green-800 font-medium"
                  >
                    {expandedCard === "purchase" ? "Show less" : "Learn more"}
                    {expandedCard === "purchase" ? 
                      <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : 
                      <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                    }
                  </button>
                </div>
              </div>
              
              {/* Selected badge - positioned at bottom right */}
              {protectionType === "purchase" && (
                <Badge className="bg-green-600 text-white px-1.5 py-0.5 text-xs font-medium flex items-center gap-1 absolute bottom-2 right-2">
                  <Check className="h-2.5 w-2.5" /> Selected
                </Badge>
              )}
              
              {/* Expandable details */}
              {expandedCard === "purchase" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 pt-2 border-t border-gray-100 px-3 pb-3"
                >
                  <div className="bg-green-50 p-2.5 rounded-md border border-green-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-xs text-green-900">Ideal for:</span>
                    </div>
                    <p className="text-xs text-green-800">
                      Future Bitcoin buyers who want to ensure they don&apos;t miss out on potential price increases
                    </p>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-600">
                    <ul className="space-y-1 pl-5 list-disc">
                      <li>One-time lock-in fee</li>
                      <li>Protection valuable when price rises above your threshold</li>
                      <li>No obligation to purchase if price goes down</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </Card>
      </div>
      
      {/* Collapsible education section */}
      <div className="bg-muted/40 rounded-lg border border-muted mb-2">
        <button 
          className="w-full p-3 flex items-center justify-between text-left focus:outline-none"
          onClick={() => setIsEducationExpanded(!isEducationExpanded)}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium">How Bitcoin Protection Works</h3>
          </div>
          {isEducationExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        
        {isEducationExpanded && (
          <div className="p-3 pt-0 border-t border-muted">
            <p className="text-xs text-muted-foreground mb-2">
          Bitcoin protection policies give you financial security against adverse price movements while maintaining your Bitcoin&apos;s potential upside.
        </p>
            <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1.5">
          <li>Pay a one-time premium for guaranteed value protection</li>
          <li>Choose your protected value and protection period</li>
          <li>Activate your protection only when market conditions are unfavorable</li>
          <li>Keep control of your Bitcoin with non-custodial protection</li>
        </ul>
          </div>
        )}
      </div>
    </div>
  );
} 