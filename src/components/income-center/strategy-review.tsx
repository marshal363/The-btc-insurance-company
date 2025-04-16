import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check, DollarSign, Clock, Shield, BadgeCheck, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold">Strategy Review</h2>
        <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-700 rounded-full">
          Step 6 of 6
        </Badge>
      </div>

      <p className="text-muted-foreground mb-6">
        Review your income strategy details before activation.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="mb-6 bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6 border-b border-amber-100 pb-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-amber-600" />
                <h3 className="text-xl font-semibold text-amber-900">{strategyDescriptions[incomeStrategy].name}</h3>
              </div>
              <Badge className="bg-amber-600 text-white hover:bg-amber-700 px-2 py-1">
                {strategyDescriptions[incomeStrategy].type} Seller
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-amber-900 border-b border-amber-100 pb-2">Strategy Parameters</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Risk-Reward Tier:</span> 
                      <span className="font-medium">
                        {tierDescriptions[riskTier].name}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Strike Price:</span> 
                      <span className="font-medium">${formattedStrikePrice}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Capital Committed:</span> 
                      <span className="font-medium">{parseFloat(amount).toFixed(2)} STX</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Income Period:</span> 
                      <span className="font-medium">{period} days</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Expiry Date:</span> 
                      <span className="font-medium">{expiryDate}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-amber-100">
                  <h3 className="text-lg font-medium mb-4 text-amber-900 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-amber-600" />
                    Expected Returns
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Upfront Premium:</span> 
                      <span className="font-medium">${strategy.premium.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Platform Fee:</span> 
                      <span className="font-medium">${strategy.fees.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between font-medium border-t border-amber-100 pt-3 mt-3">
                      <span>Net Premium:</span> 
                      <span className="text-amber-600 font-semibold">${strategy.total.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Estimated APY:</span> 
                      <span className="font-medium text-amber-600">{tierDescriptions[riskTier].apy}</span>
                    </li>
                  </ul>
                </div>
                
                <button 
                  onClick={toggleSimulation}
                  className="text-sm text-amber-600 flex items-center mt-2 hover:text-amber-700 transition-colors"
                >
                  View strategy simulation <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-amber-900 border-b border-amber-100 pb-2 flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-amber-600" />
                    How This Strategy Works
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-amber-100 flex gap-3">
                      <div className="mt-0.5">
                        <DollarSign className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Earn Immediate Income: </span>
                          You&apos;ll receive ${strategy.total.toFixed(2)} USD upfront as premium 
                          for providing this protection.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-amber-100 flex gap-3">
                      <div className="mt-0.5">
                        <Clock className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Capital Commitment: </span>
                          Your capital will be locked for {period} days to back this income strategy.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-amber-100 flex gap-3">
                      <div className="mt-0.5">
                        <CalendarClock className="h-5 w-5 text-amber-600" />
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
                
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <h3 className="text-lg font-medium mb-3 text-amber-900">Risk Assessment</h3>
                  <div className="space-y-3 text-sm text-amber-800">
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
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-5 bg-white rounded-xl border border-amber-100 mb-6"
      >
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="terms" 
            checked={termsAgreed} 
            onCheckedChange={(checked) => setTermsAgreed(checked === true)}
            className="mt-1 h-5 w-5 border-amber-300 text-amber-600 focus:ring-amber-500"
          />
          <Label htmlFor="terms" className="text-sm leading-tight text-gray-700">
            I understand the terms of this income strategy and that my capital will be locked for {period} days. 
            I acknowledge the risks involved and that past performance is not indicative of future results.
          </Label>
        </div>
        
        <div className={cn(
          "mt-4 pt-4 border-t border-amber-100 text-sm text-amber-600",
          termsAgreed ? "opacity-0" : "opacity-100"
        )}>
          <div className="flex items-center gap-1">
            <Check className="h-4 w-4" />
            <span>Please check the box above to enable strategy activation</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 