"use client";

import { useState, useEffect } from "react";
// Removed router imports
// import { usePathname, useRouter, useSearchParams } from "next/navigation"; 
import {
  ValueProposition,
  HowItWorks,
  EducationalSection,
  FAQSection
} from "@/components/landing";
import { LandingFooter } from "@/components/shared/landing-footer";
import { LandingHeader } from "@/components/shared/landing-header";
import { Persona } from "@/components/landing/old/hero"; 
import { CTA } from "@/components/landing/cta";
import { Hero47 } from "@/components/landing/hero47";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp } from "lucide-react";

export default function Landing() {
  // Removed router hooks
  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  // Simple state initialization
  const [activePersona, setActivePersona] = useState<Persona>("protection");

  // Removed effect that reads URL params
  // useEffect(() => {
  //   const currentParamPersona = searchParams.get('persona');
  //   const currentPersona = currentParamPersona === 'income' ? 'income' : 'protection';
  //   if (currentPersona !== activePersona) {
  //     setActivePersona(currentPersona);
  //   }
  // }, [searchParams, activePersona]);

  // Log the state whenever it changes
  useEffect(() => {
    console.log(`[Page] Active Persona state changed to: ${activePersona}`);
  }, [activePersona]);

  // Debug handler - add more logging
  const handlePersonaChange = (persona: Persona) => {
    console.log(`[Page] handlePersonaChange called with: ${persona}`);
    
    // Log before state update
    console.log(`[Page] Current activePersona before update: ${activePersona}`);
    
    setActivePersona(persona);
    
    // Log that we attempted to update state
    console.log(`[Page] State update attempted: setActivePersona(${persona})`);
  };
  
  // Log on render
  console.log(`[Page] Rendering with activePersona: ${activePersona}`);
  
  return (
    <div className="flex flex-col w-full">
      {/* Sticky mobile persona switcher - only visible on small screens */}
      <div className="sm:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="flex bg-muted rounded-full p-1 shadow-md border border-muted/50 pointer-events-auto">
          <Button 
            variant={activePersona === "protection" ? "default" : "ghost"}
            size="sm"
            className={`rounded-full flex items-center gap-2 px-4 py-2 transition-all ${
              activePersona === "protection" ? 
                "shadow-sm bg-primary text-white" : 
                "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => handlePersonaChange("protection")}
          >
            <Shield className="h-4 w-4" />
            <span className="font-medium">PROTECT</span>
          </Button>
          <Button 
            variant={activePersona === "income" ? "default" : "ghost"}
            size="sm"
            className={`rounded-full flex items-center gap-2 px-4 py-2 transition-all ${
              activePersona === "income" ? 
                "shadow-sm bg-amber-500 text-white hover:bg-amber-500" : 
                "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => handlePersonaChange("income")}
          >
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">EARN</span>
          </Button>
        </div>
      </div>
    
      {/* Pass the handler to LandingHeader with enhanced persona switching */}
      <LandingHeader 
        key="header" 
        activePersona={activePersona} 
        setActivePersona={handlePersonaChange} 
      />
      
      {/* Reimagined Hero Section */}
      <Hero47 
        key={`hero-${activePersona}`} 
        activePersona={activePersona}
      /> 
      
      {/* Value Proposition with benefit-focused feature descriptions */}
      <ValueProposition 
        key={`vp-${activePersona}`} 
        activePersona={activePersona} 
      />
      
      {/* Comprehensive "How It Works" Section */}
      <HowItWorks 
        key={`how-${activePersona}`} 
        activePersona={activePersona} 
      />
      
      {/* Educational Content with Progressive Disclosure */}
      <EducationalSection 
        key={`edu-${activePersona}`} 
        activePersona={activePersona} 
      />
      
      {/* FAQ Section with Smart Category Filters */}
      <FAQSection 
        key={`faq-${activePersona}`} 
        activePersona={activePersona} 
      />
      
      {/* Transparent Call-to-Action Section */}
      <CTA 
        key={`cta-${activePersona}`} 
        activePersona={activePersona} 
      />
      
      <div className="container max-w-6xl mx-auto px-0 sm:px-6 lg:px-8 mb-8 mt-auto pt-0">
        <LandingFooter />
      </div>
    </div>
  );
} 