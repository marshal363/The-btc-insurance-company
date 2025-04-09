import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OptionData } from "./market-store";

export interface UserOption extends OptionData {
  purchaseDate: Date;
  purchasePrice: number;
  status: "active" | "exercised" | "expired";
  transactionId: string;
}

interface OptionsState {
  ownedOptions: UserOption[];
  selectedOption: UserOption | null;
  isLoading: boolean;
  error: string | null;
}

interface OptionsActions {
  fetchUserOptions: () => Promise<void>;
  buyOption: (option: OptionData) => Promise<void>;
  exerciseOption: (optionId: string) => Promise<void>;
  selectOption: (optionId: string | null) => void;
  clearSelectedOption: () => void;
}

type OptionsStore = OptionsState & OptionsActions;

export const useOptionsStore = create<OptionsStore>()(
  persist(
    (set, get) => ({
      // Initial state
      ownedOptions: [],
      selectedOption: null,
      isLoading: false,
      error: null,

      // Actions
      fetchUserOptions: async () => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // In a real app, we would fetch this from the blockchain
          const mockOwnedOptions: UserOption[] = [
            {
              id: "owned-1",
              type: "call",
              strikePrice: 100,
              premium: 50,
              expiry: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
              purchasePrice: 50,
              status: "active",
              transactionId: "0x123456789",
              volume: 0,
              openInterest: 0,
              impliedVolatility: 40,
            },
          ];
          
          set({
            ownedOptions: mockOwnedOptions,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Failed to fetch options",
          });
        }
      },

      buyOption: async (option) => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call to simulate contract interaction
          await new Promise((resolve) => setTimeout(resolve, 1500));
          
          const newUserOption: UserOption = {
            ...option,
            purchaseDate: new Date(),
            purchasePrice: option.premium,
            status: "active",
            transactionId: `tx-${Date.now()}`,
          };
          
          set((state) => ({
            ownedOptions: [...state.ownedOptions, newUserOption],
            isLoading: false,
          }));
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Failed to buy option",
          });
        }
      },

      exerciseOption: async (optionId) => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call to simulate contract interaction
          await new Promise((resolve) => setTimeout(resolve, 1500));
          
          set((state) => ({
            ownedOptions: state.ownedOptions.map((opt) =>
              opt.id === optionId ? { ...opt, status: "exercised" } : opt
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Failed to exercise option",
          });
        }
      },

      selectOption: (optionId) => {
        if (optionId === null) {
          set({ selectedOption: null });
          return;
        }
        
        const option = get().ownedOptions.find((opt) => opt.id === optionId) || null;
        set({ selectedOption: option });
      },

      clearSelectedOption: () => {
        set({ selectedOption: null });
      },
    }),
    {
      name: "user-options-storage",
      partialize: (state) => ({
        ownedOptions: state.ownedOptions,
      }),
    }
  )
);
