"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Persona } from "@/components/landing/old/hero";
import { Logo } from "./Logo";

interface LandingHeaderProps {
  className?: string;
  activePersona: Persona;
  setActivePersona: (persona: Persona) => void;
}

export const LandingHeader = ({ className, activePersona, setActivePersona }: LandingHeaderProps) => {
  // Log when the component mounts or unmounts
  useEffect(() => {
    console.log("[LandingHeader] Mounted with activePersona:", activePersona);
    return () => {
      console.log("[LandingHeader] Unmounted");
    };
  }, [activePersona]);

  // Add handlers with extra logging
  const handleProtectionClick = () => {
    console.log("[LandingHeader] Protection button clicked");
    setActivePersona("protection");
    console.log("[LandingHeader] Called setActivePersona('protection')");
  };

  const handleIncomeClick = () => {
    console.log("[LandingHeader] Income button clicked");
    setActivePersona("income");
    console.log("[LandingHeader] Called setActivePersona('income')");
  };

  // Log on each render
  console.log("[LandingHeader] Rendering with activePersona:", activePersona);

  return (
    <header
      data-component="landing-header"
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center py-2">
          <Logo 
            variant="three-line" 
            className="text-orange-600" 
            showPrefix={true}
          />
        </div>
        
        {/* Centered persona switcher - hidden on very small screens */}
        <div className="hidden sm:flex items-center justify-center flex-grow max-w-md mx-auto">
          <div className="flex bg-muted rounded-full p-1 shadow-sm border border-muted/50">
            <Button 
              variant={activePersona === "protection" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "rounded-full flex items-center gap-2 px-4 transition-all", 
                activePersona === "protection" ? 
                  "shadow-sm bg-primary text-white" : 
                  "text-muted-foreground hover:text-foreground"
              )}
              onClick={handleProtectionClick}
            >
              <Shield className="h-4 w-4" />
              <span className="font-medium">PROTECT</span>
            </Button>
            <Button 
              variant={activePersona === "income" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "rounded-full flex items-center gap-2 px-4 transition-all",
                activePersona === "income" ? 
                  "shadow-sm bg-amber-500 text-white hover:bg-amber-500" : 
                  "text-muted-foreground hover:text-foreground"
              )}
              onClick={handleIncomeClick}
            >
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">EARN</span>
            </Button>
          </div>
        </div>
        
        {/* Mobile-optimized right section with condensed price info and buttons */}
        <div className="flex items-center">
          <Link
            href="/home"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 md:h-11 px-5 md:px-6 py-2 shadow-sm"
          >
            Launch
          </Link>
        </div>
      </div>
    </header>
  );
}; 