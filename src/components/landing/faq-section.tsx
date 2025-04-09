"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LinkButton } from "@/components/ui/link-button";
import { Shield, TrendingUp } from "lucide-react";

export function FAQSection() {
  const [activeTab, setActiveTab] = useState<'protection' | 'income' | 'common'>('protection');
  
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight uppercase">
            Questions About Bitcoin Protection & Income?
          </h2>
        </div>
        
        {/* Tab Selection */}
        <div className="flex justify-center mb-10 border-b">
          <button
            className={`flex items-center py-3 px-5 border-b-2 ${
              activeTab === 'protection' 
                ? 'border-primary text-primary font-medium' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('protection')}
          >
            <Shield size={16} className="mr-2" />
            Protection FAQs
          </button>
          
          <button
            className={`flex items-center py-3 px-5 border-b-2 ${
              activeTab === 'income' 
                ? 'border-amber-500 text-amber-500 font-medium' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('income')}
          >
            <TrendingUp size={16} className="mr-2" />
            Income FAQs
          </button>
          
          <button
            className={`flex items-center py-3 px-5 border-b-2 ${
              activeTab === 'common' 
                ? 'border-gray-500 text-gray-700 dark:text-gray-300 font-medium' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('common')}
          >
            Common Questions
          </button>
        </div>
        
        {/* Protection FAQs */}
        {activeTab === 'protection' && (
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="protection-1" className="border rounded-lg px-6 bg-card shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-medium">
                How much does Bitcoin protection cost?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Protection premiums typically range from 5-15% of the protected amount, depending on your selected protection level, current market conditions, and coverage period. Our platform dynamically displays the best available rates in real-time.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="protection-2" className="border rounded-lg px-6 bg-card shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-medium">
                What happens if Bitcoin price falls below my protected value?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can exercise your protection at any time before expiration, guaranteeing your ability to sell at your protected price regardless of how low the market has fallen.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="protection-3" className="border rounded-lg px-6 bg-card shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-medium">
                Can I protect only a portion of my Bitcoin holdings?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutely. You can create multiple protection policies for different amounts, at different protected values, and with different expiration dates - giving you complete flexibility.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        
        {/* Income FAQs */}
        {activeTab === 'income' && (
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="income-1" className="border rounded-lg px-6 bg-card shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-medium">
                How much collateral do I need to provide protection?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Protection providers must fully collateralize their positions to ensure platform security. For PUT protection, this means having sufficient STX to purchase the covered Bitcoin at the protected price.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="income-2" className="border rounded-lg px-6 bg-card shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-medium">
                What determines the premium income I can earn?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Premiums are determined by market forces including volatility expectations, protection period length, and the difference between current price and protected price. Our interface suggests optimal parameters to maximize your yield.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="income-3" className="border rounded-lg px-6 bg-card shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-medium">
                What happens if Bitcoin price crashes while I&apos;m providing protection?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                If a protection buyer exercises their policy, you&apos;ll be obligated to fulfill the contract terms by purchasing their Bitcoin at the protected price. This is factored into your displayed risk metrics.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        
        {/* Common FAQs */}
        {activeTab === 'common' && (
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="common-1" className="border rounded-lg px-6 bg-card shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-medium">
                Is BitHedge fully non-custodial?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. BitHedge never takes custody of your assets. All transactions occur directly through Stacks smart contracts, with assets remaining in your control at all times.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="common-2" className="border rounded-lg px-6 bg-card shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-medium">
                How is BitHedge different from centralized options platforms?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Unlike centralized alternatives, BitHedge requires no KYC, operates entirely on-chain, provides full transparency, and is secured by Bitcoin&apos;s unmatched security model.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="common-3" className="border rounded-lg px-6 bg-card shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-medium">
                How do I get started with BitHedge?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Getting started is easy! Connect your Stacks wallet (like Hiro Wallet) to the platform, then choose whether you want to seek protection for your Bitcoin or provide protection to earn income. Our guided interface will walk you through the rest of the process.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        
        <div className="mt-8 text-center">
          <LinkButton 
            href="/faqs" 
            variant="outline"
            className="mx-auto"
          >
            View all FAQs
          </LinkButton>
        </div>
      </div>
    </section>
  );
} 