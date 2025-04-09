import { create } from "zustand";

export interface OptionData {
  id: string;
  type: "call" | "put";
  strikePrice: number;
  premium: number;
  expiry: Date;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
}

interface MarketState {
  btcPrice: number;
  btcPriceChange24h: number;
  btcVolatility: number;
  availableOptions: OptionData[];
  putCallRatio: number;
  isLoading: boolean;
  lastUpdated: Date | null;
  error: string | null;
}

interface MarketActions {
  fetchMarketData: () => Promise<void>;
  fetchAvailableOptions: () => Promise<void>;
}

type MarketStore = MarketState & MarketActions;

export const useMarketStore = create<MarketStore>()((set) => ({
  // Initial state
  btcPrice: 48500,
  btcPriceChange24h: -2.3,
  btcVolatility: 45,
  availableOptions: [],
  putCallRatio: 0.8,
  isLoading: false,
  lastUpdated: null,
  error: null,

  // Actions
  fetchMarketData: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      set({
        btcPrice: 48500,
        btcPriceChange24h: -2.3,
        btcVolatility: 45,
        putCallRatio: 0.8,
        isLoading: false,
        lastUpdated: new Date(),
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch market data",
      });
    }
  },

  fetchAvailableOptions: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Generate mock options data
      const mockOptions: OptionData[] = [
        {
          id: "1",
          type: "call",
          strikePrice: 50000,
          premium: 50,
          expiry: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          volume: 120,
          openInterest: 350,
          impliedVolatility: 42,
        },
        {
          id: "2",
          type: "call",
          strikePrice: 48000,
          premium: 40,
          expiry: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          volume: 85,
          openInterest: 250,
          impliedVolatility: 40,
        },
        {
          id: "3",
          type: "put",
          strikePrice: 47000,
          premium: 60,
          expiry: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          volume: 75,
          openInterest: 200,
          impliedVolatility: 45,
        },
        {
          id: "4",
          type: "put",
          strikePrice: 45000,
          premium: 30,
          expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          volume: 50,
          openInterest: 150,
          impliedVolatility: 38,
        },
      ];
      
      set({
        availableOptions: mockOptions,
        isLoading: false,
        lastUpdated: new Date(),
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch options data",
      });
    }
  },
}));
