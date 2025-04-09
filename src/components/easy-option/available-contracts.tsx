import React from "react";
import { OptionType } from "./option-type-selector";

// Define contract type
export interface OptionContract {
  id: string;
  type: OptionType;
  strike: number;
  expiry: string; // ISO date string
  daysToExpiry: number;
  premium: number;
  openInterest: number;
  volume: number;
}

interface AvailableContractsProps {
  optionType: OptionType;
  strikePrice: number;
  expiryDays: number;
  currentBtcPrice: number;
  onSelectContract: (contract: OptionContract) => void;
}

export function AvailableContracts({
  optionType,
  strikePrice,
  expiryDays,
  currentBtcPrice = 48500,
  onSelectContract,
}: AvailableContractsProps) {
  // In a real app, these would be fetched from an API based on preferences
  const mockContracts: OptionContract[] = [
    {
      id: "1",
      type: optionType,
      strike: Math.round(strikePrice * 0.98),
      expiry: new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString(),
      daysToExpiry: expiryDays,
      premium: 45,
      openInterest: 120,
      volume: 32,
    },
    {
      id: "2",
      type: optionType,
      strike: strikePrice,
      expiry: new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString(),
      daysToExpiry: expiryDays,
      premium: 50,
      openInterest: 200,
      volume: 45,
    },
    {
      id: "3",
      type: optionType,
      strike: Math.round(strikePrice * 1.02),
      expiry: new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString(),
      daysToExpiry: expiryDays,
      premium: 55,
      openInterest: 95,
      volume: 28,
    },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">Available Contracts</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Select from available options matching your preferences:
      </p>
      
      <div className="grid grid-cols-1 gap-3">
        {mockContracts.map((contract) => {
          // Calculate relative to ATM
          const relativeToATM = 
            contract.strike === currentBtcPrice ? "ATM" :
            contract.strike < currentBtcPrice ? "ITM" :
            "OTM";
            
          // Additional info based on contract type
          const contractDescription = 
            contract.type === "call" && relativeToATM === "ITM" ? "Lower premium, immediate value" :
            contract.type === "call" && relativeToATM === "OTM" ? "Higher profit potential, cheaper" :
            contract.type === "put" && relativeToATM === "ITM" ? "Lower premium, immediate value" :
            contract.type === "put" && relativeToATM === "OTM" ? "Higher profit potential, cheaper" :
            "Balanced premium and protection";
            
          return (
            <div 
              key={contract.id}
              className="border rounded-md p-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
              onClick={() => onSelectContract(contract)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">
                  {contract.type.toUpperCase()} ${contract.strike.toLocaleString()}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  relativeToATM === "ATM" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                  relativeToATM === "ITM" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                }`}>
                  {relativeToATM}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                <div>
                  <span className="text-muted-foreground">Expiry:</span>{" "}
                  <span>{contract.daysToExpiry} days</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Premium:</span>{" "}
                  <span>{contract.premium} STX</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Open Interest:</span>{" "}
                  <span>{contract.openInterest}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Volume:</span>{" "}
                  <span>{contract.volume}</span>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">{contractDescription}</p>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-muted/30 rounded-md">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">ATM</span> = At The Money (strike = current price){" "}
          <span className="font-medium">ITM</span> = In The Money (immediate value){" "}
          <span className="font-medium">OTM</span> = Out of The Money (no immediate value)
        </p>
      </div>
    </div>
  );
} 