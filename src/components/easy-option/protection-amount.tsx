import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeftRight, Wallet, BadgeCheck, Bitcoin, DollarSign, ChevronDown, ChevronUp, CircleDollarSign, Lock } from "lucide-react";
import { useMarketStore } from "@/store/market-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ProtectionAmountProps {
  amount: string;
  setAmount: (amount: string) => void;
  walletBalance?: string;
  walletConnected?: boolean;
}

// Constants for BTC<->sats conversion
const SATS_PER_BTC = 100000000;

export function ProtectionAmount({
  amount,
  setAmount,
  walletBalance = "0",
  walletConnected = false,
}: ProtectionAmountProps) {
  const { btcPrice = 48500 } = useMarketStore();
  const [isEducationExpanded, setIsEducationExpanded] = useState(false);
  
  // State for tracking if user is entering in BTC or sats
  const [isInSats, setIsInSats] = useState<boolean>(false);
  
  // Local state for the displayed amount based on current unit
  const [displayAmount, setDisplayAmount] = useState<string>(amount);
  
  // Calculate the USD value of Bitcoin amount
  const btcUsdValue = parseFloat(amount) * btcPrice || 0;
  
  // Convert between BTC and sats
  const btcToSats = (btc: number): number => {
    return Math.round(btc * SATS_PER_BTC);
  };
  
  const satsToBtc = (sats: number): number => {
    return sats / SATS_PER_BTC;
  };
  
  // Toggle between BTC and sats
  const toggleUnit = () => {
    if (isInSats) {
      // Converting from sats to BTC
      const satsValue = parseFloat(displayAmount) || 0;
      const btcValue = satsToBtc(satsValue);
      setDisplayAmount(btcValue.toString());
      setAmount(btcValue.toString());
    } else {
      // Converting from BTC to sats
      const btcValue = parseFloat(displayAmount) || 0;
      const satsValue = btcToSats(btcValue);
      setDisplayAmount(satsValue.toString());
    }
    setIsInSats(!isInSats);
  };
  
  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayAmount(inputValue);
    
    // If in sats mode, convert to BTC for internal storage
    if (isInSats) {
      const satsValue = parseFloat(inputValue) || 0;
      const btcValue = satsToBtc(satsValue);
      setAmount(btcValue.toString());
    } else {
      setAmount(inputValue);
    }
  };
  
  // Get appropriate input validation attributes based on unit
  const getInputAttributes = () => {
    if (isInSats) {
      return {
        step: "1",
        min: "1000000", // 0.01 BTC = 1,000,000 sats
        placeholder: "1000000"
      };
    } else {
      return {
        step: "0.01",
        min: "0.01",
        placeholder: "0.1"
      };
    }
  };
  
  const inputAttributes = getInputAttributes();
  
  // Calculate percentage of holdings being protected
  const getProtectionPercentage = () => {
    if (!walletConnected || walletBalance === "0") return 0;
    const amountValue = parseFloat(amount) || 0;
    const balanceValue = parseFloat(walletBalance) || 1;
    return Math.min((amountValue / balanceValue) * 100, 100);
  };
  
  const protectionPercentage = getProtectionPercentage();
  
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold">How Much Bitcoin Do You Want to Protect?</h2>
        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
          Step 3 of 6
        </Badge>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Enter the amount of Bitcoin you want to protect against price volatility.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Enhanced Protection Amount Card */}
        <Card className="overflow-hidden shadow-sm border">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <Bitcoin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Protection Amount</h3>
                <p className="text-blue-100 text-sm">
                  Enter the amount to secure
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-5">
              <div className="flex-grow">
                <div className="mb-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">
                      Amount to Protect
                    </label>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={toggleUnit}
                      >
                        <ArrowLeftRight className="h-3 w-3 mr-1" />
                        {isInSats ? "Switch to BTC" : "Switch to Sats"}
                      </Button>
                    </motion.div>
                  </div>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    value={displayAmount}
                    onChange={handleAmountChange}
                    className="pr-16 border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                    {...inputAttributes}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 font-medium">
                    {isInSats ? "sats" : "BTC"}
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    USD Value
                  </label>
                </div>
                <div className="bg-gray-50 border rounded px-3 py-2.5 text-right font-medium text-gray-900">
                  ${btcUsdValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
              </div>
            </div>
            
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Quick select:
              </label>
              <div className="flex gap-2 flex-wrap">
                {["0.1", "0.25", "0.5", "1"].map((val) => (
                  <motion.div
                    key={val}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      key={val}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setAmount(val);
                        setIsInSats(false);
                        setDisplayAmount(val);
                      }}
                      className={`border-gray-300 ${amount === val ? 'bg-blue-50 border-blue-300 text-blue-700' : ''}`}
                    >
                      {val} BTC
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Added information box */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <CircleDollarSign className="h-4 w-4 text-gray-600" />
                <p className="text-sm font-medium text-gray-700">Current Value</p>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                The cost of your protection will be based on this amount. Larger amounts will have proportionally higher premiums.
              </p>
              <div className="flex items-center bg-white p-2 rounded border border-gray-200">
                <Badge variant="outline" className="mr-2 border-blue-300 bg-blue-50">
                  <BadgeCheck className="h-3 w-3 mr-1 text-blue-600" />
                  <span className="text-blue-700">Verified</span>
                </Badge>
                <p className="text-xs text-gray-700">
                  Protection verified by Stacks smart contracts
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Enhanced Wallet Card */}
        <Card className="overflow-hidden shadow-sm border">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <Wallet className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Your Wallet</h3>
                <p className="text-green-100 text-sm">
                  Available balance & protection
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-5">
            {walletConnected ? (
              <div className="space-y-5">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Your Balance</p>
                  <div className="flex justify-between items-end">
                    <p className="text-2xl font-bold">{walletBalance} BTC</p>
                    <p className="text-sm text-gray-500">
                      ≈ ${(parseFloat(walletBalance) * btcPrice).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium text-gray-700">Protection Coverage</p>
                    <p className="text-sm font-semibold">{protectionPercentage.toFixed(0)}%</p>
                  </div>
                  
                  <div className="h-2.5 w-full bg-gray-200 rounded-full mb-2">
                    <div 
                      className="h-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" 
                      style={{width: `${protectionPercentage}%`}}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <p>0%</p>
                    <p>50%</p>
                    <p>100%</p>
                  </div>
                </div>
                
                {/* Protection recommendation box */}
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-2">
                    <div className="bg-amber-100 p-1 rounded-full mt-0.5">
                      <Lock className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-800 mb-1">Recommendation</p>
                      <p className="text-sm text-amber-700">
                        {protectionPercentage < 25 
                          ? "Consider protecting more of your Bitcoin for better coverage."
                          : protectionPercentage > 90
                          ? "You&apos;re protecting most of your Bitcoin. Great security choice!"
                          : "You have a balanced protection strategy."}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-600" />
                      <p className="text-sm font-medium text-gray-700">Unprotected Value</p>
                    </div>
                    <p className="text-sm font-semibold">
                      {(parseFloat(walletBalance) - parseFloat(amount)).toFixed(4)} BTC
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    This portion of your Bitcoin remains unprotected and subject to market volatility.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 p-3 rounded-full mb-3">
                  <Wallet className="h-6 w-6 text-gray-500" />
                </div>
                <p className="text-gray-700 mb-4">Connect your wallet to see your balance</p>
                <Badge variant="outline" className="cursor-not-allowed opacity-70 px-4 py-1">
                  Wallet Not Connected
                </Badge>
                <p className="text-xs text-gray-500 mt-4 max-w-md">
                  Your balance information helps us provide better protection recommendations.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Enhanced education section with consistent styling */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 shadow-sm">
        <button 
          className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
          onClick={() => setIsEducationExpanded(!isEducationExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-full">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-blue-800">Understanding Protection Amounts</h3>
          </div>
          {isEducationExpanded ? (
            <ChevronUp className="w-4 h-4 text-blue-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-blue-600" />
          )}
        </button>
        
        {isEducationExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 pt-0 border-t border-blue-200"
          >
            <p className="text-sm text-blue-700 mb-3">
              The protection amount determines how much of your Bitcoin is protected against price volatility.
            </p>
            
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <BadgeCheck className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-sm text-blue-700">You can protect any amount of Bitcoin, not just what&apos;s in your wallet</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <BadgeCheck className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-sm text-blue-700">Protection premium scales proportionally with the amount protected</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <BadgeCheck className="h-3 w-3 text-blue-600" />
                </div>
                <span className="text-sm text-blue-700">You can create multiple protection policies for different portions of your holdings</span>
              </li>
            </ul>
            
            <div className="mt-4 flex items-center p-2 bg-white rounded-lg border border-blue-200">
              <Badge variant="outline" className="mr-2 border-blue-300 bg-blue-50">
                <BadgeCheck className="h-3 w-3 mr-1 text-blue-600" />
                <span className="text-blue-700">Non-Custodial</span>
              </Badge>
              <p className="text-xs text-blue-700">
                Your Bitcoin remains in your wallet at all times during protection
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 