import React, { useState, useEffect } from "react";
import { BarChart4, Shield, BadgeCheck, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface PnlSimulationProps {
  optionType: "call" | "put";
  strikePrice: number;
  premium: number;
  amount: number;
  currentPrice: number;
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
  strikePrice,
  premium,
  amount,
  currentPrice
}: PnlSimulationProps) {
  // Simulation values state with premium from props
  const [simulationValues, setSimulationValues] = useState({
    strikePrice,
    amount,
    premium
  });
  
  // Update simulationValues when props change
  useEffect(() => {
    setSimulationValues({
      strikePrice,
      amount,
      premium
    });
  }, [strikePrice, amount, premium]);
  
  // Recalculate chart data when simulation values change
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  
  // For customization collapsible
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  
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
      strikePrice,
      amount,
      premium
    });
  };
  
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
        formattedPrice: formatCurrency(price) as string
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
      if (field === 'strikePrice') {
        // Recalculate premium when strike price changes
        const newPremium = calculatePremium(value, simulationValues.amount);
        setSimulationValues(prev => ({
          ...prev,
          strikePrice: value,
          premium: newPremium
        }));
      } else if (field === 'amount') {
        // Recalculate premium when amount changes
        const newPremium = calculatePremium(simulationValues.strikePrice, value);
        setSimulationValues(prev => ({
          ...prev,
          amount: value,
          premium: newPremium
        }));
      } else {
        // Allow manual premium override
        setSimulationValues(prev => ({
          ...prev,
          [field]: value
        }));
      }
    }
  };
  
  // Handle slider changes
  const handleStrikePriceSlider = (value: number[]) => {
    const percentage = value[0];
    const min = currentPrice * 0.7;
    const max = currentPrice * 1.3;
    const newStrikePrice = min + (percentage / 100) * (max - min);
    
    // Calculate new premium based on new strike price
    const newPremium = calculatePremium(newStrikePrice, simulationValues.amount);
    
    setSimulationValues(prev => ({
      ...prev,
      strikePrice: newStrikePrice,
      premium: newPremium
    }));
  };
  
  // Calculate premium using enhanced model
  const calculatePremium = (strikeValue: number, amountValue: number) => {
    // We use 30 days as the default duration for the simulator
    const durationValue = 30;
    
    // Volatility factor (normally this would come from market data)
    const annualVolatility = 0.65; // 65% annual volatility for Bitcoin
    const volatilityFactor = Math.sqrt(durationValue / 365) * annualVolatility;
    
    // Calculate strike distance from current price
    const strikePriceDelta = Math.abs(strikeValue - currentPrice) / currentPrice;
    
    // Calculate moneyness factor (premium increases for ITM options)
    let moneynessFactor = 1;
    const isPut = optionType === "put";
    const isITM = (isPut && strikeValue > currentPrice) || (!isPut && strikeValue < currentPrice);
    
    if (isITM) {
      // In-the-money options have higher premiums
      moneynessFactor = 1 + (strikePriceDelta * 1.5);
    } else {
      // Out-of-the-money options have lower premiums
      moneynessFactor = 1 - (strikePriceDelta * 0.5);
      // Ensure minimum value
      moneynessFactor = Math.max(moneynessFactor, 0.3);
    }
    
    // Duration scaling (shorter duration for simulator)
    const durationScaling = 1;
    
    // Base rate (percentage of protected amount)
    const baseRate = 0.05; // 5%
    
    // Calculate premium
    return amountValue * baseRate * durationScaling * volatilityFactor * moneynessFactor;
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

  // For clarity - determine outcome text based on option type
  const outcomeTextWhenNoAction = optionType === "put" 
    ? `If BTC stays above $${formatNumber(simulationValues.strikePrice)}, no need to activate protection.`
    : `If BTC stays below $${formatNumber(simulationValues.strikePrice)}, no need to use your price lock.`;
    
  const outcomeTextWhenAction = optionType === "put"
    ? `If BTC drops below $${formatNumber(simulationValues.strikePrice)}, activate protection to preserve value.`
    : `If BTC rises above $${formatNumber(simulationValues.strikePrice)}, use your price lock to buy at the locked price.`;

  return (
    <div className="space-y-5">
      {/* Badge only without duplicate title */}
      <div className="flex justify-end">
        <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-700 rounded-full">
          Step 5 of 6
        </Badge>
      </div>
      
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        {/* Header with key info */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-slate-800 p-2 rounded-full flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Protected Value:</h4>
              <p className="text-2xl font-bold">{formatCurrency(simulationValues.strikePrice)}</p>
            </div>
          </div>
          
          {/* Customization option moved here */}
          <div className="mb-4">
            <Collapsible 
              open={isCustomizeOpen} 
              onOpenChange={setIsCustomizeOpen}
              className="border border-slate-200 rounded-md"
            >
              <CollapsibleTrigger className="w-full p-2 flex items-center justify-between text-left focus:outline-none bg-slate-50 rounded-md hover:bg-slate-100">
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1.5 rounded-full flex-shrink-0 border border-slate-200">
                    <Settings className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                  <span className="text-sm font-medium text-slate-800">Customize Value</span>
                </div>
                {isCustomizeOpen ? 
                  <ChevronUp className="w-4 h-4 text-slate-600 flex-shrink-0" /> : 
                  <ChevronDown className="w-4 h-4 text-slate-600 flex-shrink-0" />
                }
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="p-3 pt-3 border-t border-slate-200">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-slate-600 mb-1 block">Protected Value (Strike Price)</Label>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <div className="flex-1">
                          <Slider
                            value={[getStrikePricePercentage()]} 
                            min={0} 
                            max={100}
                            step={1}
                            onValueChange={handleStrikePriceSlider}
                            className="my-2"
                          />
                        </div>
                        <div className="w-full sm:w-24">
                          <Input
                            type="number"
                            value={simulationValues.strikePrice}
                            onChange={(e) => handleInputChange(e, 'strikePrice')}
                            className="text-right border-slate-300"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-slate-600 mb-1 block">BTC Amount</Label>
                        <Input
                          type="number"
                          value={simulationValues.amount}
                          onChange={(e) => handleInputChange(e, 'amount')}
                          step="0.01"
                          min="0.01"
                          className="border-slate-300"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600 mb-1 block">Premium (USD)</Label>
                        <Input
                          type="number"
                          value={simulationValues.premium}
                          onChange={(e) => handleInputChange(e, 'premium')}
                          step="1"
                          min="1"
                          className="border-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetSimulation}
              className="h-9 flex-1 sm:flex-none"
            >
              Reset
            </Button>
            
            <Button 
              size="sm"
              className="bg-slate-900 text-white hover:bg-slate-800 h-9 flex-1 sm:flex-none"
            >
              <BarChart4 className="h-4 w-4 mr-2" />
              Detailed Analysis
            </Button>
          </div>
        </div>
        
        {/* Main chart */}
        <div className="p-3 sm:p-4 border-b border-slate-200">
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
              >
                <defs>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e293b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1e293b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9f1239" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#9f1239" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="formattedPrice" 
                  scale="band" 
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickFormatter={(value) => {
                    // Shorter labels on mobile by trimming dollar sign and showing fewer ticks
                    const trimmed = value.replace('$', '');
                    return window.innerWidth < 640 ? 
                      trimmed.length > 6 ? trimmed.substring(0, 6) + '..' : trimmed
                      : value;
                  }}
                  interval={window.innerWidth < 640 ? 1 : 0} // Show fewer X-axis labels on mobile
                />
                <YAxis 
                  tickFormatter={(value) => `$${Math.abs(value) >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`} 
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0} stroke="#64748b" strokeWidth={2} />
                <ReferenceLine 
                  x={formatCurrency(currentPrice)} 
                  stroke="#334155" 
                  strokeWidth={1.5} 
                  strokeDasharray="5 5"
                  label={{
                    value: 'Current Price',
                    position: 'insideBottomRight',
                    fill: '#334155',
                    fontSize: 10
                  }}
                />
                <ReferenceLine 
                  x={formatCurrency(simulationValues.strikePrice)} 
                  stroke="#1e40af" 
                  strokeWidth={1.5} 
                  label={{ 
                    value: 'Protected Value',
                    position: 'insideTopRight',
                    fill: '#1e40af',
                    fontSize: 10
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="pnl" 
                  stroke={optionType === "put" ? "#1e293b" : "#9f1239"} 
                  strokeWidth={2} 
                  fill={optionType === "put" ? "url(#profitGradient)" : "url(#lossGradient)"}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Key metrics and outcomes */}
        <div className="p-4 grid grid-cols-1 gap-6">
          {/* Key metrics */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-3">Key Values & Analysis</h4>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Protected Value</span>
                <span className="font-medium">{formatCurrency(simulationValues.strikePrice)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Premium Cost</span>
                <span className="font-medium">{formatCurrency(simulationValues.premium)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Amount Protected</span>
                <span className="font-medium">{formatNumber(simulationValues.amount, 8)} BTC</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Breakeven Price</span>
                <span className="font-medium">{formatCurrency(breakEvenPrice)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Max Possible Loss</span>
                <span className="font-medium">{formatCurrency(maxLoss)}</span>
              </div>
              {optionType === "put" && maxProfit && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Max Possible Gain</span>
                  <span className="font-medium">{formatCurrency(maxProfit)}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Protection outcomes */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-3">Protection Outcome</h4>
            <Card className="p-3 sm:p-4 border-slate-200 bg-slate-50">
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <div className="bg-white rounded-full p-1 mt-0.5 border border-slate-200 flex-shrink-0">
                    <BadgeCheck className="h-4 w-4 text-slate-700" />
                  </div>
                  <span className="text-xs sm:text-sm">
                    {outcomeTextWhenNoAction}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-white rounded-full p-1 mt-0.5 border border-slate-200 flex-shrink-0">
                    <BadgeCheck className="h-4 w-4 text-slate-700" />
                  </div>
                  <span className="text-xs sm:text-sm">
                    {outcomeTextWhenAction}
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}