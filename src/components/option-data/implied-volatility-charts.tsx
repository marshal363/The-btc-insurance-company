"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { EmptyState } from "@/components/option-data/empty-state";

interface ImpliedVolatilityChartsProps {
  impliedVolatilityData: Array<{
    strike: number;
    shortTerm: number;
    midTerm: number;
    longTerm: number;
  }>;
}

export function ImpliedVolatilityCharts({ impliedVolatilityData }: ImpliedVolatilityChartsProps) {
  return (
    <>
      <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">Implied Volatility Smile</h2>
        
        {impliedVolatilityData.length === 0 ? (
          <EmptyState 
            title="No implied volatility data"
            message="Implied volatility data is not available yet."
            icon="chart"
          />
        ) : (
          <>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={impliedVolatilityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="strike" 
                    tickFormatter={(value) => `$${value/1000}K`} 
                  />
                  <YAxis 
                    domain={[
                      Math.min(...impliedVolatilityData.flatMap(d => [d.shortTerm, d.midTerm, d.longTerm])) - 5,
                      Math.max(...impliedVolatilityData.flatMap(d => [d.shortTerm, d.midTerm, d.longTerm])) + 5
                    ]} 
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "IV"]} 
                    labelFormatter={(label) => `Strike: $${label.toLocaleString()}`} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="shortTerm" 
                    name="7-day" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot 
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="midTerm" 
                    name="14-day" 
                    stroke="#8b5cf6" 
                    strokeWidth={2} 
                    dot 
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="longTerm" 
                    name="30-day" 
                    stroke="#ec4899" 
                    strokeWidth={2} 
                    dot 
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span>7-day expiry</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                <span>14-day expiry</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-pink-500 rounded-full mr-1"></div>
                <span>30-day expiry</span>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
          <h2 className="text-xl font-bold mb-4">IV Term Structure</h2>
          <EmptyState 
            title="Coming Soon"
            message="IV term structure visualization will be implemented in Phase 6.5."
            icon="coming-soon"
          />
        </div>
        
        <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
          <h2 className="text-xl font-bold mb-4">Historical IV Comparison</h2>
          <EmptyState 
            title="Coming Soon"
            message="Historical IV comparison will be implemented in Phase 6.5."
            icon="coming-soon"
          />
        </div>
      </div>
    </>
  );
} 