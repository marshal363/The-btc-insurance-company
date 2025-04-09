"use client";

import { OptionData } from "@/store/market-store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

interface OptionsChainProps {
  options: OptionData[];
}

export function OptionsChain({ options }: OptionsChainProps) {
  const [sortColumn, setSortColumn] = useState<keyof OptionData>("strikePrice");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Helper to format date for display
  const formatExpiry = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Helper to calculate days to expiry
  const calculateDaysToExpiry = (expiry: Date) => {
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Sort options based on current sort settings
  const sortedOptions = [...options].sort((a, b) => {
    let aValue = a[sortColumn];
    let bValue = b[sortColumn];
    
    // Special handling for Date objects
    if (sortColumn === "expiry") {
      aValue = new Date(a.expiry).getTime();
      bValue = new Date(b.expiry).getTime();
    }
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle column header click for sorting
  const handleSort = (column: keyof OptionData) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Render sort indicator
  const renderSortIndicator = (column: keyof OptionData) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm mb-8">
      <h2 className="text-xl font-bold mb-4">Options Chain</h2>
      {options.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p className="mb-2">No options available at this time.</p>
          <p>Check back later for updated options data.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("strikePrice")}
                >
                  Strike{renderSortIndicator("strikePrice")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("type")}
                >
                  Type{renderSortIndicator("type")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("expiry")}
                >
                  Expiry{renderSortIndicator("expiry")}
                </TableHead>
                <TableHead>Days</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("premium")}
                >
                  Premium{renderSortIndicator("premium")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("volume")}
                >
                  Volume{renderSortIndicator("volume")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("openInterest")}
                >
                  Open Interest{renderSortIndicator("openInterest")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("impliedVolatility")}
                >
                  IV{renderSortIndicator("impliedVolatility")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOptions.map((option) => (
                <TableRow key={option.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">${option.strikePrice.toLocaleString()}</TableCell>
                  <TableCell className={option.type === "call" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {option.type.toUpperCase()}
                  </TableCell>
                  <TableCell>{formatExpiry(option.expiry)}</TableCell>
                  <TableCell>{calculateDaysToExpiry(option.expiry)}</TableCell>
                  <TableCell>{option.premium} STX</TableCell>
                  <TableCell>{option.volume}</TableCell>
                  <TableCell>{option.openInterest}</TableCell>
                  <TableCell>{option.impliedVolatility}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
} 