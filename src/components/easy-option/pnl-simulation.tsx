import React, { useMemo } from "react";
import { OptionType } from "./option-type-selector";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

interface PnlSimulationProps {
  optionType: OptionType;
  strikePrice: number;
  premium: number;
  currentBtcPrice: number;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function PnlSimulation({
  optionType,
  strikePrice,
  premium,
  currentBtcPrice = 48500,
  isOpen = false,
  onToggle,
}: PnlSimulationProps) {
  // Generate price points for the chart (±20% from current price)
  const chartData = useMemo(() => {
    const minPrice = Math.floor(currentBtcPrice * 0.8);
    const maxPrice = Math.ceil(currentBtcPrice * 1.2);
    const step = Math.floor((maxPrice - minPrice) / 20);
    
    return Array.from({ length: 21 }, (_, i) => {
      const price = minPrice + i * step;
      let pnl = -premium; // Default loss is premium paid
      
      if (optionType === "call" && price > strikePrice) {
        // For call options, profit when price > strike
        pnl = ((price - strikePrice) / 100) - premium;
      } else if (optionType === "put" && price < strikePrice) {
        // For put options, profit when price < strike
        pnl = ((strikePrice - price) / 100) - premium;
      }
      
      return {
        price,
        pnl: Math.max(pnl, -premium), // Can't lose more than premium
      };
    });
  }, [optionType, strikePrice, premium, currentBtcPrice]);
  
  // Find breakeven price
  const breakEvenPrice = useMemo(() => {
    if (optionType === "call") {
      return strikePrice + (premium * 100);
    } else {
      return strikePrice - (premium * 100);
    }
  }, [optionType, strikePrice, premium]);
  
  // Find max profit in chart data
  const maxProfit = Math.max(...chartData.map(d => d.pnl), 0);
  
  // Format tooltips
  const formatTooltip = (value: number, name: string) => {
    if (name === "pnl") {
      return [`${value.toFixed(2)} STX`, "P&L"];
    }
    return [value, name];
  };
  
  // If panel is not open, don't render
  if (!isOpen) return null;

  return (
    <div className="p-4 border-l border-muted h-full overflow-y-auto relative">
      {/* Close button */}
      <button 
        onClick={onToggle}
        className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground"
        aria-label="Close P&L simulation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <h3 className="text-lg font-semibold mb-4">P&L Simulation</h3>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Potential Outcomes</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="price" 
              tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
              fontSize={10}
              tickMargin={5}
            />
            <YAxis 
              tickFormatter={(value) => `${value.toFixed(0)}`}
              fontSize={10}
              tickMargin={5}
            />
            <Tooltip 
              formatter={formatTooltip} 
              labelFormatter={(value) => `BTC Price: $${value.toLocaleString()}`}
            />
            <ReferenceLine y={0} stroke="#888" strokeDasharray="3 3" />
            <ReferenceLine x={currentBtcPrice} stroke="#888" strokeDasharray="3 3" label="Current" />
            <ReferenceLine x={strikePrice} stroke="#666" strokeDasharray="3 3" label="Strike" />
            <Line 
              type="monotone" 
              dataKey="pnl" 
              stroke={optionType === "call" ? "#3b82f6" : "#ef4444"} 
              dot={false} 
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-4">
        <div className="bg-muted/30 p-3 rounded-md">
          <h4 className="text-sm font-medium mb-2">Key Metrics</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/30 dark:bg-black/20 p-2 rounded">
              <p className="text-xs text-muted-foreground">Max Profit:</p>
              <p className="font-medium text-sm">
                {maxProfit > 0 
                  ? `${maxProfit.toFixed(2)} STX` 
                  : optionType === "call" 
                    ? "Unlimited" 
                    : "Limited by BTC price falling to 0"
                }
              </p>
            </div>
            <div className="bg-white/30 dark:bg-black/20 p-2 rounded">
              <p className="text-xs text-muted-foreground">Max Loss:</p>
              <p className="font-medium text-sm">{premium.toFixed(2)} STX</p>
            </div>
            <div className="bg-white/30 dark:bg-black/20 p-2 rounded">
              <p className="text-xs text-muted-foreground">Break-even:</p>
              <p className="font-medium text-sm">${breakEvenPrice.toLocaleString()}</p>
            </div>
            <div className="bg-white/30 dark:bg-black/20 p-2 rounded">
              <p className="text-xs text-muted-foreground">Premium:</p>
              <p className="font-medium text-sm">{premium} STX</p>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 p-3 rounded-md">
          <h4 className="text-sm font-medium mb-2">Trade Details</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Option Type:</span>
              <span className={`font-medium ${optionType === "call" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {optionType.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Strike Price:</span>
              <span className="font-medium">${strikePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Price:</span>
              <span className="font-medium">${currentBtcPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ROI at 10% Move:</span>
              <span className="font-medium">
                {optionType === "call" 
                  ? ((((currentBtcPrice * 1.1) - strikePrice) / 100 - premium) / premium * 100).toFixed(1)
                  : ((((strikePrice - (currentBtcPrice * 0.9)) / 100) - premium) / premium * 100).toFixed(1)
                }%
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 p-3 rounded-md">
          <h4 className="text-sm font-medium mb-1">Position Guidance</h4>
          <p className="text-xs text-muted-foreground">
            {optionType === "call" 
              ? `This call option gives you protection if BTC rises above $${strikePrice.toLocaleString()}. Maximum loss is limited to your premium of ${premium} STX.`
              : `This put option gives you protection if BTC falls below $${strikePrice.toLocaleString()}. Maximum loss is limited to your premium of ${premium} STX.`
            }
          </p>
          <div className="mt-2 p-2 bg-white/30 dark:bg-black/20 rounded">
            <p className="text-xs">
              <span className="font-medium">When to consider exercise:</span> {optionType === "call" 
                ? `If BTC price rises above $${breakEvenPrice.toLocaleString()}`
                : `If BTC price falls below $${breakEvenPrice.toLocaleString()}`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 