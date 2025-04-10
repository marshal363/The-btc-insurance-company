"use client";

import React from 'react';
import { Hero, Persona } from "@/components/landing/hero";
import { ValueProposition } from "@/components/landing/value-proposition";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Paths } from "@/components/landing/paths";
import { SocialProof } from "@/components/landing/social-proof";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { usePersonaState } from "@/components/landing/persona-switcher";
import { LandingHeader } from "@/components/shared/landing-header";
import { LandingFooter } from "@/components/shared/landing-footer";

export default function LandingPage() {
  const { activePersona, handlePersonaChange } = usePersonaState();

  return (
    <main className="min-h-screen flex flex-col">
      {/* Use LandingHeader, passing state and handler */}
      <LandingHeader 
        activePersona={activePersona} 
        setActivePersona={handlePersonaChange} 
      />
      
      {/* Main content */}
      <Hero activePersona={activePersona} />
      
      {/* Pass activePersona to all relevant sections */}
      <ValueProposition activePersona={activePersona} />
      <HowItWorks activePersona={activePersona} />
      <Paths activePersona={activePersona} />
      <SocialProof activePersona={activePersona} />
      <FAQ activePersona={activePersona} />
      <CTA activePersona={activePersona} />
      
      {/* Add Footer */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-auto pt-8 pb-8">
        <div className="flex justify-center items-center py-6 mb-4 border-t">
          <p className="text-center text-sm text-muted-foreground">
            100% Non-custodial · Built on Stacks · Secured by Bitcoin
          </p>
        </div>
        <LandingFooter />
      </div>
    </main>
  );
}
