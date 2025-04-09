"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { WalletAddress, useWalletStore } from "@/store/wallet-store";

const NavItems = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Option Data",
    href: "/option-data",
  },
  {
    name: "Easy Trade",
    href: "/easy-option",
  },
];

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const pathname = usePathname();
  const { isConnected, address, connectWallet, disconnectWallet, connecting } = useWalletStore();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container flex h-16 items-center px-4">
        <div className="mr-6 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">BitHedge</span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-8 text-sm font-medium">
          {NavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href
                  ? "text-foreground font-semibold"
                  : "text-foreground/60"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="ml-auto flex items-center gap-3">
          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="bg-muted px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{formatAddress(address as WalletAddress)}</span>
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
              <button 
                onClick={() => disconnectWallet()}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => connectWallet()}
              disabled={connecting}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                "bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 py-2",
                connecting && "opacity-70 cursor-not-allowed"
              )}
            >
              {connecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
          <div className="bg-destructive/20 text-destructive px-3 py-1.5 text-xs font-medium rounded-md">
            Testnet
          </div>
        </div>
      </div>
    </header>
  );
};

// Helper function to format wallet address
const formatAddress = (address: WalletAddress): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}; 