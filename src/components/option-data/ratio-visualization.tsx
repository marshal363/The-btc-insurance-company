"use client";

interface RatioVisualizationProps {
  title: string;
  callValue: number;
  putValue: number;
  callLabel?: string;
  putLabel?: string;
  timestamp?: string;
  currencyLabel?: string;
}

export function RatioVisualization({ 
  title, 
  callValue, 
  putValue, 
  callLabel = "Call", 
  putLabel = "Put", 
  timestamp,
  currencyLabel = "STX"
}: RatioVisualizationProps) {
  const total = callValue + putValue;
  const callPercentage = total > 0 ? (callValue / total * 100).toFixed(2) : "0.00";
  const putPercentage = total > 0 ? (putValue / total * 100).toFixed(2) : "0.00";

  return (
    <div className="bg-card rounded-lg p-5 text-card-foreground shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {timestamp && <span className="text-sm text-muted-foreground">{timestamp}</span>}
      </div>

      {/* Percentage bar visualization */}
      <div className="h-6 flex mb-6 rounded-full overflow-hidden">
        <div 
          className="bg-green-500 flex items-center justify-center text-xs font-medium text-white"
          style={{ width: `${callPercentage}%` }}
        >
          <span className={`${Number(callPercentage) < 30 ? 'hidden' : ''} `}>
            {callPercentage}%
          </span>
        </div>
        <div 
          className="bg-red-500 flex items-center justify-center text-xs font-medium text-white"
          style={{ width: `${putPercentage}%` }}
        >
          <span className={`${Number(putPercentage) < 30 ? 'hidden' : ''}`}>
            {putPercentage}%
          </span>
        </div>
      </div>

      {/* Values display */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-600">{callLabel}</span>
          </div>
          <div className="text-lg font-semibold mt-1">{callValue.toLocaleString()} {currencyLabel}</div>
        </div>
        
        <div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-red-600">{putLabel}</span>
          </div>
          <div className="text-lg font-semibold mt-1">{putValue.toLocaleString()} {currencyLabel}</div>
        </div>
      </div>
    </div>
  );
} 