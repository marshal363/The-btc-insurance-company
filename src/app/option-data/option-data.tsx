"use client";

import { useMarketStore } from "@/store/market-store";
import { useEffect } from "react";

export default function OptionData() {
  const { btcPrice, btcPriceChange24h, btcVolatility, fetchMarketData, availableOptions, fetchAvailableOptions } = useMarketStore();

  useEffect(() => {
    // Fetch market data when component mounts
    fetchMarketData();
    fetchAvailableOptions();
  }, [fetchMarketData, fetchAvailableOptions]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Option Data</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-lg p-4 text-card-foreground shadow-sm">
          <div className="text-sm text-muted-foreground">BTC Price</div>
          <div className="text-2xl font-semibold">${btcPrice.toLocaleString()}</div>
          <div className={`text-sm ${btcPriceChange24h >= 0 ? "text-profit" : "text-loss"}`}>
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
          <div className="text-2xl font-semibold">0.8</div>
          <div className="text-sm text-muted-foreground">Slight bullish bias</div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">Options Chain</h2>
        <div className="text-center py-8 text-muted-foreground">
          Option chain visualization will be implemented in Phase 6.
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
          <h2 className="text-xl font-bold mb-4">Open Interest</h2>
          <div className="text-center py-8 text-muted-foreground">
            Open interest chart will be implemented in Phase 6.4.
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
          <h2 className="text-xl font-bold mb-4">Volume Distribution</h2>
          <div className="text-center py-8 text-muted-foreground">
            Volume distribution chart will be implemented in Phase 6.4.
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
        <h2 className="text-xl font-bold mb-4">Implied Volatility</h2>
        <div className="text-center py-8 text-muted-foreground">
          Implied volatility visualization will be implemented in Phase 6.4.
        </div>
      </div>
    </div>
  );
} 