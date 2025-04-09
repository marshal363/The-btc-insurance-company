"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface Option {
  expiry: Date | string;
  type?: 'call' | 'put';
  strike?: number;
  premium?: number;
}

interface PortfolioSummaryProps {
  ownedOptions: Option[];
  stxBalance?: number;
  sbtcBalance?: number;
  portfolioValue?: number;
  hedgePercentage?: number;
}

export function PortfolioSummary({ 
  ownedOptions,
  stxBalance = 0,
  sbtcBalance = 0,
  portfolioValue = 0,
  hedgePercentage = 0
}: PortfolioSummaryProps) {
  // Calculate days to next expiration
  const nextExpiryDate = ownedOptions.length > 0
    ? getNextExpirationDate(ownedOptions)
    : "N/A";
  
  // Determine if any option is expiring soon (within 3 days)
  const hasExpiringOptions = ownedOptions.some(option => {
    const expiryDate = option.expiry instanceof Date 
      ? option.expiry 
      : new Date(option.expiry);
    const daysUntilExpiry = Math.floor((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 3 && daysUntilExpiry >= 0;
  });

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2 border-b px-6">
        <CardTitle className="text-xl font-bold">Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 px-6 flex-grow">
        <div className="space-y-5 h-full flex flex-col">
          {/* Balances */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-md">
              <div className="text-sm text-slate-500">STX Balance</div>
              <div className="text-lg font-medium mt-1">{stxBalance.toLocaleString()} STX</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-md">
              <div className="text-sm text-slate-500">sBTC Balance</div>
              <div className="text-lg font-medium mt-1">{sbtcBalance.toLocaleString()} sBTC</div>
            </div>
          </div>
          
          {/* Portfolio stats */}
          <div className="space-y-4 py-1">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">Portfolio Value:</span>
              <span className="font-medium">${portfolioValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">Hedged:</span>
              <span className="font-medium">{hedgePercentage}% ({(sbtcBalance * hedgePercentage / 100).toFixed(2)} sBTC)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">Options Owned:</span>
              <span className="font-medium">{ownedOptions.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">Next Expiration:</span>
              <span className="font-medium">{nextExpiryDate}</span>
            </div>
          </div>
          
          {/* Warnings section - put at end with flex-grow to push them to bottom when possible */}
          <div className="space-y-3 mt-auto">
            {/* Expiry warnings */}
            {hasExpiringOptions && (
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-md border border-amber-100">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  You have options expiring soon. Consider exercising or rolling them over.
                </div>
              </div>
            )}
            
            {/* Hedging recommendation */}
            {hedgePercentage < 20 && sbtcBalance > 0 && (
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-md border border-blue-100">
                <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  Your portfolio is only {hedgePercentage}% hedged. Consider buying more options for protection.
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to safely get the next expiration date
function getNextExpirationDate(options: Option[]): string {
  try {
    // Convert all expiry dates to timestamps
    const timestamps = options.map(opt => {
      // Handle if expiry is already a Date object
      if (opt.expiry instanceof Date) {
        return opt.expiry.getTime();
      }
      // Handle if expiry is a string (ISO format)
      return new Date(opt.expiry).getTime();
    });
    
    // Find the minimum timestamp (earliest date)
    const earliestTimestamp = Math.min(...timestamps);
    
    // Convert back to a readable date string
    return new Date(earliestTimestamp).toLocaleDateString();
  } catch (error) {
    console.error("Error formatting expiration date:", error);
    return "Error";
  }
} 