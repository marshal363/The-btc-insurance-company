import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export type WalletAddress = string;

interface WalletState {
  isConnected: boolean;
  address: WalletAddress | null;
  network: "mainnet" | "testnet";
  balance: {
    stx: number;
    sbtc: number;
  };
  connecting: boolean;
  error: string | null;
}

interface WalletActions {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  setBalance: (stx: number, sbtc: number) => void;
  clearError: () => void;
}

type WalletStore = WalletState & WalletActions;

type WalletPersist = Pick<WalletState, "isConnected" | "address" | "network" | "balance">;

const persistOptions: PersistOptions<WalletStore, WalletPersist> = {
  name: "wallet-storage",
  partialize: (state) => ({
    isConnected: state.isConnected,
    address: state.address,
    network: state.network,
    balance: state.balance,
  }),
};

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      // Initial state
      isConnected: false,
      address: null,
      network: "testnet",
      balance: {
        stx: 0,
        sbtc: 0,
      },
      connecting: false,
      error: null,

      // Actions
      connectWallet: async () => {
        set({ connecting: true, error: null });
        try {
          // Mock connection for now
          // Here we would implement actual wallet connection logic
          await new Promise((resolve) => setTimeout(resolve, 1000));
          set({
            isConnected: true,
            address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
            balance: { stx: 1000, sbtc: 0.1 },
            connecting: false,
          });
        } catch (error) {
          set({
            connecting: false,
            error: error instanceof Error ? error.message : "Failed to connect wallet",
          });
        }
      },

      disconnectWallet: () => {
        set({
          isConnected: false,
          address: null,
          balance: { stx: 0, sbtc: 0 },
          error: null,
        });
      },

      setBalance: (stx: number, sbtc: number) => {
        set({ balance: { stx, sbtc } });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    persistOptions
  )
);
