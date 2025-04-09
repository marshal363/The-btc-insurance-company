"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { EmptyState } from "@/components/option-data/empty-state";

interface InterestVolumeChartsProps {
  openInterestData: Array<{ strike: number; calls: number; puts: number }>;
  volumeData: Array<{ strike: number; calls: number; puts: number }>;
}

export function InterestVolumeCharts({ openInterestData, volumeData }: InterestVolumeChartsProps) {
  const totalOpenInterest = openInterestData.reduce(
    (sum, item) => sum + item.calls + item.puts, 
    0
  );
  
  const totalVolume = volumeData.reduce(
    (sum, item) => sum + item.calls + item.puts,
    0
  );

  // Find the strike with the highest open interest
  const maxOIStrike = openInterestData.reduce(
    (max, item) => (item.calls + item.puts > openInterestData[max].calls + openInterestData[max].puts) ? 
      openInterestData.indexOf(item) : max, 
    0
  );

  // Find the strike with the highest volume
  const maxVolumeStrike = volumeData.reduce(
    (max, item) => (item.calls + item.puts > volumeData[max].calls + volumeData[max].puts) ? 
      volumeData.indexOf(item) : max, 
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
        <h2 className="text-xl font-bold mb-4">Open Interest Distribution</h2>
        
        {openInterestData.length === 0 ? (
          <EmptyState 
            title="No open interest data"
            message="Open interest data is not available yet."
            icon="chart"
          />
        ) : (
          <>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={openInterestData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="strike" 
                    tickFormatter={(value) => `$${value/1000}K`} 
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [value, name === "calls" ? "Calls" : "Puts"]} 
                    labelFormatter={(label) => `Strike: $${label.toLocaleString()}`} 
                  />
                  <Bar dataKey="calls" name="Calls" fill="#16a34a" />
                  <Bar dataKey="puts" name="Puts" fill="#dc2626" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              <div className="flex justify-between">
                <span>Total OI: {totalOpenInterest.toLocaleString()}</span>
                <span>Max at ${openInterestData[maxOIStrike].strike.toLocaleString()} strike</span>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
        <h2 className="text-xl font-bold mb-4">Volume Distribution</h2>
        
        {volumeData.length === 0 ? (
          <EmptyState 
            title="No volume data"
            message="Volume data is not available yet."
            icon="chart"
          />
        ) : (
          <>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="strike" 
                    tickFormatter={(value) => `$${value/1000}K`} 
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [value, name === "calls" ? "Calls" : "Puts"]} 
                    labelFormatter={(label) => `Strike: $${label.toLocaleString()}`} 
                  />
                  <Bar dataKey="calls" name="Calls" fill="#16a34a" />
                  <Bar dataKey="puts" name="Puts" fill="#dc2626" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              <div className="flex justify-between">
                <span>24h Volume: {totalVolume}</span>
                <span>Most active: ${volumeData[maxVolumeStrike].strike.toLocaleString()} strike</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 