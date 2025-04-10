"use client";

import Link from "next/link";
import { Shield, TrendingUp, ArrowRight, ArrowDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Persona } from "./hero";

interface StepProps {
  number: number;
  title: string;
  description: string;
  persona: 'protection' | 'income';
}

function Step({ number, title, description, persona }: StepProps) {
  const colorScheme = persona === 'protection'
    ? {
        bg: 'bg-blue-50/80 dark:bg-blue-950/20',
        border: 'border-blue-200 dark:border-blue-800/60',
        accent: 'bg-primary text-primary-foreground',
        hover: 'hover:border-blue-300 dark:hover:border-blue-700'
      }
    : {
        bg: 'bg-amber-50/80 dark:bg-amber-950/20',
        border: 'border-amber-200 dark:border-amber-800/60',
        accent: 'bg-amber-500 text-white',
        hover: 'hover:border-amber-300 dark:hover:border-amber-700'
      };
  
  return (
    <div className={`rounded-xl p-5 md:p-6 border ${colorScheme.border} ${colorScheme.bg} text-card-foreground shadow-sm w-full flex flex-col transition-all duration-200 ${colorScheme.hover} hover:shadow-md`}>
      <div className={`${colorScheme.accent} w-9 h-9 rounded-full flex items-center justify-center mb-4 text-lg font-semibold`}>
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

function ConnectorLine({ direction = 'down', type = 'protection' }: { direction?: 'down' | 'up' | 'right'; type?: 'protection' | 'income' }) {
  const colorClass = type === 'protection' ? 'text-primary/60' : 'text-amber-500/60';
  
  if (direction === 'right') {
    return (
      <div className="hidden md:flex items-center justify-center h-full">
        <div className={`w-12 border-t-2 ${type === 'protection' ? 'border-primary/30' : 'border-amber-500/30'}`}></div>
        <ChevronRight className={colorClass} size={18} />
      </div>
    );
  }
  
  return (
    <div className="flex justify-center py-3">
      <div className={`h-8 border-l-2 ${type === 'protection' ? 'border-primary/30' : 'border-amber-500/30'}`}></div>
      <ArrowDown className={colorClass} size={18} />
    </div>
  );
}

interface HowItWorksProps {
  activePersona: Persona;
}

export function HowItWorks({ activePersona }: HowItWorksProps) {
  return (
    <section className="py-16 md:py-24 w-full bg-gray-50/80 dark:bg-gray-900/20" id="how-it-works">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Two Sides, One Seamless Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Watch how protection needs and income generation perfectly balance in our ecosystem
          </p>
        </div>
        
        {/* Journey Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mb-8">
          <div className="flex items-center p-4 bg-blue-50/80 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800/60 mb-6 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-3">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Protection Journey</h3>
          </div>
          
          <div className="flex items-center p-4 bg-amber-50/80 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800/60">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mr-3">
              <TrendingUp className="h-5 w-5 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold">Income Journey</h3>
          </div>
        </div>
        
        {/* Step 1 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2">
          <div className="md:col-span-2">
            <Step
              number={1}
              title="Select Protection Amount"
              description="Choose how much of your Bitcoin you want to protect and at what value."
              persona="protection"
            />
          </div>
          
          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            <div className="relative w-full h-[90px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90%] border-t-2 border-dashed border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gray-50/80 dark:bg-gray-900/20 p-2 rounded-full border border-gray-200 dark:border-gray-800 z-10">
                  <ArrowRight className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
          <Step 
            number={1}
              title="Offer Protection Capacity"
              description="Decide how much protection you're willing to provide and at what rates."
              persona="income"
            />
          </div>
        </div>
        
        {/* Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-1">
          <div className="md:col-span-2 flex justify-center">
            <ConnectorLine type="protection" />
          </div>
          <div className="md:col-span-1"></div>
          <div className="md:col-span-2 flex justify-center">
            <ConnectorLine type="income" />
          </div>
        </div>
        
        {/* Step 2 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2">
          <div className="md:col-span-2">
            <Step
              number={2}
              title="Customize Your Coverage"
              description="Select your protection period and coverage level based on your risk tolerance."
              persona="protection"
            />
          </div>
          
          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            <div className="relative w-full h-[90px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90%] border-t-2 border-dashed border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gray-50/80 dark:bg-gray-900/20 p-2 rounded-full border border-gray-200 dark:border-gray-800 z-10">
                  <ArrowRight className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
          <Step 
            number={2}
              title="Set Your Terms"
              description="Specify your premium requirements and protection periods to match your strategy."
              persona="income"
            />
          </div>
        </div>
        
        {/* Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-1">
          <div className="md:col-span-2 flex justify-center">
            <ConnectorLine type="protection" />
          </div>
          <div className="md:col-span-1"></div>
          <div className="md:col-span-2 flex justify-center">
            <ConnectorLine type="income" />
          </div>
        </div>
        
        {/* Step 3 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2">
          <div className="md:col-span-2">
            <Step
              number={3}
              title="Secure Instant Protection"
              description="Pay a one-time premium and immediately activate your Bitcoin protection policy."
              persona="protection"
            />
          </div>
          
          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            <div className="relative w-full h-[90px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90%] border-t-2 border-dashed border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gray-50/80 dark:bg-gray-900/20 p-2 rounded-full border border-gray-200 dark:border-gray-800 z-10">
                  <ArrowRight className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
          <Step 
            number={3}
              title="Collect Premiums Instantly"
              description="Receive premium payments immediately when protection buyers select your offerings."
              persona="income"
            />
          </div>
        </div>
        
        {/* Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-1">
          <div className="md:col-span-2 flex justify-center">
            <ConnectorLine type="protection" />
          </div>
          <div className="md:col-span-1"></div>
          <div className="md:col-span-2 flex justify-center">
            <ConnectorLine type="income" />
          </div>
        </div>
        
        {/* Step 4 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="md:col-span-2">
            <Step
              number={4}
              title="Claim If Needed, Or Let Expire"
              description="If prices fall below your protected value, exercise your protection. If not, simply let it expire."
              persona="protection"
            />
          </div>
          
          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            <div className="relative w-full h-[90px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90%] border-t-2 border-dashed border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gray-50/80 dark:bg-gray-900/20 p-2 rounded-full border border-gray-200 dark:border-gray-800 z-10">
                  <ArrowRight className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Step
              number={4}
              title="Fulfill Or Release"
              description="If protection is claimed, fulfill your obligation. Otherwise, release your collateral automatically."
              persona="income"
            />
          </div>
        </div>
        
        {/* Connection visualization */}
        <div className="mt-10 bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
          <h3 className="text-lg font-semibold mb-4">How Protection and Income Connect</h3>
          <div className="h-64 bg-gray-100/80 dark:bg-gray-700/40 rounded-lg flex items-center justify-center p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center w-full max-w-3xl">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
                <Shield className="h-10 w-10 mx-auto mb-2 text-primary" />
                <p className="font-medium">Protection Buyer</p>
                <p className="text-xs text-muted-foreground mt-1">Secures value against downside</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 w-full mb-2"></div>
                <div className="bg-gray-200 dark:bg-gray-800 px-3 py-1.5 rounded-full text-xs font-medium">
                  Premium Payment
                </div>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 w-full mt-2"></div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 text-center">
                <TrendingUp className="h-10 w-10 mx-auto mb-2 text-amber-500" />
                <p className="font-medium">Protection Provider</p>
                <p className="text-xs text-muted-foreground mt-1">Collects premiums for income</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          <Button
            asChild
            className="h-11 px-8 font-medium"
          >
            <Link href="/home">
              Experience The Platform
          </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 