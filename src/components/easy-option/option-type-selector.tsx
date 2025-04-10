import React from "react";
import { ProtectionType } from "./protection-type-selector";

export type OptionType = "call" | "put";

interface OptionTypeSelectorProps {
  optionType: OptionType;
  setOptionType: (type: OptionType) => void;
  protectionType: ProtectionType;
}

export function OptionTypeSelector({ optionType, setOptionType, protectionType }: OptionTypeSelectorProps) {
  // Get heading based on protection type
  const getHeading = () => {
    if (protectionType === "hodl") {
      return "How would you like to protect your Bitcoin?";
    } else {
      return "How would you like to secure your future purchase?";
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{getHeading()}</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div
          className={`flex-1 border rounded-lg p-6 cursor-pointer transition-all ${
            optionType === "call" ? "border-primary bg-primary/10 shadow-sm" : "border-muted hover:border-primary/50"
          }`}
          onClick={() => setOptionType("call")}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              optionType === "call" ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium">Lock in Bitcoin purchase price</h3>
          </div>
          <div className="ml-1 space-y-3">
            <p className="text-sm">
              <span className="font-medium text-blue-600 dark:text-blue-400">→ Purchase Price Lock</span> lets you buy Bitcoin at today's price even if the market rises later.
            </p>
            <p className="text-sm text-muted-foreground">
              A price lock guarantee gives you the right to buy sBTC at a fixed price, even if the market price increases.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Maximum cost:</span> Only the lock-in fee you pay
            </p>
          </div>
        </div>
        
        <div
          className={`flex-1 border rounded-lg p-6 cursor-pointer transition-all ${
            optionType === "put" ? "border-primary bg-primary/10 shadow-sm" : "border-muted hover:border-primary/50"
          }`}
          onClick={() => setOptionType("put")}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              optionType === "put" ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                <path d="M12 8v4"></path>
                <path d="M12 16h.01"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium">Protect against Bitcoin price drops</h3>
          </div>
          <div className="ml-1 space-y-3">
            <p className="text-sm">
              <span className="font-medium text-blue-600 dark:text-blue-400">→ Price Drop Protection</span> ensures you can sell Bitcoin at a guaranteed value even if market price falls.
            </p>
            <p className="text-sm text-muted-foreground">
              A price protection policy gives you the right to sell sBTC at a fixed price, even if the market price decreases.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Maximum cost:</span> Only the protection premium you pay
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2">🛡️ Protection Against Price Movement</h3>
        <p className="text-sm text-muted-foreground">
          Bitcoin protection policies give you the right (but not the obligation) to buy or sell BTC at a fixed price. They can be used to:
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
          <li>Protect against adverse price movements</li>
          <li>Secure future Bitcoin prices with limited risk</li>
          <li>Safeguard your existing Bitcoin holdings</li>
        </ul>
      </div>
    </div>
  );
} 