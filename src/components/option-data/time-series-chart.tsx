"use client";

import {
  Bar, 
  ComposedChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { useState } from "react";

interface TimePoint {
  date: string;
  openInterest: number;
  volume: number;
}

interface TimeSeriesChartProps {
  title: string;
  data: TimePoint[];
  periods?: string[];
  defaultPeriod?: string;
  showDownload?: boolean;
  showExpand?: boolean;
}

export function TimeSeriesChart({ 
  title, 
  data, 
  periods = ["1d", "7d", "30d", "90d"], 
  defaultPeriod = "1d",
  showDownload = true,
  showExpand = true
}: TimeSeriesChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  // Find max values for scaling y-axis
  const maxOI = Math.max(...data.map(d => d.openInterest));
  const maxVolume = Math.max(...data.map(d => d.volume));
  
  // Scale for readable y-axis labels (K for thousands, M for millions)
  const formatYAxis = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <div className="bg-card rounded-lg p-5 text-card-foreground shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        
        <div className="flex items-center gap-3">
          {/* Period selector */}
          <div className="flex rounded-md overflow-hidden border border-gray-200">
            {periods.map(period => (
              <button
                key={period}
                className={`py-1 px-3 text-xs font-medium ${
                  selectedPeriod === period 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Controls */}
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
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#374151', opacity: 0.2 }}
            />
            <YAxis 
              yAxisId="left"
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              domain={[0, maxOI * 1.1]}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              domain={[0, maxVolume * 1.1]}
            />
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), '']}
              labelFormatter={(label) => `Date: ${label}`}
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
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="openInterest" 
              name="Open Interest" 
              stroke="#ffffff" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Bar 
              yAxisId="right"
              dataKey="volume" 
              name="Trading Volume" 
              fill="#eab308" 
              radius={[2, 2, 0, 0]}
              barSize={8}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 