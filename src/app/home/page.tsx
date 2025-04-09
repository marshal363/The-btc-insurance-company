"use client";

import { useWalletStore } from "@/store/wallet-store";
import { useMarketStore } from "@/store/market-store";
import { useOptionsStore } from "@/store/options-store";
import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const { isConnected, connectWallet } = useWalletStore();
  const { btcPrice, btcPriceChange24h, availableOptions, fetchMarketData, fetchAvailableOptions } = useMarketStore();
  const { ownedOptions, fetchUserOptions } = useOptionsStore();

  useEffect(() => {
    // Fetch market data when component mounts
    fetchMarketData();
    fetchAvailableOptions();
    
    // If wallet is connected, fetch user options
    if (isConnected) {
      fetchUserOptions();
    }
  }, [fetchMarketData, fetchAvailableOptions, fetchUserOptions, isConnected]);

  return (
    <div className="container py-8">
      {!isConnected ? (
        <div className="bg-card rounded-lg p-6 mb-8 text-card-foreground shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Welcome to BitHedge</h1>
          <p className="text-lg mb-6">
            Connect your wallet to start hedging your Bitcoin against volatility using sBTC options.
          </p>
          <button
            onClick={() => connectWallet()}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 py-3"
          >
            Connect Wallet
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              <span className="font-medium">{availableOptions.length}</span>
            </div>
          </div>
        </div>

        {isConnected && (
          <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
            <h2 className="text-xl font-bold mb-4">Portfolio Summary</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Options Owned:</span>
                <span className="font-medium">{ownedOptions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Expiration:</span>
                <span className="font-medium">
                  {ownedOptions.length > 0
                    ? new Date(Math.min(...ownedOptions.map(opt => opt.expiry.getTime()))).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/easy-option"
          className="bg-card hover:bg-card/90 transition-colors rounded-lg p-6 text-card-foreground shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-2">Buy Option</h3>
          <p className="text-muted-foreground mb-4">
            Hedge your Bitcoin portfolio with a simple step-by-step process.
          </p>
          <div className="bg-primary/10 text-primary rounded-md px-3 py-1 inline-block text-sm">
            Easy Trade View →
          </div>
        </Link>

        <Link
          href="/option-data"
          className="bg-card hover:bg-card/90 transition-colors rounded-lg p-6 text-card-foreground shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-2">Market Data</h3>
          <p className="text-muted-foreground mb-4">
            Analyze options market data including open interest and volatility.
          </p>
          <div className="bg-primary/10 text-primary rounded-md px-3 py-1 inline-block text-sm">
            Data View →
          </div>
        </Link>

        <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Hedging Calculator</h3>
          <p className="text-muted-foreground mb-4">
            Calculate how many options you need to hedge your Bitcoin portfolio.
          </p>
          <div className="bg-secondary/10 text-secondary rounded-md px-3 py-1 inline-block text-sm">
            Coming Soon
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
        <h2 className="text-xl font-bold mb-4">Featured Options</h2>
        {availableOptions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Strike</th>
                  <th className="text-left py-3 px-4">Premium</th>
                  <th className="text-left py-3 px-4">Expiry</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {availableOptions.slice(0, 5).map((option) => (
                  <tr key={option.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <span className={option.type === "call" ? "text-profit" : "text-loss"}>
                        {option.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">{option.strikePrice.toLocaleString()} STX</td>
                    <td className="py-3 px-4">{option.premium} STX</td>
                    <td className="py-3 px-4">{option.expiry.toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/easy-option?option=${option.id}`}
                        className="text-primary text-sm hover:underline"
                      >
                        Trade
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">Loading options...</div>
        )}
      </div>
    </div>
  );
} 