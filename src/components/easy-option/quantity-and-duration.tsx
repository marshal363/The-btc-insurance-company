import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Shield, Clock, Check, Calendar, BarChart4, SlidersHorizontal } from "lucide-react";
import { useMarketStore } from "@/store/market-store";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Update the type to include all possible durations
type DurationType = "30" | "60" | "90" | "180" | "365" | "halving" | "custom";

interface QuantityAndDurationProps {
  amount: string;
  setAmount: (amount: string) => void; // Kept for API compatibility
  duration: DurationType;
  setDuration: (duration: DurationType) => void;
}

export function QuantityAndDuration({
  amount,
  duration,
  setDuration
}: Omit<QuantityAndDurationProps, 'setAmount'> & { setAmount?: (amount: string) => void }) {
  const { btcPrice = 48500 } = useMarketStore();
  const [customDays, setCustomDays] = useState<number>(120);
  
  // Calculate estimated premium based on amount and duration
  const calculateEstimatedPremium = () => {
    const amountValue = parseFloat(amount) || 0;
    let durationValue = 30; // default
    
    if (duration === "30") durationValue = 30;
    else if (duration === "60") durationValue = 60;
    else if (duration === "90") durationValue = 90;
    else if (duration === "180") durationValue = 180;
    else if (duration === "365") durationValue = 365;
    else if (duration === "halving") durationValue = 200; // Approximate days until next halving 
    else if (duration === "custom") durationValue = customDays;
    
    // Enhanced premium calculation with multiple factors
    
    // Volatility factor (normally this would come from market data)
    const annualVolatility = 0.65; // 65% annual volatility for Bitcoin
    const volatilityFactor = Math.sqrt(durationValue / 365) * annualVolatility;
    
    // For the Duration component, we assume ATM (at-the-money) option
    // so the strike price delta is 0, and moneyness factor is 1
    const moneynessFactor = 1;
    
    // Duration scaling (longer durations have slightly discounted rates per day)
    const durationScaling = (durationValue / 30) * (1 - (Math.log(durationValue) / 100));
    
    // Base rate (percentage of protected amount)
    const baseRate = 0.05; // 5%
    
    // Calculate premium
    return amountValue * baseRate * durationScaling * volatilityFactor * moneynessFactor;
  };
  
  const estimatedPremium = calculateEstimatedPremium();
  const btcUsdValue = parseFloat(amount) * btcPrice || 0;
  
  // Calculate days until next halving (example - in real app would be dynamic)
  const daysUntilHalving = 200; // Example value
  
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
        
        {/* Duration Selection with Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-700" />
            <span>Protection Duration</span>
          </h3>
          <p className="text-sm text-gray-600 mb-5">
            Select how long your protection policy will remain active. Longer periods provide extended coverage at a higher premium.
          </p>
          
          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="mb-4 grid grid-cols-4 max-w-xl">
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="extended">Extended</TabsTrigger>
              <TabsTrigger value="strategic">Strategic</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            
            <TabsContent value="standard" className="mt-0">
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
                      onClick={() => setDuration(option.days as DurationType)}
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
            </TabsContent>
            
            <TabsContent value="extended" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { days: "180", label: "6-Month Protection", description: "Semi-annual coverage for medium-term holders", color: "purple" },
                  { days: "365", label: "1-Year Protection", description: "Annual coverage for long-term investors", color: "indigo" }
                ].map((option) => {
                  const isSelected = duration === option.days;
                  const colorClass = option.color === "purple" ? "bg-purple-100 text-purple-700" : 
                                     "bg-indigo-100 text-indigo-700";
                  
                  return (
                    <Card 
                      key={option.days}
                      className={`overflow-hidden transition-all hover:shadow-md cursor-pointer ${
                        isSelected ? "ring-1 ring-black shadow-sm" : "border"
                      }`}
                      onClick={() => setDuration(option.days as DurationType)}
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
                            <Calendar className="w-5 h-5" />
                          </div>
                          <span className="text-3xl font-bold">{option.days === "180" ? "6" : "12"}</span>
                          <span className="text-sm text-gray-500">{option.days === "180" ? "Months" : "Months"}</span>
                        </div>
                        
                        <div className="text-center">
                          <span className={`text-sm font-medium ${colorClass.split(' ')[1]}`}>
                            {option.label}
                          </span>
                          <p className="text-xs text-gray-500 mt-2">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="strategic" className="mt-0">
              <Card 
                className={`overflow-hidden transition-all hover:shadow-md cursor-pointer ${
                  duration === "halving" ? "ring-1 ring-black shadow-sm" : "border"
                }`}
                onClick={() => setDuration("halving")}
              >
                <div className="relative p-6">
                  {duration === "halving" && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-black text-white px-2 py-1 text-xs font-medium flex items-center gap-1">
                        <Check className="h-3 w-3" /> Selected
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center mb-4">
                    <div className="p-3 rounded-full bg-orange-100 text-orange-700 mb-2">
                      <BarChart4 className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-bold">BTC</span>
                    <span className="text-sm text-gray-500">Halving</span>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-sm font-medium text-orange-700">
                      Halving-Aligned Protection
                    </span>
                    <p className="text-xs text-gray-500 mt-2">
                      Protection until the next Bitcoin halving ({daysUntilHalving} days)
                    </p>
                  </div>
                </div>
              </Card>
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
                <p className="text-xs text-orange-700">
                  Bitcoin halving events historically mark the start of new market cycles. Aligning your protection with this event can provide strategic coverage through potential volatility.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="mt-0">
              <Card 
                className={`overflow-hidden transition-all hover:shadow-md ${
                  duration === "custom" ? "ring-1 ring-black shadow-sm" : "border"
                }`}
              >
                <div className="relative p-6">
                  {duration === "custom" && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-black text-white px-2 py-1 text-xs font-medium flex items-center gap-1">
                        <Check className="h-3 w-3" /> Selected
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center mb-5">
                    <div className="p-3 rounded-full bg-cyan-100 text-cyan-700 mb-2">
                      <SlidersHorizontal className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-bold">{customDays}</span>
                    <span className="text-sm text-gray-500">Days</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="custom-days" className="text-sm font-medium">
                        Custom Duration (14-730 days)
                      </Label>
                      <Slider
                        id="custom-days"
                        min={14}
                        max={730}
                        step={1}
                        value={[customDays]}
                        onValueChange={(value) => {
                          setCustomDays(value[0]);
                          setDuration("custom");
                        }}
                        className="my-3"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">14 days</span>
                        <Input
                          type="number"
                          min={14}
                          max={730}
                          value={customDays}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value >= 14 && value <= 730) {
                              setCustomDays(value);
                              setDuration("custom");
                            }
                          }}
                          className="w-20 h-8 text-center"
                        />
                        <span className="text-xs text-gray-500">2 years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="mt-3 p-3 bg-cyan-50 border border-cyan-200 rounded-md">
                <p className="text-xs text-cyan-700">
                  Custom durations let you tailor protection exactly to your investment timeline. Shorter periods have lower premiums, while longer periods provide extended coverage.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Estimated Premium Card */}
        <Card className="p-6 border">
          <h3 className="text-lg font-medium mb-4">Estimated Premium</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">
              {duration === "halving" 
                ? `For ${amount || "0"} BTC, until next halving (${daysUntilHalving} days)` 
                : duration === "custom"
                ? `For ${amount || "0"} BTC, ${customDays} days`
                : `For ${amount || "0"} BTC, ${duration} days`}
            </span>
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
          Choose the duration that best aligns with your Bitcoin investment strategy.
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
          <li><strong>Standard Protection (30-90 days):</strong> Ideal for active traders and short-term protection needs</li>
          <li><strong>Extended Protection (6-12 months):</strong> Better for long-term holders seeking sustained coverage</li>
          <li><strong>Strategic Protection (until halving):</strong> Aligns with Bitcoin&apos;s natural market cycle</li>
          <li><strong>Custom Duration:</strong> Tailor protection exactly to your investment timeline</li>
        </ul>
      </div>
    </div>
  );
} 