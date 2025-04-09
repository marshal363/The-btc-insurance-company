import React from "react";

export type OptionType = "call" | "put";

interface OptionTypeSelectorProps {
  optionType: OptionType;
  setOptionType: (type: OptionType) => void;
}

export function OptionTypeSelector({ optionType, setOptionType }: OptionTypeSelectorProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Where do you think BTC price is going?</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div
          className={`flex-1 border rounded-lg p-6 cursor-pointer transition-all ${
            optionType === "call" ? "border-primary bg-primary/10 shadow-sm" : "border-muted hover:border-primary/50"
          }`}
          onClick={() => setOptionType("call")}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              optionType === "call" ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium">I think BTC is going UP</h3>
          </div>
          <div className="ml-1 space-y-3">
            <p className="text-sm">
              <span className="font-medium text-green-600 dark:text-green-400">→ Buy a CALL option</span> to benefit if BTC price rises.
            </p>
            <p className="text-sm text-muted-foreground">
              A call option gives you the right to buy sBTC at a fixed price, even if the market price increases.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Maximum loss:</span> Only the premium you pay
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
              optionType === "put" ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium">I think BTC is going DOWN</h3>
          </div>
          <div className="ml-1 space-y-3">
            <p className="text-sm">
              <span className="font-medium text-red-600 dark:text-red-400">→ Buy a PUT option</span> to benefit if BTC price falls.
            </p>
            <p className="text-sm text-muted-foreground">
              A put option gives you the right to sell sBTC at a fixed price, even if the market price decreases.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Maximum loss:</span> Only the premium you pay
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2">🛡️ Protection Against Price Movement</h3>
        <p className="text-sm text-muted-foreground">
          Options are financial contracts that give you the right (but not the obligation) to buy or sell BTC at a fixed price. They can be used to:
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
          <li>Protect against adverse price movements</li>
          <li>Speculate on price direction with limited risk</li>
          <li>Hedge your existing Bitcoin holdings</li>
        </ul>
      </div>
    </div>
  );
} 