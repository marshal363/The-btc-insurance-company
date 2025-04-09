"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, YAxis, XAxis, ResponsiveContainer } from "recharts";

interface MarketOverviewProps {
  btcPrice: number;
  btcPriceChange24h: number;
  availableOptionsCount: number;
  volume24h?: number;
}

// Mock data for price chart
const priceTrendData = [
  { time: "1d", price: 46000 },
  { time: "2d", price: 47200 },
  { time: "3d", price: 48500 },
  { time: "4d", price: 48100 },
  { time: "5d", price: 47800 },
  { time: "6d", price: 48300 },
  { time: "7d", price: 48500 },
];

export function MarketOverview({ 
  btcPrice, 
  btcPriceChange24h, 
  availableOptionsCount,
  volume24h = 0
}: MarketOverviewProps) {
  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2 border-b px-6">
        <CardTitle className="text-xl font-bold">Options Market Overview</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-4 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">BTC Price:</span>
              <span className="text-xl font-medium">${btcPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">24h Change:</span>
              <span className={`font-medium ${btcPriceChange24h >= 0 ? "text-green-600" : "text-red-600"}`}>
                {btcPriceChange24h > 0 ? "+" : ""}{btcPriceChange24h}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">Available Options:</span>
              <span className="font-medium">{availableOptionsCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">24h Volume:</span>
              <span className="font-medium">{volume24h} STX</span>
            </div>
          </div>
          
          <div className="h-28 flex flex-col">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceTrendData}>
                <XAxis dataKey="time" hide />
                <YAxis domain={['auto', 'auto']} hide />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke={btcPriceChange24h >= 0 ? "#16a34a" : "#dc2626"} 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-xs text-center text-gray-500 mt-1">7-day price trend</div>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100 rounded-md">
            <TabsTrigger 
              value="all" 
              className="rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
            >
              All Options
            </TabsTrigger>
            <TabsTrigger 
              value="calls"
              className="rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
            >
              Calls
            </TabsTrigger>
            <TabsTrigger 
              value="puts"
              className="rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
            >
              Puts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="py-3 text-sm text-slate-500">
              Showing all {availableOptionsCount} available options
            </div>
          </TabsContent>
          
          <TabsContent value="calls">
            <div className="py-3 text-sm text-slate-500">
              Showing {Math.ceil(availableOptionsCount * 0.6)} call options
            </div>
          </TabsContent>
          
          <TabsContent value="puts">
            <div className="py-3 text-sm text-slate-500">
              Showing {Math.floor(availableOptionsCount * 0.4)} put options
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 