import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Info, Coins, LockIcon, AlertCircle, Check, DollarSign, PercentIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

interface CapitalCommitmentProps {
  amount: string;
  setAmount: (amount: string) => void;
  walletBalance?: string;
  walletConnected: boolean;
  incomeStrategy?: "stability" | "upside";
  riskTier?: "conservative" | "balanced" | "aggressive";
}

export function CapitalCommitment({
  amount,
  setAmount,
  walletBalance = "0",
  walletConnected,
  incomeStrategy = "stability",
  riskTier = "balanced"
}: CapitalCommitmentProps) {
  const [collateralType, setCollateralType] = useState<"stx" | "sbtc">("stx");
  const [sbtcBalance] = useState("0.25"); // Mock sBTC balance for demo
  const [isCalculating, setIsCalculating] = useState(false);
  const [formattedAmount, setFormattedAmount] = useState("");

  // Format the display amount with commas
  useEffect(() => {
    if (amount) {
      const numericAmount = parseFloat(amount);
      if (!isNaN(numericAmount)) {
        if (collateralType === "sbtc") {
          setFormattedAmount(numericAmount.toLocaleString(undefined, { 
            minimumFractionDigits: 0,
            maximumFractionDigits: 8 
          }));
        } else {
          setFormattedAmount(numericAmount.toLocaleString(undefined, { 
            minimumFractionDigits: 0,
            maximumFractionDigits: 2 
          }));
        }
      }
    } else {
      setFormattedAmount("");
    }
  }, [amount, collateralType]);

  // Handle percentage selection (25%, 50%, 75%, 100%)
  const handlePercentage = (percentage: number) => {
    if (!walletConnected) return;
    
    const maxAmount = parseFloat(collateralType === "stx" ? walletBalance : sbtcBalance);
    if (isNaN(maxAmount)) return;
    
    // Show calculating effect
    setIsCalculating(true);
    setTimeout(() => {
      const newAmount = (maxAmount * percentage / 100).toFixed(collateralType === "sbtc" ? 8 : 2);
      setAmount(newAmount);
      setIsCalculating(false);
    }, 300);
  };

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    if (!walletConnected) return;
    
    const maxAmount = parseFloat(collateralType === "stx" ? walletBalance : sbtcBalance);
    if (isNaN(maxAmount)) return;
    
    const percentage = value[0];
    const newAmount = (maxAmount * percentage / 100).toFixed(collateralType === "sbtc" ? 8 : 2);
    setAmount(newAmount);
  };

  // Handle input change with formatting
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    setAmount(numericValue);
  };

  // Get collateralization ratio based on collateral type
  const getCollateralRatio = () => {
    if (collateralType === "sbtc") {
      return 1.1; // 110% collateralization for sBTC
    } else {
      // Higher ratios for STX based on risk tier
      switch (riskTier) {
        case "conservative": return 1.5; // 150% for conservative
        case "balanced": return 1.75; // 175% for balanced
        case "aggressive": return 2.0; // 200% for aggressive
        default: return 1.75;
      }
    }
  };

  // Calculate the required collateral amount
  const calculateRequiredCollateral = () => {
    const baseAmount = parseFloat(amount);
    if (isNaN(baseAmount)) return 0;
    
    const ratio = getCollateralRatio();
    return baseAmount * ratio;
  };

  // Calculate the USD value
  const calculateUsdValue = () => {
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue)) return 0;
    
    // Simplified conversion rates for demo
    return collateralType === "stx" ? amountValue * 2 : amountValue * 40000;
  };

  const usdValue = calculateUsdValue().toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Calculate the percentage of wallet balance committed
  const calculateCommitmentPercentage = () => {
    if (!walletConnected) return 0;
    
    const balance = parseFloat(collateralType === "stx" ? walletBalance : sbtcBalance);
    const amountValue = parseFloat(amount);
    
    if (isNaN(balance) || isNaN(amountValue) || balance === 0) return 0;
    
    return Math.min(Math.round((amountValue / balance) * 100), 100);
  };

  // Get estimated APY based on risk tier
  const getEstimatedApy = () => {
    switch (riskTier) {
      case "conservative": return "3-5%";
      case "balanced": return "6-9%";
      case "aggressive": return "8-15%";
      default: return "6-9%";
    }
  };

  // Calculate average APY for yield calculation
  const getAverageApy = () => {
    switch (riskTier) {
      case "conservative": return 0.04; // 4%
      case "balanced": return 0.075; // 7.5%
      case "aggressive": return 0.115; // 11.5%
      default: return 0.075; // 7.5%
    }
  };

  // Get strategy name
  const getStrategyName = () => {
    return incomeStrategy === "stability" ? "Bitcoin Stability Income" : "Bitcoin Upside Income";
  };

  // Get minimum amount based on collateral type
  const getMinAmount = () => {
    return collateralType === "sbtc" ? 0.001 : 10;
  };

  // Check if amount is valid
  const isValidAmount = () => {
    const amountValue = parseFloat(amount);
    return !isNaN(amountValue) && amountValue >= getMinAmount();
  };

  const commitmentPercentage = calculateCommitmentPercentage();
  const collateralRatio = getCollateralRatio();
  const requiredCollateral = calculateRequiredCollateral();

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold">Capital Commitment</h2>
        <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-700 rounded-full">
          Step 3 of 6
        </Badge>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Specify how much capital and which collateral type you want to commit to this income strategy.
      </p>

      {!amount && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 flex items-center gap-2 shadow-sm">
          <Wallet className="h-4 w-4 flex-shrink-0 text-amber-600" aria-hidden="true" />
          <p>Please enter an amount and select a collateral type to continue to the next step.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left Column - Capital Commitment */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-amber-100 shadow-sm">
            {/* Header */}
            <div className="bg-amber-900 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 rounded-full p-3">
                  <Coins className="h-6 w-6 text-amber-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Capital Commitment</h3>
                  <p className="text-sm text-amber-200">Enter the amount to commit</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Collateral Type Selection */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Collateral Type
                </Label>
                <RadioGroup 
                  defaultValue={collateralType}
                  onValueChange={(value) => {
                    setIsCalculating(true);
                    setTimeout(() => {
                      setCollateralType(value as "stx" | "sbtc");
                      setIsCalculating(false);
                    }, 300);
                  }}
                  className="flex gap-4"
                  aria-label="Select collateral type"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stx" id="stx" aria-label="STX" />
                    <Label 
                      htmlFor="stx" 
                      className={`cursor-pointer transition-colors ${collateralType === "stx" ? "font-semibold text-amber-900" : ""}`}
                    >
                      STX
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge 
                            variant="outline" 
                            className={`ml-1 transition-colors ${
                              collateralType === "stx" 
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300" 
                                : "bg-amber-50 text-amber-800 hover:bg-amber-100"
                            } cursor-help`}
                          >
                            {collateralRatio * 100}% ratio
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-xs">
                            STX requires a higher collateralization ratio ({collateralRatio * 100}%) 
                            due to its higher volatility relative to BTC.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sbtc" id="sbtc" aria-label="sBTC" />
                    <Label 
                      htmlFor="sbtc" 
                      className={`cursor-pointer transition-colors ${collateralType === "sbtc" ? "font-semibold text-amber-900" : ""}`}
                    >
                      sBTC
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge 
                            variant="outline" 
                            className={`ml-1 transition-colors ${
                              collateralType === "sbtc" 
                                ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-300" 
                                : "bg-green-50 text-green-800 hover:bg-green-100"
                            } cursor-help`}
                          >
                            110% ratio
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-xs">
                            sBTC has a lower collateralization ratio (110%) due to its 
                            direct 1:1 backing by Bitcoin.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </RadioGroup>
              </div>

              {/* Amount Input */}
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                      Amount to Commit
                    </Label>
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1 group">
                        <Input
                          id="amount"
                          type="text"
                          value={formattedAmount || ""}
                          onChange={handleInputChange}
                          placeholder={`Enter ${collateralType.toUpperCase()} amount`}
                          className={`pr-16 rounded-md transition-colors ${
                            isValidAmount() 
                              ? "border-amber-200 focus:border-amber-500 focus:ring-amber-500" 
                              : "border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                          }`}
                          aria-label={`Amount to commit in ${collateralType.toUpperCase()}`}
                          aria-describedby="amount-min-max"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500">{collateralType.toUpperCase()}</span>
                        </div>
                        {isValidAmount() && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-12"
                          >
                            <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs mt-1 text-gray-500" id="amount-min-max">
                      <span>Min: {getMinAmount()} {collateralType.toUpperCase()}</span>
                      <span>Max: {parseFloat(collateralType === "stx" ? walletBalance : sbtcBalance)} {collateralType.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-gray-500" aria-hidden="true" />
                      USD Value
                    </span>
                    <span className="font-medium">{usdValue}</span>
                  </div>
                </div>

                {/* Collateralization Info */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    backgroundColor: isCalculating ? '#fff8e6' : '#fffbeb'
                  }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-lg border border-amber-200 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-100">
                    <Info className="h-4 w-4 text-amber-600" aria-hidden="true" />
                    <span className="text-sm font-semibold text-amber-800">Collateralization Summary</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`${collateralType}-${amount}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex justify-between text-sm text-amber-800">
                        <span>Base Amount:</span>
                        <span className="font-medium">
                          {parseFloat(amount || "0").toFixed(collateralType === "sbtc" ? 8 : 2)} {collateralType.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-amber-800">
                        <span>Collateralization Ratio:</span>
                        <span className="font-medium flex items-center gap-1">
                          <PercentIcon className="h-3.5 w-3.5" aria-hidden="true" />
                          {(collateralRatio * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-amber-800 font-medium pt-2 border-t border-amber-200">
                        <span>Required Collateral:</span>
                        <span className="text-amber-900">
                          {requiredCollateral.toFixed(collateralType === "sbtc" ? 8 : 2)} {collateralType.toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Percentage Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm text-gray-700">Amount to commit:</Label>
                    <span className="text-sm font-medium text-amber-800">{commitmentPercentage}% of balance</span>
                  </div>
                  <Slider
                    defaultValue={[0]}
                    value={[commitmentPercentage]}
                    max={100}
                    step={1}
                    onValueChange={handleSliderChange}
                    className="py-2"
                    aria-label="Select percentage of balance to commit"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handlePercentage(25)}
                      className={cn(
                        "transition-all bg-white hover:bg-amber-50 border-amber-200 hover:border-amber-300 text-amber-700",
                        commitmentPercentage === 25 && "bg-amber-50 border-amber-300 font-medium"
                      )}
                      aria-pressed={commitmentPercentage === 25}
                    >
                      25%
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handlePercentage(50)}
                      className={cn(
                        "transition-all bg-white hover:bg-amber-50 border-amber-200 hover:border-amber-300 text-amber-700",
                        commitmentPercentage === 50 && "bg-amber-50 border-amber-300 font-medium"
                      )}
                      aria-pressed={commitmentPercentage === 50}
                    >
                      50%
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handlePercentage(75)}
                      className={cn(
                        "transition-all bg-white hover:bg-amber-50 border-amber-200 hover:border-amber-300 text-amber-700",
                        commitmentPercentage === 75 && "bg-amber-50 border-amber-300 font-medium"
                      )}
                      aria-pressed={commitmentPercentage === 75}
                    >
                      75%
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handlePercentage(100)}
                      className={cn(
                        "transition-all bg-white hover:bg-amber-50 border-amber-200 hover:border-amber-300 text-amber-700",
                        commitmentPercentage === 100 && "bg-amber-50 border-amber-300 font-medium"
                      )}
                      aria-pressed={commitmentPercentage === 100}
                    >
                      100%
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Wallet/Info */}
        <div className="space-y-6">
          {/* Wallet Card */}
          <Card className="overflow-hidden border-amber-100 shadow-sm">
            <div className="bg-amber-900 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 rounded-full p-3">
                  <Wallet className="h-6 w-6 text-amber-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Your Wallet</h3>
                  <p className="text-sm text-amber-200">Connected wallet balance</p>
                </div>
              </div>
              <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-200">
                Connected
              </Badge>
            </div>

            <CardContent className="p-6">
              <div className="mb-6 space-y-4">
                {/* STX Balance */}
                <motion.div 
                  className={`p-4 rounded-lg border transition-all ${
                    collateralType === "stx" 
                      ? "bg-amber-50/80 border-amber-200 shadow-sm" 
                      : "bg-gray-50/60 border-gray-200"
                  }`}
                  animate={{ 
                    scale: collateralType === "stx" ? 1.02 : 1,
                    boxShadow: collateralType === "stx" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">STX Balance:</span>
                    <div>
                      <span className={`font-bold text-xl ${collateralType === "stx" ? "text-amber-900" : "text-gray-700"}`}>
                        {parseFloat(walletBalance).toFixed(2)} <span className="text-sm">STX</span>
                      </span>
                      <div className="text-xs text-gray-500">
                        ${(parseFloat(walletBalance) * 2).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* sBTC Balance */}
                <motion.div 
                  className={`p-4 rounded-lg border transition-all ${
                    collateralType === "sbtc" 
                      ? "bg-amber-50/80 border-amber-200 shadow-sm" 
                      : "bg-gray-50/60 border-gray-200"
                  }`}
                  animate={{ 
                    scale: collateralType === "sbtc" ? 1.02 : 1,
                    boxShadow: collateralType === "sbtc" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">sBTC Balance:</span>
                    <div>
                      <span className={`font-bold text-xl ${collateralType === "sbtc" ? "text-amber-900" : "text-gray-700"}`}>
                        {parseFloat(sbtcBalance).toFixed(8)} <span className="text-sm">sBTC</span>
                      </span>
                      <div className="text-xs text-gray-500">
                        ${(parseFloat(sbtcBalance) * 40000).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Amount Being Committed */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Amount Being Committed</span>
                  <span className="text-sm font-medium">{commitmentPercentage}%</span>
                </div>
                <Progress 
                  value={commitmentPercentage} 
                  className="h-2 bg-gray-100" 
                  aria-label={`${commitmentPercentage}% of balance committed`}
                />
                <div className="mt-1 text-xs text-gray-500 flex justify-between">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Collateral Type Information Alert */}
              <motion.div 
                key={collateralType}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-4"
              >
                <div className="flex gap-2 text-amber-800">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium mb-1">About {collateralType.toUpperCase()} as Collateral</p>
                    {collateralType === "stx" ? (
                      <p className="text-xs">
                        STX requires a higher collateralization ratio ({collateralRatio * 100}%) due to its higher volatility
                        relative to Bitcoin, but offers greater availability as it&apos;s native to the platform.
                      </p>
                    ) : (
                      <p className="text-xs">
                        sBTC has a lower collateralization ratio (110%) due to its direct 1:1 backing by Bitcoin, offering
                        more capital efficiency but may be less available.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Lock Icon with text */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <LockIcon className="h-4 w-4 text-amber-600" aria-hidden="true" />
                <span>Your {collateralType.toUpperCase()} always remains securely locked in non-custodial contracts</span>
              </div>

              {/* Income Projection */}
              <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <Info className="h-4 w-4" aria-hidden="true" />
                  Income Projection
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Strategy:</span>
                    <span className="font-medium">{getStrategyName()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk-Reward Tier:</span>
                    <span className="font-medium capitalize">{riskTier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Collateral Type:</span>
                    <span className="font-medium uppercase">{collateralType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated APY:</span>
                    <span className="font-medium text-amber-600">{getEstimatedApy()}</span>
                  </div>
                  <div className="border-t border-amber-100 pt-3 mt-3">
                    <div className="flex justify-between font-medium">
                      <span>Potential Annual Yield:</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${amount}-${collateralType}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-amber-600 font-semibold"
                        >
                          {isNaN(parseFloat(amount)) ? '0.00' : (parseFloat(amount) * getAverageApy()).toFixed(collateralType === "sbtc" ? 8 : 2)} {collateralType.toUpperCase()}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      Calculated at median APY ({(getAverageApy() * 100).toFixed(1)}%)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pool Visualization Section */}
      {parseFloat(amount) > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl border border-amber-100 p-6 mb-8 shadow-sm"
        >
          <h3 className="text-lg font-medium mb-4 text-amber-900 flex items-center gap-2">
            <Coins className="h-5 w-5 text-amber-600" aria-hidden="true" />
            Pool Contribution Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-amber-50/50 rounded-lg border border-amber-100 p-4 hover:bg-amber-50 transition-colors"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <h4 className="text-sm font-medium text-amber-900 mb-2">Your Commitment</h4>
              <div className="text-2xl font-bold text-amber-600 mb-1">
                {parseFloat(amount).toFixed(collateralType === "sbtc" ? 8 : 2)} {collateralType.toUpperCase()}
              </div>
              <div className="text-sm text-gray-600">Contributing to income generation pool</div>
            </motion.div>
            <motion.div 
              className="bg-amber-50/50 rounded-lg border border-amber-100 p-4 hover:bg-amber-50 transition-colors"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <h4 className="text-sm font-medium text-amber-900 mb-2">Total Pool Size</h4>
              <div className="text-2xl font-bold text-amber-900 mb-1">
                {collateralType === "stx" ? "25,000 STX" : "1.25 sBTC"}
              </div>
              <div className="text-sm text-gray-600">From 120 protection providers</div>
            </motion.div>
            <motion.div 
              className="bg-amber-50/50 rounded-lg border border-amber-100 p-4 hover:bg-amber-50 transition-colors"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <h4 className="text-sm font-medium text-amber-900 mb-2">Your Share</h4>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {(parseFloat(amount) / (collateralType === "stx" ? 25000 : 1.25) * 100).toFixed(2)}%
              </div>
              <div className="text-sm text-gray-600">Of total income distribution</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 