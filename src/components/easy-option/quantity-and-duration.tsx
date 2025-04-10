import React from "react";
import { Card } from "@/components/ui/card";
import { Shield, Clock, Check } from "lucide-react";
import { useMarketStore } from "@/store/market-store";
import { Badge } from "@/components/ui/badge";

interface QuantityAndDurationProps {
  amount: string;
  setAmount: (amount: string) => void; // Kept for API compatibility
  duration: "30" | "60" | "90";
  setDuration: (duration: "30" | "60" | "90") => void;
}

export function QuantityAndDuration({
  amount,
  duration,
  setDuration
}: Omit<QuantityAndDurationProps, 'setAmount'> & { setAmount?: (amount: string) => void }) {
  const { btcPrice = 48500 } = useMarketStore();
  
  // Calculate estimated premium based on amount and duration
  const calculateEstimatedPremium = () => {
    const amountValue = parseFloat(amount) || 0;
    const durationValue = parseInt(duration);
    
    // Simple formula for demo purposes
    const baseRate = 0.05; // 5%
    const durationMultiplier = durationValue / 30;
    
    return amountValue * baseRate * durationMultiplier;
  };
  
  const estimatedPremium = calculateEstimatedPremium();
  const btcUsdValue = parseFloat(amount) * btcPrice || 0;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Policy Duration</h2>
      <p className="text-muted-foreground mb-4">
        Choose how long your Bitcoin protection policy will remain active.
      </p>
      
      {!duration && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700 flex items-center gap-2">
          <Clock className="h-4 w-4 flex-shrink-0" />
          <p>Please select a policy duration to continue to the next step.</p>
        </div>
      )}
      
      <div className="space-y-8">
        {/* Coverage Summary Card */}
        <Card className="p-6 border">
          <h3 className="text-lg font-medium mb-4">Coverage Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
            <div>
              <p className="text-sm text-gray-500 mb-1">Amount to Protect</p>
              <p className="text-2xl font-semibold">{amount} BTC</p>
              <p className="text-xs text-gray-500 mt-1">
                ≈ {(parseFloat(amount) * 100000000).toLocaleString()} sats
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">USD Value</p>
              <p className="text-2xl font-semibold">
                ${btcUsdValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
          </div>
        </Card>
        
        {/* Duration Selection Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-700" />
            <span>Protection Duration</span>
          </h3>
          <p className="text-sm text-gray-600 mb-5">
            Select how long your protection policy will remain active. Longer periods provide extended coverage at a higher premium.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { days: "30", label: "Basic Protection", color: "amber" },
              { days: "60", label: "Standard Protection", color: "blue" },
              { days: "90", label: "Extended Protection", color: "green" }
            ].map((option) => {
              const isSelected = duration === option.days;
              const colorClass = option.color === "amber" ? "bg-amber-100 text-amber-700" : 
                                option.color === "blue" ? "bg-blue-100 text-blue-700" : 
                                "bg-green-100 text-green-700";
              
              return (
                <Card 
                  key={option.days}
                  className={`overflow-hidden transition-all hover:shadow-md cursor-pointer ${
                    isSelected ? "ring-1 ring-black shadow-sm" : "border"
                  }`}
                  onClick={() => setDuration(option.days as "30" | "60" | "90")}
                >
                  <div className="relative p-6">
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-black text-white px-2 py-1 text-xs font-medium flex items-center gap-1">
                          <Check className="h-3 w-3" /> Selected
                        </Badge>
                      </div>
                    )}
                    
                    <div className="flex flex-col items-center mb-4">
                      <div className={`p-3 rounded-full ${colorClass} mb-2`}>
                        <Clock className="w-5 h-5" />
                      </div>
                      <span className="text-3xl font-bold">{option.days}</span>
                      <span className="text-sm text-gray-500">Days</span>
                    </div>
                    
                    <div className="text-center">
                      <span className={`text-sm font-medium ${colorClass.split(' ')[1]}`}>
                        {option.label}
                      </span>
                      <p className="text-xs text-gray-500 mt-2">
                        {option.days === "30" ? "Lower cost, shorter protection" : 
                         option.days === "60" ? "Balanced cost and protection" : 
                         "Premium cost, maximum protection"}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Estimated Premium Card */}
        <Card className="p-6 border">
          <h3 className="text-lg font-medium mb-4">Estimated Premium</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">For {amount || "0"} BTC, {duration} days</span>
            <span className="text-2xl font-bold">
              ${estimatedPremium.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Final premium will be calculated based on current market conditions.
          </p>
        </Card>
      </div>
      
      <div className="bg-muted/30 p-5 rounded-lg mt-8">
        <h3 className="text-base font-medium mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <span>How Duration Affects Your Protection</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Longer protection periods cost more but provide more time for market conditions to develop.
          A 90-day protection provides maximum coverage duration but at a higher premium.
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
          <li>30 days: Lower cost, shorter protection window</li>
          <li>60 days: Balanced cost and protection duration</li>
          <li>90 days: Premium cost, maximum protection time</li>
        </ul>
      </div>
    </div>
  );
} 