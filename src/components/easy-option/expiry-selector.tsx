import React from "react";
import { format, addDays } from "date-fns";

interface ExpirySelectorProps {
  expiryDays: number;
  setExpiryDays: (days: number) => void;
}

export function ExpirySelector({ expiryDays, setExpiryDays }: ExpirySelectorProps) {
  const expiryDate = addDays(new Date(), expiryDays);
  const formattedDate = format(expiryDate, "MM/dd/yyyy");
  
  const options = [
    { days: 7, label: "1 WEEK", riskLevel: "Lower Cost, Higher Risk", description: "Shorter timeframe means cheaper options but less time for price to move favorably" },
    { days: 14, label: "2 WEEKS", riskLevel: "Balanced", description: "Medium timeframe balances cost and time for price movement" },
    { days: 30, label: "1 MONTH", riskLevel: "Higher Cost, Lower Risk", description: "Longer timeframe costs more but gives more time for favorable movement" }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">How much time do you need?</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Choose when your option expires. Longer periods cost more but give you more time for price to move in your favor.
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
      
      <div className="p-4 rounded-md bg-muted/30 border border-muted">
        <div className="flex items-start gap-4">
          <div className="bg-muted/50 rounded-full p-2 flex-shrink-0 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1">Your option will expire on:</h3>
            <p className="text-sm mb-1">{formattedDate} ({expiryDays} days from now)</p>
            <p className="text-xs text-muted-foreground">
              After this date, your option will expire and cannot be exercised.
              {expiryDays <= 7 && " Make sure to monitor it closely as the expiry approaches."}
            </p>
          </div>
        </div>
        
        <hr className="my-4 border-muted" />
        
        <div className="text-xs text-muted-foreground">
          <p className="font-medium mb-1">How expiration affects your option:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Longer expiration = Higher cost but more time for favorable movement</li>
            <li>Shorter expiration = Lower cost but less time for favorable movement</li>
            <li>Options lose value as they approach expiration (time decay)</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 