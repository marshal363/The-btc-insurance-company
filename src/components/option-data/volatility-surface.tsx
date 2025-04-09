"use client";

import { useState } from "react";
import { 
  Scatter, 
  ScatterChart,
  XAxis, 
  YAxis, 
  ZAxis, 
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

interface VolatilitySurfaceProps {
  data: DataPoint[];
  currentPrice?: number;
  title?: string;
  showControls?: boolean;
}

export function VolatilitySurface({ 
  data, 
  currentPrice,
  title = "Volatility Surface", 
  showControls = true
}: VolatilitySurfaceProps) {
  const [viewMode, setViewMode] = useState<"heatmap" | "scatter">("scatter");
  const [colorMode, setColorMode] = useState<"monochrome" | "heatmap">("heatmap");
  
  // Process data to separate by expiry for different series
  const expiryGroups = data.reduce((groups, item) => {
    const expiry = item.expiry;
    if (!groups[expiry]) {
      groups[expiry] = [];
    }
    groups[expiry].push(item);
    return groups;
  }, {} as Record<string, DataPoint[]>);

  // Extract the unique expiry dates and sort them
  const expiryDates = Object.keys(expiryGroups).sort((a, b) => {
    const aDate = expiryGroups[a][0].expiryDays;
    const bDate = expiryGroups[b][0].expiryDays;
    return aDate - bDate;
  });

  // Generate color for heat mapping
  const getHeatMapColor = (iv: number): string => {
    const minIV = Math.min(...data.map(d => d.iv));
    const maxIV = Math.max(...data.map(d => d.iv));
    const normalized = (iv - minIV) / (maxIV - minIV);
    
    // Green to red gradient
    if (normalized < 0.5) {
      // Green to yellow
      const r = Math.round(normalized * 2 * 255);
      return `rgb(${r}, 200, 0)`;
    } else {
      // Yellow to red
      const g = Math.round((1 - (normalized - 0.5) * 2) * 200);
      return `rgb(255, ${g}, 0)`;
    }
  };

  // Format helpers
  const formatStrikePrice = (value: number) => `$${value.toLocaleString()}`;
  const formatIV = (value: number) => `${value.toFixed(1)}%`;
  
  // Get min/max values for scaling
  const minStrike = Math.min(...data.map(d => d.strikePrice));
  const maxStrike = Math.max(...data.map(d => d.strikePrice));
  const minDays = Math.min(...data.map(d => d.expiryDays));
  const maxDays = Math.max(...data.map(d => d.expiryDays));

  return (
    <div className="bg-card rounded-lg p-5 text-card-foreground shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        
        {showControls && (
          <div className="flex items-center gap-3">
            {/* View type selector */}
            <div className="flex rounded-md overflow-hidden border border-gray-200">
              <button
                className={`py-1 px-3 text-xs font-medium ${
                  viewMode === "scatter" 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setViewMode("scatter")}
              >
                Scatter
              </button>
              <button
                className={`py-1 px-3 text-xs font-medium ${
                  viewMode === "heatmap" 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setViewMode("heatmap")}
              >
                Heatmap
              </button>
            </div>

            {/* Color mode selector */}
            <div className="flex rounded-md overflow-hidden border border-gray-200">
              <button
                className={`py-1 px-3 text-xs font-medium ${
                  colorMode === "heatmap" 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setColorMode("heatmap")}
              >
                Heatmap
              </button>
              <button
                className={`py-1 px-3 text-xs font-medium ${
                  colorMode === "monochrome" 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setColorMode("monochrome")}
              >
                Monochrome
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
            <XAxis 
              type="number" 
              dataKey="strikePrice" 
              name="Strike Price"
              domain={[minStrike * 0.98, maxStrike * 1.02]}
              tickFormatter={formatStrikePrice}
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#374151', opacity: 0.2 }}
              axisLine={{ stroke: '#374151', opacity: 0.2 }}
            />
            <YAxis 
              type="number" 
              dataKey="expiryDays" 
              name="Days to Expiry"
              domain={[minDays * 0.9, maxDays * 1.1]}
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#374151', opacity: 0.2 }}
              axisLine={{ stroke: '#374151', opacity: 0.2 }}
            />
            <ZAxis 
              type="number" 
              dataKey="iv" 
              name="Implied Volatility"
              range={[50, 500]}
            />
            <Tooltip
              formatter={(value: number | string, name: string) => {
                if (name === "Strike Price") return formatStrikePrice(value as number);
                if (name === "Implied Volatility") return formatIV(value as number);
                if (name === "Days to Expiry") return `${value} days`;
                return value;
              }}
              cursor={{ stroke: '#374151', strokeDasharray: '3 3' }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e2e8f0',
                borderRadius: '6px'
              }}
            />
            <Legend />
            
            {expiryDates.map((expiry, index) => {
              const colorIndex = index % 10;
              const colors = [
                "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000",
                "#0088fe", "#00c49f", "#ffbb28", "#ff8042", "#a4de6c"
              ];
              return (
                <Scatter
                  key={expiry}
                  name={`${expiry} (${expiryGroups[expiry][0].expiryDays} days)`}
                  data={expiryGroups[expiry]}
                  fill={colorMode === "heatmap" 
                    ? expiryGroups[expiry].map(d => getHeatMapColor(d.iv))[0] 
                    : colors[colorIndex]}
                />
              );
            })}
            
            {/* Add an indicator for current price if provided */}
            {currentPrice && (
              <ReferenceLine
                x={currentPrice}
                stroke="#ffffff"
                strokeDasharray="3 3"
                label={{ value: "Current Price", position: "insideTopRight", fill: "#ffffff" }}
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>This visualization shows implied volatility (IV) for options at different strike prices and expiration dates.</p>
        <p>The &quot;smile&quot; pattern is typical in options markets, showing higher IVs for strikes far from the current price.</p>
      </div>
    </div>
  );
} 