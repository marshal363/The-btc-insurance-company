"use client";

import { useState, useEffect } from "react";
// Removed router imports
// import { usePathname, useRouter, useSearchParams } from "next/navigation"; 
import {
  HeroSection,
  ValueProposition,
  HowItWorks,
  EducationalSection,
  // UserPaths, 
  // SocialProof, 
  FinalCTA,
  FAQSection
} from "@/components/landing";
import { LandingFooter } from "@/components/shared/landing-footer";
import { LandingHeader } from "@/components/shared/landing-header";
import { Persona } from "@/components/landing/hero"; 
import { CTA } from "@/components/landing/cta";

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
    
    // State won't actually be updated until next render due to React's batch updates
    // The useEffect above will log when it actually changes
  };
  
  // Log on render
  console.log(`[Page] Rendering with activePersona: ${activePersona}`);
  
  return (
    <div className="flex flex-col w-full">
      {/* Pass the handler to LandingHeader */}
      <LandingHeader 
        key="header" 
        activePersona={activePersona} 
        setActivePersona={handlePersonaChange} 
      />
      
      {/* Components with keys */}
      <HeroSection key={`hero-${activePersona}`} activePersona={activePersona} /> 
      <ValueProposition key={`vp-${activePersona}`} activePersona={activePersona} />
      <HowItWorks key={`how-${activePersona}`} activePersona={activePersona} />
      <EducationalSection key={`edu-${activePersona}`} activePersona={activePersona} />
      {/* <UserPaths key={`paths-${activePersona}`} activePersona={activePersona} /> */}
      {/* <SocialProof key={`social-${activePersona}`} activePersona={activePersona} />*/}
      <FAQSection key={`faq-${activePersona}`} activePersona={activePersona} />
      <CTA key={`cta-${activePersona}`} activePersona={activePersona} />
      <div className="container max-w-6xl mx-auto px-0 sm:px-6 lg:px-8 mb-8 mt-auto pt-0">
        
        <LandingFooter />
      </div>
    </div>
  );
} 