import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold">Income Period</h2>
        <Badge variant="outline" className="bg-slate-100 border-slate-300 text-slate-700 rounded-full">
          Step 4 of 6
        </Badge>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Select how long you want to commit your capital to generate income.
      </p>

      {!period && (
        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800 flex items-center gap-2 shadow-sm">
          <Clock className="h-4 w-4 flex-shrink-0 text-amber-600" />
          <p>Please select an income period to continue to the next step.</p>
        </div>
      )}

      <Tabs 
        defaultValue={period} 
        onValueChange={(value) => setPeriod(value as IncomePeriod)}
        className="space-y-6"
      >
        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 mb-4">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-white">
            <TabsTrigger 
              value="7" 
              className={period === "7" ? "bg-amber-500 text-white data-[state=active]:bg-amber-500 data-[state=active]:text-white" : ""}
            >
              7 Days
            </TabsTrigger>
            <TabsTrigger 
              value="14"
              className={period === "14" ? "bg-amber-500 text-white data-[state=active]:bg-amber-500 data-[state=active]:text-white" : ""}
            >
              14 Days
            </TabsTrigger>
            <TabsTrigger 
              value="30"
              className={period === "30" ? "bg-amber-500 text-white data-[state=active]:bg-amber-500 data-[state=active]:text-white" : ""}
            >
              30 Days
            </TabsTrigger>
            <TabsTrigger 
              value="60"
              className={period === "60" ? "bg-amber-500 text-white data-[state=active]:bg-amber-500 data-[state=active]:text-white" : ""}
            >
              60 Days
            </TabsTrigger>
            <TabsTrigger 
              value="90"
              className={period === "90" ? "bg-amber-500 text-white data-[state=active]:bg-amber-500 data-[state=active]:text-white" : ""}
            >
              90 Days
            </TabsTrigger>
            <TabsTrigger 
              value="180"
              className={period === "180" ? "bg-amber-500 text-white data-[state=active]:bg-amber-500 data-[state=active]:text-white" : ""}
            >
              180 Days
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content for each period duration */}
        {["7", "14", "30", "60", "90", "180"].map((days) => (
          <TabsContent key={days} value={days} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100 h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4 text-amber-700">
                      <Calendar className="mr-2 h-5 w-5" />
                      <h3 className="font-semibold text-amber-900">Period Details</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{days} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Commitment Start:</span>
                        <span className="font-medium">Immediate</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Commitment End:</span>
                        <span className="font-medium">{new Date(Date.now() + parseInt(days) * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capital Lockup:</span>
                        <span className="font-medium">Full duration</span>
                      </div>
                      {parseInt(days) >= 30 && (
                        <div className="flex justify-between text-amber-600 bg-amber-50 p-2 rounded-md border border-amber-100">
                          <span className="font-medium">Yield Boost:</span>
                          <span className="font-semibold">+{Math.min(Math.floor(parseInt(days) / 30), 5)}%</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100 h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4 text-amber-700">
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      <h3 className="font-semibold text-amber-900">Projected Outcome</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capital Committed:</span>
                        <span className="font-medium">{parseFloat(amount).toFixed(2)} STX</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Yield (7.5% APY):</span>
                        <span className="font-medium text-amber-600">{calculateEstimatedYield(parseInt(days))} STX</span>
                      </div>
                      <div className="flex justify-between border-t border-amber-100 pt-3 mt-3">
                        <span className="font-medium">Total Expected Return:</span>
                        <span className="font-semibold text-amber-600">{(parseFloat(amount) + parseFloat(calculateEstimatedYield(parseInt(days)))).toFixed(2)} STX</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {parseInt(days) > 30 && (
              <Alert className="bg-amber-50 border-amber-200 text-amber-800">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">Extended Commitment Period</AlertTitle>
                <AlertDescription className="text-amber-700">
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