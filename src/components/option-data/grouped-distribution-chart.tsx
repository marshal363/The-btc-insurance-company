"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";
import { useState } from "react";

// Generic data interface for distribution data
interface DistributionData {
  label: string;
  openInterest: number;
  volume: number;
}

interface GroupedDistributionChartProps {
  title: string;
  data: DistributionData[];
  groupType: "strike" | "expiration";
  showDownload?: boolean;
  showExpand?: boolean;
  typeOptions?: string[];
  expiryOptions?: string[];
}

export function GroupedDistributionChart({ 
  title, 
  data,
  groupType, 
  showDownload = true,
  showExpand = true,
  typeOptions = ["All", "Call", "Put"],
  expiryOptions = ["All"]
}: GroupedDistributionChartProps) {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedExpiry, setSelectedExpiry] = useState("All");
  const [selectedContract, setSelectedContract] = useState("All");

  // Format y-axis labels (K for thousands, M for millions)
  const formatYAxis = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <div className="bg-card rounded-lg p-5 text-card-foreground shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">
          {title} by {groupType === "strike" ? "Strike" : "Expiration"}
        </h2>
        
        <div className="flex items-center gap-1">
          {showDownload && (
            <button className="text-gray-500 hover:text-gray-700 p-1" title="Download CSV">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          )}
          
          {showExpand && (
            <button className="text-gray-500 hover:text-gray-700 p-1" title="Expand">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Type filter */}
        <div className="flex items-center">
          <label className="text-xs font-medium text-gray-500 mr-2">Type</label>
          <select 
            className="text-xs border border-gray-200 rounded p-1"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {typeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Expiry filter - only show if we have expiry options */}
        {expiryOptions.length > 1 && (
          <div className="flex items-center">
            <label className="text-xs font-medium text-gray-500 mr-2">Expiry</label>
            <select 
              className="text-xs border border-gray-200 rounded p-1"
              value={selectedExpiry}
              onChange={(e) => setSelectedExpiry(e.target.value)}
            >
              {expiryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}

        {/* Contract filter */}
        <div className="flex items-center">
          <label className="text-xs font-medium text-gray-500 mr-2">Contract</label>
          <select 
            className="text-xs border border-gray-200 rounded p-1"
            value={selectedContract}
            onChange={(e) => setSelectedContract(e.target.value)}
          >
            <option value="All">All</option>
          </select>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p>No data available to display chart</p>
        </div>
      ) : (
        <>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                <XAxis 
                  dataKey="label" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={{ stroke: '#374151', opacity: 0.2 }}
                />
                <YAxis 
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  formatter={(value: number) => [value.toLocaleString(), '']}
                  labelFormatter={(label) => `${groupType === "strike" ? "Strike" : "Expiry"}: ${label}`}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  iconSize={8}
                />
                <Bar 
                  dataKey="openInterest" 
                  name="Open Interest" 
                  fill="#ffffff" 
                  strokeWidth={0}
                  radius={[2, 2, 0, 0]}
                  barSize={10}
                />
                <Bar 
                  dataKey="volume" 
                  name="Trading Volume" 
                  fill="#eab308" 
                  strokeWidth={0}
                  radius={[2, 2, 0, 0]}
                  barSize={10}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-white border border-gray-300 rounded-full mr-1"></div>
              <span>Open Interest</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
              <span>Volume</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 