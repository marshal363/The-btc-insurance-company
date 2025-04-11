import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/wallet/useWallet";
import { walletProviders } from "@/utils/wallet/providers";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, ChevronDown } from "lucide-react";

interface WalletInfoProps {
  showBalance?: boolean;
  showNetwork?: boolean;
  showDisconnect?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function WalletInfo({
  showBalance = true,
  showNetwork = true,
  showDisconnect = true,
  variant = "outline",
  size = "default",
  className = "",
}: WalletInfoProps) {
  console.log('[WalletInfo] Component rendered');
  
  const { isConnected, formattedAddress, address, balance, network, provider, disconnect } = useWallet();

  // Log props and state changes
  useEffect(() => {
    console.log('[WalletInfo] Props:', { 
      showBalance, 
      showNetwork, 
      showDisconnect, 
      variant, 
      size, 
      className 
    });
    console.log('[WalletInfo] State:', { 
      isConnected, 
      address,
      formattedAddress,
      balance, 
      network, 
      provider
    });
  }, [
    showBalance, showNetwork, showDisconnect, variant, size, className,
    isConnected, address, formattedAddress, balance, network, provider
  ]);

  // Handle disconnect
  const handleDisconnect = () => {
    console.log('[WalletInfo] Disconnecting wallet');
    disconnect();
  };

  // If not connected, don't render anything
  if (!isConnected || !address) {
    console.log('[WalletInfo] Not connected, not rendering');
    return null;
  }

  // Get provider details
  const providerDetails = provider ? walletProviders[provider] : null;
  console.log('[WalletInfo] Provider details:', providerDetails);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`${className} flex items-center gap-2`}
        >
          {providerDetails && (
            <img
              src={providerDetails.icon}
              alt={providerDetails.name}
              className="w-4 h-4"
            />
          )}
          {formattedAddress}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          {providerDetails && (
            <img
              src={providerDetails.icon}
              alt={providerDetails.name}
              className="w-5 h-5"
            />
          )}
          <span>Wallet</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{address}</p>
          {showNetwork && (
            <p className="text-xs text-muted-foreground mt-1">
              Network: <span className="capitalize">{network}</span>
            </p>
          )}
        </div>

        {showBalance && (
          <>
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
          </>
        )}

        {showDisconnect && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive cursor-pointer"
              onClick={handleDisconnect}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 