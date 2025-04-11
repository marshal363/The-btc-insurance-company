import { useCallback, useEffect } from "react";
import { useWalletStore } from "@/store/wallet-store";

export function useWallet() {
  console.log('[useWallet] Hook initialized');
  
  const {
    isConnected,
    address,
    balance,
    network,
    provider,
    connecting,
    error,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    clearError,
  } = useWalletStore();

  // Debug initial values
  console.log('[useWallet DEBUG] Initial values:', { 
    isConnected, 
    address, 
    network,
    connecting, 
    provider 
  });

  // Check for persisted session on mount
  useEffect(() => {
    // If we have a wallet address but isConnected is false, fix the inconsistency
    if (address && !isConnected) {
      console.log('[useWallet] Found wallet address but isConnected is false, fixing inconsistency');
      useWalletStore.setState({ isConnected: true });
    }
  }, [address, isConnected]);

  // Connect function (simplified to directly trigger Stacks Connect)
  const connect = useCallback(
    async () => {
      console.log(`[useWallet] Connect called`);
      // Connect to wallet using default provider ("hiro")
      await connectWallet();
      console.log(`[useWallet DEBUG] After connectWallet call:`, { 
        isConnected: useWalletStore.getState().isConnected,
        address: useWalletStore.getState().address 
      });
    },
    [connectWallet]
  );

  // Format wallet address for display (truncate middle)
  const formatAddress = useCallback((walletAddress: string | null) => {
    if (!walletAddress) return "";
    const formatted = `${walletAddress.slice(0, 5)}...${walletAddress.slice(-4)}`;
    console.log(`[useWallet] Formatted address: ${formatted}`);
    return formatted;
  }, []);

  // Log initial state for debugging
  useEffect(() => {
    console.log('[useWallet] Current state:', { 
      isConnected, 
      address, 
      network, 
      provider, 
      connecting, 
      balance,
      error 
    });
  }, [isConnected, address, network, provider, connecting, balance, error]);

  return {
    // State
    isConnected,
    address,
    formattedAddress: formatAddress(address),
    balance,
    network,
    provider,
    connecting,
    error,
    
    // Actions
    connect,
    disconnect: disconnectWallet,
    switchNetwork,
    clearError,
  };
} 