import type { WalletProvider } from "@/types/wallet";

// Wallet provider details
export interface ProviderDetails {
  name: string;
  icon: string;
  description: string;
  website: string;
  downloadUrl: string;
}

// Map of provider details
export const walletProviders: Record<WalletProvider, ProviderDetails> = {
  hiro: {
    name: "Hiro Wallet",
    icon: "/wallets/hiro.png",
    description: "The official wallet from Hiro Systems",
    website: "https://wallet.hiro.so/",
    downloadUrl: "https://wallet.hiro.so/wallet/install-web",
  },
  leather: {
    name: "Leather",
    icon: "/wallets/leather.png",
    description: "The new rebrand of Hiro Wallet",
    website: "https://leather.io/",
    downloadUrl: "https://leather.io/install-extension",
  },
  xverse: {
    name: "Xverse",
    icon: "/wallets/xverse.png",
    description: "A Bitcoin and Stacks wallet",
    website: "https://www.xverse.app/",
    downloadUrl: "https://www.xverse.app/download",
  },
};

// Check if wallet providers are available in browser
export function detectInstalledWallets(): WalletProvider[] {
  console.log('[Providers] Detecting installed wallets');
  const installed: WalletProvider[] = [];

  // Check for Hiro/Leather wallet
  if (typeof window !== "undefined") {
    console.log('[Providers] Window is defined, checking for wallet providers');
    
    if ("StacksProvider" in window) {
      console.log('[Providers] Leather wallet detected');
      installed.push("leather");
    } else {
      console.log('[Providers] Leather wallet not detected');
    }

    // Check for Xverse wallet
    if ("XverseProviders" in window) {
      console.log('[Providers] Xverse wallet detected');
      installed.push("xverse");
    } else {
      console.log('[Providers] Xverse wallet not detected');
    }
  } else {
    console.log('[Providers] Window is undefined, cannot detect wallets');
  }

  console.log('[Providers] Detected wallets:', installed);
  return installed;
}

// Get provider details from provider type
export function getProviderDetails(provider: WalletProvider): ProviderDetails {
  console.log(`[Providers] Getting details for provider: ${provider}`);
  return walletProviders[provider];
}

// Get wallet not installed message
export function getWalletNotInstalledMessage(provider: WalletProvider): string {
  const details = getProviderDetails(provider);
  const message = `${details.name} is not installed. Please install it from ${details.website}`;
  console.log(`[Providers] Wallet not installed message: ${message}`);
  return message;
} 