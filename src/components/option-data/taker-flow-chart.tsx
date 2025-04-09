"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

interface TakerFlowData {
  name: string;
  value: number;
  color: string;
}

interface TakerFlowChartProps {
  title?: string;
  data: TakerFlowData[];
  showDownload?: boolean;
  timestamp?: string;
  contractOptions?: string[];
}

// Define the type for the custom label props from Recharts
interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

export function TakerFlowChart({ 
  title = "24hr Taker Flow", 
  data,
  showDownload = true,
  timestamp,
  contractOptions = ["All"]
}: TakerFlowChartProps) {
  const [selectedContract, setSelectedContract] = useState("All");
  
  // Default colors
  const COLORS = ["#10B981", "#34D399", "#EF4444", "#F87171"];
  
  // Calculate total for percentage display
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  // Custom render for the pie chart labels
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomizedLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    
    if (percent < 0.05) return null; // Don't show labels for small slices
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  return (
    <div className="bg-card rounded-lg p-5 text-card-foreground shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        
        <div className="flex items-center gap-3">
          {/* Contract filter */}
          {contractOptions.length > 1 && (
            <div className="flex items-center">
              <label className="text-xs font-medium text-gray-500 mr-2">Contract</label>
              <select 
                className="text-xs border border-gray-200 rounded p-1"
                value={selectedContract}
                onChange={(e) => setSelectedContract(e.target.value)}
              >
                {contractOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          )}
          
          {/* Download button */}
          {showDownload && (
            <button className="text-gray-500 hover:text-gray-700 p-1" title="Download CSV">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {timestamp && (
        <div className="text-xs text-muted-foreground mb-3">
          {timestamp}
        </div>
      )}

      {data.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          <p>No data available to display chart</p>
        </div>
      ) : (
        <>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color || COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value.toLocaleString()} contracts`, '']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Chart legend */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color || COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm">{entry.name}</span>
                <span className="text-sm font-medium ml-2">
                  {((entry.value / total) * 100).toFixed(2)}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  ({entry.value.toLocaleString()})
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 