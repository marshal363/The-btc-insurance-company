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
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
        <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-700 rounded-full">
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
        {/* Protection Summary & Wallet Info Card - Redesigned with slate styling */}
        {!hideSummary && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="overflow-hidden shadow-sm border rounded-lg">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-full">
                    <Shield className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Protection Amount</h3>
                    <p className="text-slate-300 text-sm">Your coverage details</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white">
                <div className="space-y-5">
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div>
                      <p className="text-sm text-slate-700 font-medium">Amount to Protect</p>
                      <p className="text-2xl font-semibold mt-1">{amount} BTC</p>
                      <p className="text-xs text-slate-600 opacity-70 mt-1">
                        ≈ {(parseFloat(amount) * 100000000).toLocaleString()} sats
                      </p>
                    </div>
                    <div className="bg-slate-700 h-12 w-12 rounded-full flex items-center justify-center shadow-sm">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div>
                      <p className="text-sm text-slate-600 font-medium">USD Value</p>
                      <p className="text-xl font-semibold mt-1">
                        ${btcUsdValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                    </div>
                    <div className="bg-slate-200 h-10 w-10 rounded-full flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-slate-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden shadow-sm border rounded-lg">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-full">
                    <Wallet className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Your Wallet</h3>
                    <p className="text-slate-300 text-sm">Account balance</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white">
                {walletConnected ? (
                  <div className="space-y-4">
                    <div className="py-3 px-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-700 font-medium">Your Balance</p>
                        <Badge variant="outline" className="bg-white border-slate-300 text-slate-600 rounded-full">
                          <Check className="h-3 w-3 mr-1" /> Connected
                        </Badge>
                      </div>
                      <p className="text-2xl font-semibold mt-1">{walletBalance} BTC</p>
                    </div>
                    
                    <div className="py-3 px-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-sm text-slate-600 font-medium mb-2">Protection Coverage</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500">0%</span>
                        <span className="text-xl font-semibold">
                          {walletBalance !== "0" 
                            ? `${((parseFloat(amount) / parseFloat(walletBalance)) * 100).toFixed(0)}%` 
                            : "0%"}
                        </span>
                        <span className="text-xs text-slate-500">100%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-slate-500 to-slate-700 h-2.5 rounded-full" 
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
                  <div className="flex flex-col items-center justify-center py-6 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="bg-slate-200 p-3 rounded-full mb-3">
                      <Wallet className="h-6 w-6 text-slate-500" />
                    </div>
                    <p className="text-slate-700 mb-4">Connect your wallet to see your balance</p>
                    <Badge variant="outline" className="cursor-not-allowed opacity-70 px-4 py-1 rounded-full">
                      Wallet Not Connected
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Duration Selection with Categories - Updated with slate styling */}
        <div className="mt-8">
          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="mb-6 grid grid-cols-3 max-w-xl mx-auto rounded-full p-1 bg-slate-100/80 border border-slate-200">
              <TabsTrigger value="standard" className="rounded-full data-[state=active]:bg-slate-900 data-[state=active]:text-white">Standard</TabsTrigger>
              <TabsTrigger value="extended" className="rounded-full data-[state=active]:bg-slate-900 data-[state=active]:text-white">Extended</TabsTrigger>
              <TabsTrigger value="strategic" className="rounded-full data-[state=active]:bg-slate-900 data-[state=active]:text-white">Bitcoin-Native</TabsTrigger>
            </TabsList>
            
            <TabsContent value="standard" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { days: "30", label: "Basic Protection", color: "amber", icon: <Hourglass className="w-5 h-5" /> },
                  { days: "60", label: "Standard Protection", color: "blue", icon: <Shield className="w-5 h-5" /> },
                  { days: "90", label: "Extended Protection", color: "green", icon: <Shield className="w-5 h-5" /> }
                ].map((option) => {
                  const isSelected = duration === option.days;
                  const gradientClass = "bg-gradient-to-br from-slate-50 to-white";
                  const headerClass = isSelected ? "bg-slate-900" : "bg-slate-800";
                  
                  return (
                    <motion.div
                      key={option.days}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card 
                        className={cn(
                          "overflow-hidden transition-all cursor-pointer group border p-0 shadow-sm hover:shadow-md relative",
                          isSelected 
                            ? "ring-1 ring-slate-700 shadow-md border-slate-700/20"
                            : "hover:border-slate-300 border-transparent"
                        )}
                        onClick={() => setDuration(option.days as DurationType)}
                      >
                        {/* Top ribbon for selected state */}
                        {isSelected && (
                          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                            <div className="absolute transform rotate-45 bg-slate-900 text-white text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center shadow-sm">
                              Selected
                            </div>
                          </div>
                        )}
                        
                        <div className={`h-full w-full overflow-hidden relative rounded-lg ${gradientClass}`}>
                          {/* Card header with slate styling */}
                          <div className={`${headerClass} text-white p-6 flex flex-col items-center justify-center`}>
                            <div className="bg-white rounded-full p-3 mb-4 relative">
                              <div className="text-slate-700">
                            {option.icon}
                              </div>
                              {isSelected && (
                                <span className="absolute inset-0 rounded-full bg-slate-400/30 animate-ping"></span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold mb-1">{option.label}</h3>
                            <p className="text-slate-300 text-sm">{option.days} days</p>
                          </div>
                          
                          <div className="p-6">
                            <div className="mb-5">
                              <div className="flex items-center gap-2 mb-3">
                                <Calendar className="h-4 w-4 text-slate-600" />
                                <p className="font-medium text-sm text-slate-700">Duration Details</p>
                        </div>
                              <p className="text-sm text-slate-600 mb-3">
                                Protection active from now until {new Date(Date.now() + parseInt(option.days) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </p>
                        </div>
                        
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center gap-1 text-slate-500 text-xs">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{option.days} days protection</span>
                              </div>
                              
                              {isSelected ? (
                                <Badge className="bg-slate-900 text-white px-2 py-1 text-xs shadow-sm rounded-full">
                                  <Check className="h-3 w-3 mr-1" /> Selected
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-full border-slate-300">
                                  Select
                                </Badge>
                              )}
                            </div>
                          </div>
                      </div>
                    </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="extended" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { days: "180", label: "Half-Year Protection", description: "Significant discount over monthly rates", icon: <Calendar className="w-5 h-5" /> },
                  { days: "365", label: "Annual Protection", description: "Our most comprehensive standard timeframe", icon: <Calendar className="w-5 h-5" /> }
                ].map((option) => {
                  const isSelected = duration === option.days;
                  const gradientClass = "bg-gradient-to-br from-slate-50 to-white";
                  const headerClass = isSelected ? "bg-slate-900" : "bg-slate-800";
                  
                  return (
                    <motion.div
                      key={option.days}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card 
                        className={cn(
                          "overflow-hidden transition-all cursor-pointer group border p-0 shadow-sm hover:shadow-md relative",
                          isSelected 
                            ? "ring-1 ring-slate-700 shadow-md border-slate-700/20"
                            : "hover:border-slate-300 border-transparent"
                        )}
                        onClick={() => setDuration(option.days as DurationType)}
                      >
                        {/* Top ribbon for selected state */}
                        {isSelected && (
                          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                            <div className="absolute transform rotate-45 bg-slate-900 text-white text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center shadow-sm">
                              Selected
                            </div>
                          </div>
                        )}
                        
                        <div className={`h-full w-full overflow-hidden relative rounded-lg ${gradientClass}`}>
                          {/* Card header with slate styling */}
                          <div className={`${headerClass} text-white p-6 flex flex-col items-center justify-center`}>
                            <div className="bg-white rounded-full p-3 mb-4 relative">
                              <div className="text-slate-700">
                            {option.icon}
                          </div>
                              {isSelected && (
                                <span className="absolute inset-0 rounded-full bg-slate-400/30 animate-ping"></span>
                              )}
                        </div>
                            <h3 className="text-xl font-bold mb-1">{option.label}</h3>
                            <p className="text-slate-300 text-sm">
                              {option.days === "180" ? "6 months" : "12 months"}
                            </p>
                          </div>
                          
                          <div className="p-6">
                            <div className="mb-5">
                              <div className="flex items-center gap-2 mb-3">
                                <Calendar className="h-4 w-4 text-slate-600" />
                                <p className="font-medium text-sm text-slate-700">Duration Details</p>
                              </div>
                              <p className="text-sm text-slate-600 mb-3">
                                {option.description}
                              </p>
                              <p className="text-sm text-slate-600 mb-3">
                                Protection active until {new Date(Date.now() + parseInt(option.days) * 24 * 60 * 60 * 1000).toLocaleDateString()}
                              </p>
                            </div>
                            
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4">
                              <p className="text-xs text-slate-500 mb-1">Estimated Premium</p>
                              <div className="flex items-center justify-between">
                                <p className="text-base font-medium">
                              ${(estimatedPremium * (parseInt(option.days) / 30) * 0.9).toFixed(2)} 
                                </p>
                                <Badge className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded-full">
                                  10% discount
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center gap-1 text-slate-500 text-xs">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{option.days} days protection</span>
                              </div>
                              
                              {isSelected ? (
                                <Badge className="bg-slate-900 text-white px-2 py-1 text-xs shadow-sm rounded-full">
                                  <Check className="h-3 w-3 mr-1" /> Selected
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-full border-slate-300">
                                  Select
                                </Badge>
                              )}
                            </div>
                        </div>
                      </div>
                    </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="strategic" className="mt-0">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
              <Card 
                  className={cn(
                    "overflow-hidden transition-all cursor-pointer group border p-0 shadow-sm hover:shadow-md relative",
                    duration === "halving" 
                      ? "ring-1 ring-slate-700 shadow-md border-slate-700/20"
                      : "hover:border-slate-300 border-transparent"
                  )}
                onClick={() => setDuration("halving")}
              >
                  {/* Top ribbon for selected state */}
                  {duration === "halving" && (
                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                      <div className="absolute transform rotate-45 bg-slate-900 text-white text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center shadow-sm">
                        Selected
                      </div>
                    </div>
                  )}
                  
                  <div className="h-full w-full overflow-hidden relative rounded-lg bg-gradient-to-br from-slate-50 to-white">
                    {/* Card header with slate styling */}
                    <div className={`${duration === "halving" ? "bg-slate-900" : "bg-slate-800"} text-white p-6 flex flex-col items-center justify-center`}>
                      <div className="bg-white rounded-full p-3 mb-4 relative">
                        <div className="text-slate-700">
                      <Zap className="w-5 h-5" />
                        </div>
                        {duration === "halving" && (
                          <span className="absolute inset-0 rounded-full bg-slate-400/30 animate-ping"></span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-1">Until Next Halving</h3>
                      <p className="text-slate-300 text-sm">{daysUntilHalving} days</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-5">
                        <p className="font-medium text-slate-700 mb-2">Bitcoin-Native Protection</p>
                        <p className="text-sm text-slate-600 mb-4">
                        Protection aligned with Bitcoin&apos;s most important market cycle event
                      </p>
                      
                        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200 shadow-sm">
                        <div>
                            <p className="text-xs text-slate-500">Approximate Days</p>
                          <p className="font-medium">{daysUntilHalving} days</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Estimated Date</p>
                          <p className="font-medium">April 2024</p>
                        </div>
                      </div>
                      
                        <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg mb-4">
                          <p className="font-medium text-sm text-slate-700 mb-2">
                            Why choose halving-based protection:
                          </p>
                          <ul className="text-xs text-slate-600 space-y-1 pl-5 list-disc">
                          <li>Bitcoin historically experiences significant price action around halvings</li>
                          <li>Protection that aligns with Bitcoin&apos;s natural economic cycles</li>
                          <li>Special pricing model with discounts over equivalent daily rates</li>
                        </ul>
                      </div>
                      
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-1">
                          <p className="text-xs text-slate-500 mb-1">Estimated Premium</p>
                          <div className="flex items-center justify-between">
                            <p className="text-base font-medium">
                          ${(estimatedPremium * (daysUntilHalving / 30) * 0.85).toFixed(2)} 
                            </p>
                            <Badge className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded-full">
                              15% discount
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-1 text-slate-500 text-xs">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Until April 2024</span>
                        </div>
                        
                        {duration === "halving" ? (
                          <Badge className="bg-slate-900 text-white px-2 py-1 text-xs shadow-sm rounded-full">
                            <Check className="h-3 w-3 mr-1" /> Selected
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-full border-slate-300">
                            Select
                          </Badge>
                        )}
                    </div>
                  </div>
                </div>
              </Card>
              </motion.div>
              
              <div className="mt-6 border-t border-slate-200 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium text-slate-700">Advanced Bitcoin Cycles</h4>
                  <Badge variant="outline" className="text-xs rounded-full border-slate-300">Coming Soon</Badge>
                </div>
                <p className="text-sm text-slate-500 mt-2 mb-4">
                  More advanced Bitcoin-native timeframes are coming soon.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-slate-200">
                        <BarChart4 className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">Full Cycle Protection</p>
                        <p className="text-xs text-slate-500">Covers an entire 4-year Bitcoin cycle</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                  
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-slate-200">
                        <Infinity className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">Dynamic Protection</p>
                        <p className="text-xs text-slate-500">Adjusts based on on-chain metrics</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
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