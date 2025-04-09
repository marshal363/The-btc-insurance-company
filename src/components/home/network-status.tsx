import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function NetworkStatus() {
  // Mock data - would come from API in production
  const currentBlock = 12000;
  const lastTxStatus = "confirmed";
  const networkType = "testnet";
  
  return (
    <Card className="shadow-sm border border-slate-200 h-full bg-white">
      <CardContent className="p-4 h-full flex items-center">
        <div className="flex w-full justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-slate-100 p-1.5 rounded-full">
                <Clock className="h-4 w-4 text-slate-700" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Block</div>
                <div className="text-sm font-semibold">{currentBlock}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Last Tx</div>
                <div className="text-sm font-semibold">{lastTxStatus}</div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <div className="bg-blue-100 p-1.5 rounded-full">
                <AlertCircle className="h-4 w-4 text-blue-700" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Network</div>
                <div className="text-sm font-semibold">Bitcoin</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="bg-red-600 hover:bg-red-700 text-white border-none text-xs font-medium px-3 py-1">
                    {networkType}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-slate-900 text-white border-none">
                  <p className="text-xs">
                    You are connected to the Bitcoin testnet. Transactions do not use real BTC.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 