"use client";

interface MarketOverviewProps {
  btcPrice: number;
  btcPriceChange24h: number;
  availableOptionsCount: number;
}

export function MarketOverview({ 
  btcPrice, 
  btcPriceChange24h, 
  availableOptionsCount 
}: MarketOverviewProps) {
  return (
    <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
      <h2 className="text-xl font-bold mb-4">Options Market Overview</h2>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">BTC Price:</span>
          <span className="font-medium">${btcPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">24h Change:</span>
          <span className={btcPriceChange24h >= 0 ? "text-profit" : "text-loss"}>
            {btcPriceChange24h > 0 ? "+" : ""}{btcPriceChange24h}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Available Options:</span>
          <span className="font-medium">{availableOptionsCount}</span>
        </div>
      </div>
    </div>
  );
} 