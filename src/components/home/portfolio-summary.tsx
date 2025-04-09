"use client";

interface Option {
  expiry: Date | string;
}

interface PortfolioSummaryProps {
  ownedOptions: Option[];
}

export function PortfolioSummary({ ownedOptions }: PortfolioSummaryProps) {
  return (
    <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
      <h2 className="text-xl font-bold mb-4">Portfolio Summary</h2>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Options Owned:</span>
          <span className="font-medium">{ownedOptions.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Next Expiration:</span>
          <span className="font-medium">
            {ownedOptions.length > 0
              ? getNextExpirationDate(ownedOptions)
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
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