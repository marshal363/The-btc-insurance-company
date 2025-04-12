import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, Check, AlertTriangle, Calculator } from "lucide-react";
import { useMarketStore } from "@/store/market-store";
import { ProtectionType } from "./protection-type-selector";

interface ReviewAndActivateProps {
  optionType: "call" | "put";
  protectionType: ProtectionType;
  strikePrice: string;
  amount: string;
  duration: "30" | "60" | "90" | "180" | "365" | "halving" | "custom";
  policy: {
    premium: number;
    fees: number;
    total: number;
    protectionLevel: string;
  };
  onActivate: () => void;
  togglePnlPanel: () => void;
}

export function ReviewAndActivate({
  optionType,
  protectionType,
  strikePrice,
  amount,
  duration,
  policy,
  onActivate,
  togglePnlPanel
}: ReviewAndActivateProps) {
  const { btcPrice = 48500 } = useMarketStore();
  
  // Helper to format dates
  const formatDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString();
  };
  
  // Calculate expiration date
  const getExpirationDate = () => {
    if (duration === "30" || duration === "60" || duration === "90" || 
        duration === "180" || duration === "365") {
      return formatDate(parseInt(duration));
    } else if (duration === "halving") {
      return "Approx. April 2024"; // Example - would be dynamic in real app
    } else {
      return "Custom date"; // For custom duration
    }
  };
  
  const expirationDate = getExpirationDate();
  
  // Calculate protected USD value
  const protectedUsdValue = parseFloat(amount) * parseFloat(strikePrice);
  
  // Get title and key terms based on option type
  const getTitle = () => {
    if (optionType === "put") {
      return "Activate Bitcoin Price Drop Protection";
    } else {
      return "Activate Bitcoin Price Lock Guarantee";
    }
  };
  
  const getActivationDescription = () => {
    if (optionType === "put") {
      return "You're about to activate price drop protection for your Bitcoin holdings.";
    } else {
      return "You're about to activate a price lock guarantee for your future Bitcoin purchase.";
    }
  };
  
  const getProtectionDetails = () => {
    if (optionType === "put") {
      return `Your Bitcoin will be protected at $${parseInt(strikePrice).toLocaleString()} per BTC, regardless of how low the market price falls.`;
    } else {
      return `You can purchase Bitcoin at $${parseInt(strikePrice).toLocaleString()} per BTC, regardless of how high the market price rises.`;
    }
  };
  
  const getActionDescription = () => {
    if (optionType === "put") {
      return "If the price falls below your protected value, you can activate your protection to sell at the protected price.";
    } else {
      return "If the price rises above your locked price, you can use your guarantee to buy at the locked price.";
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{getTitle()}</h2>
      <p className="text-muted-foreground mb-6">
        {getActivationDescription()} Review the details and confirm to proceed.
      </p>
      
      {/* Policy Details */}
      <div className="mb-8 space-y-6">
        <div className="bg-gradient-to-r from-zinc-50 to-zinc-100 p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium">
                {protectionType === "hodl" ? "Price Drop Protection" : "Purchase Price Lock"}
              </h3>
            </div>
            <div className="text-sm font-medium text-blue-600">
              {policy.protectionLevel}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="border rounded-lg p-4">
            <h4 className="text-sm text-gray-500 mb-1">Protected Value</h4>
            <p className="text-xl font-semibold">${parseInt(strikePrice).toLocaleString()} per BTC</p>
            <p className="text-xs text-gray-500 mt-1">
              {optionType === "put" 
                ? `If Bitcoin falls below this value, your protection activates.` 
                : `If Bitcoin rises above this value, your price lock becomes valuable.`}
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="text-sm text-gray-500 mb-1">Protection Period</h4>
            <p className="text-xl font-semibold">
              {duration === "halving" ? "Until next halving" : 
               duration === "custom" ? "Custom period" : 
               `${duration} days`}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Active until {expirationDate}
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="text-sm text-gray-500 mb-1">Protected Amount</h4>
            <p className="text-xl font-semibold">{amount} BTC</p>
            <p className="text-xs text-gray-500 mt-1">
              ≈ ${protectedUsdValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="text-sm text-gray-500 mb-1">Protection Cost</h4>
            <p className="text-xl font-semibold">${policy.total.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">
              One-time premium payment
            </p>
          </div>
        </div>
        
        <div className="border p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Protection Details</span>
          </h3>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              {getProtectionDetails()}
            </p>
            <p className="text-sm text-gray-600">
              {getActionDescription()}
            </p>
            <p className="text-sm text-gray-600">
              Your protection remains active until {expirationDate}.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={togglePnlPanel}
            className="mt-2 text-blue-600"
          >
            <Calculator className="mr-2 h-4 w-4" />
            View protection simulation
          </Button>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mb-8 p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 mb-1">Important Information</h4>
            <p className="text-xs text-yellow-700">
              By activating this protection, you agree to pay the protection premium. 
              Your maximum cost is limited to this premium amount. Protection is non-custodial 
              and does not require depositing your Bitcoin. You retain full control of your assets 
              at all times.
            </p>
          </div>
        </div>
      </div>
      
      {/* Activation Button */}
      <div className="flex justify-center">
        <Button 
          size="lg" 
          onClick={onActivate}
          className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto min-w-[200px]"
        >
          <Check className="mr-2 h-5 w-5" />
          Activate Protection
        </Button>
      </div>
    </div>
  );
} 