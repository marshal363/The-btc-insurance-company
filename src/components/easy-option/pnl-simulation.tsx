import React, { useState, useEffect } from "react";
import { X, ArrowUp, ArrowDown, Info, ChevronRight, ChevronLeft, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer, 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Area,
  ComposedChart
} from "recharts";

interface PnlSimulationProps {
  optionType: "call" | "put";
  strikePrice: number;
  premium: number;
  amount: number;
  currentPrice: number;
  onClose: () => void;
}

interface ChartDataPoint {
  price: number;
  pnl: number;
  formattedPrice: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: ChartDataPoint;
  }>;
}

export function PnlSimulation({
  optionType,
  strikePrice: initialStrikePrice,
  premium: initialPremium,
  amount: initialAmount,
  currentPrice,
  onClose
}: PnlSimulationProps) {
  // Local simulation state
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [simulationValues, setSimulationValues] = useState({
    strikePrice: initialStrikePrice,
    premium: initialPremium,
    amount: initialAmount
  });
  const [expanded, setExpanded] = useState(false);
  
  // Calculate break-even price
  const breakEvenPrice = 
    optionType === "put" 
      ? simulationValues.strikePrice - (simulationValues.premium / simulationValues.amount) 
      : simulationValues.strikePrice + (simulationValues.premium / simulationValues.amount);
  
  // Calculate maximum potential profit and loss
  const maxProfit = optionType === "put" ? (simulationValues.strikePrice - 0) * simulationValues.amount : undefined;
  const maxLoss = simulationValues.premium;
  
  // Reset simulation to original values
  const resetSimulation = () => {
    setSimulationValues({
      strikePrice: initialStrikePrice,
      premium: initialPremium,
      amount: initialAmount
    });
  };
  
  // Update when initial props change
  useEffect(() => {
    setSimulationValues({
      strikePrice: initialStrikePrice,
      premium: initialPremium,
      amount: initialAmount
    });
  }, [initialStrikePrice, initialPremium, initialAmount]);
  
  // Update chart data when simulation values change
  useEffect(() => {
    generateChartData();
  }, [simulationValues, optionType, currentPrice]);
  
  // Generate PnL data points
  const generateChartData = () => {
    const step = currentPrice * 0.05; // 5% steps
    const minPrice = Math.max(currentPrice * 0.5, 1); // don't go below 50% or 1
    const maxPrice = currentPrice * 1.5; // up to 150%
    
    const newPoints = [];
    const { strikePrice, premium, amount } = simulationValues;
    
    for (let price = minPrice; price <= maxPrice; price += step) {
      let pnl = 0;
      
      if (optionType === "put") {
        // For PUT: profit = (strike - market) * amount - premium (if market < strike)
        if (price < strikePrice) {
          pnl = (strikePrice - price) * amount - premium;
        } else {
          pnl = -premium; // max loss is premium
        }
      } else {
        // For CALL: profit = (market - strike) * amount - premium (if market > strike)
        if (price > strikePrice) {
          pnl = (price - strikePrice) * amount - premium;
        } else {
          pnl = -premium; // max loss is premium
        }
      }
      
      newPoints.push({ 
        price,
        pnl, 
        formattedPrice: formatCurrency(price)
      });
    }
    
    setChartData(newPoints);
  };
  
  // Helper function to format numbers as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format number with specific decimal places
  const formatNumber = (value: number, decimals = 2) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'strikePrice' | 'premium' | 'amount') => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setSimulationValues(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };
  
  // Handle slider changes
  const handleStrikePriceSlider = (value: number[]) => {
    const percentage = value[0];
    const min = currentPrice * 0.7;
    const max = currentPrice * 1.3;
    const newStrikePrice = min + (percentage / 100) * (max - min);
    
    setSimulationValues(prev => ({
      ...prev,
      strikePrice: newStrikePrice
    }));
  };
  
  // Calculate strike price slider percentage
  const getStrikePricePercentage = () => {
    const min = currentPrice * 0.7;
    const max = currentPrice * 1.3;
    return Math.round(((simulationValues.strikePrice - min) / (max - min)) * 100);
  };
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-md text-sm">
          <p className="font-semibold">{`BTC Price: ${formatCurrency(payload[0].payload.price)}`}</p>
          <p className={`${payload[0].value >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
            {`Value: ${formatCurrency(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`fixed inset-y-0 right-0 z-50 flex transition-all duration-300 ease-in-out ${expanded ? 'translate-x-0' : 'translate-x-[calc(100%-40px)]'}`}>
      {/* Toggle Button */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setExpanded(!expanded)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full h-20 w-10 p-0 rounded-l-md rounded-r-none shadow-md border-r-0"
      >
        <SlidersHorizontal className="h-4 w-4 mb-1" />
        <div className="rotate-90 text-xs font-medium">
          {expanded ? "Hide" : "Simulator"}
        </div>
        {expanded ? 
          <ChevronRight className="h-4 w-4 mt-1" /> : 
          <ChevronLeft className="h-4 w-4 mt-1" />
        }
      </Button>
    
      {/* Main Panel */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-l border-gray-200 shadow-xl w-[90vw] max-w-[480px] flex flex-col">
        <div className="p-4 border-b border-border/40 flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {optionType === "put" ? "Protection Value Simulator" : "Price Lock Value Simulator"}
            <span className="text-xs font-normal text-muted-foreground">
              (Current price: ${formatNumber(currentPrice)})
            </span>
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <Tabs defaultValue="chart" className="w-full">
            <div className="px-4 pt-4">
              <TabsList className="w-full">
                <TabsTrigger value="chart" className="flex-1">Chart</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">Adjust Variables</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="chart" className="p-4 mt-0 flex-1 overflow-auto">
              <div className="h-[300px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="price" 
                      tickFormatter={(value) => formatCurrency(value)}
                      domain={['dataMin', 'dataMax']}
                      type="number"
                      tickCount={5}
                      fontSize={12}
            />
            <YAxis 
                      tickFormatter={(value) => formatCurrency(value)}
                      fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine 
                      x={currentPrice} 
                      stroke="#666" 
                      strokeDasharray="3 3" 
                      label={{ value: "Current", position: "insideBottomRight", fontSize: 12 }} 
                    />
                    <ReferenceLine 
                      x={simulationValues.strikePrice} 
                      stroke={optionType === "put" ? "#3b82f6" : "#10b981"} 
                      strokeDasharray="3 3" 
                      label={{ 
                        value: optionType === "put" ? "Protected" : "Purchase", 
                        position: "insideBottomLeft", 
                        fontSize: 12,
                        fill: optionType === "put" ? "#3b82f6" : "#10b981"
                      }} 
                    />
                    <ReferenceLine y={0} stroke="#888" strokeWidth={1} />
                    <Area 
              type="monotone" 
                      dataKey="pnl" 
                      fill={optionType === "put" ? "#3b82f6" : "#10b981"} 
                      fillOpacity={0.2}
                      stroke={optionType === "put" ? "#3b82f6" : "#10b981"} 
              strokeWidth={2} 
                      activeDot={{ r: 6 }}
            />
                  </ComposedChart>
        </ResponsiveContainer>
      </div>
      
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4 bg-background/80 p-4 rounded-lg backdrop-blur-sm border border-border/20">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Maximum Profit
                  </p>
                  <p className="font-semibold">
                    {maxProfit ? `${formatCurrency(maxProfit)}` : 'Unlimited'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Maximum Loss
                  </p>
                  <p className="font-semibold text-amber-600">{formatCurrency(maxLoss)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Break-even Price
                  </p>
                  <p className="font-semibold">{formatCurrency(breakEvenPrice)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    {optionType === "put" ? "Insurance Premium" : "Lock-in Fee"}
                  </p>
                  <p className="font-semibold">{formatCurrency(simulationValues.premium)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {optionType === "put" ? "Protected Value" : "Purchase Price"}
                    </span>
                    <span className="font-medium">{formatCurrency(simulationValues.strikePrice)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Protection Amount</span>
                    <span className="font-medium">{formatNumber(simulationValues.amount, 4)} BTC</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Price</span>
                    <span className="font-medium">{formatCurrency(currentPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Position</span>
                    <span className="flex items-center font-medium">
                      {simulationValues.strikePrice === currentPrice ? (
                        "At the Money"
                      ) : optionType === "put" && simulationValues.strikePrice > currentPrice ? (
                        <>
                          <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                          In the Money
                        </>
                      ) : optionType === "call" && simulationValues.strikePrice < currentPrice ? (
                        <>
                          <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                          In the Money
                        </>
                      ) : (
                        <>
                          <ArrowDown className="h-3 w-3 text-amber-500 mr-1" />
                          Out of the Money
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="p-4 mt-0">
              <div className="space-y-6">
                <div className="bg-background/80 p-4 rounded-lg backdrop-blur-sm border border-border/20">
      <div className="space-y-4">
                    <div>
                      <Label htmlFor="strikePrice" className="text-sm font-medium">
                        {optionType === "put" ? "Protected Value" : "Purchase Price"}
                      </Label>
                      <div className="mt-2">
                        <Slider
                          id="strikePrice"
                          defaultValue={[getStrikePricePercentage()]}
                          max={100}
                          step={1}
                          value={[getStrikePricePercentage()]}
                          onValueChange={handleStrikePriceSlider}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">-30%</span>
                        <Input
                          type="number"
                          value={simulationValues.strikePrice}
                          onChange={(e) => handleInputChange(e, 'strikePrice')}
                          className="w-24 h-8 text-right text-sm"
                        />
                        <span className="text-xs text-muted-foreground">+30%</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="amount" className="text-sm font-medium">
                        Bitcoin Amount
                      </Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          id="amount"
                          type="number"
                          value={simulationValues.amount}
                          onChange={(e) => handleInputChange(e, 'amount')}
                          className="h-9"
                          step="0.01"
                          min="0.01"
                        />
                        <span className="text-sm text-muted-foreground">BTC</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        ≈ {formatCurrency(simulationValues.amount * currentPrice)}
              </p>
            </div>
                    
                    <div>
                      <Label htmlFor="premium" className="text-sm font-medium">
                        {optionType === "put" ? "Insurance Premium" : "Lock-in Fee"}
                      </Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          id="premium"
                          type="number"
                          value={simulationValues.premium}
                          onChange={(e) => handleInputChange(e, 'premium')}
                          className="h-9"
                          step="1"
                          min="1"
                        />
                        <span className="text-sm text-muted-foreground">USD</span>
            </div>
            </div>
          </div>
        </div>
        
            <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={resetSimulation}
                  >
                    Reset to Default
                  </Button>
            </div>
            </div>
            </TabsContent>
          </Tabs>
          
          <div className="p-4">
            <div className="p-3 bg-background/80 rounded-lg backdrop-blur-sm border border-border/20 flex items-start gap-2">
              <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                {optionType === "put" 
                  ? "This simulation helps you visualize the value of your protection policy at different Bitcoin price levels. Adjust variables to see how they affect your potential outcomes."
                  : "This simulation helps you visualize the value of your price lock at different Bitcoin price levels. Adjust variables to see how they affect your potential outcomes."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 