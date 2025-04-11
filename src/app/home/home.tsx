"use client";

import { useMarketStore } from "@/store/market-store";
import { useOptionsStore } from "@/store/options-store";
import { useWallet } from "@/hooks/wallet/useWallet";
import { useEffect } from "react";
import { WelcomeSection } from "@/components/home/welcome-section";
import { MarketOverview } from "@/components/home/market-overview";
import { PortfolioSummary } from "@/components/home/portfolio-summary";
import { FeaturedOptions } from "@/components/home/featured-options";
import { PLVisualization } from "@/components/home/pl-visualization";
import { HedgingCalculator } from "@/components/home/hedging-calculator";
import { LearningResources } from "@/components/home/learning-resources";
import { NetworkStatus } from "@/components/home/network-status";
import { WalletConnect } from "@/components/wallet/WalletConnect";

export default function Home() {
  // Use wallet hook for wallet-related state and actions
  const { isConnected } = useWallet();
  
  // Use market and options stores
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

  // Mock data for demonstration (would come from stores in production)
  const mockStxBalance = 200;
  const mockSbtcBalance = 0.5;
  const mockPortfolioValue = 125000;
  const mockHedgePercentage = 12;
  const mockVolume24h = 350;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Banner (only when not connected) */}
      {!isConnected ? (
        <div className="mb-6">
          <WelcomeSection />
        </div>
      ) : null}

      {/* SECTION 1: Options Market Overview, Network Status and Portfolio Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Left column: Network Status and Market Overview */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Network Status */}
          <div className="flex-none">
            <NetworkStatus />
          </div>
          
          {/* Market Overview */}
          <div className="flex-grow">
            <MarketOverview 
              btcPrice={btcPrice} 
              btcPriceChange24h={btcPriceChange24h}
              volume24h={mockVolume24h}
              availableOptionsCount={availableOptions.length} 
            />
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="lg:col-span-5">
          {isConnected ? (
            <PortfolioSummary 
              ownedOptions={ownedOptions}
              stxBalance={mockStxBalance}
              sbtcBalance={mockSbtcBalance}
              portfolioValue={mockPortfolioValue}
              hedgePercentage={mockHedgePercentage}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 h-full flex flex-col justify-center">
              <h2 className="text-xl font-semibold mb-3">Connect to View Portfolio</h2>
              <p className="text-gray-600 mb-4">Connect your wallet to view your portfolio details and manage your options.</p>
              <WalletConnect 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: P&L Visualization and Hedging Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* P&L Visualization */}
        <div className="lg:col-span-7">
          <PLVisualization 
            isConnected={isConnected}
            ownedOptions={ownedOptions.map(opt => ({
              type: 'call',
              strike: 50000,
              daysToExpiry: 7,
              expiry: opt.expiry
            }))}
          />
        </div>
        
        {/* Hedging Calculator */}
        <div className="lg:col-span-5" id="hedging-calculator">
          <HedgingCalculator 
            isConnected={isConnected}
            portfolioValue={mockPortfolioValue} 
          />
        </div>
      </div>

      {/* SECTION 3: Featured Options */}
      <div className="mb-6">
        <FeaturedOptions options={availableOptions} />
      </div>

      {/* SECTION 4: Learning Resources */}
      <div className="mb-12">
        <LearningResources />
      </div>
    </div>
  );
} 