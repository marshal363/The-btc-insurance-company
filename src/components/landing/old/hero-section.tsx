"use client";

import Link from 'next/link';
import { Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

// Export the Persona type
export type Persona = "protection" | "income";

interface HeroSectionProps {
  activePersona: Persona;
}

export function HeroSection({ activePersona }: HeroSectionProps) {
  const isProtection = activePersona === 'protection';
  
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32 pb-8 md:pb-16">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:60px_60px] opacity-50 dark:bg-grid-white/[0.05]" />
      <div className={`absolute -top-1/4 right-0 h-[500px] w-[500px] rounded-full ${isProtection ? 'bg-primary/20' : 'bg-amber-500/20'} blur-[100px]`} />
      <div className={`absolute -bottom-1/4 left-0 h-[500px] w-[500px] rounded-full ${isProtection ? 'bg-primary/20' : 'bg-amber-500/20'} blur-[100px]`} />
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        {/* Main headline - changes based on selected persona */}
        <motion.div 
          key={activePersona}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            {isProtection ? (
              <>Protect Your Bitcoin<br />From Market Volatility</>
            ) : (
              <>Earn Premium Income<br />Providing Bitcoin Protection</>
            )}
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            {isProtection 
              ? "Secure the value of your Bitcoin portfolio against market crashes with non-custodial protection contracts"
              : "Turn your STX holdings into a yield-generating asset by providing Bitcoin protection to other users"
            }
          </p>
        </motion.div>
        
        {/* Content layout */}
        <div className="grid grid-cols-1 max-w-2xl mx-auto gap-8">
          {/* Main content for selected persona */}
          <motion.div 
            key={`main-${activePersona}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col space-y-6 p-8 rounded-xl border ${
              isProtection 
                ? 'bg-gradient-to-br from-blue-50/70 to-blue-100/70 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800/60' 
                : 'bg-gradient-to-br from-amber-50/70 to-amber-100/70 dark:from-amber-950/20 dark:to-amber-900/20 border-amber-200 dark:border-amber-800/60'
            }`}
          >
            <div className={`mb-2 p-3 w-14 h-14 rounded-full ${
              isProtection 
                ? 'bg-blue-100 dark:bg-blue-900/40' 
                : 'bg-amber-100 dark:bg-amber-900/40'
              } flex items-center justify-center`}
            >
              {isProtection ? (
                <Shield className="h-7 w-7 text-primary" />
              ) : (
                <TrendingUp className="h-7 w-7 text-amber-500" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold">
              {isProtection ? (
                <>Protect Your Bitcoin<br />From Market Volatility</>
              ) : (
                <>Earn Premium Income<br />Providing Bitcoin Protection</>
              )}
            </h2>
            
            <ul className="space-y-3">
              {isProtection ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
              )}
            </ul>
            
            <div className="mt-auto pt-4">
              <Link
                href={isProtection ? "/protection" : "/income"}
                className={`inline-flex h-11 w-full items-center justify-center rounded-md ${
                  isProtection 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'bg-amber-500 text-white hover:bg-amber-600'
                } px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
              >
                {isProtection ? 'Get Protection' : 'Earn Income'}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 