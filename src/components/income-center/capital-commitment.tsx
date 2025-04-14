import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CapitalCommitmentProps {
  amount: string;
  setAmount: (amount: string) => void;
  walletBalance?: string;
  walletConnected: boolean;
}

export function CapitalCommitment({
  amount,
  setAmount,
  walletBalance = "0",
  walletConnected
}: CapitalCommitmentProps) {
  // Handle percentage selection (25%, 50%, 75%, 100%)
  const handlePercentage = (percentage: number) => {
    if (!walletConnected || !walletBalance) return;
    
    const maxAmount = parseFloat(walletBalance);
    if (isNaN(maxAmount)) return;
    
    const newAmount = (maxAmount * percentage / 100).toFixed(4);
    setAmount(newAmount);
  };

  // Calculate the USD value (assuming 1 STX = $2 USD)
  const calculateUsdValue = () => {
    const amountValue = parseFloat(amount);
    return isNaN(amountValue) ? 0 : amountValue * 2; // Simplified conversion for demo
  };

  const usdValue = calculateUsdValue().toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Capital Commitment</h2>
        <p className="text-muted-foreground mb-4">
          Specify how much STX you want to commit to this income strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">STX Amount</Label>
            <div className="flex mt-1.5">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter STX amount"
                className="w-full"
                min="0"
                step="10"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Approximate value: {usdValue}
            </p>
          </div>

          {walletConnected && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Available Balance:</span>
                <span>{parseFloat(walletBalance).toFixed(4)} STX</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handlePercentage(25)}
                  className="flex-1 text-xs"
                >
                  25%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handlePercentage(50)}
                  className="flex-1 text-xs"
                >
                  50%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handlePercentage(75)}
                  className="flex-1 text-xs"
                >
                  75%
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handlePercentage(100)}
                  className="flex-1 text-xs"
                >
                  100%
                </Button>
              </div>
            </div>
          )}
        </div>

        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Capital Commitment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Strategy:</span>
                <span>Bitcoin Stability Income</span>
              </div>
              <div className="flex justify-between">
                <span>Risk-Reward Tier:</span>
                <span>Balanced</span>
              </div>
              <div className="flex justify-between">
                <span>Capital Efficiency:</span>
                <span>100% (fully collateralized)</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated APY:</span>
                <span>6-9%</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Potential Annual Yield:</span>
                  <span>
                    {isNaN(parseFloat(amount)) ? '0.00' : (parseFloat(amount) * 0.075).toFixed(2)} STX
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 