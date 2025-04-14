import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
      riskLevel: "Low"
    },
    balanced: {
      title: "Balanced Yield",
      description: "Middle ground between premium income and acquisition probability",
      estimatedApy: "6-9%",
      acquisitionLikelihood: 2,
      strikeDistancePercent: 10, // 10% below current price 
      riskLevel: "Moderate"
    },
    aggressive: {
      title: "Aggressive Yield",
      description: "Maximize potential returns with higher chance of Bitcoin acquisition",
      estimatedApy: "8-15%",
      acquisitionLikelihood: 4,
      strikeDistancePercent: 5, // 5% below current price
      riskLevel: "High"
    }
  };

  // Calculate approximate strike prices based on the tier
  const strikePrice = (tierKey: RiskRewardTier) => {
    const distance = tiers[tierKey].strikeDistancePercent;
    return Math.round(btcPrice * (1 - distance / 100));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Select Risk-Reward Tier</h2>
        <p className="text-muted-foreground mb-4">
          Choose your preferred balance between yield and risk to optimize your income strategy.
        </p>
      </div>

      <RadioGroup 
        value={tier} 
        onValueChange={(value: string) => setTier(value as RiskRewardTier)}
        className="space-y-4"
      >
        {(Object.keys(tiers) as RiskRewardTier[]).map((tierKey) => {
          const tierData = tiers[tierKey];
          
          return (
            <div key={tierKey} className="relative">
              <RadioGroupItem
                value={tierKey}
                id={tierKey}
                className="peer sr-only"
              />
              <Label
                htmlFor={tierKey}
                className="flex flex-col sm:flex-row border rounded-lg p-4 cursor-pointer hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="sm:flex-1">
                  <div className="flex items-center mb-2 gap-2">
                    <span className="font-semibold">{tierData.title}</span>
                    <Badge variant={
                      tierKey === "conservative" ? "outline" : 
                      tierKey === "balanced" ? "secondary" : 
                      "destructive"
                    }>
                      {tierData.riskLevel} Risk
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {tierData.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
                    <div className="sm:w-1/2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Estimated APY:</span>
                        <span className="font-medium">{tierData.estimatedApy}</span>
                      </div>
                      <Progress value={
                        tierKey === "conservative" ? 30 : 
                        tierKey === "balanced" ? 60 : 
                        90
                      } className="h-2" />
                    </div>
                    <div className="sm:w-1/2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Acquisition Likelihood:</span>
                        <span className="font-medium">
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
                                ? "bg-primary"
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 sm:text-right">
                  <div className="text-sm text-muted-foreground">
                    Acquisition Price:
                  </div>
                  <div className="font-semibold">${strikePrice(tierKey).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    ({tiers[tierKey].strikeDistancePercent}% below current price)
                  </div>
                </div>
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      <Card className="bg-muted/50 mt-6">
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground">
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