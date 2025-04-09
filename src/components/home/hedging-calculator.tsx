import { useState, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface HedgingCalculatorProps {
  isConnected: boolean;
  portfolioValue?: number;
}

export function HedgingCalculator({ isConnected, portfolioValue = 0 }: HedgingCalculatorProps) {
  // State for calculator inputs
  const [btcHoldings, setBtcHoldings] = useState<number>(2.5);
  const [hedgePercent, setHedgePercent] = useState<number>(50);
  
  // Calculate required options (simplified example)
  // Use portfolioValue if provided, otherwise calculate from BTC holdings
  const btcValue = portfolioValue > 0 ? portfolioValue : btcHoldings * 48000; // Assuming BTC at $48k
  const amountToHedge = btcValue * (hedgePercent / 100);
  const optionsNeeded = Math.ceil(amountToHedge / 15000); // Assuming each option covers ~$15k
  const estimatedCost = optionsNeeded * 50; // Assuming 50 STX per option
  
  // Handler for BTC holdings input change
  const handleBtcHoldingsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setBtcHoldings(value);
  };
  
  // Handler for hedge percentage slider change
  const handleHedgePercentChange = (values: number[]) => {
    setHedgePercent(values[0]);
  };
  
  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="pb-2 border-b px-6">
        <CardTitle className="text-xl font-bold">Hedging Calculator</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-4">
        <div className="space-y-6">
          <div>
            <Label htmlFor="btc-holdings" className="text-slate-500 text-sm mb-2 block">BTC Holdings</Label>
            <div className="relative">
              <Input
                id="btc-holdings"
                type="number"
                min={0.01}
                step={0.1}
                value={btcHoldings}
                onChange={handleBtcHoldingsChange}
                className="pr-16 h-10"
              />
              <span className="absolute right-3 top-0 h-full flex items-center text-sm text-slate-500">
                BTC
              </span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="hedge-percentage" className="text-slate-500 text-sm">Hedge Percentage</Label>
              <span className="text-sm font-medium">{hedgePercent}%</span>
            </div>
            <Slider
              id="hedge-percentage"
              min={0}
              max={100}
              step={5}
              value={[hedgePercent]}
              onValueChange={handleHedgePercentChange}
              className="mb-1"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100">
            <div className="flex justify-between mb-2 items-center">
              <span className="text-sm text-slate-500">Options Needed:</span>
              <span className="font-semibold text-lg">{optionsNeeded}</span>
            </div>
            <div className="flex justify-between mb-5 items-center">
              <span className="text-sm text-slate-500">Estimated Cost:</span>
              <span className="font-semibold text-lg">{estimatedCost} STX</span>
            </div>
            
            <Button 
              className="w-full py-6 rounded-md text-white font-medium text-base bg-black hover:bg-gray-800"
              disabled={!isConnected}
            >
              {isConnected ? "Buy Hedge Options" : "Connect Wallet to Buy"}
            </Button>
            
            <p className="mt-3 text-xs text-center text-slate-500">
              This is an estimate. Actual costs may vary based on market conditions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 