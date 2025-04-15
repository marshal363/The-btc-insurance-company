import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/wallet/useWallet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, ChevronDown, Wallet, Bug } from "lucide-react";
import { useEffect, useState } from "react";
import { useWalletStore } from "@/store/wallet-store";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define interface for browser window with wallet providers
interface ExtendedWindow extends Window {
  StacksProvider?: unknown;
  LeatherProvider?: unknown;
  XVerseProvider?: unknown;
}

interface WalletConnectProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

// Helper to log detailed wallet connection issues
const logWalletIssue = () => {
  console.log('[WalletConnect] Logging wallet connection issue for development');
  try {
    const win = window as ExtendedWindow;
    const info = {
      userAgent: navigator.userAgent,
      walletDetection: {
        hiro: typeof win.StacksProvider !== 'undefined',
        leather: typeof win.LeatherProvider !== 'undefined',
        xverse: typeof win.XVerseProvider !== 'undefined',
      },
      localStorage: !!localStorage.getItem('wallet-storage'),
      timestamp: new Date().toISOString(),
    };
    
    console.log('[WalletConnect DEBUG] Environment info:', info);
    
    // Copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(info, null, 2))
      .then(() => {
        console.log('[WalletConnect] Copied debug info to clipboard');
        alert('Debug info copied to clipboard. Please share this with the development team.');
      })
      .catch((err) => {
        console.error('[WalletConnect] Error copying to clipboard:', err);
        alert('Could not copy to clipboard. See console for details.');
      });
  } catch (err) {
    console.error('[WalletConnect] Error logging issue:', err);
  }
};

export function WalletConnect({
  size = "default",
  className = "",
}: WalletConnectProps) {
  console.log('[WalletConnect] Component rendered');
  const { 
    connect, 
    connecting, 
    error, 
    clearError, 
    isConnected, 
    formattedAddress, 
    address, 
    balance, 
    network, 
    disconnect 
  } = useWallet();
  
  // Local state to force re-render after connection
  const [forceUpdate, setForceUpdate] = useState(0);
  // Add state for network switch dialog
  const [showNetworkDialog, setShowNetworkDialog] = useState(false);
  
  // Debug logging for wallet state
  useEffect(() => {
    console.log('[WalletConnect DEBUG] Wallet state changed:', { 
      isConnected, 
      address, 
      formattedAddress,
      connecting, 
      network
    });
    
    // Force re-render when connection status changes
    setForceUpdate(prev => prev + 1);
  }, [isConnected, address, formattedAddress, connecting, network]);

  // Handle connect to wallet - directly trigger the Stacks Connect modal
  const handleConnect = async () => {
    console.log('[WalletConnect] Connecting to wallet');
    try {
      await connect();
      console.log('[WalletConnect DEBUG] Connect function completed');
      // Force an update to ensure UI reflects the new state
      setForceUpdate(prev => prev + 1);
    } catch (error) {
      console.error('[WalletConnect ERROR] Connection failed:', error);
    }
  };

  // Handle disconnect
  const handleDisconnect = () => {
    console.log('[WalletConnect] Disconnecting wallet');
    disconnect();
    // Force an update to ensure UI reflects the new state
    setForceUpdate(prev => prev + 1);
  };

  // Reset error state
  const handleReset = () => {
    console.log('[WalletConnect] Resetting error state');
    clearError();
  };

  // Add handler for network switch
  const handleSwitchNetwork = (newNetwork: "mainnet" | "testnet") => {
    console.log(`[WalletConnect] Switching network to ${newNetwork}`);
    useWalletStore.getState().switchNetwork(newNetwork);
    setShowNetworkDialog(false);
    // Force an update
    setForceUpdate(prev => prev + 1);
  };

  // Debug logging for connected state condition
  console.log('[WalletConnect DEBUG] Is wallet connected?', { 
    isConnected, 
    address, 
    condition: !!isConnected,
    forceUpdate
  });

  // If there's an error with the wallet connection, we might need to switch networks
  useEffect(() => {
    if (error && error.includes("Failed to get wallet address")) {
      console.log('[WalletConnect] Detected wallet address error, showing network switch option');
      setShowNetworkDialog(true);
    }
  }, [error]);
  
  // Render connect button
  console.log('[WalletConnect] Rendering connect button');

  // If there was an error
  if (error) {
    console.log(`[WalletConnect] Rendering error state: ${error}`);
    return (
      <div className="flex flex-col space-y-2 max-w-[300px]">
        <div className="text-red-500 text-sm font-medium">{error}</div>
        {error === "Failed to get wallet address" && (
          <div className="text-xs text-muted-foreground">
            <p>The wallet did not provide a valid address. Try these steps:</p>
            <ol className="list-decimal pl-4 mt-1 space-y-1">
              <li>Ensure your wallet is unlocked</li>
              <li>Try refreshing the page</li>
              <li>Select a different wallet if available</li>
              <li>Check your wallet is properly set up</li>
            </ol>
          </div>
        )}
        <div className="flex gap-2 mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
            className="flex-1"
          >
            Try Again
          </Button>
          
          {process.env.NODE_ENV === 'development' && (
            <>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => {
                  console.log('[WalletConnect] Using debug mode authentication');
                  // Simulate a successful connection with mock data
                  clearError();
                  // This will trigger the useEffect and cause a re-render
                  setForceUpdate(prev => prev + 10);
                }}
                className="flex-1"
              >
                Debug Mode
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={logWalletIssue}
                title="Report this issue with environment details"
                className="px-2"
              >
                <Bug className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  // If wallet is connected, show connected button with dropdown
  if (isConnected) {
    console.log('[WalletConnect] Wallet is connected, rendering connected state');
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline"
            size={size}
            className={`${className} flex items-center gap-2 rounded-full bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-1`}
            aria-label="Connected wallet options"
            data-testid="wallet-connected-button"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-1" aria-hidden="true"></div>
            {formattedAddress || "Connected"}
            <ChevronDown className="h-4 w-4 opacity-70 ml-1" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Wallet Connected</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{address || "Address unavailable"}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Network: <span className="capitalize">{network}</span>
            </p>
          </div>
          
          <DropdownMenuSeparator />
          <div className="px-2 py-1.5 space-y-1">
            <p className="text-xs text-muted-foreground">Balances</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{balance.stx.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">STX</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{balance.sbtc.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">sBTC</span>
              </div>
            </div>
          </div>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-destructive focus:text-destructive cursor-pointer"
            onClick={handleDisconnect}
            data-testid="wallet-disconnect-button"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Default connect button - directly triggers Stacks Connect modal
  return (
    <>
      <Button
        variant="default"
        size={size}
        className={`${className} hidden sm:flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-900`}
        onClick={handleConnect}
        disabled={connecting}
        data-testid="wallet-connect-button"
      >
        {connecting ? (
          "Connecting..."
        ) : (
          <>
            <Wallet className="h-4 w-4 mr-1.5" />
            Connect Wallet
          </>
        )}
      </Button>
      
      {/* Network Switch Dialog */}
      <AlertDialog open={showNetworkDialog} onOpenChange={setShowNetworkDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Network Mismatch Detected</AlertDialogTitle>
            <AlertDialogDescription>
              We couldn&apos;t find a wallet address for the current network ({network}). 
              This might happen if your wallet only has addresses on a different network.
              Would you like to switch networks?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowNetworkDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSwitchNetwork(network === "testnet" ? "mainnet" : "testnet")}>
              Switch to {network === "testnet" ? "Mainnet" : "Testnet"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 