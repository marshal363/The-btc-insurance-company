"use client";

import { useMarketStore } from "@/store/market-store";
import { useOptionsStore } from "@/store/options-store";
import { useWallet } from "@/hooks/wallet/useWallet";
import { useEffect, useState } from "react";
import { WelcomeSection } from "@/components/home/welcome-section";
import { MarketOverview } from "@/components/home/market-overview";
import { PortfolioSummary } from "@/components/home/portfolio-summary";
import { FeaturedOptions } from "@/components/home/featured-options";
import { PLVisualization } from "@/components/home/pl-visualization";
import { HedgingCalculator } from "@/components/home/hedging-calculator";
import { LearningResources } from "@/components/home/learning-resources";
import { NetworkStatus } from "@/components/home/network-status";
import { WalletConnect } from "@/components/wallet/WalletConnect";
import { 
  Shield, 
  TrendingUp, 
  Bitcoin, 
  Wallet, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  AreaChart,
  Clock,
  RefreshCw,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  // Use wallet hook for wallet-related state and actions
  const { isConnected } = useWallet();
  
  // Use market and options stores
  const { btcPrice, btcPriceChange24h, availableOptions, fetchMarketData, fetchAvailableOptions } = useMarketStore();
  const { ownedOptions, fetchUserOptions } = useOptionsStore();

  // Persona state
  const [persona, setPersona] = useState<"protection" | "income">("protection");

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

  // Mock income strategies data
  const mockIncomeStrategies = [
    {
      id: "strategy-1",
      name: "Bitcoin Stability Income",
      type: "put",
      riskTier: "balanced",
      capital: 150,
      period: "30 days",
      expiry: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      yield: 7.5,
      yieldEarned: 3.2,
      status: "active",
      strikePrice: 43650
    },
    {
      id: "strategy-2",
      name: "Crash Insurance Provider",
      type: "put",
      riskTier: "conservative",
      capital: 100,
      period: "60 days",
      expiry: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
      yield: 5.2,
      yieldEarned: 1.8,
      status: "active",
      strikePrice: 38500
    }
  ];

  // Aggregate income stats
  const totalCapitalCommitted = mockIncomeStrategies.reduce((sum, strategy) => sum + strategy.capital, 0);
  const averageYield = mockIncomeStrategies.reduce((sum, strategy) => sum + strategy.yield, 0) / mockIncomeStrategies.length;
  const totalYieldEarned = mockIncomeStrategies.reduce((sum, strategy) => sum + strategy.yieldEarned, 0);

  // Check if any strategy is expiring soon (within 7 days)
  const hasExpiringStrategies = mockIncomeStrategies.some(strategy => {
    const daysUntilExpiry = Math.floor((strategy.expiry.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry >= 0;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Banner (only when not connected) */}
      {!isConnected ? (
        <div className="mb-8">
          <WelcomeSection />
        </div>
      ) : null}

      {/* Persona Toggle (only when connected) */}
      {isConnected && (
        <div className="mb-8 flex justify-center">
          <Tabs 
            value={persona} 
            onValueChange={(value) => setPersona(value as "protection" | "income")}
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="protection">
                <Shield className="mr-2 h-4 w-4" />
                Protection Portfolio
              </TabsTrigger>
              <TabsTrigger value="income">
                <TrendingUp className="mr-2 h-4 w-4" />
                Income Strategies
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* SECTION 1: Bitcoin Market Overview, Network Status and Portfolio/Strategy Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left column: Market Overview */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Market Overview - Updated with premium design */}
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white p-2 rounded-full">
                  <Bitcoin className="h-5 w-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold">Bitcoin Market Overview</h2>
              </div>
              <p className="text-blue-100 text-sm ml-11">
                Current market conditions for your {persona === "protection" ? "protection" : "income"} decisions
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

        {/* Right column: Portfolio Summary based on persona */}
        <div className="lg:col-span-5">
          {isConnected ? (
            persona === "protection" ? (
              // Protection Portfolio Summary
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
              // Income Strategy Summary
              <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm h-full">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white p-2 rounded-full">
                      <TrendingUp className="h-5 w-5 text-amber-600" />
                    </div>
                    <h2 className="text-xl font-bold">Income Portfolio</h2>
                  </div>
                  <p className="text-amber-100 text-sm ml-11">
                    Your active Bitcoin income strategies
                  </p>
                </div>
                <div className="bg-white p-5">
                  <Card className="shadow-sm h-full flex flex-col border-0">
                    <CardContent className="pt-4 px-0 flex-grow">
                      <div className="space-y-5 h-full flex flex-col">
                        {/* Balances */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 p-3 rounded-md">
                            <div className="text-sm text-slate-500">STX Balance</div>
                            <div className="text-lg font-medium mt-1">{mockStxBalance.toLocaleString()} STX</div>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-md">
                            <div className="text-sm text-slate-500">Committed Capital</div>
                            <div className="text-lg font-medium mt-1">{totalCapitalCommitted} STX</div>
                          </div>
                        </div>
                        
                        {/* Portfolio stats */}
                        <div className="space-y-4 py-1">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-sm">Active Strategies:</span>
                            <span className="font-medium">{mockIncomeStrategies.length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-sm">Average Yield:</span>
                            <span className="font-medium">{averageYield.toFixed(1)}% APY</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-sm">Yield Earned:</span>
                            <span className="font-medium">{totalYieldEarned.toFixed(1)} STX</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-sm">Next Expiration:</span>
                            <span className="font-medium">{mockIncomeStrategies[0].expiry.toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        {/* Warnings section */}
                        <div className="space-y-3 mt-auto">
                          {/* Expiry warnings */}
                          {hasExpiringStrategies && (
                            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-md border border-amber-100">
                              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                              <div className="text-sm text-amber-800">
                                You have strategies expiring soon. Consider renewing them to maintain your income.
                              </div>
                            </div>
                          )}
                          
                          {/* Capital optimization */}
                          {totalCapitalCommitted < mockStxBalance * 0.5 && (
                            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-md border border-blue-100">
                              <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                              <div className="text-sm text-blue-800">
                                You have {mockStxBalance - totalCapitalCommitted} STX uncommitted. Consider creating more income strategies.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          ) : (
            // Connect wallet prompt
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm h-full">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white p-2 rounded-full">
                    <Wallet className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold">Get Started</h2>
                </div>
                <p className="text-blue-100 text-sm ml-11">
                  Connect to manage your Bitcoin {persona === "protection" ? "protection" : "income strategies"}
                </p>
              </div>
              <div className="bg-white p-6 flex flex-col justify-center items-center h-full">
                <div className="text-center max-w-sm mx-auto">
                  <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {persona === "protection" ? (
                      <Shield className="h-8 w-8 text-blue-600" />
                    ) : (
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    Connect to View Your {persona === "protection" ? "Protection" : "Income Strategies"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {persona === "protection" 
                      ? "Connect your wallet to view your active protection policies and secure your Bitcoin holdings."
                      : "Connect your wallet to view your active income strategies and track your yield generation."}
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-medium shadow-sm transition-colors w-full">
                    Connect Wallet
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Active Items (Protection Policies or Income Strategies) */}
      {isConnected && (
        <div className="mb-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <div className={`bg-gradient-to-r ${
              persona === "protection" 
                ? "from-green-600 to-green-700" 
                : "from-amber-500 to-amber-600"
            } px-6 py-4 text-white`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white p-2 rounded-full">
                  {persona === "protection" ? (
                    <Shield className={`h-5 w-5 ${persona === "protection" ? "text-green-600" : "text-amber-600"}`} />
                  ) : (
                    <TrendingUp className={`h-5 w-5 ${persona === "protection" ? "text-green-600" : "text-amber-600"}`} />
                  )}
                </div>
                <h2 className="text-xl font-bold">
                  {persona === "protection" ? "Active Protection Policies" : "Active Income Strategies"}
                </h2>
              </div>
              <p className={`${persona === "protection" ? "text-green-100" : "text-amber-100"} text-sm ml-11`}>
                {persona === "protection" 
                  ? "Manage your active Bitcoin protection policies" 
                  : "Manage your active Bitcoin income generation strategies"}
              </p>
            </div>
            <div className="bg-white p-6">
              {persona === "protection" ? (
                // Protection policies
                ownedOptions.length > 0 ? (
                  <div className="space-y-4">
                    {ownedOptions.map((option, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-lg">
                              {option.type === "put" ? "BTC Price Drop Protection" : "BTC Future Purchase Protection"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Expires: {option.expiry instanceof Date ? option.expiry.toLocaleDateString() : new Date(option.expiry).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={getExpiryBadgeVariant(option.expiry)}>
                            {getDaysUntilExpiry(option.expiry)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Protected Value</p>
                            <p className="font-medium">${option.strike?.toLocaleString() || "Unknown"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Protected Amount</p>
                            <p className="font-medium">0.25 BTC</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Roll Over
                          </Button>
                          <Button variant="outline" size="sm">
                            <AreaChart className="h-4 w-4 mr-1" />
                            Analyze
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 text-center">
                      <Button asChild>
                        <Link href="/easy-option">
                          Get Additional Protection
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Protection Policies Yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      You don't have any active Bitcoin protection policies. Get started by creating your first policy.
                    </p>
                    <Button asChild>
                      <Link href="/easy-option">
                        Get Bitcoin Protection
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )
              ) : (
                // Income strategies
                mockIncomeStrategies.length > 0 ? (
                  <div className="space-y-4">
                    {mockIncomeStrategies.map((strategy) => (
                      <div key={strategy.id} className="border rounded-lg p-4 hover:border-amber-200 hover:bg-amber-50/30 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-lg">{strategy.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {strategy.riskTier === "conservative" ? "Conservative" : 
                                 strategy.riskTier === "balanced" ? "Balanced" : "Aggressive"}
                              </Badge>
                              <p className="text-sm text-gray-500">
                                Expires: {strategy.expiry.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Badge variant={getExpiryBadgeVariant(strategy.expiry)}>
                            {getDaysUntilExpiry(strategy.expiry)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Committed Capital</p>
                            <p className="font-medium">{strategy.capital} STX</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Yield Rate</p>
                            <p className="font-medium">{strategy.yield}% APY</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Yield Earned</p>
                            <p className="font-medium">{strategy.yieldEarned} STX</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Renew
                          </Button>
                          <Button variant="outline" size="sm">
                            <AreaChart className="h-4 w-4 mr-1" />
                            Analyze
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 text-center">
                      <Button asChild className="bg-amber-600 hover:bg-amber-700">
                        <Link href="/income-center">
                          Create New Income Strategy
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Income Strategies Yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      You don't have any active income strategies. Get started by creating your first strategy to earn yield on your capital.
                    </p>
                    <Button asChild className="bg-amber-600 hover:bg-amber-700">
                      <Link href="/income-center">
                        Create Income Strategy
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Performance Analysis */}
      {isConnected && (
        <div className="mb-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <div className={`bg-gradient-to-r ${
              persona === "protection" 
                ? "from-indigo-600 to-indigo-700" 
                : "from-purple-600 to-purple-700"
            } px-6 py-4 text-white`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white p-2 rounded-full">
                  <AreaChart className={`h-5 w-5 ${persona === "protection" ? "text-indigo-600" : "text-purple-600"}`} />
                </div>
                <h2 className="text-xl font-bold">
                  {persona === "protection" ? "Protection Performance" : "Income Performance"}
                </h2>
              </div>
              <p className={`${persona === "protection" ? "text-indigo-100" : "text-purple-100"} text-sm ml-11`}>
                {persona === "protection" 
                  ? "Track how your protection policies are performing" 
                  : "Track your income generation performance"}
              </p>
            </div>
            <div className="bg-white p-6">
              <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100 mb-4">
                <p className="text-slate-400">
                  {persona === "protection" 
                    ? "Protection value visualization will appear here" 
                    : "Income performance visualization will appear here"}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-slate-500 mb-1">
                    {persona === "protection" ? "Current Protection Value" : "Total Yield Generated"}
                  </h3>
                  <p className="text-2xl font-semibold">
                    {persona === "protection" ? "$12,350" : "25.8 STX"}
                  </p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-slate-500 mb-1">
                    {persona === "protection" ? "Protection Cost" : "Current APY"}
                  </h3>
                  <p className="text-2xl font-semibold">
                    {persona === "protection" ? "$580" : "7.6%"}
                  </p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-slate-500 mb-1">
                    {persona === "protection" ? "Cost-Value Ratio" : "Capital Efficiency"}
                  </h3>
                  <p className="text-2xl font-semibold">
                    {persona === "protection" ? "4.7%" : "82%"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: Action Center */}
      <div className="mb-8">
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold">
                {persona === "protection" ? "Protection Center" : "Income Center"}
              </h2>
            </div>
            <p className="text-blue-100 text-sm ml-11">
              {persona === "protection" 
                ? "Quick actions for your Bitcoin protection" 
                : "Quick actions for your Bitcoin income strategies"}
            </p>
          </div>
          <div className="bg-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-slate-200 hover:border-primary/50 hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="p-2 rounded-full bg-blue-100 w-fit mb-2">
                    {persona === "protection" 
                      ? <Shield className="h-5 w-5 text-blue-600" />
                      : <DollarSign className="h-5 w-5 text-blue-600" />
                    }
                  </div>
                  <CardTitle>
                    {persona === "protection" ? "Get Protection" : "Create Strategy"}
                  </CardTitle>
                  <CardDescription>
                    {persona === "protection" 
                      ? "Set up new Bitcoin protection" 
                      : "Set up new income strategy"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={persona === "protection" ? "/easy-option" : "/income-center"}>
                      {persona === "protection" ? "Get Protection" : "Create Strategy"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200 hover:border-primary/50 hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="p-2 rounded-full bg-blue-100 w-fit mb-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle>
                    {persona === "protection" ? "Extend Protection" : "Renew Strategies"}
                  </CardTitle>
                  <CardDescription>
                    {persona === "protection" 
                      ? "Extend your existing protection policies" 
                      : "Renew your expiring income strategies"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    {persona === "protection" ? "Extend Protection" : "Renew Strategies"}
                    <RefreshCw className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200 hover:border-primary/50 hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="p-2 rounded-full bg-blue-100 w-fit mb-2">
                    <AreaChart className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle>
                    {persona === "protection" ? "Protection Simulator" : "Income Simulator"}
                  </CardTitle>
                  <CardDescription>
                    {persona === "protection" 
                      ? "Simulate different protection scenarios" 
                      : "Simulate different income strategies"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Open Simulator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: Learning Resources */}
      <div className="mb-12">
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold">
                {persona === "protection" ? "Protection Learning Resources" : "Income Strategy Resources"}
              </h2>
            </div>
            <p className="text-green-100 text-sm ml-11">
              {persona === "protection" 
                ? "Understand how Bitcoin protection works and best practices" 
                : "Learn about income strategies and optimization techniques"}
            </p>
          </div>
          <div className="bg-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Resources would be dynamically generated based on persona */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-4 hover:border-green-200 hover:bg-green-50/30 transition-colors">
                  <h3 className="font-medium mb-2">
                    {persona === "protection" 
                      ? `Bitcoin Protection Guide ${i}` 
                      : `Income Strategy Guide ${i}`}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {persona === "protection" 
                      ? "Learn how to effectively protect your Bitcoin holdings from market volatility." 
                      : "Discover strategies for generating stable income from your Bitcoin capital."}
                  </p>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions

// Determines badge variant based on days until expiry
function getExpiryBadgeVariant(expiryDate: Date | string): "default" | "outline" | "secondary" | "destructive" {
  const expiry = expiryDate instanceof Date ? expiryDate : new Date(expiryDate);
  const daysUntilExpiry = Math.floor((expiry.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry < 0) return "outline"; // Expired
  if (daysUntilExpiry < 3) return "destructive"; // Critical
  if (daysUntilExpiry < 7) return "secondary"; // Warning
  return "default"; // Normal
}

// Gets days until expiry text
function getDaysUntilExpiry(expiryDate: Date | string): string {
  const expiry = expiryDate instanceof Date ? expiryDate : new Date(expiryDate);
  const daysUntilExpiry = Math.floor((expiry.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry < 0) return "Expired";
  if (daysUntilExpiry === 0) return "Expires today";
  if (daysUntilExpiry === 1) return "Expires tomorrow";
  return `${daysUntilExpiry} days left`;
} 