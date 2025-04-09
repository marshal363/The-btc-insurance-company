"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export function ActionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="shadow-sm hover:shadow transition-all">
        <CardContent className="p-0">
          <Link href="/easy-trade" className="block p-6">
            <h3 className="text-lg font-semibold mb-2">Buy Option</h3>
            <p className="text-sm text-slate-600 mb-4">
              Hedge your Bitcoin portfolio with a simple step-by-step process.
            </p>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              Easy Trade View
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </Link>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-all">
        <CardContent className="p-0">
          <Link href="/option-data" className="block p-6">
            <h3 className="text-lg font-semibold mb-2">Market Data</h3>
            <p className="text-sm text-slate-600 mb-4">
              Analyze options market data including open interest and volatility.
            </p>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              Data View
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </Link>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow transition-all">
        <CardContent className="p-0">
          <Link href="#hedging-calculator" className="block p-6">
            <h3 className="text-lg font-semibold mb-2">Hedging Calculator</h3>
            <p className="text-sm text-slate-600 mb-4">
              Calculate how many options you need to hedge your Bitcoin portfolio.
            </p>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              Try Calculator
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
} 