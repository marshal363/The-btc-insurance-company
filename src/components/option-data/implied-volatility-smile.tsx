"use client";

import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from "recharts";

type DataPoint = {
  strikePrice: number;
  expiry: string;
  expiryDays: number;
  iv: number;
};

interface ImpliedVolatilitySmileProps {
  data: DataPoint[];
  currentPrice?: number;
  title?: string;
}

export function ImpliedVolatilitySmile({ 
  data, 
  currentPrice,
  title = "Implied Volatility Smile", 
}: ImpliedVolatilitySmileProps) {
  // Group by expiry to show different lines
  const expiryGroups = data.reduce((groups, item) => {
    const expiry = item.expiry;
    if (!groups[expiry]) {
      groups[expiry] = [];
    }
    groups[expiry].push(item);
    return groups;
  }, {} as Record<string, DataPoint[]>);

  // Get expiry dates to offer as options
  const expiryDates = Object.keys(expiryGroups).sort((a, b) => {
    const aDate = expiryGroups[a][0].expiryDays;
    const bDate = expiryGroups[b][0].expiryDays;
    return aDate - bDate;
  });

  // State for selected expiry
  const [selectedExpiry, setSelectedExpiry] = useState(expiryDates[0] || '');

  // Format helpers
  const formatStrikePrice = (value: number) => `$${value.toLocaleString()}`;

  // Get selected data
  const selectedData = selectedExpiry ? expiryGroups[selectedExpiry] : [];
  
  // Sort by strike price
  const sortedData = [...selectedData].sort((a, b) => a.strikePrice - b.strikePrice);

  // Calculate minimum and maximum values for axes
  const minStrike = sortedData.length > 0 ? Math.min(...sortedData.map(d => d.strikePrice)) : 0;
  const maxStrike = sortedData.length > 0 ? Math.max(...sortedData.map(d => d.strikePrice)) : 0;
  const minIV = sortedData.length > 0 ? Math.min(...sortedData.map(d => d.iv)) - 5 : 0;
  const maxIV = sortedData.length > 0 ? Math.max(...sortedData.map(d => d.iv)) + 5 : 0;

  return (
    <div className="bg-card rounded-lg p-5 text-card-foreground shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        
        <div className="flex items-center gap-3">
          {/* Expiry date selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Expiry:</span>
            <select 
              value={selectedExpiry}
              onChange={(e) => setSelectedExpiry(e.target.value)}
              className="py-1 px-2 text-xs rounded border border-gray-200 bg-white"
            >
              {expiryDates.map(date => (
                <option key={date} value={date}>
                  {date} ({expiryGroups[date][0].expiryDays} days)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sortedData}
            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="strikePrice" 
              tickFormatter={formatStrikePrice}
              domain={[minStrike * 0.98, maxStrike * 1.02]}
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#374151', opacity: 0.2 }}
              axisLine={{ stroke: '#374151', opacity: 0.2 }}
            />
            <YAxis 
              domain={[minIV, maxIV]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#374151', opacity: 0.2 }}
              axisLine={{ stroke: '#374151', opacity: 0.2 }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}%`, "IV"]}
              labelFormatter={(label) => `Strike: $${label.toLocaleString()}`}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e2e8f0',
                borderRadius: '6px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="iv" 
              name="Implied Volatility" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            
            {/* Add indicator line for current price */}
            {currentPrice && (
              <ReferenceLine 
                x={currentPrice} 
                stroke="#ff0000" 
                strokeDasharray="3 3"
                label={{ 
                  value: "Current Price", 
                  position: "insideTopRight",
                  fill: "#ff0000",
                  fontSize: 12
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>The &quot;smile&quot; pattern is typical in options markets, showing higher IVs for strikes far from the current price.</p>
        <p>This demonstrates market expectations of larger price movements for out-of-the-money options.</p>
      </div>
    </div>
  );
} 