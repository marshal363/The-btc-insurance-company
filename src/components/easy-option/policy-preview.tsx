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
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-2xl font-bold mb-1">Your Bitcoin Protection Policy</h2>
          <p className="text-muted-foreground">
            Based on your selections, we&apos;ve prepared your Bitcoin protection policy.
          </p>
        </div>
        
        {/* Enhanced Activation Button */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            size="lg" 
            className={`${activatingProtection ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} 
            text-white shadow-md transition-all duration-300`}
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
      
      {/* Enhanced Policy Card with Premium Design */}
      <Card className="border rounded-lg overflow-hidden mb-6 shadow-md bg-gradient-to-b from-white to-gray-50">
        {/* Header section with improved visual styling */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 border-b relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="graph-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="10" y2="10" style={{ stroke: 'white', strokeWidth: 0.5 }} />
                <line x1="10" y1="0" x2="0" y2="10" style={{ stroke: 'white', strokeWidth: 0.5 }} />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#graph-pattern)" />
            </svg>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {optionType === "put" ? "Price Drop Protection" : "Purchase Price Lock"}
                </h3>
                <p className="text-blue-100 text-sm">Secured by The Bitcoin Insurance Company</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Badge className="bg-white text-blue-700 px-3 py-1 text-sm font-medium shadow-sm">
                {policy.protectionLevel.split(' ')[0]}
              </Badge>
              <div className="flex items-center mt-1">
                <BadgeCheck className="h-4 w-4 text-blue-200 mr-1" />
                <span className="text-blue-100 text-xs">Verified Non-Custodial</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Core Policy Details in Visually Improved Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Protected Value Card with Visual Enhancement */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute transform rotate-45 bg-blue-600 text-white text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center">
                  {optionType === "put" ? "Protection" : "Lock Price"}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  <p className="text-sm font-medium text-gray-700">Protected Value</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-gray-900">${parseInt(protectedValue).toLocaleString()}</p>
                </div>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  <span>{calculateThresholdDifference()}</span>
                </div>
                
                {/* Protection visualization */}
                <div className="mt-4 h-10 bg-gray-100 rounded-full overflow-hidden relative">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ 
                      width: `${optionType === "put" 
                        ? 100 - (parseInt(protectedValue) / btcPrice * 100)
                        : (parseInt(protectedValue) / btcPrice * 100)}%` 
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                    <span className="bg-white px-2 py-0.5 rounded-full shadow-sm">
                      Protected at ${parseInt(protectedValue).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Protection Period with Visual Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <p className="text-sm font-medium text-gray-700">Protection Period</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {duration === "halving" ? "Until Halving" : 
                   duration === "custom" ? "Custom" : 
                   `${duration} Days`}
                </p>
                
                {/* Visual timeline */}
                <div className="mt-4 relative">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }} />
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-xs text-gray-500">
                      <div className="font-medium">Start</div>
                      <div>{new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}</div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      <div className="font-medium">Expiry</div>
                      <div>{formatDatePretty(durationDays)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Policy Details in a 2-Column Grid with Enhanced Visuals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-medium text-gray-700">Protected Amount</p>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">{amount} BTC</p>
                <p className="text-sm text-gray-500">
                  ≈ ${(parseFloat(amount) * btcPrice).toLocaleString()}
                </p>
              </div>
              <div className="mt-3 flex items-center text-xs text-gray-500">
                <LockIcon className="h-3 w-3 mr-1" />
                <span>Remains in your wallet at all times</span>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute transform rotate-45 bg-green-600 text-white text-xs font-bold py-1 right-[-35px] top-[20px] w-[140px] text-center">
                  One-time Fee
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-medium text-gray-700">Protection Cost</p>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">${policy.total.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  One-time payment
                </p>
              </div>
              <div className="mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs flex items-center gap-1 text-blue-600 p-0"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? "Hide details" : "View details"}
                  {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </Button>
                
                {/* Expandable Cost Details */}
                {showDetails && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 pt-2 border-t border-gray-100 text-sm"
                  >
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Protection Premium</span>
                      <span className="text-gray-700">${policy.premium.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Network Fee</span>
                      <span className="text-gray-700">${policy.fees.toFixed(2)}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          {/* Enhanced Activation Details */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200 mb-6 shadow-sm">
            <div className="flex items-start">
              <div className="bg-blue-600 p-2 rounded-full mr-3">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Protection Activation</h4>
                <p className="text-sm text-blue-700 mb-3">
                  {optionType === "put" 
                    ? `Your protection becomes valuable when Bitcoin price falls below $${parseInt(protectedValue).toLocaleString()}.` 
                    : `Your price lock becomes valuable when Bitcoin price rises above $${parseInt(protectedValue).toLocaleString()}.`}
                </p>
                <p className="text-sm text-blue-700">
                  {optionType === "put"
                    ? "When activated, you can sell your Bitcoin at the protected value, regardless of how low the market price falls."
                    : "When activated, you can purchase Bitcoin at your locked price, regardless of how high the market price rises."
                  }
                </p>
                
                {/* Added visual trust indicator */}
                <div className="mt-4 flex items-center p-2 bg-white rounded-lg border border-blue-200">
                  <Badge variant="outline" className="mr-2 border-blue-300 bg-blue-50">
                    <BadgeCheck className="h-3 w-3 mr-1 text-blue-600" />
                    <span className="text-blue-700">Guaranteed</span>
                  </Badge>
                  <p className="text-xs text-blue-700">
                    Your protection is backed by smart contracts on the Stacks blockchain
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Risk Warning - Improved Visual Design */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 mb-6 shadow-sm">
            <div className="bg-amber-100 p-1.5 rounded-full">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-amber-800 mb-1">Important Risk Information</h4>
              <p className="text-xs text-amber-700">
                Bitcoin protection involves financial risk. The maximum cost is limited to your premium payment. 
                Protection is non-custodial and does not require depositing your Bitcoin.
              </p>
              
              {/* Added "Learn More" option */}
              <Button variant="link" size="sm" className="p-0 h-auto mt-1 text-amber-700 text-xs">
                <InfoIcon className="h-3 w-3 mr-1" />
                Learn more about risks
              </Button>
            </div>
          </div>
          
          {/* Added Policy Guarantee Section */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-100 p-1.5 rounded-full mr-3">
                  <BadgeCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">The Bitcoin Insurance Company Protection Guarantee</h4>
                  <p className="text-xs text-green-700 mt-0.5">
                    Your protection is guaranteed by smart contracts on the Stacks blockchain
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="border-green-300 bg-green-100 text-green-800">
                Verified Policy
              </Badge>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Enhanced Protection Scenarios with Interactive Elements */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-700" />
            <span>Protection Scenarios</span>
          </h3>
          
          {/* Enhanced Simulation Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              onClick={togglePnlPanel}
            >
              <BarChart className="h-4 w-4" />
              <span>Detailed Simulation</span>
            </Button>
          </motion.div>
        </div>
        
        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="mb-4 bg-gray-100">
            <TabsTrigger value="cards" className="data-[state=active]:bg-white">Visual Cards</TabsTrigger>
            <TabsTrigger value="table" className="data-[state=active]:bg-white">Table View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cards" className="space-y-4">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setActiveScenario(index)}
              >
                <Card className={`p-5 border overflow-hidden ${
                  scenario.color === 'green' ? 'border-l-4 border-l-green-500' : 
                  scenario.color === 'blue' ? 'border-l-4 border-l-blue-500' : 'border'
                } ${activeScenario === index ? 'ring-1 ring-blue-200 shadow-md' : 'shadow-sm'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${
                      scenario.color === 'gray' ? 'bg-gray-100 text-gray-700' : 
                      scenario.color === 'blue' ? 'bg-blue-100 text-blue-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {scenario.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900">{scenario.title}</h4>
                        <Badge 
                          className={`${
                            scenario.color === 'gray' ? "bg-gray-100 text-gray-800" : 
                            scenario.color === 'blue' ? "bg-blue-100 text-blue-800" : 
                            "bg-green-100 text-green-800"
                          } shadow-sm`}
                        >
                          {scenario.outcome}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="bg-gray-50 p-2 rounded-md">
                          <p className="text-xs text-gray-500 mb-1">BTC Price</p>
                          <p className="font-medium">${scenario.btcPrice.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-md">
                          <p className="text-xs text-gray-500 mb-1">Net Result</p>
                          <p className={`font-medium ${scenario.savings > 0 ? "text-green-600" : "text-red-600"}`}>
                            {scenario.savings > 0 ? '+' : ''}${scenario.savings.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        {scenario.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
          
          <TabsContent value="table">
            <Card className="overflow-hidden border shadow-sm">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-medium">Scenario</TableHead>
                    <TableHead className="font-medium">Bitcoin Price</TableHead>
                    <TableHead className="font-medium">Outcome</TableHead>
                    <TableHead className="text-right font-medium">Net Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scenarios.map((scenario, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded-full ${
                            scenario.color === 'gray' ? 'bg-gray-100' : 
                            scenario.color === 'blue' ? 'bg-blue-100' : 
                            'bg-green-100'
                          }`}>
                            {scenario.icon}
                          </div>
                          {scenario.title}
                        </div>
                      </TableCell>
                      <TableCell>${scenario.btcPrice.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`${
                            scenario.color === 'gray' ? "bg-gray-100 text-gray-800" : 
                            scenario.color === 'blue' ? "bg-blue-100 text-blue-800" : 
                            "bg-green-100 text-green-800"
                          }`}
                        >
                          {scenario.outcome}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`font-medium ${scenario.savings > 0 ? "text-green-600" : "text-red-600"}`}>
                          {scenario.savings > 0 ? '+' : ''}${Math.abs(scenario.savings).toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 