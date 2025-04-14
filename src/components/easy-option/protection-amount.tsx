import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Shield, ArrowLeftRight, Wallet, BadgeCheck, Bitcoin, ChevronDown, ChevronUp, CircleDollarSign, Lock, Check } from "lucide-react";
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
        <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-700 rounded-full">
          Step 3 of 6
        </Badge>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Enter the amount of Bitcoin you want to protect against price volatility.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Protection Amount Card - Updated to slate style */}
        <Card className="overflow-hidden shadow-sm border rounded-lg">
          {/* Header with slate styling */}
          <div className="bg-slate-900 p-6 text-white flex flex-col items-center justify-center">
            <div className="bg-white p-3 rounded-full mb-4">
              <Bitcoin className="h-6 w-6 text-slate-700" />
            </div>
            <h3 className="text-xl font-bold mb-1">Protection Amount</h3>
            <p className="text-slate-300 text-sm">
              Enter the amount to secure
            </p>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-5">
              <div className="flex-grow">
                <div className="mb-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">
                      Amount to Protect
                    </label>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs border-slate-300 text-slate-700 hover:bg-slate-100"
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
                    className="pr-16 border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                    {...inputAttributes}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-slate-500 font-medium">
                    {isInSats ? "sats" : "BTC"}
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="mb-2">
                  <label className="text-sm font-medium text-slate-700">
                    USD Value
                  </label>
                </div>
                <div className="bg-slate-100 border border-slate-300 rounded px-3 py-2.5 text-right font-medium text-slate-900">
                  ${btcUsdValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
              </div>
            </div>
            
            <div className="mb-5">
              <label className="text-sm font-medium text-slate-700 mb-2 block">
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
                      className={`border-slate-300 ${amount === val ? 'bg-slate-100 border-slate-400 text-slate-900' : ''}`}
                    >
                      {val} BTC
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Information box with slate styling */}
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <CircleDollarSign className="h-4 w-4 text-slate-600" />
                <p className="text-sm font-medium text-slate-700">Current Value</p>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                The cost of your protection will be based on this amount. Larger amounts will have proportionally higher premiums.
              </p>
              <div className="flex items-center bg-white p-2 rounded border border-slate-200">
                <Badge variant="outline" className="mr-2 border-slate-300 bg-slate-100 rounded-full">
                  <BadgeCheck className="h-3 w-3 mr-1 text-slate-600" />
                  <span className="text-slate-700">Verified</span>
                </Badge>
                <p className="text-xs text-slate-700">
                  Protection verified by Stacks smart contracts
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Wallet Card - Updated to slate style */}
        <Card className="overflow-hidden shadow-sm border rounded-lg">
          {/* Header with slate styling */}
          <div className="bg-slate-800 p-6 text-white flex flex-col items-center justify-center">
            <div className="bg-white p-3 rounded-full mb-4">
              <Wallet className="h-6 w-6 text-slate-700" />
            </div>
            <h3 className="text-xl font-bold mb-1">Your Wallet</h3>
            <p className="text-slate-300 text-sm">
              Connected wallet balance
            </p>
          </div>
          
          <div className="p-6">
            {walletConnected ? (
              <>
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-slate-700">Available Balance</p>
                    <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-600 rounded-full">Connected</Badge>
                  </div>
                  
                  <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 text-center mb-4">
                    <div className="flex justify-center items-center gap-2 mb-1">
                      <Bitcoin className="h-5 w-5 text-amber-500" />
                      <p className="text-2xl font-bold text-slate-900">{parseFloat(walletBalance).toFixed(8)}</p>
                    </div>
                    <p className="text-sm text-slate-600">
                      ${(parseFloat(walletBalance) * btcPrice).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>
                  </div>
                  
                  {/* Protection percentage indicator */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-slate-700">Amount Being Protected</p>
                      <p className="text-sm font-medium text-slate-700">{protectionPercentage.toFixed(0)}%</p>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-700"
                        style={{ width: `${protectionPercentage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 bg-slate-100 rounded border border-slate-200">
                    <Lock className="h-4 w-4 text-slate-600 mr-2" />
                    <p className="text-xs text-slate-600">
                      Your Bitcoin stays in your wallet at all times
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100"
                    onClick={() => {
                      setAmount(walletBalance);
                      setIsInSats(false);
                      setDisplayAmount(walletBalance);
                    }}
                  >
                    Protect All My Bitcoin
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="mb-4">
                  <div className="bg-slate-100 p-4 inline-block rounded-full mb-3">
                    <Wallet className="h-8 w-8 text-slate-400" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-700 mb-2">No Wallet Connected</h4>
                  <p className="text-sm text-slate-500 mb-6">
                    Connect your wallet to see your balance and easily protect your Bitcoin holdings.
                  </p>
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100"
                  >
                    Connect Wallet
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  Note: You can still create protection without connecting a wallet.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Education section with slate styling */}
      <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg border border-slate-300 shadow-sm">
        <button 
          className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
          onClick={() => setIsEducationExpanded(!isEducationExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-2 rounded-full">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">How Bitcoin Protection Amount Works</h3>
          </div>
          {isEducationExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-600" />
          )}
        </button>
        
        {isEducationExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 pt-0 border-t border-slate-300"
          >
            <p className="text-sm text-slate-700 mb-3">
              The Bitcoin amount you specify determines how much of your holdings will be protected against price volatility.
            </p>
            <ul className="text-sm text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <Check className="h-3 w-3 text-slate-600" />
                </div>
                <span>You can protect any amount of Bitcoin, even if it&apos;s not currently in your wallet</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <Check className="h-3 w-3 text-slate-600" />
                </div>
                <span>Premium costs are proportional to the amount being protected</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-white p-1 rounded-full mt-0.5">
                  <Check className="h-3 w-3 text-slate-600" />
                </div>
                <span>You can protect any fraction of your total holdings</span>
              </li>
            </ul>
            
            {/* Trust indicator */}
            <div className="mt-4 flex items-center p-2 bg-white rounded-lg border border-slate-300">
              <Badge variant="outline" className="mr-2 border-slate-300 bg-slate-100 rounded-full">
                <BadgeCheck className="h-3 w-3 mr-1 text-slate-600" />
                <span className="text-slate-700">Non-custodial</span>
              </Badge>
              <p className="text-xs text-slate-700">
                Your Bitcoin stays in your wallet—we never take custody of your funds
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 