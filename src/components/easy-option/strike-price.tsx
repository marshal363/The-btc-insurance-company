import React, { useState, useEffect } from "react";
import { useMarketStore } from "@/store/market-store";
import { ArrowUp, ArrowDown, Shield, ArrowLeftRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ProtectionType } from "./protection-type-selector";

interface StrikePriceProps {
  optionType: "call" | "put";
  strikePrice: string;
  setStrikePrice: (price: string) => void;
  protectionType: ProtectionType;
  amount: string;
  setAmount: (amount: string) => void;
}

// Constants for BTC<->sats conversion
const SATS_PER_BTC = 100000000;

export function StrikePrice({ 
  optionType, 
  strikePrice, 
  setStrikePrice,
  protectionType,
  amount,
  setAmount
}: StrikePriceProps) {
  const { btcPrice = 48500 } = useMarketStore();
  
  // Local state for the slider percentage
  const [sliderValue, setSliderValue] = useState<number>(100);
  
  // State for tracking if user is entering in BTC or sats
  const [isInSats, setIsInSats] = useState<boolean>(false);
  
  // Local state for the displayed amount based on current unit
  const [displayAmount, setDisplayAmount] = useState<string>(amount);
  
  // Calculate the USD value of Bitcoin amount
  const btcUsdValue = parseFloat(amount) * btcPrice || 0;
  
  // Update strike price when slider changes
  const handleSliderChange = (value: number[]) => {
    const percent = value[0];
    setSliderValue(percent);
    
    // Calculate new strike price based on percentage
    let newPrice: number;
    if (optionType === "put") {
      // For put options, decrease from current price (0.8-1.0)
      newPrice = Math.round(btcPrice * (0.8 + 0.2 * (percent / 100)));
    } else {
      // For call options, increase from current price (1.0-1.2)
      newPrice = Math.round(btcPrice * (1 + 0.2 * (percent / 100)));
    }
    setStrikePrice(newPrice.toString());
  };
  
  // Directly update strike price on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrikePrice(e.target.value);
  };

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
  
  // Update display amount when isInSats changes
  useEffect(() => {
    if (isInSats) {
      const btcValue = parseFloat(amount) || 0;
      setDisplayAmount(btcToSats(btcValue).toString());
    } else {
      setDisplayAmount(amount);
    }
  }, [isInSats, amount]);
  
  // Update slider when option type changes
  useEffect(() => {
    setSliderValue(50);
    const basePrice = optionType === "put" ? 0.9 * btcPrice : 1.1 * btcPrice;
    setStrikePrice(Math.round(basePrice).toString());
  }, [optionType, btcPrice, setStrikePrice]);
  
  // Calculate the protection level label
  const protectionLevelText = () => {
    if (optionType === "put") {
      const percentBelow = 100 - Math.round((parseInt(strikePrice) / btcPrice) * 100);
      return `Protection ${percentBelow}% below current price`;
    } else {
      const percentAbove = Math.round((parseInt(strikePrice) / btcPrice) * 100) - 100;
      return `Lock in price ${percentAbove}% above current price`;
    }
  };
  
  // Get title and description based on protection type and option type
  const getTitle = () => {
    if (protectionType === "hodl") {
      return "Customize Your Protection Policy";
    } else {
      return "Customize Your Price Lock Policy";
    }
  };
  
  const getDescription = () => {
    if (protectionType === "hodl") {
      return "Select the Bitcoin value you want to protect and the amount you want to cover.";
    } else {
      return "Set your guaranteed purchase price and the amount of Bitcoin you want to secure.";
    }
  };

  // Get the label for the strike price section
  const getStrikePriceLabel = () => {
    if (protectionType === "hodl") {
      return "Protected Value:";
    } else {
      return "Guaranteed Purchase Price:";
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
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{getTitle()}</h2>
      <p className="text-muted-foreground mb-6">
        {getDescription()}
      </p>
      
      <div className="mb-8 p-5 border rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${optionType === "put" ? "bg-red-100" : "bg-green-100"}`}>
              {optionType === "put" 
                ? <ArrowDown className="w-4 h-4 text-red-500" /> 
                : <ArrowUp className="w-4 h-4 text-green-500" />}
            </div>
            <h3 className="font-medium">
              {optionType === "put" ? "Price Drop Protection" : "Price Lock Guarantee"}
            </h3>
          </div>
          <div className="text-sm text-muted-foreground">
            {protectionLevelText()}
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <p className="text-sm w-24">Current Price:</p>
          <p className="font-semibold">${btcPrice.toLocaleString()}</p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-2">
            <p className="text-sm w-24">{getStrikePriceLabel()}</p>
            <div className="flex-1">
              <Input
                type="number"
                value={strikePrice}
                onChange={handleInputChange}
                className="font-semibold"
              />
            </div>
          </div>
          <div className="pl-28">
            <p className="text-xs text-muted-foreground">
              {optionType === "put" 
                ? "If Bitcoin price falls below this value, your protection becomes active." 
                : "If Bitcoin price rises above this value, your price guarantee becomes valuable."}
            </p>
          </div>
        </div>
        
        <div className="pl-28 pt-2 mb-6">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            value={[sliderValue]}
            onValueChange={handleSliderChange}
            className="mb-6"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {optionType === "put" ? "More Protection" : "Lower Purchase Price"}
            </span>
            <span>
              {optionType === "put" ? "Less Protection" : "Higher Purchase Price"}
            </span>
          </div>
        </div>

        {/* Bitcoin Amount Section */}
        <div className="pt-4 mt-4 border-t">
          <h4 className="text-base font-medium mb-4">Coverage Amount</h4>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-4 mb-2">
                <p className="text-sm w-24">Amount:</p>
                <div className="flex-1 flex">
                  <Input
                    type="number"
                    value={displayAmount}
                    onChange={handleAmountChange}
                    className="font-semibold rounded-r-none"
                    {...inputAttributes}
                  />
                  <Button 
                    type="button"
                    onClick={toggleUnit}
                    className="rounded-l-none flex items-center gap-1 w-20"
                    variant="outline"
                  >
                    {isInSats ? "sats" : "BTC"}
                    <ArrowLeftRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="pl-28">
                <p className="text-xs text-muted-foreground">
                  {isInSats 
                    ? "Minimum: 1,000,000 sats (0.01 BTC)"
                    : "Minimum: 0.01 BTC (1,000,000 sats)"}
                </p>
                {isInSats && (
                  <p className="text-xs text-muted-foreground mt-1">
                    ≈ {parseFloat(amount)} BTC
                  </p>
                )}
                {!isInSats && (
                  <p className="text-xs text-muted-foreground mt-1">
                    ≈ {btcToSats(parseFloat(amount) || 0).toLocaleString()} sats
                  </p>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex md:justify-end">
              <div className="space-y-1 w-full md:w-auto">
                <span className="text-sm text-muted-foreground">USD Value</span>
                <div className="text-lg font-medium">
                  ${btcUsdValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>How Bitcoin Protection Works</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          {optionType === "put"
            ? "Think of this as insurance for your Bitcoin. You pay a small premium for guaranteed price protection. If the market falls below your protected value, you can sell at that price regardless of how low the market goes."
            : "This works like locking in today's real estate prices for a future purchase. You pay a small fee to guarantee your right to buy Bitcoin at a fixed price, even if the market value increases significantly."}
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Your maximum cost is limited to the premium you pay</li>
          <li>Protection remains active for your selected coverage period</li>
          <li>Exercise your protection only if market conditions are unfavorable</li>
        </ul>
      </div>
    </div>
  );
} 