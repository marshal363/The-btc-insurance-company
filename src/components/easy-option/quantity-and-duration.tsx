import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  Clock, 
  Check, 
  Calendar, 
  BarChart4, 
  ChevronRight, 
  Hourglass, 
  Infinity, 
  Zap, 
  Wallet,
  ChevronUp,
  ChevronDown,
  DollarSign
} from "lucide-react";
import { useMarketStore } from "@/store/market-store";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Update the type to include all possible durations
type DurationType = "30" | "60" | "90" | "180" | "365" | "halving" | "custom";

interface QuantityAndDurationProps {
  amount: string;
  setAmount?: (amount: string) => void;
  duration: DurationType;
  setDuration: (duration: DurationType) => void;
  hideSummary?: boolean;
  walletBalance?: string; // Add wallet balance prop
  walletConnected?: boolean; // Add wallet connection status
}

export function QuantityAndDuration({
  amount,
  duration,
  setDuration,
  hideSummary = false,
  walletBalance = "0", // Default to 0 if not provided
  walletConnected = false // Default to not connected
}: QuantityAndDurationProps) {
  const { btcPrice = 48500 } = useMarketStore();
  const [infoExpanded, setInfoExpanded] = useState(false);
  
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
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold">How Long Do You Need Protection?</h2>
        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
          Step 4 of 6
        </Badge>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Choose how long your Bitcoin value protection will remain active.
      </p>
      
      {!duration && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 flex items-center gap-2 shadow-sm">
          <Clock className="h-4 w-4 flex-shrink-0 text-amber-600" />
          <p>Please select a protection period to continue to the next step.</p>
        </div>
      )}
      
      <div className="space-y-8">
        {/* Protection Summary & Wallet Info Card - Redesigned with premium styling */}
        {!hideSummary && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="overflow-hidden shadow-sm border rounded-lg">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-full">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Protection Amount</h3>
                    <p className="text-blue-100 text-sm">Your coverage details</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white">
                <div className="space-y-5">
                  <div className="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div>
                      <p className="text-sm text-blue-700 font-medium">Amount to Protect</p>
                      <p className="text-2xl font-semibold mt-1">{amount} BTC</p>
                      <p className="text-xs text-blue-600 opacity-70 mt-1">
                        ≈ {(parseFloat(amount) * 100000000).toLocaleString()} sats
                      </p>
                    </div>
                    <div className="bg-blue-600 h-12 w-12 rounded-full flex items-center justify-center shadow-sm">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">USD Value</p>
                      <p className="text-xl font-semibold mt-1">
                        ${btcUsdValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                    </div>
                    <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-gray-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden shadow-sm border rounded-lg">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-full">
                    <Wallet className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Your Wallet</h3>
                    <p className="text-green-100 text-sm">Account balance</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white">
                {walletConnected ? (
                  <div className="space-y-4">
                    <div className="py-3 px-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-green-700 font-medium">Your Balance</p>
                        <Badge variant="outline" className="bg-white border-green-300 text-green-600">
                          <Check className="h-3 w-3 mr-1" /> Connected
                        </Badge>
                      </div>
                      <p className="text-2xl font-semibold mt-1">{walletBalance} BTC</p>
                    </div>
                    
                    <div className="py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 font-medium mb-2">Protection Coverage</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">0%</span>
                        <span className="text-xl font-semibold">
                          {walletBalance !== "0" 
                            ? `${((parseFloat(amount) / parseFloat(walletBalance)) * 100).toFixed(0)}%` 
                            : "0%"}
                        </span>
                        <span className="text-xs text-gray-500">100%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full" 
                          style={{ 
                            width: walletBalance !== "0" 
                              ? `${Math.min(((parseFloat(amount) / parseFloat(walletBalance)) * 100), 100)}%` 
                              : "0%" 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-gray-200 p-3 rounded-full mb-3">
                      <Wallet className="h-6 w-6 text-gray-500" />
                    </div>
                    <p className="text-gray-700 mb-4">Connect your wallet to see your balance</p>
                    <Badge variant="outline" className="cursor-not-allowed opacity-70 px-4 py-1">
                      Wallet Not Connected
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Duration Selection with Categories - Premium Styled */}
        <div className="mt-8">
          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="mb-6 grid grid-cols-3 max-w-xl mx-auto bg-gray-100 p-1">
              <TabsTrigger value="standard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Standard</TabsTrigger>
              <TabsTrigger value="extended" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Extended</TabsTrigger>
              <TabsTrigger value="strategic" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Bitcoin-Native</TabsTrigger>
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
                  const gradientClass = option.color === "amber" ? "from-amber-50 to-amber-100" : 
                                       option.color === "blue" ? "from-blue-50 to-blue-100" : 
                                       "from-green-50 to-green-100";
                  const textColorClass = option.color === "amber" ? "text-amber-700" : 
                                         option.color === "blue" ? "text-blue-700" : 
                                         "text-green-700";
                  
                  return (
                    <Card 
                      key={option.days}
                      className={`overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
                        isSelected ? "ring-2 ring-blue-600 shadow-md" : "border hover:border-blue-200"
                      }`}
                      onClick={() => setDuration(option.days as DurationType)}
                    >
                      <div className={`relative p-6 ${isSelected ? `bg-gradient-to-br ${gradientClass}` : "hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100"}`}>
                        {isSelected && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1 shadow-sm">
                              <Check className="h-3 w-3" /> Selected
                            </Badge>
                          </div>
                        )}
                        
                        <div className="flex flex-col items-center mb-5">
                          <div className={`p-3 rounded-full ${colorClass} mb-3 shadow-sm`}>
                            {option.icon}
                          </div>
                          <span className="text-4xl font-bold">{option.days}</span>
                          <span className="text-sm text-gray-500">Days</span>
                        </div>
                        
                        <div className="text-center mb-4">
                          <span className={`text-sm font-semibold ${textColorClass}`}>
                            {option.label}
                          </span>
                          <p className="text-xs text-gray-500 mt-2">
                            {option.days === "30" ? "Lower premium, immediate peace of mind" : 
                             option.days === "60" ? "Balanced cost and duration" : 
                             "Greater coverage for short-term volatility"}
                          </p>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                          <p className="text-xs text-gray-500 mb-1">Estimated Premium</p>
                          <p className="text-base font-medium">
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
                  const gradientClass = option.color === "purple" ? "from-purple-50 to-purple-100" : 
                                       "from-indigo-50 to-indigo-100";
                  const textColorClass = option.color === "purple" ? "text-purple-700" : 
                                         "text-indigo-700";
                  
                  return (
                    <Card 
                      key={option.days}
                      className={`overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
                        isSelected ? "ring-2 ring-blue-600 shadow-md" : "border hover:border-blue-200"
                      }`}
                      onClick={() => setDuration(option.days as DurationType)}
                    >
                      <div className={`relative p-6 ${isSelected ? `bg-gradient-to-br ${gradientClass}` : "hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100"}`}>
                        {isSelected && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1 shadow-sm">
                              <Check className="h-3 w-3" /> Selected
                            </Badge>
                          </div>
                        )}
                        
                        <div className="flex flex-col items-center mb-5">
                          <div className={`p-3 rounded-full ${colorClass} mb-3 shadow-sm`}>
                            {option.icon}
                          </div>
                          <span className="text-4xl font-bold">{option.days === "180" ? "6" : "12"}</span>
                          <span className="text-sm text-gray-500">Months</span>
                        </div>
                        
                        <div className="text-center mb-4">
                          <span className={`text-sm font-semibold ${textColorClass}`}>
                            {option.label}
                          </span>
                          <p className="text-xs text-gray-500 mt-2">
                            {option.description}
                          </p>
                          
                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500">Coverage Until</p>
                            <p className="text-sm font-medium">
                              {new Date(Date.now() + parseInt(option.days) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-xs text-gray-500">Estimated Premium</p>
                            <p className="text-base font-medium flex justify-center items-center gap-1">
                              ${(estimatedPremium * (parseInt(option.days) / 30) * 0.9).toFixed(2)} 
                              <span className="text-green-600 text-xs px-1 py-0.5 bg-green-50 rounded-sm">10% discount</span>
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
                className={`overflow-hidden transition-all hover:shadow-lg hover:scale-[1.01] cursor-pointer ${
                  duration === "halving" ? "ring-2 ring-blue-600 shadow-md" : "border hover:border-blue-200"
                }`}
                onClick={() => setDuration("halving")}
              >
                <div className={`relative p-6 ${duration === "halving" ? "bg-gradient-to-br from-orange-50 to-orange-100" : "hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100"}`}>
                  {duration === "halving" && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1 shadow-sm">
                        <Check className="h-3 w-3" /> Selected
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-orange-100 text-orange-700 shadow-sm">
                      <Zap className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-orange-700">Until Next Halving</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Protection aligned with Bitcoin&apos;s most important market cycle event
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-white/60 rounded-md shadow-sm">
                        <div>
                          <p className="text-xs text-gray-500">Approximate Days</p>
                          <p className="font-medium">{daysUntilHalving} days</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Estimated Date</p>
                          <p className="font-medium">April 2024</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/70 p-3 rounded-md text-sm shadow-sm border border-orange-100">
                        <p className="mb-2">
                          <span className="font-medium">Why choose halving-based protection:</span>
                        </p>
                        <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                          <li>Bitcoin historically experiences significant price action around halvings</li>
                          <li>Protection that aligns with Bitcoin&apos;s natural economic cycles</li>
                          <li>Special pricing model with discounts over equivalent daily rates</li>
                        </ul>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-orange-200">
                        <p className="text-xs text-gray-500">Estimated Premium</p>
                        <p className="text-base font-medium flex items-center gap-1">
                          ${(estimatedPremium * (daysUntilHalving / 30) * 0.85).toFixed(2)} 
                          <span className="text-green-600 text-xs px-1 py-0.5 bg-green-50 rounded-sm">15% discount</span>
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
          </Tabs>
        </div>
      </div>
      
      {/* Expandable Bitcoin Protection Info Section */}
      <div className="mt-8">
        <div 
          className="bg-blue-50 rounded-lg border border-blue-100 overflow-hidden transition-all duration-200"
        >
          <div 
            className="p-5 flex justify-between items-center cursor-pointer" 
            onClick={() => setInfoExpanded(!infoExpanded)}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-medium">Bitcoin Protection Periods</h3>
            </div>
            <div>
              {infoExpanded ? 
                <ChevronUp className="w-5 h-5 text-blue-600" /> : 
                <ChevronDown className="w-5 h-5 text-blue-600" />
              }
            </div>
          </div>
          
          {infoExpanded && (
            <div className="px-5 pb-5 pt-1 border-t border-blue-100">
              <p className="text-sm text-gray-600 mb-3">
                Protection periods are designed to align with Bitcoin&apos;s unique market cycles and provide optimal coverage during different market conditions.
              </p>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                <li>Shorter periods offer flexibility with lower upfront costs</li>
                <li>Extended periods provide significant discounts over monthly rates</li>
                <li>Halving-based protection follows Bitcoin&apos;s natural market rhythm</li>
                <li>All protections remain active until their specified end date</li>
                <li>You can select different periods based on your holding strategy</li>
                <li>Premium costs are calculated based on duration and market volatility</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 