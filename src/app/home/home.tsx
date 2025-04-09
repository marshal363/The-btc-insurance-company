"use client";

import { useWalletStore } from "@/store/wallet-store";
import { useMarketStore } from "@/store/market-store";
import { useOptionsStore } from "@/store/options-store";
import { useEffect } from "react";
import { WelcomeSection } from "@/components/home/welcome-section";
import { MarketOverview } from "@/components/home/market-overview";
import { PortfolioSummary } from "@/components/home/portfolio-summary";
import { ActionCards } from "@/components/home/action-cards";
import { FeaturedOptions } from "@/components/home/featured-options";

export default function Home() {
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
        <WelcomeSection onConnectWallet={connectWallet} />
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <MarketOverview 
          btcPrice={btcPrice} 
          btcPriceChange24h={btcPriceChange24h} 
          availableOptionsCount={availableOptions.length} 
        />

        {isConnected && (
          <PortfolioSummary ownedOptions={ownedOptions} />
        )}
      </div>

      <ActionCards />

      <FeaturedOptions options={availableOptions} />
    </div>
  );
} 