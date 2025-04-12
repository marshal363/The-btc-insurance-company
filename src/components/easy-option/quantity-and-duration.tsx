import React from "react";
import { Card } from "@/components/ui/card";
import { Shield, Clock, Check, Calendar, BarChart4, ChevronRight, Hourglass, Infinity, Zap } from "lucide-react";
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
  setAmount?: (amount: string) => void; // Now optional since we don't modify amount in this step
  duration: DurationType;
  setDuration: (duration: DurationType) => void;
  hideSummary?: boolean; // Add prop to hide the Protection Summary
}

export function QuantityAndDuration({
  amount,
  duration,
  setDuration,
  hideSummary = false
}: QuantityAndDurationProps) {
  const { btcPrice = 48500 } = useMarketStore();
  
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
    else if (duration === "custom") durationValue = 120;
    
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
  const daysUntilHalving = 180; // Example value
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Protection Period</h2>
      <p className="text-muted-foreground mb-4">
        Choose how long you want your Bitcoin value protection to remain active.
      </p>
      
      {!duration && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700 flex items-center gap-2">
          <Clock className="h-4 w-4 flex-shrink-0" />
          <p>Please select a protection period to continue to the next step.</p>
        </div>
      )}
      
      <div className="space-y-8">
        {/* Protection Summary Card - Only show if hideSummary is false */}
        {!hideSummary && (
          <Card className="p-6 border">
            <h3 className="text-lg font-medium mb-4">Protection Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Protected Amount</p>
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
        )}
        
        {/* Duration Selection with Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-700" />
            <span>HODL Horizon</span>
          </h3>
          <p className="text-sm text-gray-600 mb-5">
            Select how long your Bitcoin protection will remain active. Choose timeframes aligned with Bitcoin&apos;s natural market cycles for optimal coverage.
          </p>
          
          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="mb-4 grid grid-cols-4 max-w-xl">
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="extended">Extended</TabsTrigger>
              <TabsTrigger value="strategic">Bitcoin-Native</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            
            <TabsContent value="standard" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { days: "30", label: "Basic Protection", color: "amber", icon: <Hourglass className="w-5 h-5" /> },
                  { days: "60", label: "Standard Protection", color: "blue", icon: <Shield className="w-5 h-5" /> },
                  { days: "90", label: "Extended Protection", color: "green", icon: <Shield className="w-5 h-5" /> }
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
                            {option.icon}
                          </div>
                          <span className="text-3xl font-bold">{option.days}</span>
                          <span className="text-sm text-gray-500">Days</span>
                        </div>
                        
                        <div className="text-center">
                          <span className={`text-sm font-medium ${colorClass.split(' ')[1]}`}>
                            {option.label}
                          </span>
                          <p className="text-xs text-gray-500 mt-2">
                            {option.days === "30" ? "Lower premium, immediate peace of mind" : 
                             option.days === "60" ? "Balanced cost and duration" : 
                             "Greater coverage for short-term volatility"}
                          </p>
                        </div>
                        
                        <div className="mt-4 text-center">
                          <p className="text-xs text-gray-500">Estimated Premium</p>
                          <p className="text-sm font-medium">
                            ${(estimatedPremium * (parseInt(option.days) / 30)).toFixed(2)}
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
                  { days: "180", label: "Half-Year Protection", description: "Significant discount over monthly rates", icon: <Calendar className="w-5 h-5" />, color: "purple" },
                  { days: "365", label: "Annual Protection", description: "Our most comprehensive standard timeframe", icon: <Calendar className="w-5 h-5" />, color: "indigo" }
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
                            {option.icon}
                          </div>
                          <span className="text-3xl font-bold">{option.days === "180" ? "6" : "12"}</span>
                          <span className="text-sm text-gray-500">Months</span>
                        </div>
                        
                        <div className="text-center">
                          <span className={`text-sm font-medium ${colorClass.split(' ')[1]}`}>
                            {option.label}
                          </span>
                          <p className="text-xs text-gray-500 mt-2">
                            {option.description}
                          </p>
                          
                          <div className="mt-4">
                            <p className="text-xs text-gray-500">Coverage Until</p>
                            <p className="text-sm font-medium">
                              {new Date(Date.now() + parseInt(option.days) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">Estimated Premium</p>
                            <p className="text-sm font-medium">
                              ${(estimatedPremium * (parseInt(option.days) / 30) * 0.9).toFixed(2)} <span className="text-green-600 text-xs">10% discount</span>
                            </p>
                          </div>
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
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-orange-100 text-orange-700">
                      <Zap className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">Until Next Halving</h4>
                      <p className="text-sm text-gray-500 mb-4">
                        Protection aligned with Bitcoin&apos;s most important market cycle event
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Approximate Days</p>
                          <p className="font-medium">{daysUntilHalving} days</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Estimated Date</p>
                          <p className="font-medium">April 2024</p>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-3 rounded-md text-sm">
                        <p className="mb-2">
                          <span className="font-medium">Why choose halving-based protection:</span>
                        </p>
                        <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                          <li>Bitcoin historically experiences significant price action around halvings</li>
                          <li>Protection that aligns with Bitcoin&apos;s natural economic cycles</li>
                          <li>Special pricing model with discounts over equivalent daily rates</li>
                        </ul>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-xs text-gray-500">Estimated Premium</p>
                        <p className="text-sm font-medium">
                          ${(estimatedPremium * (daysUntilHalving / 30) * 0.85).toFixed(2)} <span className="text-green-600 text-xs">15% discount</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="mt-6 border-t pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium">Advanced Bitcoin Cycles</h4>
                  <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                </div>
                <p className="text-sm text-gray-500 mt-2 mb-4">
                  More advanced Bitcoin-native timeframes are coming soon.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 bg-gray-50 flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gray-200">
                        <BarChart4 className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">Full Cycle Protection</p>
                        <p className="text-xs text-gray-500">Covers an entire 4-year Bitcoin cycle</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <div className="border rounded-md p-4 bg-gray-50 flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gray-200">
                        <Infinity className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">Dynamic Protection</p>
                        <p className="text-xs text-gray-500">Adjusts based on on-chain metrics</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="mt-0">
              <div className="border p-6 rounded-lg">
                <h4 className="text-base font-medium mb-4">Custom Protection Duration</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Custom protection periods are currently handled by our OTC desk. Please contact support to arrange a custom protection timeframe.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-700">
                  <p className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Custom durations will be available directly through the platform in a future update. For now, please select one of our standard protection periods.
                    </span>
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="mt-8 bg-muted/30 p-5 rounded-lg">
        <h3 className="text-base font-medium mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <span>Bitcoin Protection Periods</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Protection periods are designed to align with Bitcoin&apos;s unique market cycles and provide optimal coverage during different market conditions.
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
          <li>Shorter periods offer flexibility with lower upfront costs</li>
          <li>Extended periods provide significant discounts over monthly rates</li>
          <li>Halving-based protection follows Bitcoin&apos;s natural market rhythm</li>
          <li>All protections remain active until their specified end date</li>
        </ul>
      </div>
    </div>
  );
} 