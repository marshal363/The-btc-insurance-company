"use client";

import Link from "next/link";

export function ActionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Link
        href="/easy-option"
        className="bg-card hover:bg-card/90 transition-colors rounded-lg p-6 text-card-foreground shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-2">Buy Option</h3>
        <p className="text-muted-foreground mb-4">
          Hedge your Bitcoin portfolio with a simple step-by-step process.
        </p>
        <div className="bg-primary/10 text-primary rounded-md px-3 py-1 inline-block text-sm">
          Easy Trade View →
        </div>
      </Link>

      <Link
        href="/option-data"
        className="bg-card hover:bg-card/90 transition-colors rounded-lg p-6 text-card-foreground shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-2">Market Data</h3>
        <p className="text-muted-foreground mb-4">
          Analyze options market data including open interest and volatility.
        </p>
        <div className="bg-primary/10 text-primary rounded-md px-3 py-1 inline-block text-sm">
          Data View →
        </div>
      </Link>

      <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Hedging Calculator</h3>
        <p className="text-muted-foreground mb-4">
          Calculate how many options you need to hedge your Bitcoin portfolio.
        </p>
        <div className="bg-secondary/10 text-secondary rounded-md px-3 py-1 inline-block text-sm">
          Coming Soon
        </div>
      </div>
    </div>
  );
} 