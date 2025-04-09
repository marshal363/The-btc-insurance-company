"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface LandingHeaderProps {
  className?: string;
}

export const LandingHeader = ({ className }: LandingHeaderProps) => {
  useEffect(() => {
    console.log("LandingHeader mounted");
    return () => {
      console.log("LandingHeader unmounted");
    };
  }, []);

  return (
    <header
      data-component="landing-header"
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">BitHedge</span>
          </Link>
        </div>
        
        <div>
          <Link
            href="/home"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 md:h-11 px-4 md:px-6 py-2"
          >
            Launch App
          </Link>
        </div>
      </div>
    </header>
  );
}; 