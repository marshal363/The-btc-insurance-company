"use client";

import { EmptyState } from "@/components/option-data/empty-state";

export function TimeSeriesAnalysis() {
  return (
    <div className="bg-card rounded-lg p-6 text-card-foreground shadow-sm mb-8">
      <h2 className="text-xl font-bold mb-4">Time-based Analysis</h2>
      <EmptyState 
        title="Coming Soon"
        message="Time-series data visualization will be implemented in Phase 6.5."
        icon="coming-soon"
      />
    </div>
  );
} 