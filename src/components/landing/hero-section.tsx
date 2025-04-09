"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Shield, TrendingUp } from 'lucide-react';

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<'protection' | 'income'>('protection');
  
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:60px_60px] opacity-50 dark:bg-grid-white/[0.05]" />
      <div className="absolute -top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute -bottom-1/4 left-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        {/* Main headline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Bitcoin <span className="text-primary">Protection</span> or Bitcoin <span className="text-amber-500">Income</span>?
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            The first decentralized platform where Bitcoin holders secure their value and STX holders earn premium income - all without surrendering custody
          </p>
        </div>
        
        {/* Mobile tab selector (visible on small screens) */}
        <div className="flex md:hidden mb-8 border rounded-lg overflow-hidden shadow-sm">
          <button 
            className={`flex-1 py-4 font-medium text-sm ${activeTab === 'protection' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}
            onClick={() => setActiveTab('protection')}
          >
            <Shield className="h-4 w-4 mx-auto mb-1" />
            Protection
          </button>
          <button 
            className={`flex-1 py-4 font-medium text-sm ${activeTab === 'income' ? 'bg-amber-500 text-white' : 'bg-card'}`}
            onClick={() => setActiveTab('income')}
          >
            <TrendingUp className="h-4 w-4 mx-auto mb-1" />
            Income
          </button>
        </div>
        
        {/* Split screen layout (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Protection side (Protective Peter) */}
          <div className={`flex flex-col space-y-6 p-8 rounded-xl border ${activeTab === 'protection' || !activeTab ? 'block' : 'hidden md:block'} bg-gradient-to-br from-blue-50/70 to-blue-100/70 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800/60`}>
            <div className="mb-2 p-3 w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            
            <h2 className="text-2xl font-bold">
              Protect Your Bitcoin<br />From Market Volatility
            </h2>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">→</span>
                <span>Lock in a selling price regardless of market crashes</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">→</span>
                <span>Pay once, stay protected for weeks</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">→</span>
                <span>Never lose more than your premium</span>
              </li>
            </ul>
            
            <div className="mt-auto pt-4">
              <Link
                href="/protection"
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Protection
              </Link>
            </div>
          </div>
          
          {/* Income side (Income Irene) */}
          <div className={`flex flex-col space-y-6 p-8 rounded-xl border ${activeTab === 'income' ? 'block' : 'hidden md:block'} bg-gradient-to-br from-amber-50/70 to-amber-100/70 dark:from-amber-950/20 dark:to-amber-900/20 border-amber-200 dark:border-amber-800/60`}>
            <div className="mb-2 p-3 w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <TrendingUp className="h-7 w-7 text-amber-500" />
            </div>
            
            <h2 className="text-2xl font-bold">
              Earn Premium Income<br />Providing Bitcoin Protection
            </h2>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">→</span>
                <span>Generate up to 25% APY by providing coverage</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">→</span>
                <span>Collect premiums upfront immediately</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">→</span>
                <span>Set your own terms and risk parameters</span>
              </li>
            </ul>
            
            <div className="mt-auto pt-4">
              <Link
                href="/income"
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-amber-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Earn Income
              </Link>
            </div>
          </div>
        </div>
        
        {/* Unified CTA button */}
        <div className="mt-12 text-center">
          <Link
            href="/home"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-12 text-base font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Secure Your Position
          </Link>
        </div>
      </div>
    </section>
  );
} 