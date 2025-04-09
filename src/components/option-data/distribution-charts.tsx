"use client";

import { OptionData } from "@/store/market-store";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DistributionChartsProps {
  options: OptionData[];
  btcPrice: number;
}

export function DistributionCharts({ options, btcPrice }: DistributionChartsProps) {
  // Helper to calculate days to expiry
  const calculateDaysToExpiry = (expiry: Date) => {
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Prepare data for expiry distribution chart
  const expiryDistributionData = [
    { 
      expiry: "1-7 days", 
      calls: options.filter(o => o.type === "call" && calculateDaysToExpiry(o.expiry) <= 7).length,
      puts: options.filter(o => o.type === "put" && calculateDaysToExpiry(o.expiry) <= 7).length
    },
    { 
      expiry: "8-14 days", 
      calls: options.filter(o => o.type === "call" && calculateDaysToExpiry(o.expiry) > 7 && calculateDaysToExpiry(o.expiry) <= 14).length,
      puts: options.filter(o => o.type === "put" && calculateDaysToExpiry(o.expiry) > 7 && calculateDaysToExpiry(o.expiry) <= 14).length
    },
    { 
      expiry: "15-30 days", 
      calls: options.filter(o => o.type === "call" && calculateDaysToExpiry(o.expiry) > 14 && calculateDaysToExpiry(o.expiry) <= 30).length,
      puts: options.filter(o => o.type === "put" && calculateDaysToExpiry(o.expiry) > 14 && calculateDaysToExpiry(o.expiry) <= 30).length
    },
    { 
      expiry: ">30 days", 
      calls: options.filter(o => o.type === "call" && calculateDaysToExpiry(o.expiry) > 30).length,
      puts: options.filter(o => o.type === "put" && calculateDaysToExpiry(o.expiry) > 30).length
    }
  ];

  // Prepare data for strike distribution chart
  const strikeRanges = [
    { label: `<${(btcPrice * 0.95).toLocaleString()}`, min: 0, max: btcPrice * 0.95 },
    { label: `${(btcPrice * 0.95).toLocaleString()}-${(btcPrice * 0.975).toLocaleString()}`, min: btcPrice * 0.95, max: btcPrice * 0.975 },
    { label: `${(btcPrice * 0.975).toLocaleString()}-${btcPrice.toLocaleString()}`, min: btcPrice * 0.975, max: btcPrice },
    { label: `${btcPrice.toLocaleString()}-${(btcPrice * 1.025).toLocaleString()}`, min: btcPrice, max: btcPrice * 1.025 },
    { label: `>${(btcPrice * 1.025).toLocaleString()}`, min: btcPrice * 1.025, max: Infinity }
  ];

  const strikeDistributionData = strikeRanges.map(range => ({
    strike: range.label,
    calls: options.filter(o => o.type === "call" && o.strikePrice >= range.min && o.strikePrice < range.max).length,
    puts: options.filter(o => o.type === "put" && o.strikePrice >= range.min && o.strikePrice < range.max).length
  }));

  // Count how many options expire in 7 days or less
  const sevenDayOptions = options.filter(o => calculateDaysToExpiry(o.expiry) <= 7).length;
  
  // Count options with strike price at or near the current BTC price (ATM)
  const atmOptions = options.filter(o => Math.abs(o.strikePrice - btcPrice) < (btcPrice * 0.02)).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
        <h2 className="text-xl font-bold mb-4">Options by Expiry</h2>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span>7-day: {sevenDayOptions} options</span>
          <span>8-30 day: {options.filter(o => calculateDaysToExpiry(o.expiry) > 7 && calculateDaysToExpiry(o.expiry) <= 30).length} options</span>
        </div>
        
        {options.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p>No data available to display chart</p>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expiryDistributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="expiry" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, name === "calls" ? "Calls" : "Puts"]}
                  labelFormatter={(label) => `Expiry: ${label}`}
                />
                <Bar dataKey="calls" name="Calls" fill="#16a34a" />
                <Bar dataKey="puts" name="Puts" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
      <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
        <h2 className="text-xl font-bold mb-4">Strike Distribution</h2>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span>Current BTC price: ${btcPrice.toLocaleString()}</span>
          <span>ATM options: {atmOptions}</span>
        </div>
        
        {options.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p>No data available to display chart</p>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={strikeDistributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="strike" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, name === "calls" ? "Calls" : "Puts"]}
                  labelFormatter={(label) => `Strike: ${label}`}
                />
                <Bar dataKey="calls" name="Calls" fill="#16a34a" />
                <Bar dataKey="puts" name="Puts" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
} 