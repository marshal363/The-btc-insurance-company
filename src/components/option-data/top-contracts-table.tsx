"use client";

interface Contract {
  symbol: string;
  value: number;
}

interface TopContractsTableProps {
  title: string;
  contracts: Contract[];
  valueLabel: string;
  timestamp?: string;
}

export function TopContractsTable({ title, contracts, valueLabel, timestamp }: TopContractsTableProps) {
  return (
    <div className="bg-card rounded-lg p-5 text-card-foreground shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {timestamp && <span className="text-sm text-muted-foreground">{timestamp}</span>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr>
              <th className="pb-2 text-left">#</th>
              <th className="pb-2 text-left">Symbol</th>
              <th className="pb-2 text-right">{valueLabel}</th>
            </tr>
          </thead>
          <tbody>
            {contracts.length > 0 ? (
              contracts.map((contract, index) => (
                <tr key={index} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="py-3 text-left">{index + 1}</td>
                  <td className="py-3 text-left font-medium">
                    {contract.symbol}
                    <span className="ml-1 inline-flex items-center justify-center rounded-full px-1.5 text-xs font-medium">
                      {contract.symbol.endsWith('-C') ? 
                        <span className="text-green-600">C</span> : 
                        <span className="text-red-600">P</span>}
                    </span>
                  </td>
                  <td className="py-3 text-right">{contract.value.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-6 text-center text-muted-foreground">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 