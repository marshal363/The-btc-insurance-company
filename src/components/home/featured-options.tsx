"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface Option {
  id: string;
  type: string;
  strikePrice: number;
  premium: number;
  expiry: Date;
}

interface FeaturedOptionsProps {
  options: Option[];
}

export function FeaturedOptions({ options }: FeaturedOptionsProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b px-6">
        <CardTitle className="text-xl font-bold">Featured Options</CardTitle>
        <Link href="/option-data" className="text-blue-600 font-medium text-sm flex items-center hover:underline">
          View All Options
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardHeader>
      <CardContent className="pt-4 px-2 sm:px-4">
        {options.length > 0 ? (
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Strike</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Premium</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Expiry</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {options.slice(0, 4).map((option) => (
                  <tr key={option.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <span 
                        className={`font-medium px-2 py-1 rounded text-xs ${
                          option.type.toLowerCase() === "call" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {option.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{option.strikePrice.toLocaleString()} STX</td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{option.premium} STX</div>
                      <div className="text-xs text-muted-foreground">≈ ${(option.premium * 0.18).toFixed(2)}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{formatExpiryDate(option.expiry)}</div>
                      <div className="text-xs text-muted-foreground">
                        in {getDaysToExpiry(option.expiry)} days
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button size="sm" variant="outline" className="rounded-md">
                        Trade
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">No options available</div>
        )}
      </CardContent>
    </Card>
  );
}

// Format expiry date to be more readable
function formatExpiryDate(date: Date): string {
  try {
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

// Get days until expiry
function getDaysToExpiry(date: Date): number {
  try {
    const now = new Date();
    const diffTime = Math.abs(date.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (error) {
    console.error("Error calculating days to expiry:", error);
    return 0;
  }
} 