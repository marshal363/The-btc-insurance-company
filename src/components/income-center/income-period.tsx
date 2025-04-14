import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type IncomePeriod = "7" | "14" | "30" | "60" | "90" | "180";

interface IncomePeriodSelectorProps {
  period: IncomePeriod;
  setPeriod: (period: IncomePeriod) => void;
  amount: string;
}

export function IncomePeriodSelector({
  period,
  setPeriod,
  amount
}: IncomePeriodSelectorProps) {
  // Calculate the estimated yield based on the period and amount
  const calculateEstimatedYield = (days: number, apyPercent: number = 7.5) => {
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue)) return "0.00";
    
    // Convert annual percentage yield to the period yield
    const periodYield = apyPercent * (days / 365);
    return (amountValue * periodYield / 100).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Income Period</h2>
        <p className="text-muted-foreground mb-4">
          Select how long you want to commit your capital to generate income.
        </p>
      </div>

      <Tabs 
        defaultValue={period} 
        onValueChange={(value) => setPeriod(value as IncomePeriod)}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="7">7 Days</TabsTrigger>
          <TabsTrigger value="14">14 Days</TabsTrigger>
          <TabsTrigger value="30">30 Days</TabsTrigger>
          <TabsTrigger value="60">60 Days</TabsTrigger>
          <TabsTrigger value="90">90 Days</TabsTrigger>
          <TabsTrigger value="180">180 Days</TabsTrigger>
        </TabsList>

        {/* Content for each period duration */}
        {["7", "14", "30", "60", "90", "180"].map((days) => (
          <TabsContent key={days} value={days} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <CalendarClock className="mr-2 h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Period Details</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{days} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Commitment Start:</span>
                      <span>Immediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Commitment End:</span>
                      <span>{new Date(Date.now() + parseInt(days) * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capital Lockup:</span>
                      <span>Full duration</span>
                    </div>
                    {parseInt(days) >= 30 && (
                      <div className="flex justify-between text-primary">
                        <span>Yield Boost:</span>
                        <span>+{Math.min(Math.floor(parseInt(days) / 30), 5)}%</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Projected Outcome</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capital Committed:</span>
                      <span>{parseFloat(amount).toFixed(2)} STX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Yield (7.5% APY):</span>
                      <span>{calculateEstimatedYield(parseInt(days))} STX</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2 mt-2">
                      <span>Total Expected Return:</span>
                      <span>{(parseFloat(amount) + parseFloat(calculateEstimatedYield(parseInt(days)))).toFixed(2)} STX</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {parseInt(days) > 30 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Extended Commitment Period</AlertTitle>
                <AlertDescription>
                  Your capital will be locked for {days} days. Early withdrawals may incur penalties.
                  Longer periods offer higher yield potential but less flexibility.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 