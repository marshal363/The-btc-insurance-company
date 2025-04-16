import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface StrategySimulationProps {
  optionType: "put" | "call";
  strikePrice: number;
  currentPrice: number;
  premium: number;
  amount: number;
  riskTier: "conservative" | "balanced" | "aggressive";
}

// Type for scenario outcome
interface ScenarioOutcome {
  premiumKept: number;
  btcAcquired: number;
  acquisitionPrice?: number;
  marketValue?: number;
  effectiveDiscount?: number;
  netReturn: number;
  returnPercent: number;
}

export function StrategySimulation({
  optionType,
  strikePrice,
  currentPrice,
  premium,
  amount,
  riskTier
}: StrategySimulationProps) {
  // Generate simulation data for different price scenarios
  const generateSimulationData = () => {
    // Determine price range to simulate
    const minPrice = Math.floor(currentPrice * 0.7); // 30% down
    const maxPrice = Math.ceil(currentPrice * 1.3); // 30% up
    const step = Math.floor((maxPrice - minPrice) / 20); // 20 data points
    
    const data = [];
    for (let price = minPrice; price <= maxPrice; price += step) {
      // Calculate PUT seller's PnL (Income Irene)
      // For PUT seller:
      // - If BTC price > strike: keep premium (max profit)
      // - If BTC price < strike: keep premium but acquire BTC (potentially at loss)
      let pnl;
      
      if (optionType === "put") {
        if (price >= strikePrice) {
          // Above strike: keep full premium
          pnl = premium;
        } else {
          // Below strike: keep premium but acquire BTC at strike price
          const acquisition = (strikePrice - price) * amount;
          pnl = premium - acquisition;
        }
      } else {
        // CALL seller logic
        if (price <= strikePrice) {
          // Below strike: keep full premium
          pnl = premium;
        } else {
          // Above strike: keep premium but sell BTC at strike price (miss upside)
          const opportunity = (price - strikePrice) * amount;
          pnl = premium - opportunity;
        }
      }
      
      data.push({
        price,
        pnl,
        outcome: price < strikePrice ? "BTC Acquisition" : "Keep Premium"
      });
    }
    
    return data;
  };

  const simulationData = generateSimulationData();
  
  // Generate scenario data based on risk tier
  const generateScenarioData = () => {
    // Tier-specific scenarios
    const tiers = {
      conservative: {
        likelyDownside: 0.05, // 5% down
        moderateDownside: 0.15, // 15% down
        severeDownside: 0.25 // 25% down
      },
      balanced: {
        likelyDownside: 0.10, // 10% down
        moderateDownside: 0.20, // 20% down
        severeDownside: 0.30 // 30% down
      },
      aggressive: {
        likelyDownside: 0.15, // 15% down
        moderateDownside: 0.25, // 25% down
        severeDownside: 0.40 // 40% down
      }
    };
    
    const tierData = tiers[riskTier];
    
    // Calculate prices for each scenario
    const likelyPrice = Math.round(currentPrice * (1 - tierData.likelyDownside));
    const moderatePrice = Math.round(currentPrice * (1 - tierData.moderateDownside));
    const severePrice = Math.round(currentPrice * (1 - tierData.severeDownside));
    
    // Calculate outcomes for each scenario
    const calculateScenarioOutcome = (scenarioPrice: number): ScenarioOutcome => {
      if (scenarioPrice >= strikePrice) {
        // Above strike: keep full premium
        return {
          premiumKept: premium,
          btcAcquired: 0,
          netReturn: premium,
          returnPercent: (premium / (amount * strikePrice)) * 100
        };
      } else {
        // Below strike: acquire BTC at strike price
        const btcAcquired = amount;
        const acquisitionCost = (strikePrice - scenarioPrice) * amount;
        return {
          premiumKept: premium,
          btcAcquired,
          acquisitionPrice: strikePrice,
          marketValue: scenarioPrice * amount,
          effectiveDiscount: ((strikePrice - scenarioPrice) / strikePrice) * 100,
          netReturn: premium - acquisitionCost,
          returnPercent: ((premium - acquisitionCost) / (amount * strikePrice)) * 100
        };
      }
    };
    
    return {
      stable: {
        price: currentPrice,
        outcome: calculateScenarioOutcome(currentPrice)
      },
      likely: {
        price: likelyPrice,
        outcome: calculateScenarioOutcome(likelyPrice)
      },
      moderate: {
        price: moderatePrice,
        outcome: calculateScenarioOutcome(moderatePrice)
      },
      severe: {
        price: severePrice,
        outcome: calculateScenarioOutcome(severePrice)
      }
    };
  };
  
  const scenarioData = generateScenarioData();

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold">Strategy Value Simulator</h2>
        <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-700 rounded-full">
          Step 5 of 6
        </Badge>
      </div>

      <p className="text-muted-foreground mb-6">
        See how your income strategy performs under different market scenarios.
      </p>

      {/* Outcome Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="mb-8 bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-900 flex items-center gap-2">
              {optionType === "put" ? (
                <TrendingDown className="text-amber-600 h-5 w-5" />
              ) : (
                <TrendingUp className="text-amber-600 h-5 w-5" />
              )}
              Strategy Outcome Visualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full bg-white rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={simulationData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                  <XAxis 
                    dataKey="price" 
                    label={{ value: 'Bitcoin Price ($)', position: 'bottom', offset: -5, fill: '#888' }}
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <YAxis 
                    label={{ value: 'P&L (USD)', angle: -90, position: 'left', fill: '#888' }}
                    tickFormatter={(value) => `$${value.toFixed(0)}`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'P&L']}
                    labelFormatter={(label) => `BTC Price: $${label.toLocaleString()}`}
                    contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderColor: '#f59e0b' }}
                  />
                  <ReferenceLine 
                    x={strikePrice} 
                    stroke="#f59e0b" 
                    strokeDasharray="3 3"
                    label={{ value: 'Strike Price', position: 'top', fill: '#f59e0b' }}
                  />
                  <ReferenceLine 
                    y={0} 
                    stroke="#666" 
                    strokeDasharray="3 3" 
                  />
                  <ReferenceLine 
                    y={premium} 
                    stroke="#047857" 
                    strokeDasharray="3 3"
                    label={{ value: 'Max Profit', position: 'right', fill: '#047857' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pnl" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 8, fill: '#f59e0b' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center justify-between mt-4 text-sm border-t border-amber-100 pt-4">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-amber-500 block"></span>
                <span className="text-amber-700">Your P&L</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-amber-500 block dashed"></span>
                <span className="text-amber-700">Strike Price: ${strikePrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-green-700 block"></span>
                <span className="text-amber-700">Max Profit: ${premium.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Scenario Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-amber-900">Market Scenarios Analysis</h3>
          
          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 mb-4">
            <Tabs defaultValue="stable" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4 bg-white">
                <TabsTrigger value="stable">Current</TabsTrigger>
                <TabsTrigger value="likely">Likely</TabsTrigger>
                <TabsTrigger value="moderate">Moderate</TabsTrigger>
                <TabsTrigger value="severe">Severe</TabsTrigger>
              </TabsList>

              {Object.entries(scenarioData).map(([scenario, data]) => (
                <TabsContent key={scenario} value={scenario} className="bg-white rounded-lg p-5 border border-amber-100 shadow-sm">
                  <div className="flex justify-between border-b border-amber-100 pb-3 mb-3">
                    <div>
                      <h4 className="font-medium text-amber-900">
                        {scenario === "stable" 
                          ? "Current Price Scenario" 
                          : scenario === "likely" 
                            ? "Likely Downside Scenario" 
                            : scenario === "moderate" 
                              ? "Moderate Downside Scenario" 
                              : "Severe Downside Scenario"
                        }
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {scenario === "stable" 
                          ? "If Bitcoin price stays around the current level" 
                          : scenario === "likely" 
                            ? `If Bitcoin price falls ~${Math.round((currentPrice - data.price) / currentPrice * 100)}% to $${data.price.toLocaleString()}` 
                            : scenario === "moderate" 
                              ? `If Bitcoin price falls ~${Math.round((currentPrice - data.price) / currentPrice * 100)}% to $${data.price.toLocaleString()}` 
                              : `If Bitcoin price falls ~${Math.round((currentPrice - data.price) / currentPrice * 100)}% to $${data.price.toLocaleString()}`
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {data.price < strikePrice ? (
                        <div className="flex items-center text-amber-600">
                          <ArrowDown className="h-4 w-4 mr-1" />
                          <span className="font-semibold">Below Strike</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-green-600">
                          <ArrowUp className="h-4 w-4 mr-1" />
                          <span className="font-semibold">Above Strike</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">BTC Price:</span>
                        <span className="font-medium">${data.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Premium Kept:</span>
                        <span className="font-medium">${data.outcome.premiumKept.toFixed(2)}</span>
                      </div>
                      {data.price < strikePrice && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">BTC Acquired:</span>
                            <span className="font-medium">{data.outcome.btcAcquired.toFixed(6)} BTC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Acquisition Price:</span>
                            <span className="font-medium">${data.outcome.acquisitionPrice?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Market Value:</span>
                            <span className="font-medium">${data.outcome.marketValue?.toLocaleString()}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      {data.price < strikePrice && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Effective Discount:</span>
                          <span className="font-medium text-amber-600">
                            {data.outcome.effectiveDiscount?.toFixed(2)}%
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Net Return:</span>
                        <span className={`font-medium ${data.outcome.netReturn < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          ${data.outcome.netReturn.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Return %:</span>
                        <span className={`font-medium ${data.outcome.returnPercent < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {data.outcome.returnPercent.toFixed(2)}%
                        </span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-amber-100">
                        <div className="bg-amber-50 rounded-md p-3 text-sm text-amber-800">
                          {data.price < strikePrice ? (
                            <p>
                              In this scenario, you&apos;ll receive the premium but will acquire BTC at the strike price, 
                              which is above the current market price.
                            </p>
                          ) : (
                            <p>
                              In this scenario, you&apos;ll keep the full premium as profit without acquiring any BTC.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 