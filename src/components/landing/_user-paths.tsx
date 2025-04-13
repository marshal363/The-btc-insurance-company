"use client";

import Link from "next/link";
import { Shield, TrendingUp, LockKeyhole, Settings, ChevronRight } from "lucide-react";
import { Persona } from "./old/hero";

interface StrategyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  persona: 'protection' | 'income';
}

function StrategyCard({ title, description, icon, persona }: StrategyCardProps) {
  const bgClass = persona === 'protection'
    ? 'border-blue-200 dark:border-blue-800'
    : 'border-amber-200 dark:border-amber-800';
  
  const iconBgClass = persona === 'protection'
    ? 'bg-blue-100 dark:bg-blue-900/50 text-primary'
    : 'bg-amber-100 dark:bg-amber-900/50 text-amber-500';
  
  return (
    <div className={`bg-card rounded-lg p-5 border ${bgClass} shadow-sm h-full`}>
      <div className={`w-10 h-10 rounded-full ${iconBgClass} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

interface UserPathsProps {
  activePersona?: Persona;
}

export function UserPaths({ activePersona = "protection" }: UserPathsProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight uppercase">
            Your Path to Bitcoin Confidence
          </h2>
        </div>
        
        {/* Protection Path */}
        {(activePersona === "protection") && (
          <div className="grid grid-cols-1 md:grid-cols-1 max-w-2xl mx-auto gap-8 md:gap-16 mb-16">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">For Bitcoin Holders</h3>
              </div>
              
              <p className="text-muted-foreground mb-8">
                Whether you&apos;re protecting your long-term holdings or managing short-term volatility, 
                The Bitcoin Insurance Company adapts to your protection needs.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-8">
                <StrategyCard
                  title="Entry Protection"
                  description="Perfect for new Bitcoin buyers wanting to limit initial downside"
                  icon={<Shield size={18} />}
                  persona="protection"
                />
                <StrategyCard
                  title="HODL Protection"
                  description="Ideal for long-term holders seeking peace of mind during volatility"
                  icon={<LockKeyhole size={18} />}
                  persona="protection"
                />
                <StrategyCard
                  title="Strategic Protection"
                  description="For active traders managing position risk"
                  icon={<Settings size={18} />}
                  persona="protection"
                />
              </div>
              
              <Link
                href="/protection"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
              >
                Start Protection Journey
                <ChevronRight className="ml-1" size={16} />
              </Link>
            </div>
          </div>
        )}
        
        {/* Income Path */}
        {(activePersona === "income") && (
          <div className="grid grid-cols-1 md:grid-cols-1 max-w-2xl mx-auto gap-8 md:gap-16 mb-16">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-4">
                  <TrendingUp className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold">For Yield Seekers</h3>
              </div>
              
              <p className="text-muted-foreground mb-8">
                The Bitcoin Insurance Company offers multiple strategies for generating income based on your risk 
                preference and market outlook.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-8">
                <StrategyCard
                  title="Conservative Income"
                  description="Lower premiums but minimal risk exposure"
                  icon={<Shield size={18} />}
                  persona="income"
                />
                <StrategyCard
                  title="Balanced Returns"
                  description="Moderate premiums with calculated risk parameters"
                  icon={<TrendingUp size={18} />}
                  persona="income"
                />
                <StrategyCard
                  title="Yield Maximizer"
                  description="Higher premiums with greater potential obligations"
                  icon={<Settings size={18} />}
                  persona="income"
                />
              </div>
              
              <Link
                href="/income"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-amber-500 text-white hover:bg-amber-600 h-10 px-6 py-2"
              >
                Start Income Journey
                <ChevronRight className="ml-1" size={16} />
              </Link>
            </div>
          </div>
        )}
        
        {/* Visualization */}
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <div className="aspect-[21/9] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Path selection visualization and journey map</p>
          </div>
        </div>
      </div>
    </section>
  );
} 