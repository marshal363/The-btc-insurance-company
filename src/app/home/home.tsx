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
import { Shield, TrendingUp, Bitcoin, Wallet, BookOpen } from "lucide-react";

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
        <div className="mb-8">
          <WelcomeSection />
        </div>
      ) : null}

      {/* SECTION 1: Bitcoin Market Overview, Network Status and Protection Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left column: Network Status and Market Overview */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Network Status */}
          <div className="flex-none">
            <NetworkStatus />
          </div>
          
          {/* Market Overview - Updated with premium design */}
          <div className="flex-grow overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white p-2 rounded-full">
                  <Bitcoin className="h-5 w-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold">Bitcoin Market Overview</h2>
              </div>
              <p className="text-blue-100 text-sm ml-11">
                Current market conditions for your protection decisions
              </p>
            </div>
            <div className="bg-white p-5">
              <MarketOverview 
                btcPrice={btcPrice} 
                btcPriceChange24h={btcPriceChange24h}
                volume24h={mockVolume24h}
                availableOptionsCount={availableOptions.length} 
              />
            </div>
          </div>
        </div>

        {/* Protection Portfolio Summary - Updated with premium design */}
        <div className="lg:col-span-5">
          {isConnected ? (
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm h-full">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white p-2 rounded-full">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold">Protection Portfolio</h2>
                </div>
                <p className="text-green-100 text-sm ml-11">
                  Your active Bitcoin protection policies
                </p>
              </div>
              <div className="bg-white p-5">
                <PortfolioSummary 
                  ownedOptions={ownedOptions}
                  stxBalance={mockStxBalance}
                  sbtcBalance={mockSbtcBalance}
                  portfolioValue={mockPortfolioValue}
                  hedgePercentage={mockHedgePercentage}
                />
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm h-full">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white p-2 rounded-full">
                    <Wallet className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold">Get Started</h2>
                </div>
                <p className="text-blue-100 text-sm ml-11">
                  Connect to manage your Bitcoin protection
                </p>
              </div>
              <div className="bg-white p-6 flex flex-col justify-center items-center h-full">
                <div className="text-center max-w-sm mx-auto">
                  <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Connect to View Your Protection</h3>
                  <p className="text-gray-600 mb-6">Connect your wallet to view your active protection policies and secure your Bitcoin holdings.</p>
                  <WalletConnect 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-medium shadow-sm transition-colors w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Coverage Value Visualization and Protection Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Coverage Value Visualization - Updated with premium design */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-4 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold">Coverage Value Visualization</h2>
              </div>
              <p className="text-purple-100 text-sm ml-11">
                See how your protection policies perform across price points
              </p>
            </div>
            <div className="bg-white p-5">
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
          </div>
        </div>
        
        {/* Protection Calculator - Updated with premium design */}
        <div className="lg:col-span-5" id="hedging-calculator">
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm h-full">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white p-2 rounded-full">
                  <Shield className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold">Protection Calculator</h2>
              </div>
              <p className="text-amber-100 text-sm ml-11">
                Calculate optimal coverage for your Bitcoin
              </p>
            </div>
            <div className="bg-white p-5">
              <HedgingCalculator 
                isConnected={isConnected}
                portfolioValue={mockPortfolioValue} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Featured Protection Policies - Updated with premium design */}
      <div className="mb-8">
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white p-2 rounded-full">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold">Featured Protection Policies</h2>
            </div>
            <p className="text-blue-100 text-sm ml-11">
              Recommended protection strategies for current market conditions
            </p>
          </div>
          <div className="bg-white p-5">
            <FeaturedOptions options={availableOptions} />
          </div>
        </div>
      </div>

      {/* SECTION 4: Learning Resources - Updated with premium design */}
      <div className="mb-12">
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold">Protection Learning Resources</h2>
            </div>
            <p className="text-green-100 text-sm ml-11">
              Understand how Bitcoin protection works and best practices
            </p>
          </div>
          <div className="bg-white p-5">
            <LearningResources />
          </div>
        </div>
      </div>
    </div>
  );
} 