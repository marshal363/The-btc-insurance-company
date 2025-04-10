import React from "react";
import { Shield, TrendingUp, TrendingDown, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type ProtectionType = "hodl" | "purchase";

interface ProtectionTypeSelectorProps {
  protectionType: ProtectionType;
  setProtectionType: (type: ProtectionType) => void;
}

export function ProtectionTypeSelector({ 
  protectionType, 
  setProtectionType 
}: ProtectionTypeSelectorProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">What are you looking to protect?</h2>
      <p className="text-muted-foreground mb-4">
        Select the type of protection that best fits your Bitcoin investment needs.
      </p>
      
      {!protectionType && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700 flex items-center gap-2">
          <Shield className="h-4 w-4 flex-shrink-0" />
          <p>Please select a protection type to continue to the next step.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {/* HODL Protection Card */}
        <Card 
          className={`overflow-hidden transition-all hover:shadow-md ${
            protectionType === "hodl" ? "ring-1 ring-black shadow-sm" : "border"
          }`}
          onClick={() => setProtectionType("hodl")}
        >
          <div className="relative p-6">
            {protectionType === "hodl" && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-black text-white px-2 py-1 text-xs font-medium flex items-center gap-1">
                  <Check className="h-3 w-3" /> Selected
                </Badge>
              </div>
            )}
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Protect my Bitcoin holdings</h3>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <p className="text-sm font-medium">
                Get protection against price drops
              </p>
            </div>
            
            <p className="text-sm text-gray-600 mb-5">
              Secure your Bitcoin value with a price floor that guarantees you can sell at a predetermined price even if the market falls.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm mt-6">
              <div>
                <span className="block text-gray-500 mb-1">Maximum loss exposure</span>
                <span className="font-medium">Limited to premium</span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Ideal for</span>
                <span className="font-medium">Current BTC holders</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Purchase Protection Card */}
        <Card 
          className={`overflow-hidden transition-all hover:shadow-md ${
            protectionType === "purchase" ? "ring-1 ring-black shadow-sm" : "border"
          }`}
          onClick={() => setProtectionType("purchase")}
        >
          <div className="relative p-6">
            {protectionType === "purchase" && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-black text-white px-2 py-1 text-xs font-medium flex items-center gap-1">
                  <Check className="h-3 w-3" /> Selected
                </Badge>
              </div>
            )}
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-green-100 text-green-700">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Protect my future purchase</h3>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <p className="text-sm font-medium">
                Lock in your Bitcoin purchase price
              </p>
            </div>
            
            <p className="text-sm text-gray-600 mb-5">
              Reserve the right to buy Bitcoin at today's price even if the market rises, ensuring you don't miss out on future opportunities.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm mt-6">
              <div>
                <span className="block text-gray-500 mb-1">Maximum loss exposure</span>
                <span className="font-medium">Limited to reservation fee</span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Ideal for</span>
                <span className="font-medium">Future BTC buyers</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="bg-muted/30 p-5 rounded-lg">
        <h3 className="text-base font-medium mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <span>How Bitcoin Protection Works</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Bitcoin protection policies give you financial security against adverse price movements while maintaining potential upside.
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
          <li>Pay a small premium for guaranteed price protection</li>
          <li>Choose your protection amount and duration</li>
          <li>Exercise your protection only if market conditions are unfavorable</li>
          <li>Maintain full upside potential with limited downside risk</li>
        </ul>
      </div>
    </div>
  );
} 