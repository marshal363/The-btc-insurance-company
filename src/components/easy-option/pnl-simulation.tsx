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
}

export function PnlSimulation({
  optionType,
  strikePrice,
  premium,
  currentBtcPrice = 48500,
  isOpen = false,
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
  
  // Find max profit/loss in chart data
  const maxProfit = Math.max(...chartData.map(d => d.pnl));
  const maxLoss = Math.min(...chartData.map(d => d.pnl));
  
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
    <div className="p-4 border-l border-muted h-full overflow-y-auto">
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
            <ReferenceLine x={strikePrice} stroke="#888" strokeDasharray="3 3" label="Strike" />
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
          <h4 className="text-sm font-medium mb-1">Key Metrics</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground">Max Profit:</p>
              <p className="font-medium">{maxProfit.toFixed(2)} STX</p>
            </div>
            <div>
              <p className="text-muted-foreground">Max Loss:</p>
              <p className="font-medium">{Math.abs(maxLoss).toFixed(2)} STX</p>
            </div>
            <div>
              <p className="text-muted-foreground">Break-even:</p>
              <p className="font-medium">${breakEvenPrice.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Premium:</p>
              <p className="font-medium">{premium} STX</p>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 p-3 rounded-md">
          <h4 className="text-sm font-medium mb-1">Position Guidance</h4>
          <p className="text-xs text-muted-foreground">
            {optionType === "call" 
              ? `This call option gives you protection if BTC rises above $${strikePrice.toLocaleString()}. Maximum loss is limited to your premium.`
              : `This put option gives you protection if BTC falls below $${strikePrice.toLocaleString()}. Maximum loss is limited to your premium.`
            }
          </p>
        </div>
      </div>
    </div>
  );
} 