import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check, DollarSign, Clock } from "lucide-react";

interface StrategyReviewProps {
  strategy: {
    premium: number;
    fees: number;
    total: number;
    strategylLevel: string;
  };
  incomeStrategy: "stability" | "upside";
  optionType: "put" | "call"; 
  strikePrice: string;
  amount: string;
  period: string;
  riskTier: "conservative" | "balanced" | "aggressive";
  toggleSimulation: () => void;
}

export function StrategyReview({
  strategy,
  incomeStrategy,
  strikePrice,
  amount,
  period,
  riskTier,
  toggleSimulation
}: StrategyReviewProps) {
  // State for terms agreement
  const [termsAgreed, setTermsAgreed] = React.useState(false);
  
  // Format strike price for display
  const formattedStrikePrice = parseFloat(strikePrice).toLocaleString();
  
  // Format date for expiry
  const expiryDate = new Date(Date.now() + parseInt(period) * 24 * 60 * 60 * 1000).toLocaleDateString();
  
  // Strategy and tier descriptions
  const strategyDescriptions = {
    stability: {
      name: "Bitcoin Stability Income",
      description: "Generate income when Bitcoin remains stable or increases in value",
      type: "PUT",
      outcome: "If Bitcoin price remains above your strike price, you keep the full premium. If Bitcoin price falls below your strike price, you&apos;ll acquire Bitcoin at your predetermined price."
    },
    upside: {
      name: "Bitcoin Upside Income",
      description: "Generate income by lending out potential Bitcoin price upside",
      type: "CALL",
      outcome: "If Bitcoin price remains below your strike price, you keep the full premium. If Bitcoin price rises above your strike price, you&apos;ll sell Bitcoin at your predetermined price."
    }
  };
  
  const tierDescriptions = {
    conservative: {
      name: "Conservative Yield",
      description: "Lower risk with modest income and low acquisition likelihood",
      apy: "3-5%"
    },
    balanced: {
      name: "Balanced Yield",
      description: "Balance between premium income and acquisition probability",
      apy: "6-9%"
    },
    aggressive: {
      name: "Aggressive Yield",
      description: "Higher potential returns with increased acquisition likelihood",
      apy: "8-15%"
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Strategy Review</h2>
        <p className="text-muted-foreground mb-4">
          Review your income strategy details before activation.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>{strategyDescriptions[incomeStrategy].name}</CardTitle>
          <CardDescription>
            {strategyDescriptions[incomeStrategy].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-3">Strategy Parameters</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Strategy Type:</span> 
                    <span className="font-medium">
                      {strategyDescriptions[incomeStrategy].type} Seller
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Risk-Reward Tier:</span> 
                    <span className="font-medium">
                      {tierDescriptions[riskTier].name}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Strike Price:</span> 
                    <span className="font-medium">${formattedStrikePrice}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Capital Committed:</span> 
                    <span className="font-medium">{parseFloat(amount).toFixed(2)} STX</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Income Period:</span> 
                    <span className="font-medium">{period} days</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Expiry Date:</span> 
                    <span className="font-medium">{expiryDate}</span>
                  </li>
                </ul>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Expected Returns</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Upfront Premium:</span> 
                    <span className="font-medium">${strategy.premium.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Platform Fee:</span> 
                    <span className="font-medium">${strategy.fees.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between font-medium">
                    <span>Net Premium:</span> 
                    <span className="text-primary">${strategy.total.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Estimated APY:</span> 
                    <span className="font-medium">{tierDescriptions[riskTier].apy}</span>
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={toggleSimulation}
                className="text-sm text-primary flex items-center mt-2"
              >
                View strategy simulation <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-3">How This Strategy Works</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="mr-3 mt-0.5">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Earn Immediate Income: </span>
                        You&apos;ll receive {strategy.total.toFixed(2)} USD upfront as premium 
                        for providing this protection.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-3 mt-0.5">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Capital Commitment: </span>
                        Your capital will be locked for {period} days to back this income strategy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-3 mt-0.5">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Strategy Outcome: </span>
                        {strategyDescriptions[incomeStrategy].outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Risk Assessment</h3>
                <div className="space-y-3 text-sm">
                  <p>
                    This {tierDescriptions[riskTier].name.toLowerCase()} tier strategy has {
                      riskTier === "conservative" ? "lower" : 
                      riskTier === "balanced" ? "moderate" : 
                      "higher"
                    } risk with {
                      riskTier === "conservative" ? "less chance" : 
                      riskTier === "balanced" ? "some chance" : 
                      "higher chance"
                    } of Bitcoin acquisition.
                  </p>
                  <p>
                    Your maximum profit is capped at the net premium of ${strategy.total.toFixed(2)}.
                  </p>
                  <p>
                    {incomeStrategy === "stability" ? (
                      "If Bitcoin price falls significantly below your strike price, you&apos;ll acquire Bitcoin at your strike price, which could be above market value."
                    ) : (
                      "If Bitcoin price rises significantly above your strike price, you&apos;ll sell Bitcoin at your strike price, missing out on additional upside."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="terms" 
            checked={termsAgreed} 
            onCheckedChange={(checked) => setTermsAgreed(checked === true)}
          />
          <Label htmlFor="terms" className="text-sm leading-tight">
            I understand the terms of this income strategy and that my capital will be locked for 
            {period} days. I acknowledge the risks involved and that past performance is not 
            indicative of future results.
          </Label>
        </div>
      </div>
    </div>
  );
} 