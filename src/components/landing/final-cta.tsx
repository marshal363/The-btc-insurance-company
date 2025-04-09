"use client";

import Link from "next/link";
import { Play } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-background border-t">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Start Hedging Your Bitcoin Today</h2>
        <p className="text-lg md:text-xl mb-8 md:mb-10 text-muted-foreground max-w-2xl mx-auto">
          Get protection against market volatility with just a few clicks
        </p>
        
        <div className="flex flex-col gap-4 mb-6 md:mb-8">
          <Link 
            href="/home"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 py-3 w-full sm:w-auto sm:mx-auto"
          >
            Launch BitHedge
          </Link>
          <button 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-6 py-3 w-full sm:w-auto sm:mx-auto"
            onClick={() => alert("Demo video coming soon!")}
          >
            <Play size={16} className="mr-2" />
            Watch Demo Video
          </button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Currently on Testnet - No Real Funds Required
        </div>
      </div>
    </section>
  );
} 