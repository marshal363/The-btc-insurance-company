"use client";

import { useEffect, useState } from "react";
import { useMarketStore } from "@/store/market-store";

// Import our components
import { TabNavigation } from "@/components/option-data/tab-navigation";
import { TopContractsTable } from "@/components/option-data/top-contracts-table";
import { RatioVisualization } from "@/components/option-data/ratio-visualization";
import { TimeSeriesChart } from "@/components/option-data/time-series-chart";
import { GroupedDistributionChart } from "@/components/option-data/grouped-distribution-chart";
import { TakerFlowChart } from "@/components/option-data/taker-flow-chart";
import { OptionsChain } from "@/components/option-data/options-chain";
import { EmptyState } from "@/components/option-data/empty-state";

export default function OptionDataPage() {
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

  // Current timestamp for display
  const currentTimestamp = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Mock data for the time series chart
  const timeSeriesData = [
    { date: "Apr 01", openInterest: 130000, volume: 45000 },
    { date: "Apr 02", openInterest: 145000, volume: 62000 },
    { date: "Apr 03", openInterest: 160000, volume: 58000 },
    { date: "Apr 04", openInterest: 152000, volume: 51000 },
    { date: "Apr 05", openInterest: 148000, volume: 49000 },
    { date: "Apr 06", openInterest: 155000, volume: 53000 },
    { date: "Apr 07", openInterest: 175000, volume: 72000 },
    { date: "Apr 08", openInterest: 190000, volume: 68000 },
  ];

  // Mock top open interest contracts
  const topOIContracts = [
    { symbol: "ETH-250427-6000-C", value: 13928 },
    { symbol: "ETH-250530-1000-P", value: 4015 },
    { symbol: "ETH-250409-1300-P", value: 3811 },
    { symbol: "ETH-250409-1250-P", value: 3627 },
    { symbol: "ETH-250425-2300-C", value: 3413 },
  ];

  // Mock top volume contracts
  const topVolumeContracts = [
    { symbol: "ETH-250409-1300-P", value: 5155 },
    { symbol: "ETH-250409-1250-P", value: 4022 },
    { symbol: "ETH-250409-1500-P", value: 3510 },
    { symbol: "ETH-250408-1600-C", value: 3375 },
    { symbol: "ETH-250408-1650-C", value: 3109 },
  ];

  // Call/Put ratio data for the visualization
  const callPutRatioData = {
    openInterest: {
      call: 183532616,
      put: 133904721
    },
    volume: {
      call: 37717,
      put: 45032
    }
  };

  // Mock distribution data by strike
  const distributionByStrikeData = [
    { label: "$45K", openInterest: 450, volume: 110 },
    { label: "$46K", openInterest: 500, volume: 120 },
    { label: "$47K", openInterest: 480, volume: 135 },
    { label: "$48K", openInterest: 430, volume: 125 },
    { label: "$49K", openInterest: 360, volume: 105 },
    { label: "$50K", openInterest: 490, volume: 150 },
    { label: "$51K", openInterest: 420, volume: 115 },
    { label: "$52K", openInterest: 350, volume: 80 },
  ];

  // Mock distribution data by expiration
  const distributionByExpiryData = [
    { label: "Apr 12", openInterest: 620, volume: 180 },
    { label: "Apr 19", openInterest: 580, volume: 150 },
    { label: "Apr 26", openInterest: 510, volume: 120 },
    { label: "May 03", openInterest: 450, volume: 100 },
    { label: "May 10", openInterest: 380, volume: 80 },
    { label: "May 17", openInterest: 320, volume: 70 },
  ];

  // Mock taker flow data
  const takerFlowData = [
    { name: "Calls Bought", value: 22516, color: "#10B981" },
    { name: "Calls Sold", value: 29632, color: "#34D399" },
    { name: "Puts Bought", value: 31211, color: "#EF4444" },
    { name: "Puts Sold", value: 30287, color: "#F87171" },
  ];

  // Tab configuration
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "openInterest", label: "Open Interest & Volume" },
    { id: "termStructure", label: "Term Structure", disabled: true },
    { id: "impliedVolatility", label: "Implied Volatility" },
    { id: "maxPain", label: "Max Pain", disabled: true },
    { id: "exercisedHistory", label: "Exercised History", disabled: true },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Options Data</h1>
      
      {/* BTC Price Summary Cards */}
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
      
      {/* Tabs Navigation */}
      <TabNavigation 
        tabs={tabs} 
        defaultTabId="overview" 
        onChange={setActiveTab} 
      />
      
      {/* Tab Content */}
      {activeTab === "overview" && (
        <>
          {/* Top level summaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="grid grid-cols-1 gap-6">
              <TopContractsTable 
                title="Top 5 Open Interest" 
                contracts={topOIContracts} 
                valueLabel="Open Interest"
                timestamp={currentTimestamp}
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <TopContractsTable 
                title="Top 5 24hr Volume" 
                contracts={topVolumeContracts} 
                valueLabel="Volume"
                timestamp={currentTimestamp}
              />
            </div>
          </div>

          {/* Call vs Put visualizations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <RatioVisualization 
              title="Open Interest: Call vs Put" 
              callValue={callPutRatioData.openInterest.call} 
              putValue={callPutRatioData.openInterest.put}
              currencyLabel="USDT"
              timestamp={currentTimestamp}
            />
            <RatioVisualization 
              title="24hr Volume: Call vs Put" 
              callValue={callPutRatioData.volume.call} 
              putValue={callPutRatioData.volume.put}
              currencyLabel="Cont"
              timestamp={currentTimestamp}
            />
          </div>

          {/* Time series charts */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <TimeSeriesChart 
              title="Open Interest & Volume" 
              data={timeSeriesData}
            />
          </div>

          {/* Options chain table */}
          <div className="mb-6">
            <OptionsChain options={availableOptions} />
          </div>
        </>
      )}

      {activeTab === "openInterest" && (
        <>
          {/* OI and Volume time series */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <TimeSeriesChart 
              title="Open Interest & Volume" 
              data={timeSeriesData}
            />
          </div>

          {/* Put/Call Ratio chart */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <TimeSeriesChart 
              title="Put/Call Ratio" 
              data={timeSeriesData.map(item => ({
                date: item.date,
                openInterest: putCallRatio,
                volume: putCallRatio * 0.9 + Math.random() * 0.2
              }))}
            />
          </div>

          {/* Distribution charts */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <GroupedDistributionChart 
              title="Open Interest & 24hr Volume"
              data={distributionByStrikeData}
              groupType="strike"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <GroupedDistributionChart 
              title="Open Interest & 24hr Volume"
              data={distributionByExpiryData}
              groupType="expiration"
            />
          </div>

          {/* Taker flow */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <TakerFlowChart data={takerFlowData} timestamp={currentTimestamp} />
          </div>
        </>
      )}

      {activeTab === "impliedVolatility" && (
        <div className="grid grid-cols-1 gap-6">
          {/* Placeholder for IV charts */}
          <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
            <h2 className="text-xl font-bold mb-4">Implied Volatility Smile</h2>
            <EmptyState 
              title="Coming Soon"
              message="Implied volatility visualizations will be implemented in Phase 6.5."
              icon="coming-soon"
            />
          </div>
        </div>
      )}

      {(activeTab === "termStructure" || activeTab === "maxPain" || activeTab === "exercisedHistory") && (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
            <EmptyState 
              title="Coming Soon"
              message={`The ${activeTab === 'termStructure' ? 'Term Structure' : activeTab === 'maxPain' ? 'Max Pain' : 'Exercised History'} view will be implemented in a future phase.`}
              icon="coming-soon"
            />
          </div>
        </div>
      )}
    </div>
  );
} 