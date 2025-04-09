"use client";

interface WelcomeSectionProps {
  onConnectWallet: () => void;
}

export function WelcomeSection({ onConnectWallet }: WelcomeSectionProps) {
  return (
    <div className="bg-card rounded-lg p-6 mb-8 text-card-foreground shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Welcome to BitHedge</h1>
      <p className="text-lg mb-6">
        Connect your wallet to start hedging your Bitcoin against volatility using sBTC options.
      </p>
      <button
        onClick={onConnectWallet}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 py-3"
      >
        Connect Wallet
      </button>
    </div>
  );
} 