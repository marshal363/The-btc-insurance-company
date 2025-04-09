"use client";

import { OptionData } from "@/store/market-store";

interface MarketOverviewCardsProps {
  btcPrice: number;
  btcPriceChange24h: number;
  btcVolatility: number;
  putCallRatio: number;
  availableOptions: OptionData[];
}

export function MarketOverviewCards({
  btcPrice,
  btcPriceChange24h,
  btcVolatility,
  putCallRatio,
  availableOptions
}: MarketOverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-card rounded-lg p-4 text-card-foreground shadow-sm">
        <div className="text-sm text-muted-foreground">BTC Price</div>
        <div className="text-2xl font-semibold">${btcPrice.toLocaleString()}</div>
        <div className={`text-sm ${btcPriceChange24h >= 0 ? "text-green-600" : "text-red-600"}`}>
          {btcPriceChange24h > 0 ? "+" : ""}{btcPriceChange24h}%
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-4 text-card-foreground shadow-sm">
        <div className="text-sm text-muted-foreground">Historical Volatility</div>
        <div className="text-2xl font-semibold">{btcVolatility}%</div>
        <div className="text-sm text-muted-foreground">30-day</div>
      </div>
      
      <div className="bg-card rounded-lg p-4 text-card-foreground shadow-sm">
        <div className="text-sm text-muted-foreground">Available Options</div>
        <div className="text-2xl font-semibold">{availableOptions.length}</div>
        <div className="text-sm text-muted-foreground">
          {availableOptions.filter(opt => opt.type === "call").length} calls / {availableOptions.filter(opt => opt.type === "put").length} puts
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-4 text-card-foreground shadow-sm">
        <div className="text-sm text-muted-foreground">Put/Call Ratio</div>
        <div className="text-2xl font-semibold">{putCallRatio}</div>
        <div className="text-sm text-muted-foreground">
          {putCallRatio < 0.7 ? "Bullish" : putCallRatio > 1.3 ? "Bearish" : "Neutral"} bias
        </div>
      </div>
    </div>
  );
} 