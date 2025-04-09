import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Maximize2, Minimize2 } from "lucide-react";

interface Option {
  type: string;
  strike: number;
  daysToExpiry: number;
  expiry: Date | string;
}

interface PLVisualizationProps {
  isConnected: boolean;
  ownedOptions: Option[];
}

// Sample data - would be calculated from actual options in production
const mockData = [
  { price: 40000, pnl: -2000 },
  { price: 42000, pnl: -1500 },
  { price: 44000, pnl: -1000 },
  { price: 46000, pnl: -500 },
  { price: 48000, pnl: 0 },
  { price: 50000, pnl: 500 },
  { price: 52000, pnl: 1000 },
  { price: 54000, pnl: 1500 },
  { price: 56000, pnl: 2000 },
];

export function PLVisualization({ isConnected, ownedOptions }: PLVisualizationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeView, setActiveView] = useState("portfolio");
  
  // If not connected or no options, show placeholder
  if (!isConnected || ownedOptions.length === 0) {
    return (
      <Card className="shadow-sm h-full">
        <CardHeader className="pb-2 border-b px-6">
          <CardTitle className="text-xl font-bold">P&L Visualization</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 px-6">
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-gray-500 mb-4">
              {!isConnected 
                ? "Connect your wallet to view potential profit and loss scenarios."
                : "Purchase options to see potential profit and loss scenarios."}
            </p>
            <div className="text-sm text-gray-400">
              P&L charts show how your portfolio value changes at different BTC prices
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`shadow-sm h-full transition-all duration-300 ${isExpanded ? "col-span-full" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b px-6">
        <CardTitle className="text-xl font-bold">P&L Visualization</CardTitle>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-8 w-8 border-slate-200"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent className="pt-4 px-6">
        <Tabs value={activeView} onValueChange={setActiveView}>
          <TabsList className="inline-flex bg-slate-100 rounded-md p-1 mb-4">
            <TabsTrigger 
              value="portfolio" 
              className="rounded-sm text-sm py-1.5 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Portfolio-Wide
            </TabsTrigger>
            <TabsTrigger 
              value="option"
              className="rounded-sm text-sm py-1.5 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Per Option
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <XAxis 
                  dataKey="price" 
                  tickFormatter={(value) => `$${value/1000}k`}
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <YAxis
                  tickFormatter={(value) => `$${value}`}
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value}`, "P&L"]}
                  labelFormatter={(value: string | number) => `BTC Price: $${value}`}
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pnl" 
                  stroke="#1e90ff" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="option" className="h-60">
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-xs mx-auto">
                <p className="text-gray-500 mb-4">Select an option to view its P&L profile</p>
                {ownedOptions.length > 0 && (
                  <select className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    {ownedOptions.map((option, index) => (
                      <option key={index} value={index}>
                        {option.type.toUpperCase()} @ {option.strike} STX - Expires in {option.daysToExpiry}d
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-3 text-xs text-center text-slate-500">
          This visualization shows estimated P&L at different Bitcoin prices. 
          Actual results may vary based on market conditions.
        </div>
      </CardContent>
    </Card>
  );
} 