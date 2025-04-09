"use client";

import Link from "next/link";

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
    <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
      <h2 className="text-xl font-bold mb-4">Featured Options</h2>
      {options.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Strike</th>
                <th className="text-left py-3 px-4">Premium</th>
                <th className="text-left py-3 px-4">Expiry</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {options.slice(0, 5).map((option) => (
                <tr key={option.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <span className={option.type === "call" ? "text-profit" : "text-loss"}>
                      {option.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">{option.strikePrice.toLocaleString()} STX</td>
                  <td className="py-3 px-4">{option.premium} STX</td>
                  <td className="py-3 px-4">{option.expiry.toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/easy-option?option=${option.id}`}
                      className="text-primary text-sm hover:underline"
                    >
                      Trade
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">Loading options...</div>
      )}
    </div>
  );
} 