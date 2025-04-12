import React from "react";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle, ArrowDown, ArrowUp, DollarSign, AlertTriangle, ChevronDown, ChevronUp, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMarketStore } from "@/store/market-store";

interface PolicyPreviewProps {
  optionType: "call" | "put";
  protectedValue: string;
  amount: string;
  duration: "30" | "60" | "90" | "180" | "365" | "halving" | "custom";
  policy: {
    premium: number;
    fees: number;
    total: number;
    protectionLevel: string;
  };
  togglePnlPanel: () => void;
}

export function PolicyPreview({
  optionType,
  protectedValue,
  amount,
  duration,
  policy,
  togglePnlPanel
}: PolicyPreviewProps) {
  const { btcPrice = 48500 } = useMarketStore();
  const [showDetails, setShowDetails] = React.useState(false);
  
  // Helper to format dates
  const formatDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Calculate protection duration in days
  const getDurationDays = () => {
    if (duration === "30" || duration === "60" || duration === "90" || 
        duration === "180" || duration === "365") {
      return parseInt(duration);
    } else if (duration === "halving") {
      return 180; // Example: 180 days until halving
    } else {
      return 120; // Default for custom
    }
  };
  
  const durationDays = getDurationDays();
  
  // Calculate activation threshold difference
  const calculateThresholdDifference = () => {
    const protectedValueNum = parseFloat(protectedValue);
    const percentDiff = ((protectedValueNum - btcPrice) / btcPrice) * 100;
    
    if (optionType === "put") {
      // For put options (price drop protection)
      if (percentDiff > 0) {
        return `${percentDiff.toFixed(1)}% higher than current price`;
      } else if (percentDiff < 0) {
        return `${Math.abs(percentDiff).toFixed(1)}% below current price`;
      } else {
        return "at current price";
      }
    } else {
      // For call options (price lock)
      if (percentDiff > 0) {
        return `${percentDiff.toFixed(1)}% above current price`;
      } else if (percentDiff < 0) {
        return `${Math.abs(percentDiff).toFixed(1)}% lower than current price`;
      } else {
        return "at current price";
      }
    }
  };
  
  // Get formatted protection scenarios
  const getProtectionScenarios = () => {
    const protectedValueNum = parseFloat(protectedValue);
    
    if (optionType === "put") {
      // Price drop protection scenarios
      return [
        {
          title: "If BTC stays above your protected value",
          description: `If Bitcoin stays above $${protectedValueNum.toLocaleString()}, your protection won't need to be activated. You keep your Bitcoin and its full value.`,
          outcome: "No activation needed",
          premium: `-$${policy.total.toFixed(2)}`
        },
        {
          title: "If BTC drops 10% below your protected value",
          description: `If Bitcoin drops to $${(protectedValueNum * 0.9).toLocaleString()}, you can activate your protection to sell at $${protectedValueNum.toLocaleString()}, saving approximately $${(protectedValueNum * 0.1 * parseFloat(amount)).toLocaleString()}.`,
          outcome: "Protection valuable",
          premium: `+$${((protectedValueNum * 0.1 * parseFloat(amount)) - policy.total).toFixed(2)}`
        },
        {
          title: "If BTC crashes 25% below your protected value",
          description: `If Bitcoin crashes to $${(protectedValueNum * 0.75).toLocaleString()}, activating your protection would save approximately $${(protectedValueNum * 0.25 * parseFloat(amount)).toLocaleString()}.`,
          outcome: "Significant savings",
          premium: `+$${((protectedValueNum * 0.25 * parseFloat(amount)) - policy.total).toFixed(2)}`
        }
      ];
    } else {
      // Price lock scenarios
      return [
        {
          title: "If BTC stays below your locked price",
          description: `If Bitcoin stays below $${protectedValueNum.toLocaleString()}, you can simply buy Bitcoin at the market price. No need to use your price lock.`,
          outcome: "No activation needed",
          premium: `-$${policy.total.toFixed(2)}`
        },
        {
          title: "If BTC rises 10% above your locked price",
          description: `If Bitcoin rises to $${(protectedValueNum * 1.1).toLocaleString()}, you can use your price lock to buy at $${protectedValueNum.toLocaleString()}, saving approximately $${(protectedValueNum * 0.1 * parseFloat(amount)).toLocaleString()}.`,
          outcome: "Price lock valuable",
          premium: `+$${((protectedValueNum * 0.1 * parseFloat(amount)) - policy.total).toFixed(2)}`
        },
        {
          title: "If BTC surges 25% above your locked price",
          description: `If Bitcoin surges to $${(protectedValueNum * 1.25).toLocaleString()}, using your price lock would save approximately $${(protectedValueNum * 0.25 * parseFloat(amount)).toLocaleString()}.`,
          outcome: "Significant savings",
          premium: `+$${((protectedValueNum * 0.25 * parseFloat(amount)) - policy.total).toFixed(2)}`
        }
      ];
    }
  };
  
  const scenarios = getProtectionScenarios();
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Your Bitcoin Protection Policy</h2>
      <p className="text-muted-foreground mb-5">
        Based on your selections, we&apos;ve prepared your Bitcoin protection policy. Review the details below.
      </p>
      
      {/* Main Policy Card */}
      <Card className="border rounded-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-zinc-50 to-zinc-100 p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">
                {optionType === "put" ? "Price Drop Protection" : "Purchase Price Lock"}
              </h3>
            </div>
            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs font-medium">
              {policy.protectionLevel.split(' ')[0]}
            </Badge>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Core Policy Details */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Protected Value</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">${parseInt(protectedValue).toLocaleString()}</p>
                <span className="text-xs text-gray-500">
                  ({calculateThresholdDifference()})
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Protection Period</p>
              <p className="text-3xl font-bold">
                {duration === "halving" ? "Until Halving" : 
                 duration === "custom" ? "Custom" : 
                 `${duration} Days`}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {duration === "halving" ? "Approx. April 2024" : 
                 `Until ${formatDate(durationDays)}`}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Protected Amount</p>
              <p className="text-2xl font-semibold">{amount} BTC</p>
              <p className="text-xs text-gray-500 mt-1">
                ≈ ${(parseFloat(amount) * btcPrice).toLocaleString()}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Protection Cost</p>
              <p className="text-2xl font-semibold">${policy.total.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">
                One-time payment
              </p>
            </div>
          </div>
          
          {/* Activation Details */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <h4 className="font-medium">Protection Activation</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {optionType === "put" 
                ? `Your protection becomes valuable when Bitcoin price falls below $${parseInt(protectedValue).toLocaleString()}.` 
                : `Your price lock becomes valuable when Bitcoin price rises above $${parseInt(protectedValue).toLocaleString()}.`}
            </p>
            <p className="text-sm text-gray-600">
              {optionType === "put"
                ? "When activated, you can sell your Bitcoin at the protected value, regardless of how low the market price falls."
                : "When activated, you can purchase Bitcoin at your locked price, regardless of how high the market price rises."
              }
            </p>
          </div>
          
          {/* Cost Details Button */}
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-between"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>Protection Cost Details</span>
            </span>
            {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {/* Expandable Cost Details */}
          {showDetails && (
            <div className="bg-muted/20 p-4 rounded-lg text-sm">
              <div className="flex justify-between mb-2">
                <span>Protection Premium</span>
                <span>${policy.premium.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Network Fee</span>
                <span>${policy.fees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total Cost</span>
                <span>${policy.total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      {/* Protection Scenarios */}
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-gray-700" />
        <span>Protection Scenarios</span>
      </h3>
      
      <div className="space-y-4 mb-6">
        {scenarios.map((scenario, index) => (
          <Card key={index} className="p-4 border">
            <div className="flex items-start gap-3">
              {index === 0 ? (
                <div className="p-2 rounded-full bg-gray-100 text-gray-700 mt-1">
                  <ArrowUp className="h-4 w-4" />
                </div>
              ) : index === 1 ? (
                <div className="p-2 rounded-full bg-blue-100 text-blue-700 mt-1">
                  <ArrowDown className="h-4 w-4" />
                </div>
              ) : (
                <div className="p-2 rounded-full bg-red-100 text-red-700 mt-1">
                  <ArrowDown className="h-4 w-4" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{scenario.title}</h4>
                  <Badge 
                    className={`${
                      scenario.outcome === "No activation needed" 
                        ? "bg-gray-100 text-gray-800" 
                        : scenario.outcome === "Protection valuable" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {scenario.outcome}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1 mb-2">
                  {scenario.description}
                </p>
                <div className="flex justify-between items-center border-t pt-2 text-sm">
                  <span>Net Result</span>
                  <span className={scenario.premium.startsWith('+') ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {scenario.premium}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Simulation Button */}
      <div className="mt-8 flex justify-center">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={togglePnlPanel}
        >
          <BarChart className="h-4 w-4" />
          <span>View Detailed Protection Simulation</span>
        </Button>
      </div>
      
      {/* Risk Warning */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-700 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-yellow-800 mb-1">Important Risk Information</h4>
          <p className="text-xs text-yellow-700">
            Bitcoin protection involves financial risk. The maximum cost is limited to your premium payment. 
            Protection is non-custodial and does not require depositing your Bitcoin. Past performance does 
            not guarantee future results. Please ensure this protection strategy aligns with your overall 
            investment goals.
          </p>
        </div>
      </div>
    </div>
  );
} 