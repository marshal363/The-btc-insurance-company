import React from "react";
import { format, addDays } from "date-fns";

interface ExpirySelectorProps {
  expiryDays: number;
  setExpiryDays: (days: number) => void;
}

export function ExpirySelector({ expiryDays, setExpiryDays }: ExpirySelectorProps) {
  const expiryDate = addDays(new Date(), expiryDays);
  
  // Coverage period options
  const options = [
    { 
      days: 7, 
      label: "1 Week Coverage", 
      riskLevel: "Lower Cost, Higher Risk",
      description: "Shorter coverage period costs less but gives less time for favorable market movement"
    },
    { 
      days: 14, 
      label: "2 Weeks Coverage", 
      riskLevel: "Balanced",
      description: "Medium coverage period balances cost and time for market movement"
    },
    { 
      days: 30, 
      label: "1 Month Coverage", 
      riskLevel: "Higher Cost, Lower Risk",
      description: "Longer coverage period costs more but gives more time for favorable movement"
    }
  ];
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">How long do you need protection?</h2>
      <p className="text-muted-foreground mb-6">
        Choose when your protection policy expires. Longer periods cost more but give you more time for price to move in your favor.
      </p>
      
      <div className="mb-6">
        <div className="space-y-3">
          {options.map((option) => (
            <div
              key={option.days}
              className={`border rounded-lg p-4 cursor-pointer hover:border-primary/70 transition-all ${
                expiryDays === option.days ? "border-primary bg-primary/10 shadow-sm" : "border-muted"
              }`}
              onClick={() => setExpiryDays(option.days)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                    expiryDays === option.days ? "bg-primary text-primary-foreground" : "border border-muted"
                  }`}>
                    {expiryDays === option.days && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  option.days === 7 
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" 
                    : option.days === 30 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                }`}>
                  {option.riskLevel}
                </span>
              </div>
              <p className="text-xs text-muted-foreground pl-8">{option.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-muted rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <div>
          <p className="font-medium">Your protection policy will expire on:</p>
          <p className="text-xl font-bold">{format(expiryDate, "MM/dd/yyyy")} ({expiryDays} days from now)</p>
          <p className="text-sm text-muted-foreground mt-1">After this date, your policy will expire and cannot be exercised.</p>
          
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">How expiration affects your protection:</p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
              <li>Longer protection period = Higher cost but more time for favorable movement</li>
              <li>Shorter protection period = Lower cost but less time for favorable movement</li>
              <li>Protection policies lose value as they approach expiration (time decay)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 