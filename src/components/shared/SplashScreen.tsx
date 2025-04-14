"use client";

import React from "react";
import { Shield } from "lucide-react";

export function SplashScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      {/* Centered Logo for Favicon */}
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center mb-8">
          {/* Shield Icon - Proportionally sized for favicon */}
          <Shield 
            strokeWidth={2.5}
            className="w-32 h-32 text-amber-500"
            fill="transparent"
          />
          
          {/* Perfectly centered Bitcoin symbol */}
          <div className="absolute inset-0 flex items-center justify-center transform translate-y-[1px]">
            <span className="text-[2.75rem] text-amber-500 font-bold transform translate-y-[1px]">
              ₿
            </span>
          </div>
        </div>
        
        <h1 className="text-xl font-semibold text-amber-500 tracking-wide text-center">
          THE BITCOIN INSURANCE COMPANY
        </h1>
        
        <p className="text-sm text-slate-500 mt-8 text-center">
          Loading your protection...
        </p>
      </div>
    </div>
  );
} 