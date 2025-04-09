"use client";

import Link from "next/link";
import { Shield, TrendingUp } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-background border-t">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
          Start Your Bitcoin Journey Today
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12">
          {/* Protection CTA */}
          <div className="flex flex-col bg-gradient-to-br from-blue-50/70 to-blue-100/70 dark:from-blue-950/20 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800/60 rounded-xl p-7 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto mb-5">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            
            <h3 className="text-xl font-bold mb-4">Secure Your Bitcoin Value Now</h3>
            
            <p className="text-muted-foreground mb-8">
              Bitcoin&apos;s historical volatility means the next price movement could happen any day. Don&apos;t wait until prices start falling to seek protection.
            </p>
            
            <Link 
              href="/protection"
              className="mt-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-3"
            >
              Create Your Protection Policy
            </Link>
          </div>
          
          {/* Income CTA */}
          <div className="flex flex-col bg-gradient-to-br from-amber-50/70 to-amber-100/70 dark:from-amber-950/20 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800/60 rounded-xl p-7 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mx-auto mb-5">
              <TrendingUp className="h-6 w-6 text-amber-500" />
            </div>
            
            <h3 className="text-xl font-bold mb-4">Begin Earning Premium Income Today</h3>
            
            <p className="text-muted-foreground mb-8">
              Every day without your capital generating yield is a missed opportunity. Start collecting premiums within minutes.
            </p>
            
            <Link 
              href="/income"
              className="mt-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-amber-500 text-white hover:bg-amber-600 h-11 px-8 py-3"
            >
              Start Providing Protection
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
            Join the thousands of Bitcoin holders who sleep better at night, knowing their positions are protected by BitHedge&apos;s decentralized options platform.
          </p>
          
          <div className="text-sm text-muted-foreground border-t border-border pt-6 max-w-lg mx-auto">
            Currently on Testnet - No Real Funds Required
          </div>
        </div>
      </div>
    </section>
  );
} 