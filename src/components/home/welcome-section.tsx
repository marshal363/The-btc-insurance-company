"use client";

import { WalletConnect } from "@/components/wallet/WalletConnect";

export function WelcomeSection() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center">
        <div className="md:flex-1 md:pr-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
            Hedge Bitcoin Volatility with sBTC Options
          </h1>
          <p className="text-slate-600 mb-6 text-lg">
            Protect your Bitcoin portfolio against price drops with decentralized options
          </p>
          
          <ul className="mb-6 space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span className="text-slate-700">No KYC required, fully decentralized</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span className="text-slate-700">Simple and transparent fees</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span className="text-slate-700">Calculate exactly how much hedging you need</span>
            </li>
          </ul>
          
          <WalletConnect 
            className="w-full md:w-auto px-8 py-6 text-base md:text-lg font-medium"
          />
        </div>
        
        <div className="hidden md:block md:flex-1 md:min-w-[300px]">
          <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50 p-4 mt-4 md:mt-0">
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
              <svg className="w-32 h-32 text-blue-500 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4L4 8L12 12L20 8L12 4Z"></path>
                <path d="M4 12L12 16L20 12"></path>
                <path d="M4 16L12 20L20 16"></path>
              </svg>
            </div>
            <div className="mt-3 text-center text-sm text-slate-500">
              Simplified preview of the BitHedge interface
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 