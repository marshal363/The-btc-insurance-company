import React from "react";
import { OptionType } from "./option-type-selector";
import { format, addDays } from "date-fns";

interface OptionReviewProps {
  optionType: OptionType;
  strikePrice: number;
  expiryDays: number;
  currentBtcPrice?: number;
  premium?: number;
}

export function OptionReview({ 
  optionType, 
  strikePrice, 
  expiryDays,
  currentBtcPrice = 48500,
  premium = 50
}: OptionReviewProps) {
  const expiryDate = addDays(new Date(), expiryDays);
  const formattedDate = format(expiryDate, "MM/dd/yyyy");
  
  // Calculate breakeven and profit/loss scenarios
  const breakEvenPrice = optionType === "call" 
    ? strikePrice + (premium / 100 * strikePrice)
    : strikePrice - (premium / 100 * strikePrice);
  
  const favorableScenario = optionType === "call"
    ? { price: Math.ceil(strikePrice * 1.1), description: "If BTC rises to" }
    : { price: Math.floor(strikePrice * 0.9), description: "If BTC falls to" };
  
  const favorablePnL = optionType === "call"
    ? (favorableScenario.price - strikePrice) * 0.01 - premium
    : (strikePrice - favorableScenario.price) * 0.01 - premium;
    
  const getDirection = () => optionType === "call" ? "UP" : "DOWN";
  const getDirectionArrow = () => optionType === "call" ? "↑" : "↓";
  const getActionVerb = () => optionType === "call" ? "buy" : "sell";

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Review Your Option Contract</h2>
      
      {/* Option Summary Banner */}
      <div className={`mb-6 rounded-lg p-4 ${
        optionType === "call" 
          ? "bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-900" 
          : "bg-red-50 border border-red-200 dark:bg-red-950 dark:border-red-900"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            optionType === "call" 
              ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" 
              : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
          }`}>
            {getDirectionArrow()}
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              You predict BTC will go {getDirection()}
            </h3>
            <p className="text-sm">
              <span className={`font-medium ${optionType === "call" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {optionType.toUpperCase()} OPTION
              </span> 
              {` at $${strikePrice.toLocaleString()} expiring on ${formattedDate}`}
            </p>
          </div>
        </div>
      </div>
      
      {/* Option Details Card */}
      <div className="mb-6 bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="bg-muted/30 px-4 py-3 border-b">
          <h3 className="font-medium">Contract Details</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Option Type</div>
              <div className={`font-medium ${optionType === "call" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {optionType.toUpperCase()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Strike Price</div>
              <div className="font-medium">${strikePrice.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Expiration</div>
              <div className="font-medium">{formattedDate}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Premium</div>
              <div className="font-medium">{premium} STX (${premium})</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cost and Outcomes */}
      <div className="mb-6 bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="bg-muted/30 px-4 py-3 border-b">
          <h3 className="font-medium">How This Option Works</h3>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Cost:</span>
              <span className="text-sm font-semibold">{premium} STX (${premium})</span>
            </div>
            <div className="w-full bg-muted/30 h-2 rounded-full">
              <div className="h-full bg-primary rounded-full" style={{ width: '100%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">This is what you pay today to purchase the option</p>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Maximum Loss:</span>
              <span className="text-sm font-semibold">{premium} STX (${premium})</span>
            </div>
            <div className="w-full bg-muted/30 h-2 rounded-full">
              <div className="h-full bg-primary rounded-full" style={{ width: '100%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">You can never lose more than your premium</p>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Maximum Profit:</span>
              <span className="text-sm font-semibold">Unlimited</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {optionType === "call" 
                ? "Your profit potential is unlimited if BTC price rises above your strike price"
                : "Your profit potential is limited by how far BTC can fall (to zero) below your strike price"
              }
            </p>
          </div>
          
          <div className="mt-4 p-3 bg-muted/20 rounded-md">
            <p className="text-sm mb-1 font-medium">What does this option give you?</p>
            <p className="text-sm">
              The right to {getActionVerb()} BTC at ${strikePrice.toLocaleString()} regardless of market price
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              It&apos;s like insurance - you&apos;re protected if the market moves against you
            </p>
          </div>
        </div>
      </div>
      
      {/* Scenarios */}
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="bg-muted/30 px-4 py-3 border-b">
          <h3 className="font-medium">Potential Scenarios</h3>
        </div>
        <div className="divide-y">
          {/* Scenario 1: Favorable */}
          <div className="p-4 hover:bg-muted/10 transition-colors">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 mt-0.5 rounded-full flex-shrink-0 flex items-center justify-center ${
                optionType === "call" 
                  ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" 
                  : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
              }`}>
                {getDirectionArrow()}
              </div>
              <div>
                <p className="text-sm font-medium">
                  {favorableScenario.description} ${favorableScenario.price.toLocaleString()}:
                </p>
                <p className="text-sm">
                  {favorablePnL > 0 
                    ? <span className="text-green-600 dark:text-green-400">Profit: {favorablePnL.toFixed(2)} STX (${(favorablePnL).toFixed(2)})</span>
                    : <span className="text-red-600 dark:text-red-400">Loss: {Math.abs(favorablePnL).toFixed(2)} STX (${Math.abs(favorablePnL).toFixed(2)})</span>
                  }
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {favorablePnL > 0
                    ? "Your option would be valuable and you could exercise it for profit"
                    : "Despite price moving in your predicted direction, it wasn&apos;t enough to overcome the premium paid"
                  }
                </p>
              </div>
            </div>
          </div>
          
          {/* Scenario 2: Unchanged */}
          <div className="p-4 hover:bg-muted/10 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 mt-0.5 rounded-full flex-shrink-0 flex items-center justify-center bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400">
                →
              </div>
              <div>
                <p className="text-sm font-medium">
                  If BTC stays at ${currentBtcPrice.toLocaleString()}:
                </p>
                <p className="text-sm">
                  {optionType === "call" && strikePrice >= currentBtcPrice || 
                   optionType === "put" && strikePrice <= currentBtcPrice
                    ? <span className="text-red-600 dark:text-red-400">Loss: {premium} STX (${premium})</span>
                    : <span className="text-amber-600 dark:text-amber-400">Mixed outcome: depends on exact price and timing</span>
                  }
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {optionType === "call" && strikePrice >= currentBtcPrice
                    ? "Your option would expire worthless as BTC didn't rise above your strike price"
                    : optionType === "put" && strikePrice <= currentBtcPrice
                      ? "Your option would expire worthless as BTC didn't fall below your strike price"
                      : "Your option has some value, but may not be enough to offset the premium paid"
                  }
                </p>
              </div>
            </div>
          </div>
          
          {/* Scenario 3: Break Even */}
          <div className="p-4 hover:bg-muted/10 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 mt-0.5 rounded-full flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                =
              </div>
              <div>
                <p className="text-sm font-medium">
                  Break-even at ${breakEvenPrice.toLocaleString()}:
                </p>
                <p className="text-sm">You recover your premium cost exactly (no profit/loss)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  At this price, the option&apos;s value equals exactly what you paid for it
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 