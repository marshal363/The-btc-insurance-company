"use client";

import Link from "next/link";

interface StepProps {
  number: number;
  title: string;
  description: string;
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="bg-card rounded-lg p-6 md:p-8 text-card-foreground shadow-sm max-w-xs w-full flex flex-col items-center text-center h-full">
      <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mb-5 text-lg font-semibold">
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden md:flex items-center justify-center px-4">
      <div className="text-primary text-3xl">→</div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="py-20 md:py-24 w-full" id="how-it-works">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Hedging Made Simple</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0">
          <Step 
            number={1}
            title="Connect"
            description="Connect your Hiro Wallet to get started with BitHedge."
          />
          <Arrow />
          <Step 
            number={2}
            title="Select"
            description="Choose your option parameters based on your risk profile."
          />
          <Arrow />
          <Step 
            number={3}
            title="Protect"
            description="Secure your Bitcoin portfolio against market volatility."
          />
        </div>
        
        <div className="flex justify-center mt-16">
          <Link
            href="/home"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 py-3"
          >
            Try It Now
          </Link>
        </div>
      </div>
    </section>
  );
} 