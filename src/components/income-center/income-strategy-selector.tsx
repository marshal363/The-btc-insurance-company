import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

// Define Income Strategy Type
export type IncomeStrategyType = "stability" | "upside";

interface IncomeStrategySelectorProps {
  incomeStrategy: IncomeStrategyType;
  setIncomeStrategy: (strategy: IncomeStrategyType) => void;
}

export function IncomeStrategySelector({
  incomeStrategy,
  setIncomeStrategy,
}: IncomeStrategySelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Select Income Strategy</h2>
        <p className="text-muted-foreground mb-4">
          Choose how you want to generate income with your Bitcoin strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stability Income (PUT selling) */}
        <Card
          className={`cursor-pointer hover:shadow-md transition-all ${
            incomeStrategy === "stability" 
              ? "border-2 border-primary" 
              : "border border-border"
          }`}
          onClick={() => setIncomeStrategy("stability")}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Bitcoin Stability Income</CardTitle>
              <div className={`p-2 rounded-full ${
                incomeStrategy === "stability" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <TrendingDown size={20} />
              </div>
            </div>
            <CardDescription>
              Generate income when Bitcoin remains stable or increases in value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Earn yield by providing downside protection to others</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>May acquire Bitcoin at a discount if prices fall significantly</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Higher yields than traditional income strategies</span>
              </li>
              <li className="flex items-start mt-4 text-muted-foreground italic">
                <span className="mr-2">•</span>
                <span>Best during periods of stability or when you&apos;re willing to acquire more Bitcoin</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Upside Income (CALL selling) */}
        <Card
          className={`cursor-pointer hover:shadow-md transition-all ${
            incomeStrategy === "upside" 
              ? "border-2 border-primary" 
              : "border border-border"
          }`}
          onClick={() => setIncomeStrategy("upside")}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Bitcoin Upside Income</CardTitle>
              <div className={`p-2 rounded-full ${
                incomeStrategy === "upside" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <TrendingUp size={20} />
              </div>
            </div>
            <CardDescription>
              Generate income by lending out potential Bitcoin price upside
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Earn yield by providing upside potential to others</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>May sell Bitcoin at a premium if prices rise significantly</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Generate income while holding Bitcoin for the long term</span>
              </li>
              <li className="flex items-start mt-4 text-muted-foreground italic">
                <span className="mr-2">•</span>
                <span>Best when you expect moderate upside or want to set target selling prices</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 