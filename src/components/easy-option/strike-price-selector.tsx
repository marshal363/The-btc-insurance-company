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
        return "Lower lock-in price means your guarantee already has value, but costs more.";
      } else if (strikePrice > currentBtcPrice) {
        return "Higher lock-in price costs less, but Bitcoin needs to rise more to make your guarantee valuable.";
      } else {
        return "At-market price lock provides a balance between cost and value.";
      }
    } else {
      if (strikePrice > currentBtcPrice) {
        return "Higher protection value costs more, but provides immediate coverage above current market price.";
      } else if (strikePrice < currentBtcPrice) {
        return "Lower protection value costs less, but Bitcoin needs to fall more before protection activates.";
      } else {
        return "Full current value protection provides a balance between cost and coverage.";
      }
    }
  };
  
  // Get strike price label based on option type
  const getStrikePriceLabel = () => {
    if (optionType === "call") {
      return "What Bitcoin purchase price do you want to lock in?";
    } else {
      return "What Bitcoin value do you want to protect?";
    }
  };
  
  // Get moneyness text for human readable display
  const getMoneynessText = () => {
    if (strikePrice === currentBtcPrice) {
      return "Full current value protection"; 
    }
    
    if (optionType === "call") {
      return strikePrice < currentBtcPrice ? "Enhanced purchase guarantee" : "Economy purchase guarantee";
    } else {
      return strikePrice > currentBtcPrice ? "Enhanced value protection" : "Partial value protection";
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{getStrikePriceLabel()}</h2>
      
      <div className="mb-6">
        <div className="bg-muted/30 p-4 rounded-lg mb-4">
          <div className="flex justify-between">
            <div className="text-sm">
              <span className="text-muted-foreground">Current BTC:</span> ${currentBtcPrice.toLocaleString()}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Selected:</span> ${strikePrice.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="mb-2">
            <Slider
              defaultValue={[strikePrice]}
              min={minPrice}
              max={maxPrice}
              step={50}
              onValueChange={(values) => setStrikePrice(values[0])}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>-10% (${minPrice.toLocaleString()})</span>
            <span>Current (${currentBtcPrice.toLocaleString()})</span>
            <span>+10% (${maxPrice.toLocaleString()})</span>
          </div>
        </div>
        
        <div className="bg-muted/10 border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 flex items-center justify-center">
              =
            </div>
            <p className="text-sm font-medium">
              {optionType === "call" 
                ? `Your price lock will have value if BTC rises above $${strikePrice.toLocaleString()}`
                : `Your protection will have value if BTC falls below $${strikePrice.toLocaleString()}`
              }
            </p>
          </div>
          <p className="text-xs text-muted-foreground ml-10">{getMoneynessText()} {getPriceExplanation()}</p>
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div className="p-2 bg-white/50 dark:bg-black/10 rounded">
              <p className="text-muted-foreground">
                {optionType === "call" ? "Lock-in Price:" : "Protected Value:"}
              </p>
              <p className="font-medium">${strikePrice.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-white/50 dark:bg-black/10 rounded">
              <p className="text-muted-foreground">VS Current:</p>
              <p className="font-medium">{pricePosition}</p>
            </div>
            <div className="p-2 bg-white/50 dark:bg-black/10 rounded">
              <p className="text-muted-foreground">Coverage Level:</p>
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