"use client";

import { useMarketStore } from "@/store/market-store";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our new components
import { MarketOverviewCards } from "@/components/option-data/market-overview-cards";
import { OptionsChain } from "@/components/option-data/options-chain";
import { DistributionCharts } from "@/components/option-data/distribution-charts";
import { InterestVolumeCharts } from "@/components/option-data/interest-volume-charts";
import { TimeSeriesAnalysis } from "@/components/option-data/time-series-analysis";
import { ImpliedVolatilityCharts } from "@/components/option-data/implied-volatility-charts";
import { EducationalResources } from "@/components/option-data/educational-resources";

export default function OptionData() {
  const { 
    btcPrice, 
    btcPriceChange24h, 
    btcVolatility, 
    putCallRatio,
    availableOptions, 
    fetchMarketData, 
    fetchAvailableOptions 
  } = useMarketStore();

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Fetch market data when component mounts
    fetchMarketData();
    fetchAvailableOptions();
  }, [fetchMarketData, fetchAvailableOptions]);

  // Transform the availableOptions data for the visualizations
  const openInterestData = [
    { strike: 45000, calls: 150, puts: 300 },
    { strike: 46000, calls: 220, puts: 280 },
    { strike: 47000, calls: 280, puts: 200 },
    { strike: 48000, calls: 250, puts: 180 },
    { strike: 49000, calls: 200, puts: 160 },
    { strike: 50000, calls: 350, puts: 140 },
    { strike: 51000, calls: 300, puts: 120 },
    { strike: 52000, calls: 250, puts: 100 },
  ];

  const volumeData = [
    { strike: 45000, calls: 30, puts: 80 },
    { strike: 46000, calls: 50, puts: 70 },
    { strike: 47000, calls: 75, puts: 60 },
    { strike: 48000, calls: 85, puts: 40 },
    { strike: 49000, calls: 70, puts: 35 },
    { strike: 50000, calls: 120, puts: 30 },
    { strike: 51000, calls: 90, puts: 25 },
    { strike: 52000, calls: 60, puts: 20 },
  ];

  const impliedVolatilityData = [
    { strike: 45000, shortTerm: 52, midTerm: 48, longTerm: 45 },
    { strike: 46000, shortTerm: 50, midTerm: 46, longTerm: 44 },
    { strike: 47000, shortTerm: 48, midTerm: 45, longTerm: 42 },
    { strike: 48000, shortTerm: 45, midTerm: 42, longTerm: 40 },
    { strike: 49000, shortTerm: 44, midTerm: 41, longTerm: 39 },
    { strike: 50000, shortTerm: 42, midTerm: 40, longTerm: 38 },
    { strike: 51000, shortTerm: 44, midTerm: 41, longTerm: 39 },
    { strike: 52000, shortTerm: 46, midTerm: 43, longTerm: 41 },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Option Data</h1>
      
      {/* Market Overview Cards */}
      <MarketOverviewCards 
        btcPrice={btcPrice}
        btcPriceChange24h={btcPriceChange24h}
        btcVolatility={btcVolatility}
        putCallRatio={putCallRatio}
        availableOptions={availableOptions}
      />
      
      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger 
            value="overview" 
            className="rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="openInterest" 
            className="rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
          >
            Open Interest & Volume
          </TabsTrigger>
          <TabsTrigger 
            value="impliedVolatility" 
            className="rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
          >
            Implied Volatility
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab Content */}
        <TabsContent value="overview">
          <OptionsChain options={availableOptions} />
          <DistributionCharts options={availableOptions} btcPrice={btcPrice} />
        </TabsContent>
        
        {/* Open Interest & Volume Tab Content */}
        <TabsContent value="openInterest">
          <InterestVolumeCharts openInterestData={openInterestData} volumeData={volumeData} />
          <TimeSeriesAnalysis />
        </TabsContent>
        
        {/* Implied Volatility Tab Content */}
        <TabsContent value="impliedVolatility">
          <ImpliedVolatilityCharts impliedVolatilityData={impliedVolatilityData} />
        </TabsContent>
      </Tabs>
      
      <EducationalResources />
    </div>
  );
} 