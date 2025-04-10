import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, BarChart2 } from "lucide-react";
import type { ProtectionType } from "./protection-type-selector";

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
  togglePnlPanel,
}: ReviewAndActivateProps) {
  const btcAmount = parseFloat(amount);
  const btcPrice = 48500; // Hardcoded current price
  const usdValue = btcAmount * btcPrice;
  const strikePriceNumber = parseFloat(strikePrice);
  
  // Format duration display string
  const formatDuration = (duration: string) => {
    if (duration === "halving") {
      return "Until next Bitcoin halving";
    } else if (duration === "custom") {
      return "Custom period"; // In a real app, would show actual days from state
    } else if (duration === "180") {
      return "6 months";
    } else if (duration === "365") {
      return "1 year";
    } else {
      return `${duration} days`;
    }
  };
  
  // Get protection direction text
  const protectionTypeText = 
    protectionType === "hodl" ? "Protect my Bitcoin holdings" : "Protect my future purchase";
  
  // Get option type text
  const optionTypeText = 
    optionType === "put" ? "Downside Protection (Put)" : "Upside Protection (Call)";
  
  // Get protection level
  const protectionLevel = 
    optionType === "put" 
      ? 100 - Math.round((strikePriceNumber / btcPrice) * 100)
      : Math.round((strikePriceNumber / btcPrice) * 100) - 100;
  
  const protectionLevelText = 
    optionType === "put"
      ? `${protectionLevel}% downside protection`
      : `Lock in price ${protectionLevel}% above current`;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Review & Activate</h2>
      <p className="text-muted-foreground mb-6">
        Review your Bitcoin protection details before activation.
      </p>
      
      <div className="mb-8 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">{protectionTypeText}</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={togglePnlPanel}
            className="flex items-center gap-2"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Value Simulation</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Protection Details</h4>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{optionTypeText}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">{btcAmount} BTC (${usdValue.toLocaleString()})</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{formatDuration(duration)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Current Price</span>
                <span className="font-medium">${btcPrice.toLocaleString()}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Strike Price</span>
                <span className="font-medium">${strikePriceNumber.toLocaleString()}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Protection Level</span>
                <span className="font-medium">{protectionLevelText}</span>
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Payment Details</h4>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Premium</span>
                <span className="font-medium">${policy.premium.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Platform Fee</span>
                <span className="font-medium">${policy.fees.toFixed(2)}</span>
              </li>
              <li className="flex justify-between border-t pt-2">
                <span className="font-medium">Total Payment</span>
                <span className="font-semibold">${policy.total.toFixed(2)}</span>
              </li>
            </ul>
            
            <div className="mt-4 p-3 bg-primary/5 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Payment will be processed through our secure payment gateway. You&apos;ll receive a confirmation email once your protection is active.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 pt-4">
          <h4 className="font-medium">Activation Confirmation</h4>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p>
              Your Bitcoin protection will be activated immediately upon payment. The protection will remain active for {formatDuration(duration)}.
            </p>
          </div>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p>
              If market conditions become unfavorable (
              {optionType === "put" ? "price falls below" : "price rises above"} ${strikePriceNumber.toLocaleString()}),
              you can exercise your protection through your dashboard.
            </p>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full py-6 text-lg"
        onClick={onActivate}
      >
        Activate Protection
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      
      <p className="text-xs text-center text-muted-foreground mt-3">
        By activating, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
} 