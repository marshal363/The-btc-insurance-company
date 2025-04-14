import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  CheckCircle, 
  ArrowDown, 
  ArrowUp, 
  DollarSign, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  BarChart,
  Calendar,
  Clock,
  LockIcon,
  ShieldCheck,
  TrendingDown,
  BadgeCheck,
  InfoIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMarketStore } from "@/store/market-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const [activatingProtection, setActivatingProtection] = React.useState(false);
  const [activeScenario, setActiveScenario] = React.useState(0);
  
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
  
  // Format the date in a more readable way
  const formatDatePretty = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month} ${day}, ${year}`;
  };
  
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
  
  // Handle activation button click
  const handleActivateProtection = () => {
    setActivatingProtection(true);
    // Simulate activating protection - in real app would call API
    setTimeout(() => {
      setActivatingProtection(false);
      // Here you would navigate to a confirmation page or show success state
    }, 1500);
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
          premium: `-$${policy.total.toFixed(2)}`,
          btcPrice: protectedValueNum * 1.05,
          savings: -policy.total,
          icon: <ArrowUp className="h-4 w-4" />,
          color: "gray"
        },
        {
          title: "If BTC drops 10% below your protected value",
          description: `If Bitcoin drops to $${(protectedValueNum * 0.9).toLocaleString()}, you can activate your protection to sell at $${protectedValueNum.toLocaleString()}, saving approximately $${(protectedValueNum * 0.1 * parseFloat(amount)).toLocaleString()}.`,
          outcome: "Protection valuable",
          premium: `+$${((protectedValueNum * 0.1 * parseFloat(amount)) - policy.total).toFixed(2)}`,
          btcPrice: protectedValueNum * 0.9,
          savings: (protectedValueNum * 0.1 * parseFloat(amount)) - policy.total,
          icon: <ArrowDown className="h-4 w-4" />,
          color: "blue"
        },
        {
          title: "If BTC crashes 25% below your protected value",
          description: `If Bitcoin crashes to $${(protectedValueNum * 0.75).toLocaleString()}, activating your protection would save approximately $${(protectedValueNum * 0.25 * parseFloat(amount)).toLocaleString()}.`,
          outcome: "Significant savings",
          premium: `+$${((protectedValueNum * 0.25 * parseFloat(amount)) - policy.total).toFixed(2)}`,
          btcPrice: protectedValueNum * 0.75,
          savings: (protectedValueNum * 0.25 * parseFloat(amount)) - policy.total,
          icon: <ArrowDown className="h-4 w-4" />,
          color: "green"
        }
      ];
    } else {
      // Price lock scenarios
      return [
        {
          title: "If BTC stays below your locked price",
          description: `If Bitcoin stays below $${protectedValueNum.toLocaleString()}, you can simply buy Bitcoin at the market price. No need to use your price lock.`,
          outcome: "No activation needed",
          premium: `-$${policy.total.toFixed(2)}`,
          btcPrice: protectedValueNum * 0.95,
          savings: -policy.total,
          icon: <ArrowDown className="h-4 w-4" />,
          color: "gray"
        },
        {
          title: "If BTC rises 10% above your locked price",
          description: `If Bitcoin rises to $${(protectedValueNum * 1.1).toLocaleString()}, you can use your price lock to buy at $${protectedValueNum.toLocaleString()}, saving approximately $${(protectedValueNum * 0.1 * parseFloat(amount)).toLocaleString()}.`,
          outcome: "Price lock valuable",
          premium: `+$${((protectedValueNum * 0.1 * parseFloat(amount)) - policy.total).toFixed(2)}`,
          btcPrice: protectedValueNum * 1.1,
          savings: (protectedValueNum * 0.1 * parseFloat(amount)) - policy.total,
          icon: <ArrowUp className="h-4 w-4" />,
          color: "blue"
        },
        {
          title: "If BTC surges 25% above your locked price",
          description: `If Bitcoin surges to $${(protectedValueNum * 1.25).toLocaleString()}, using your price lock would save approximately $${(protectedValueNum * 0.25 * parseFloat(amount)).toLocaleString()}.`,
          outcome: "Significant savings",
          premium: `+$${((protectedValueNum * 0.25 * parseFloat(amount)) - policy.total).toFixed(2)}`,
          btcPrice: protectedValueNum * 1.25,
          savings: (protectedValueNum * 0.25 * parseFloat(amount)) - policy.total,
          icon: <ArrowUp className="h-4 w-4" />,
          color: "green"
        }
      ];
    }
  };
  
  const scenarios = getProtectionScenarios();
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
        <h2 className="text-2xl font-bold mb-2 sm:mb-0">Bitcoin Protection Policy</h2>
        <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-700 rounded-full self-start sm:self-auto">
          Step 6 of 6
        </Badge>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Review your protection details and activate when you're ready.
      </p>
      
      <Card className="border rounded-lg overflow-hidden mb-6 shadow-md bg-white">
        {/* Header section with slate styling */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 sm:p-5 border-b relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="graph-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="10" y2="10" style={{ stroke: 'white', strokeWidth: 0.5 }} />
                <line x1="10" y1="0" x2="0" y2="10" style={{ stroke: 'white', strokeWidth: 0.5 }} />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#graph-pattern)" />
            </svg>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between relative z-10 gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <ShieldCheck className="h-6 w-6 text-slate-700" />
              </div>
        <div>
                <h3 className="text-xl font-bold text-white">Bitcoin Protection Policy</h3>
                <p className="text-slate-300 text-sm sm:text-base">
                  {optionType === "put" ? policy.protectionLevel : "Price Lock Protection"}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white hover:bg-slate-100 text-slate-800 border-transparent self-start sm:self-auto mt-2 sm:mt-0"
              onClick={togglePnlPanel}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Simulate Outcomes
            </Button>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          {/* Grid layout for policy details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-slate-700 mb-3 sm:mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-slate-600" />
                Protection Parameters
              </h4>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-slate-50 rounded-lg border border-slate-200 p-3 sm:p-4">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <span className="text-sm text-slate-600">Protected Value</span>
                    <span className="font-medium">${parseFloat(protectedValue).toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {calculateThresholdDifference()}
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg border border-slate-200 p-3 sm:p-4">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <span className="text-sm text-slate-600">Bitcoin Amount</span>
                    <span className="font-medium">{amount} BTC</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    ≈ ${(parseFloat(amount) * parseFloat(protectedValue)).toLocaleString()} total value
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg border border-slate-200 p-3 sm:p-4">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <span className="text-sm text-slate-600">Protection Period</span>
                    <span className="font-medium">{duration === "halving" ? "Until Halving" : `${duration} Days`}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Active until {formatDatePretty(durationDays)}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-700 mb-3 sm:mb-4 flex items-center gap-2 mt-4 md:mt-0">
                <DollarSign className="h-4 w-4 text-slate-600" />
                Premium & Fees
              </h4>
              
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 sm:p-5 mb-4">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Protection Premium</span>
                    <span className="font-medium">${policy.premium.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Platform Fee</span>
                    <span className="font-medium">${policy.fees.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                    <span className="font-medium text-slate-700">Total Cost</span>
                    <span className="text-lg font-semibold">${policy.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                  <InfoIcon className="h-3 w-3 flex-shrink-0" />
                  <span>One-time payment for the entire protection period</span>
                </div>
              </div>
              
        <motion.div 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
        >
          <Button 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium"
            size="lg" 
            onClick={handleActivateProtection}
            disabled={activatingProtection}
          >
            {activatingProtection ? (
              <>
                <motion.div
                  className="mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Clock className="h-4 w-4" />
                </motion.div>
                Processing...
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Activate Protection
              </>
            )}
          </Button>
        </motion.div>
          </div>
        </div>
        
          {/* Activation scenarios */}
          <div className="mb-6">
            <h4 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-slate-600" />
              Protection Outcomes
            </h4>
            
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="mb-4 sm:mb-6 grid grid-cols-3 w-full sm:max-w-xl sm:mx-auto rounded-full p-1 bg-slate-100/80 border border-slate-200">
                <TabsTrigger 
                  value="0" 
                  className="rounded-full data-[state=active]:bg-slate-900 data-[state=active]:text-white text-xs sm:text-sm py-1.5"
                  onClick={() => setActiveScenario(0)}
                >
                  Scenario 1
                </TabsTrigger>
                <TabsTrigger 
                  value="1" 
                  className="rounded-full data-[state=active]:bg-slate-900 data-[state=active]:text-white text-xs sm:text-sm py-1.5"
                  onClick={() => setActiveScenario(1)}
                >
                  Scenario 2
                </TabsTrigger>
                <TabsTrigger 
                  value="2" 
                  className="rounded-full data-[state=active]:bg-slate-900 data-[state=active]:text-white text-xs sm:text-sm py-1.5"
                  onClick={() => setActiveScenario(2)}
                >
                  Scenario 3
                </TabsTrigger>
              </TabsList>
              
              {scenarios.map((scenario, index) => (
                <TabsContent key={index} value={index.toString()} className="mt-0">
                  <Card className={cn(
                    "border rounded-lg overflow-hidden p-0",
                    scenario.color === "green" ? "border-green-200" : 
                    scenario.color === "blue" ? "border-slate-200" : 
                    "border-slate-200"
                  )}>
                    <div className={cn(
                      "p-3 sm:p-4",
                      scenario.color === "green" ? "bg-green-50" : 
                      scenario.color === "blue" ? "bg-slate-50" : 
                      "bg-slate-50"
                    )}>
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-full mt-1 flex-shrink-0",
                          scenario.color === "green" ? "bg-green-100" : 
                          scenario.color === "blue" ? "bg-slate-200" : 
                          "bg-slate-200"
                        )}>
                          {scenario.icon}
                  </div>
                        <div>
                          <h5 className="font-semibold mb-1">{scenario.title}</h5>
                          <p className="text-xs sm:text-sm text-slate-600">{scenario.description}</p>
              </div>
            </div>
          </div>
          
                    <div className="p-3 sm:p-4 bg-white">
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">BTC Price</p>
                          <p className="font-medium">${scenario.btcPrice.toLocaleString()}</p>
              </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Protected At</p>
                          <p className="font-medium">${parseFloat(protectedValue).toLocaleString()}</p>
              </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Outcome</p>
                          <Badge className={cn(
                            "font-normal",
                            scenario.color === "green" ? "bg-green-100 text-green-700 hover:bg-green-100" : 
                            scenario.color === "blue" ? "bg-slate-100 text-slate-700 hover:bg-slate-100" : 
                            "bg-slate-100 text-slate-700 hover:bg-slate-100"
                          )}>
                            {scenario.outcome}
                          </Badge>
              </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Net Savings</p>
                          <p className={cn(
                            "font-medium",
                            scenario.savings > 0 ? "text-green-600" : "text-slate-600"
                          )}>
                            {scenario.premium}
                </p>
              </div>
                    </div>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          {/* Verification and trust elements */}
          <div className="bg-slate-100 rounded-lg border border-slate-200 p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-full mt-1 flex-shrink-0">
                <LockIcon className="h-4 w-4 text-slate-700" />
              </div>
              <div>
                <h4 className="font-medium text-slate-700 mb-1">Secure Blockchain Protection</h4>
                <p className="text-xs sm:text-sm text-slate-600 mb-3">
                  Your protection is secured by smart contracts on the Stacks blockchain, with funds held in escrow until activation or expiration.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-white text-xs py-1 px-2 rounded-full">
                    <BadgeCheck className="h-3 w-3 mr-1 text-slate-600" />
                    Verified
                  </Badge>
                  <Badge variant="outline" className="bg-white text-xs py-1 px-2 rounded-full">
                    <ShieldCheck className="h-3 w-3 mr-1 text-slate-600" />
                    Protected
                  </Badge>
                  <Badge variant="outline" className="bg-white text-xs py-1 px-2 rounded-full">
                    <Calendar className="h-3 w-3 mr-1 text-slate-600" />
                    {duration === "halving" ? "Until Halving" : `${duration} Days`}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Important disclaimer */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
        <div className="bg-amber-100 p-1.5 rounded-full mt-0.5 flex-shrink-0">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        </div>
        <div>
          <h4 className="font-medium text-amber-800 mb-1">Important Information</h4>
          <p className="text-xs sm:text-sm text-amber-700">
            By activating protection, you agree to the terms and conditions of the Bitcoin Protection Policy. Premium payments are non-refundable. You maintain full ownership of your Bitcoin throughout the protection period.
                      </p>
                    </div>
      </div>
    </div>
  );
} 