"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LinkButton } from "@/components/ui/link-button";
import { Shield, TrendingUp, ChevronDown } from "lucide-react";
import { Persona } from "./hero";

interface FAQSectionProps {
  activePersona: Persona;
}

export function FAQSection({ activePersona }: FAQSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(activePersona);
  
  useEffect(() => {
    if (activeTab !== 'common') {
      setActiveTab(activePersona);
    }
  }, [activePersona, activeTab]);
  
  const protectionFAQs = [
    { question: "How much does Bitcoin protection cost?", answer: "Protection premiums typically range from 5-15% of the protected amount, depending on your selected protection level, current market conditions, and coverage period. Our platform dynamically displays the best available rates in real-time." },
    { question: "What happens if Bitcoin price falls below my protected value?", answer: "You can exercise your protection at any time before expiration, guaranteeing your ability to sell at your protected price regardless of how low the market has fallen." },
    { question: "Can I protect only a portion of my Bitcoin holdings?", answer: "Absolutely. You can create multiple protection policies for different amounts, at different protected values, and with different expiration dates - giving you complete flexibility." }
  ];
  
  const incomeFAQs = [
    { question: "How much collateral do I need to provide protection?", answer: "Protection providers must fully collateralize their positions to ensure platform security. For PUT protection, this means having sufficient STX to purchase the covered Bitcoin at the protected price." },
    { question: "What determines the premium income I can earn?", answer: "Premiums are determined by market forces including volatility expectations, protection period length, and the difference between current price and protected price. Our interface suggests optimal parameters to maximize your yield." },
    { question: "What happens if Bitcoin price crashes while I&apos;m providing protection?", answer: "If a protection buyer exercises their policy, you&apos;ll be obligated to fulfill the contract terms by purchasing their Bitcoin at the protected price. This is factored into your displayed risk metrics." }
  ];
  
  const commonFAQs = [
    { question: "Is BitHedge fully non-custodial?", answer: "Yes. BitHedge never takes custody of your assets. All transactions occur directly through Stacks smart contracts, with assets remaining in your control at all times." },
    { question: "How is BitHedge different from centralized options platforms?", answer: "Unlike centralized alternatives, BitHedge requires no KYC, operates entirely on-chain, provides full transparency, and is secured by Bitcoin&apos;s unmatched security model." },
    { question: "How do I get started with BitHedge?", answer: "Getting started is easy! Connect your Stacks wallet (like Hiro Wallet) to the platform, then choose whether you want to seek protection for your Bitcoin or provide protection to earn income. Our guided interface will walk you through the rest of the process." }
  ];
  
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Questions About Bitcoin Protection & Income?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to the most common questions about BitHedge
          </p>
        </div>
        
        <Tabs 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-8"
        >
          <div className="flex justify-center mb-10">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-full bg-muted p-1 text-muted-foreground border shadow-sm">
              <TabsTrigger 
                value="protection"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm gap-2"
              >
                <Shield size={16} />
                Protection
              </TabsTrigger>
              <TabsTrigger 
                value="income"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-sm gap-2"
              >
                <TrendingUp size={16} />
                Income
              </TabsTrigger>
              <TabsTrigger 
                value="common"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-2"
              >
                Common
              </TabsTrigger>
            </TabsList>
        </div>
        
          <TabsContent key="protection" value="protection" className="mt-0">
            <div> 
              <Accordion type="single" collapsible className="w-full space-y-4">
                {protectionFAQs.map((faq, idx) => (
                   <AccordionItem key={`p-${idx}`} value={`p-${idx}`} className="border rounded-lg px-6 bg-card shadow-sm">
                     <AccordionTrigger className="text-base md:text-lg font-medium text-left hover:no-underline">
                       {faq.question}
                     </AccordionTrigger>
                     <AccordionContent className="text-muted-foreground">
                       {faq.answer}
                     </AccordionContent>
                   </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent key="income" value="income" className="mt-0">
             <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                 {incomeFAQs.map((faq, idx) => (
                   <AccordionItem key={`i-${idx}`} value={`i-${idx}`} className="border rounded-lg px-6 bg-card shadow-sm">
                     <AccordionTrigger className="text-base md:text-lg font-medium text-left hover:no-underline">
                       {faq.question}
                     </AccordionTrigger>
                     <AccordionContent className="text-muted-foreground">
                       {faq.answer}
                     </AccordionContent>
                   </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent key="common" value="common" className="mt-0">
             <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                 {commonFAQs.map((faq, idx) => (
                   <AccordionItem key={`c-${idx}`} value={`c-${idx}`} className="border rounded-lg px-6 bg-card shadow-sm">
                     <AccordionTrigger className="text-base md:text-lg font-medium text-left hover:no-underline">
                       {faq.question}
                     </AccordionTrigger>
                     <AccordionContent className="text-muted-foreground">
                       {faq.answer}
                     </AccordionContent>
                   </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
          <LinkButton 
            href="/faqs" 
            variant="outline"
            className="mx-auto group"
          >
            View all FAQs
            <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
          </LinkButton>
        </div>
      </div>
    </section>
  );
} 