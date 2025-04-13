"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

type LogoVariant = "icon-only" | "full" | "stacked" | "horizontal" | "three-line";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  linkClassName?: string;
  href?: string;
  showPrefix?: boolean;
}

export function Logo({
  variant = "full",
  className,
  linkClassName,
  href = "/",
  showPrefix = true,
}: LogoProps) {
  const iconSize = variant === "stacked" ? "w-14 h-14" : variant === "icon-only" ? "w-8 h-8" : "w-10 h-10";
  const symbolSize = variant === "stacked" ? "text-4xl" : variant === "icon-only" ? "text-2xl" : "text-2xl";
  
  const theStyling = "text-xs font-semibold leading-none text-amber-500 tracking-wide";
  const bitcoinStyling = "text-2xl font-bold leading-none text-amber-500 tracking-tight";
  const insuranceStyling = "text-base font-medium leading-none text-amber-500 tracking-tight";
  const companyStyling = "text-sm font-medium leading-none text-amber-500";
  
  return (
    <Link href={href} className={cn("flex items-center", linkClassName)}>
      <div className={cn("flex items-center", className)}>
        {/* Shield with Bitcoin logo */}
        <div className="relative flex items-center justify-center text-amber-500">
          <Shield 
            strokeWidth={2} 
            className={cn(
              "transition-transform", 
              iconSize
            )} 
            fill="transparent"
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("text-amber-500 font-bold", symbolSize)}>
              ₿
            </span>
          </div>
        </div>
        
        {variant === "three-line" && (
          <div className="ml-3 flex flex-col -space-y-0.5">
            {showPrefix && (
              <span className={theStyling}>THE</span>
            )}
            <span className={bitcoinStyling}>BITCOIN</span>
            <span className={insuranceStyling}>INSURANCE COMPANY</span>
          </div>
        )}
        
        {variant === "full" && (
          <div className="ml-3">
            {showPrefix && (
              <span className={theStyling}>THE</span>
            )}
            <div className="flex flex-col">
              <span className={bitcoinStyling}>BITCOIN</span>
              <div className="flex items-baseline">
                <span className={insuranceStyling}>INSURANCE</span>
                <span className={cn(companyStyling, "ml-1")}>COMPANY</span>
              </div>
            </div>
          </div>
        )}
        
        {variant === "horizontal" && (
          <div className="ml-3 flex items-baseline">
            {showPrefix && (
              <span className={cn(theStyling, "mr-1 self-start")}>THE</span>
            )}
            <span className={cn(bitcoinStyling, "mr-1.5")}>BITCOIN</span>
            <span className={cn(insuranceStyling, "mr-1")}>INSURANCE</span>
            <span className={companyStyling}>COMPANY</span>
          </div>
        )}
        
        {variant === "stacked" && (
          <div className="flex flex-col items-center text-center -space-y-0.5">
            {showPrefix && (
              <span className={theStyling}>THE</span>
            )}
            <span className={bitcoinStyling}>
              BITCOIN
            </span>
            <span className={insuranceStyling}>
              INSURANCE
            </span>
            <span className={companyStyling}>
              COMPANY
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}