"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

type LogoVariant = "icon-only" | "icon2" | "full" | "stacked" | "horizontal" | "three-line";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  linkClassName?: string;
  href?: string;
  showPrefix?: boolean;
  disableLink?: boolean;
}

export function Logo({
  variant = "full",
  className,
  linkClassName,
  href = "/",
  showPrefix = true,
  disableLink = false,
}: LogoProps) {
  // Define responsive sizes based on variant
  const iconSize = 
    variant === "stacked" ? "w-14 h-14" : 
    variant === "icon-only" ? "w-8 h-8" : 
    variant === "icon2" ? "w-6 h-6" : 
    "w-10 h-10";
    
  const symbolSize = 
    variant === "stacked" ? "text-4xl" : 
    variant === "icon-only" ? "text-2xl" : 
    variant === "icon2" ? "text-base" : 
    "text-2xl";
  
  const theStyling = "text-xs font-semibold leading-none text-amber-500 tracking-wide";
  const bitcoinStyling = "text-2xl font-bold leading-none text-amber-500 tracking-tight";
  const insuranceStyling = "text-base font-medium leading-none text-amber-500 tracking-tight";
  const companyStyling = "text-sm font-medium leading-none text-amber-500";
  
  const logoContent = (
    <div className={cn("flex items-center", className)}>
      {/* Shield with Bitcoin logo */}
      <div className={cn(
        "relative flex items-center justify-center", 
        variant === "icon2" ? "text-current" : "text-amber-500"
      )}>
        <Shield 
          strokeWidth={variant === "icon2" ? 1.75 : 2}
          className={cn(
            "transition-transform", 
            iconSize,
            variant === "icon-only" && "text-amber-500"
          )} 
          fill="transparent"
        />
        
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          variant === "icon-only" && "transform translate-y-[1px]",
          variant === "icon2" && "transform translate-y-[0.5px]"
        )}>
          <span className={cn(
            "font-bold",
            symbolSize,
            variant === "icon-only" && "text-amber-500 text-[1.35rem] transform translate-y-[0.5px]",
            variant === "icon2" && "transform translate-y-[0px]"
          )}>
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
  );
  
  // If disableLink is true, just return the logo content without wrapping it in a Link
  if (disableLink) {
    return logoContent;
  }
  
  // Otherwise, wrap in a Link as before
  return (
    <Link href={href} className={cn("flex items-center", linkClassName)}>
      {logoContent}
    </Link>
  );
}