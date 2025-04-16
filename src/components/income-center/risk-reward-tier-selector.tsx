import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Check, TrendingDown, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export type RiskRewardTier = "conservative" | "balanced" | "aggressive";

interface RiskRewardTierSelectorProps {
  tier: RiskRewardTier;
  setTier: (tier: RiskRewardTier) => void;
  btcPrice: number;
}

export function RiskRewardTierSelector({
  tier,
  setTier,
  btcPrice
}: RiskRewardTierSelectorProps) {
  // Define tier characteristics
  const tiers = {
    conservative: {
      title: "Conservative Yield",
      description: "Focus on steady income with lower chance of Bitcoin acquisition",
      estimatedApy: "3-5%",
      acquisitionLikelihood: 1,
      strikeDistancePercent: 20, // 20% below current price
      riskLevel: "Low",
      badgeColor: "bg-green-100 text-green-700 border-green-200",
      headerColor: "bg-amber-700"
    },
    balanced: {
      title: "Balanced Yield",
      description: "Middle ground between premium income and acquisition probability",
      estimatedApy: "6-9%",
      acquisitionLikelihood: 2,
      strikeDistancePercent: 10, // 10% below current price 
      riskLevel: "Moderate",
      badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
      headerColor: "bg-amber-800"
    },
    aggressive: {
      title: "Aggressive Yield",
      description: "Maximize potential returns with higher chance of Bitcoin acquisition",
      estimatedApy: "8-15%",
      acquisitionLikelihood: 4,
      strikeDistancePercent: 5, // 5% below current price
      riskLevel: "High",
      badgeColor: "bg-red-100 text-red-700 border-red-200",
      headerColor: "bg-amber-900"
    }
  };

  // Calculate approximate strike prices based on the tier
  const strikePrice = (tierKey: RiskRewardTier) => {
    const distance = tiers[tierKey].strikeDistancePercent;
    return Math.round(btcPrice * (1 - distance / 100));
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold">Select Risk-Reward Tier</h2>
        <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-700 rounded-full">
          Step 2 of 6
        </Badge>
      </div>

      <p className="text-muted-foreground mb-6">
        Choose your preferred balance between yield and risk to optimize your income strategy.
      </p>

      {!tier && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 flex items-center gap-2 shadow-sm">
          <Shield className="h-4 w-4 flex-shrink-0 text-amber-600" />
          <p>Please select a risk-reward tier to continue to the next step.</p>
        </div>
      )}

      <RadioGroup 
        value={tier} 
        onValueChange={(value: string) => setTier(value as RiskRewardTier)}
        className="space-y-6"
      >
        {(Object.keys(tiers) as RiskRewardTier[]).map((tierKey) => {
          const tierData = tiers[tierKey];
          
          return (
            <motion.div 
              key={tierKey} 
              className="relative"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <RadioGroupItem
                value={tierKey}
                id={tierKey}
                className="peer sr-only"
              />
              <Label
                htmlFor={tierKey}
                className={cn(
                  "block overflow-hidden border rounded-lg p-0 cursor-pointer transition-all shadow-sm hover:shadow-md",
                  "peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-amber-500",
                )}
              >
                {/* Ribbon for selected state */}
                {tier === tierKey && (
                  <div className="absolute top-0 right-0 z-10 w-24 h-24 overflow-hidden">
                    <div className="absolute transform rotate-45 bg-amber-500 text-white text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center shadow-sm">
                      Selected
                    </div>
                  </div>
                )}
                
                {/* Card header */}
                <div className={`${tierData.headerColor} text-white p-4 flex justify-between items-center`}>
                  <div>
                    <h3 className="font-semibold">{tierData.title}</h3>
                    <p className="text-xs text-amber-100">{tierData.description}</p>
                  </div>
                  <Badge variant="outline" className={`${tierData.badgeColor} font-medium`}>
                    {tierData.riskLevel} Risk
                  </Badge>
                </div>
                
                {/* Card content */}
                <div className="p-5 bg-gradient-to-br from-amber-50 to-white">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Estimated APY:</span>
                        <span className="font-semibold text-amber-600">{tierData.estimatedApy}</span>
                      </div>
                      <Progress value={
                        tierKey === "conservative" ? 30 : 
                        tierKey === "balanced" ? 60 : 
                        90
                      } className="h-2 bg-amber-100" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Acquisition Likelihood:</span>
                        <span className="font-semibold text-amber-600">
                          {tierKey === "conservative" ? "Low" : 
                          tierKey === "balanced" ? "Moderate" : 
                          "High"}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((dot) => (
                          <div
                            key={dot}
                            className={`h-3 w-3 rounded-full ${
                              dot <= tierData.acquisitionLikelihood
                                ? "bg-amber-500"
                                : "bg-amber-100"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-100">
                      <div className="flex gap-2 items-center">
                        <TrendingDown className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium">Acquisition Price:</span>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-700">${strikePrice(tierKey).toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground text-right">
                          ({tiers[tierKey].strikeDistancePercent}% below current price)
                        </div>
                      </div>
                    </div>
                    
                    {/* Selected marker at bottom */}
                    {tier === tierKey && (
                      <div className="flex items-center justify-center mt-2 gap-1 text-amber-600">
                        <Check className="h-4 w-4" />
                        <span className="text-sm font-medium">Selected</span>
                      </div>
                    )}
                  </div>
                </div>
              </Label>
            </motion.div>
          );
        })}
      </RadioGroup>

      <Card className="bg-amber-50/50 mt-8 border-amber-100">
        <CardContent className="pt-6">
          <div className="text-sm text-amber-800">
            <span className="font-medium">How this works: </span>
            You&apos;ll earn income upfront for offering to buy Bitcoin at a lower price. With more conservative tiers, you&apos;ll 
            earn less income but are less likely to acquire Bitcoin. With more aggressive tiers, you&apos;ll earn more 
            income but increase your chance of acquiring Bitcoin if prices fall.
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 