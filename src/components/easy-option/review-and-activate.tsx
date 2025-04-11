import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, BarChart2, Info, Clock, Zap } from "lucide-react";
import type { ProtectionType } from "./protection-type-selector";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  
  // Get duration value in days for display
  const getDurationDays = (duration: string): number => {
    if (duration === "halving") return 200; // Approximation
    if (duration === "custom") return 120; // Default value
    if (duration === "180") return 180;
    if (duration === "365") return 365;
    return parseInt(duration);
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
      ? `${Math.abs(protectionLevel)}% downside protection`
      : `Lock in price ${Math.abs(protectionLevel)}% ${protectionLevel >= 0 ? 'above' : 'below'} current`;
  
  // Calculate moneyness for display
  const getMoneyness = (): "ITM" | "ATM" | "OTM" => {
    const isPut = optionType === "put";
    
    if (strikePriceNumber === btcPrice) {
      return "ATM";
    } else if ((isPut && strikePriceNumber > btcPrice) || (!isPut && strikePriceNumber < btcPrice)) {
      return "ITM";
    } else {
      return "OTM";
    }
  };
  
  const moneyness = getMoneyness();
  
  // Get moneyness badge color
  const getMoneynessColor = (moneyness: "ITM" | "ATM" | "OTM"): string => {
    switch (moneyness) {
      case "ITM": return "bg-blue-100 text-blue-700 border-blue-200";
      case "ATM": return "bg-purple-100 text-purple-700 border-purple-200";
      case "OTM": return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };
  
  // Get user-friendly moneyness term
  const getMoneynessLabel = (moneyness: "ITM" | "ATM" | "OTM"): string => {
    if (optionType === "put") {
      switch (moneyness) {
        case "ITM": return "Full Value Protection";
        case "ATM": return "Threshold Coverage";
        case "OTM": return "Precautionary Coverage";
      }
    } else {
      switch (moneyness) {
        case "ITM": return "Valuable Guarantee";
        case "ATM": return "At-market Guarantee";
        case "OTM": return "Future-value Guarantee";
      }
    }
  };
  
  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Review & Activate</h2>
      <p className="text-muted-foreground mb-6">
        Review your Bitcoin protection details before activation.
      </p>
      
      <div className="mb-8 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{protectionTypeText}</h3>
              <Badge variant="outline" className={`mt-1 font-medium text-xs py-0.5 px-2 ${getMoneynessColor(moneyness)}`}>
                {getMoneynessLabel(moneyness)}
              </Badge>
            </div>
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
          <Card className="border rounded-lg p-5">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Protection Details</span>
            </h4>
            <ul className="space-y-4 mt-4">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{optionTypeText}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">{btcAmount} BTC <span className="text-muted-foreground text-sm">(${usdValue.toLocaleString()})</span></span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  {formatDuration(duration)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Current Price</span>
                <span className="font-medium">${btcPrice.toLocaleString()}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">{optionType === "put" ? "Protected Value" : "Purchase Price"}</span>
                <span className="font-medium">${strikePriceNumber.toLocaleString()}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Protection Level</span>
                <span className="font-medium">{protectionLevelText}</span>
              </li>
            </ul>
          </Card>
          
          <Card className="border rounded-lg p-5">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>Payment Details</span>
            </h4>
            <ul className="space-y-4 mt-4">
              <li className="flex justify-between">
                <span className="text-muted-foreground">{optionType === "put" ? "Insurance Premium" : "Lock-in Fee"}</span>
                <span className="font-medium">{formatCurrency(policy.premium)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Platform Fee</span>
                <span className="font-medium">{formatCurrency(policy.fees)}</span>
              </li>
              <li className="flex justify-between border-t pt-3 mt-2">
                <span className="font-medium">Total Payment</span>
                <span className="font-semibold text-lg">{formatCurrency(policy.total)}</span>
              </li>
            </ul>
            
            <div className="mt-5 p-4 bg-muted/20 rounded-lg">
              <h5 className="text-xs font-medium mb-2 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-muted-foreground" />
                Premium Factors
              </h5>
              <ul className="text-xs space-y-2 text-muted-foreground">
                <li className="flex justify-between">
                  <span>Bitcoin Amount:</span>
                  <span className="font-medium">{btcAmount} BTC</span>
                </li>
                <li className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{getDurationDays(duration)} days</span>
                </li>
                <li className="flex justify-between">
                  <span>Position Type:</span>
                  <span className="font-medium">{moneyness}</span>
                </li>
                <li className="flex justify-between">
                  <span>BTC Volatility:</span>
                  <span className="font-medium">65%</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
        
        <Card className="p-5 border rounded-lg bg-muted/10">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5 text-green-500" />
            <span>Activation Confirmation</span>
          </h4>
          <div className="space-y-3 text-sm text-muted-foreground pl-7">
            <p>
              Your Bitcoin protection will be activated immediately upon payment. The protection will remain active for {formatDuration(duration)}.
            </p>
            <p>
              If market conditions become unfavorable (
              {optionType === "put" ? "price falls below" : "price rises above"} ${strikePriceNumber.toLocaleString()}),
              you can exercise your protection through your protection center.
            </p>
            <p>
              The premium has been calculated based on current market conditions, including Bitcoin price volatility, position type, and protection duration.
            </p>
          </div>
        </Card>
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