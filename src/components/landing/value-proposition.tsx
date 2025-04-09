"use client";

import { ShieldCheck, LineChart, Lock } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 md:p-8 text-card-foreground shadow-sm flex flex-col items-center sm:items-start text-center sm:text-left h-full">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function ValueProposition() {
  return (
    <section className="py-16 md:py-20">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Why Choose BitHedge?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            title="Bitcoin-Secured Protection"
            description="Options secured by Bitcoin's own consensus mechanism through the sBTC protocol."
            icon={<ShieldCheck size={36} strokeWidth={1.5} />}
          />
          <FeatureCard
            title="Simple Option Trading"
            description="User-friendly interface designed for both beginners and experienced traders."
            icon={<LineChart size={36} strokeWidth={1.5} />}
          />
          <FeatureCard
            title="No Liquidation Risk"
            description="Maximum loss is limited to your premium - no margin calls or liquidations."
            icon={<Lock size={36} strokeWidth={1.5} />}
          />
        </div>
      </div>
    </section>
  );
} 