"use client";

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:60px_60px] opacity-50 dark:bg-grid-white/[0.05]" />
      <div className="absolute -top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute -bottom-1/4 left-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col space-y-8">
            <div className="space-y-5">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                  Hedge
                </span>{" "}
                your Bitcoin holdings with options
              </h1>
              <p className="max-w-[600px] text-lg md:text-xl text-muted-foreground">
                BitHedge makes it simple to protect your Bitcoin against downside risk. Create option contracts with ease and safeguard your assets.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/home"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Learn How It Works
              </Link>
            </div>
          </div>
          
          <div className="relative mx-auto w-full max-w-[500px] lg:mx-0">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/30 p-4 shadow-xl">
              <div className="flex h-full items-center justify-center rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                <p className="text-center text-muted-foreground px-8">
                  Interactive visualization or product demo will be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 