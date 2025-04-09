import React from "react";
import { Slider } from "@/components/ui/slider";
import { OptionType } from "./option-type-selector";

interface StrikePriceSelectorProps {
  strikePrice: number;
  setStrikePrice: (price: number) => void;
  currentBtcPrice: number;
  optionType?: OptionType;
}

export function StrikePriceSelector({ 
  strikePrice, 
  setStrikePrice, 
  currentBtcPrice = 48500,
  optionType = "call"
}: StrikePriceSelectorProps) {
  // Calculate min and max values for slider (±10% of current BTC price)
  const minPrice = Math.floor(currentBtcPrice * 0.9);
  const maxPrice = Math.ceil(currentBtcPrice * 1.1);
  
  // Determine if we're at ATM, below, or above
  const pricePosition = 
    strikePrice === currentBtcPrice ? "ATM" :
    strikePrice < currentBtcPrice ? `${((currentBtcPrice - strikePrice) / currentBtcPrice * 100).toFixed(1)}% below` :
    `${((strikePrice - currentBtcPrice) / currentBtcPrice * 100).toFixed(1)}% above`;
    
  // Get explanatory text based on option type and price position
  const getPriceExplanation = () => {
    if (optionType === "call") {
      if (strikePrice < currentBtcPrice) {
        return "Lower target price means your option already has value (ITM), but costs more premium.";
      } else if (strikePrice > currentBtcPrice) {
        return "Higher target price means your option costs less, but BTC needs to rise more to be profitable.";
      } else {
        return "AT-the-money option provides a balance between cost and profit potential.";
      }
    } else {
      if (strikePrice > currentBtcPrice) {
        return "Higher target price means your option already has value (ITM), but costs more premium.";
      } else if (strikePrice < currentBtcPrice) {
        return "Lower target price means your option costs less, but BTC needs to fall more to be profitable.";
      } else {
        return "AT-the-money option provides a balance between cost and profit potential.";
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {optionType === "call" 
          ? "Select your target price for BTC to rise above" 
          : "Select your target price for BTC to fall below"}
      </h2>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">Current BTC: ${currentBtcPrice.toLocaleString()}</span>
          <span className="text-sm font-medium">Selected: ${strikePrice.toLocaleString()}</span>
        </div>
        
        <div className="py-4 px-2">
          <div className="relative mt-1 mb-6">
            <div className="absolute left-0 right-0 flex justify-center -top-2">
              <div className="px-2 py-1 rounded bg-muted text-xs text-center">
                Current Price
                <div className="absolute left-1/2 top-full -ml-1 -mt-px border-l border-t border-r border-muted-foreground/20 rotate-45 w-2 h-2 bg-muted"></div>
              </div>
            </div>
            <Slider
              min={minPrice}
              max={maxPrice}
              step={50}
              value={[strikePrice]}
              onValueChange={(values) => setStrikePrice(values[0])}
              className="my-4"
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>-10% (${minPrice.toLocaleString()})</span>
          <span>Current (${currentBtcPrice.toLocaleString()})</span>
          <span>+10% (${maxPrice.toLocaleString()})</span>
        </div>
        
        <div className="mt-6 p-4 bg-muted/30 rounded-md border border-muted">
          <div className="flex items-center gap-3 mb-3 text-sm">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              strikePrice > currentBtcPrice 
                ? "bg-orange-500/20 text-orange-600 dark:text-orange-400" 
                : strikePrice < currentBtcPrice 
                  ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                  : "bg-green-500/20 text-green-600 dark:text-green-400"
            }`}>
              {strikePrice > currentBtcPrice ? "↑" : strikePrice < currentBtcPrice ? "↓" : "="}
            </div>
            <div>
              <p className="font-medium">
                {optionType === "call" 
                  ? `Your CALL will have value if BTC rises above $${strikePrice.toLocaleString()}` 
                  : `Your PUT will have value if BTC falls below $${strikePrice.toLocaleString()}`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {getPriceExplanation()}
              </p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div className="p-2 bg-white/50 dark:bg-black/10 rounded">
              <p className="text-muted-foreground">Target Price:</p>
              <p className="font-medium">${strikePrice.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-white/50 dark:bg-black/10 rounded">
              <p className="text-muted-foreground">VS Current:</p>
              <p className="font-medium">{pricePosition}</p>
            </div>
            <div className="p-2 bg-white/50 dark:bg-black/10 rounded">
              <p className="text-muted-foreground">Price Position:</p>
              <p className="font-medium">
                {strikePrice === currentBtcPrice 
                  ? "At The Money" 
                  : optionType === "call" 
                    ? (strikePrice < currentBtcPrice ? "In The Money" : "Out of The Money")
                    : (strikePrice > currentBtcPrice ? "In The Money" : "Out of The Money")
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 