import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Info, Shield, Check, ArrowRight, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define contract type
export interface OptionContract {
  id: string;
  type: "call" | "put";
  strike: number;
  premium: number;
  daysToExpiry: number;
  openInterest: number;
  volume: number;
}

interface AvailableContractsProps {
  optionType: "call" | "put";
  strikePrice: string;
  selectedContract: OptionContract | null;
  onSelectContract: (contract: OptionContract) => void;
  togglePnlPanel: () => void;
}

export function AvailableContracts({ 
  optionType, 
  strikePrice,
  selectedContract,
  onSelectContract,
  togglePnlPanel
}: AvailableContractsProps) {
  const strikeNum = parseFloat(strikePrice);
  
  // Generate mock contracts based on strike price and option type
  const generateContracts = (): OptionContract[] => {
    const baseStrike = strikeNum;
    const strikes = [
      Math.round(baseStrike * 0.95), // ITM for PUT, OTM for CALL
      baseStrike,                    // ATM
      Math.round(baseStrike * 1.05)  // OTM for PUT, ITM for CALL
    ];
    
    return strikes.map((strike, index) => {
      // Determine moneyness
      const isPut = optionType === "put";
      let moneyness: "ITM" | "ATM" | "OTM";
      
      if (strike === baseStrike) {
        moneyness = "ATM";
      } else if ((isPut && strike < baseStrike) || (!isPut && strike > baseStrike)) {
        moneyness = "ITM";
      } else {
        moneyness = "OTM";
      }
      
      // Calculate mock premium based on moneyness and option type
      const basePremium = 50;
      let premium = basePremium;
      
      if (moneyness === "ITM") {
        premium = basePremium * 1.5;
      } else if (moneyness === "OTM") {
        premium = basePremium * 0.7;
      }
      
      return {
        id: `${index + 1}`,
        type: optionType,
        strike,
        premium,
        daysToExpiry: 30,
        openInterest: 250 - (index * 50),
        volume: 100 - (index * 25)
      };
    });
  };
  
  const contracts = generateContracts();
  
  // Get description text based on moneyness
  const getMoneyness = (contract: OptionContract): "ITM" | "ATM" | "OTM" => {
    const isPut = optionType === "put";
    
    if (contract.strike === strikeNum) {
      return "ATM";
    } else if ((isPut && contract.strike < strikeNum) || (!isPut && contract.strike > strikeNum)) {
      return "ITM";
    } else {
      return "OTM";
    }
  };
  
  // Get user-friendly moneyness term
  const getMoneynessLabel = (moneyness: "ITM" | "ATM" | "OTM"): string => {
    if (optionType === "put") {
      switch (moneyness) {
        case "ITM": return "Full Value Protection";
        case "ATM": return "Threshold Coverage";
        case "OTM": return "Precautionary Coverage";
      }
    } else {
      switch (moneyness) {
        case "ITM": return "Valuable Guarantee";
        case "ATM": return "At-market Guarantee";
        case "OTM": return "Future-value Guarantee";
      }
    }
  };
  
  const getDescription = (moneyness: "ITM" | "ATM" | "OTM"): string => {
    if (optionType === "put") {
      switch (moneyness) {
        case "ITM": return "Higher premium, immediate protection value";
        case "ATM": return "Balanced premium and protection";
        case "OTM": return "Lower premium, activates at larger price drop";
      }
    } else {
      switch (moneyness) {
        case "ITM": return "Higher premium, immediate purchase value";
        case "ATM": return "Balanced premium and price lock";
        case "OTM": return "Lower premium, higher purchase guarantee";
      }
    }
  };
  
  // Get pricing strategy description
  const getPricingStrategy = (moneyness: "ITM" | "ATM" | "OTM"): string => {
    if (optionType === "put") {
      switch (moneyness) {
        case "ITM": return "Maximum peace of mind";
        case "ATM": return "Balanced protection strategy";
        case "OTM": return "Cost-effective protection";
      }
    } else {
      switch (moneyness) {
        case "ITM": return "Premium price lock";
        case "ATM": return "Standard price guarantee";
        case "OTM": return "Budget price assurance";
      }
    }
  };

  // Get color scheme based on moneyness
  const getMoneynessColors = (moneyness: "ITM" | "ATM" | "OTM"): {bg: string, text: string, accent: string, border: string, badge: string} => {
    switch (moneyness) {
      case "ITM": return {
        bg: "bg-blue-50", 
        text: "text-blue-700", 
        accent: "bg-blue-100",
        border: "border-blue-200",
        badge: "bg-blue-100 text-blue-700"
      };
      case "ATM": return {
        bg: "bg-purple-50", 
        text: "text-purple-700", 
        accent: "bg-purple-100",
        border: "border-purple-200",
        badge: "bg-purple-100 text-purple-700"
      };
      case "OTM": return {
        bg: "bg-amber-50", 
        text: "text-amber-700", 
        accent: "bg-amber-100",
        border: "border-amber-200",
        badge: "bg-amber-100 text-amber-700"
      };
    }
  };
  
  // Get icon based on contract type and moneyness
  const getContractIcon = (moneyness: "ITM" | "ATM" | "OTM", type: "call" | "put") => {
    if (type === "put") {
      return <Shield className="h-5 w-5" />;
    } else {
      return <ArrowUp className="h-5 w-5" />;
    }
  };
  
  const insuranceTerms = {
    premium: optionType === "put" ? "Insurance Premium" : "Lock-in Fee",
    contract: optionType === "put" ? "Protection Policy" : "Price Lock Policy",
    strike: optionType === "put" ? "Protected Value" : "Guaranteed Purchase Price",
    title: optionType === "put" ? "Available Protection Policies" : "Available Price Lock Policies"
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{insuranceTerms.title}</h2>
      <p className="text-muted-foreground mb-4">
        Select from available policies matching your protection needs.
      </p>
      
      {!selectedContract && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700 flex items-center gap-2">
          <Info className="h-4 w-4 flex-shrink-0" />
          <p>Please select a policy to continue to the next step.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {contracts.map((contract) => {
          const moneyness = getMoneyness(contract);
          const moneynessLabel = getMoneynessLabel(moneyness);
          const colors = getMoneynessColors(moneyness);
          const icon = getContractIcon(moneyness, optionType);
          const pricingStrategy = getPricingStrategy(moneyness);
          const isSelected = selectedContract?.id === contract.id;
          
          return (
            <Card 
              key={contract.id} 
              className={`overflow-hidden transition-all hover:shadow-md ${
                isSelected ? "ring-1 ring-black shadow-sm" : "border"
              }`}
              onClick={() => onSelectContract(contract)}
            >
              <div className="relative p-6 pb-4">
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className={`font-medium text-xs py-1 px-2 ${colors.badge}`}>
                    {moneyness}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-2 rounded-full ${colors.accent} ${colors.text}`}>
                    {icon}
                  </div>
                  <p className="text-sm font-medium text-gray-700">{moneynessLabel}</p>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold tracking-tight">
                    ${contract.strike.toLocaleString()}
                  </span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-semibold text-gray-800">{pricingStrategy}</h4>
                  <p className="text-sm text-gray-600">{getDescription(moneyness)}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{insuranceTerms.premium}</span>
                    <span className="text-lg font-semibold">${contract.premium}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <span className="block text-gray-500 mb-1">Policy Period</span>
                    <span className="font-medium">{contract.daysToExpiry} days</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-1">{insuranceTerms.strike}</span>
                    <span className="font-medium">${contract.strike.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  variant={isSelected ? "default" : "outline"} 
                  size="default" 
                  className={`w-full ${
                    isSelected ? "bg-black hover:bg-black/90" : ""
                  }`}
                >
                  {isSelected ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4" /> Selected
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      Select Policy <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      
      {selectedContract && (
        <div className="flex justify-center mb-6">
          <Button 
            onClick={togglePnlPanel} 
            variant="outline" 
            className="gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>
              {optionType === "put" 
                ? "Show Protection Value Simulator" 
                : "Show Price Lock Value Simulator"}
            </span>
          </Button>
        </div>
      )}
      
      <div className="bg-muted/30 p-5 rounded-lg">
        <h3 className="text-base font-medium mb-3 flex items-center gap-2">
          <Info className="w-5 h-5" />
          <span>Understanding Protection Policies</span>
        </h3>
        <div className="text-sm text-muted-foreground space-y-3 pl-7">
          <div className="flex gap-2">
            <Badge variant="outline" className="text-purple-700 bg-purple-50 hover:bg-purple-50">ATM</Badge>
            <div>
              <p className="font-medium text-gray-700">Threshold Coverage</p>
              <p>
                {optionType === "put" 
                  ? "Protected value equals current market price - balanced protection." 
                  : "Purchase guarantee at current market price - balanced approach."}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline" className="text-blue-700 bg-blue-50 hover:bg-blue-50">ITM</Badge>
            <div>
              <p className="font-medium text-gray-700">Active Coverage</p>
              <p>
                {optionType === "put" 
                  ? "Protected value above current market price - immediate protection value but higher premium." 
                  : "Purchase guarantee below current market price - immediate value but higher premium."}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline" className="text-amber-700 bg-amber-50 hover:bg-amber-50">OTM</Badge>
            <div>
              <p className="font-medium text-gray-700">Precautionary Coverage</p>
              <p>
                {optionType === "put" 
                  ? "Protected value below current market price - lower premium, activates only on larger price drops." 
                  : "Purchase guarantee above current market price - lower premium but only valuable if price rises significantly."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 