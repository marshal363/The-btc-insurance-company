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
    <div>
      <h2 className="text-xl font-bold mb-4">Available Protection Policies</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Choose your protection policy based on your needs:
      </p>
      
      <div className="grid grid-cols-1 gap-3">
        {mockContracts.map((contract) => {
          // Calculate relative to ATM
          const relativeToATM = 
            contract.strike === currentBtcPrice ? "ATM" :
            contract.strike < currentBtcPrice ? "ITM" :
            "OTM";
            
          // Get friendly names for moneyness
          const getMoneynessFriendlyName = () => {
            if (optionType === "call") {
              if (relativeToATM === "ITM") return "Enhanced Purchase Protection";
              if (relativeToATM === "ATM") return "Standard Purchase Protection";
              return "Economy Purchase Protection";
            } else {
              if (relativeToATM === "ITM") return "Enhanced Price Protection";
              if (relativeToATM === "ATM") return "Standard Price Protection";
              return "Economy Price Protection";
            }
          };
            
          // Additional info based on contract type
          const contractDescription = 
            contract.type === "call" && relativeToATM === "ITM" ? "Lower fee, immediate purchase guarantee value" :
            contract.type === "call" && relativeToATM === "OTM" ? "Higher savings potential, cheaper fee" :
            contract.type === "put" && relativeToATM === "ITM" ? "Lower premium, immediate protection value" :
            contract.type === "put" && relativeToATM === "OTM" ? "Higher protection potential, cheaper premium" :
            "Balanced premium and protection";

          // Format premium text based on option type
          const getPremiumText = () => {
            if (optionType === "call") {
              return `${contract.premium} STX Lock-in Fee`;
            } else {
              return `${contract.premium} STX Protection Premium`;
            }
          };
            
          return (
            <div 
              key={contract.id}
              className="border rounded-md p-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
              onClick={() => onSelectContract(contract)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">
                  {optionType === "call" 
                    ? `Price Lock at $${contract.strike.toLocaleString()}`
                    : `Value Protection at $${contract.strike.toLocaleString()}`
                  }
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  relativeToATM === "ATM" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                  relativeToATM === "ITM" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                }`}>
                  {getMoneynessFriendlyName()}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                <div>
                  <span className="text-muted-foreground">Coverage Period:</span>{" "}
                  <span>{contract.daysToExpiry} days</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Premium:</span>{" "}
                  <span>{getPremiumText()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Available Policies:</span>{" "}
                  <span>{contract.openInterest}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Recent Activity:</span>{" "}
                  <span>{contract.volume} trades</span>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">{contractDescription}</p>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-muted/30 rounded-md">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Standard Protection</span> = At current market value{" "}
          <span className="font-medium">Enhanced Protection</span> = Immediate value{" "}
          <span className="font-medium">Economy Protection</span> = Lower cost
        </p>
      </div>
    </div>
  );
} 