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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Strategy Value Simulator</h2>
        <p className="text-muted-foreground mb-4">
          See how your income strategy performs under different market scenarios.
        </p>
      </div>

      {/* Outcome Visualization */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Strategy Outcome Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={simulationData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
                <XAxis 
                  dataKey="price" 
                  label={{ value: 'Bitcoin Price ($)', position: 'bottom', offset: -5 }}
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <YAxis 
                  label={{ value: 'P&L (USD)', angle: -90, position: 'left' }}
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'P&L']}
                  labelFormatter={(label) => `BTC Price: $${label.toLocaleString()}`}
                />
                <ReferenceLine 
                  x={strikePrice} 
                  stroke="#ff0000" 
                  strokeDasharray="3 3"
                  label={{ value: 'Strike Price', position: 'top', fill: '#ff0000' }}
                />
                <ReferenceLine 
                  y={0} 
                  stroke="#666" 
                  strokeDasharray="3 3" 
                />
                <ReferenceLine 
                  y={premium} 
                  stroke="#008000" 
                  strokeDasharray="3 3"
                  label={{ value: 'Max Profit', position: 'right', fill: '#008000' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pnl" 
                  stroke="#0066cc" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-sm border-t pt-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#0066cc] block"></span>
              <span>Your P&L</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#ff0000] block dashed"></span>
              <span>Strike Price: ${strikePrice.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[#008000] block"></span>
              <span>Max Profit: ${premium.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenario Analysis */}
      <Tabs defaultValue="stable" className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Scenario Analysis</h3>
          <TabsList>
            <TabsTrigger value="stable">
              Stable Market
            </TabsTrigger>
            <TabsTrigger value="likely">
              Likely Downside
            </TabsTrigger>
            <TabsTrigger value="moderate">
              Moderate Downside
            </TabsTrigger>
            <TabsTrigger value="severe">
              Severe Downside
            </TabsTrigger>
          </TabsList>
        </div>

        {Object.entries(scenarioData).map(([key, data]) => (
          <TabsContent key={key} value={key} className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">
                      {key === 'stable' ? 'Stable Market' :
                       key === 'likely' ? 'Likely Downside' :
                       key === 'moderate' ? 'Moderate Downside' :
                       'Severe Downside'} Scenario
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Bitcoin Price: ${data.price.toLocaleString()}
                      {key !== 'stable' && ` (${((data.price - currentPrice) / currentPrice * 100).toFixed(1)}% from current)`}
                    </p>
                  </div>
                  <Badge variant={
                    key === 'stable' ? 'outline' : 
                    key === 'likely' ? 'secondary' : 
                    key === 'moderate' ? 'default' : 
                    'destructive'
                  }>
                    {data.price >= strikePrice ? 'Keep Premium' : 'BTC Acquisition'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Premium Kept:</span>
                      <span>${data.outcome.premiumKept.toFixed(2)}</span>
                    </div>
                    
                    {data.price < strikePrice ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">BTC Acquired:</span>
                          <span>{data.outcome.btcAcquired.toFixed(4)} BTC</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Acquisition Price:</span>
                          <span>${data.outcome.acquisitionPrice?.toLocaleString() || "--"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Market Value:</span>
                          <span>${data.outcome.marketValue?.toFixed(2) || "--"}</span>
                        </div>
                        <div className="flex justify-between text-primary">
                          <span>Effective Discount:</span>
                          <span>{data.outcome.effectiveDiscount?.toFixed(2) || "--"}%</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between text-primary">
                        <span>Full Premium Kept:</span>
                        <span>Yes (Max Profit)</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-semibold pt-2 mt-2 border-t">
                      <span>Net Return:</span>
                      <span className={data.outcome.netReturn >= 0 ? 'text-green-600' : 'text-red-600'}>
                        ${data.outcome.netReturn.toFixed(2)} ({data.outcome.returnPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h5 className="font-medium">Strategy Outcome</h5>
                    <p className="text-sm">
                      {data.price >= strikePrice ? (
                        "You earn the full premium as your maximum profit. The options expire without being exercised."
                      ) : (
                        `You keep the premium and acquire Bitcoin at the strike price of $${strikePrice.toLocaleString()}, 
                        which is ${data.outcome.effectiveDiscount?.toFixed(2) || "--"}% higher than the market price in this scenario.
                        Your effective acquisition cost is reduced by the premium you received.`
                      )}
                    </p>
                    
                    <h5 className="font-medium mt-4">Recommendation</h5>
                    <p className="text-sm">
                      {data.price >= strikePrice ? (
                        "Continue with similar strategies to generate consistent yield."
                      ) : (
                        data.outcome.netReturn >= 0 ? (
                          "Despite acquiring Bitcoin, your strategy is profitable due to the premium received. Consider selling some of the acquired Bitcoin or holding for potential recovery."
                        ) : (
                          "Your strategy has resulted in a paper loss. Consider holding the acquired Bitcoin for recovery or implementing a dollar-cost averaging strategy."
                        )
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 