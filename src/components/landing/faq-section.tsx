"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LinkButton } from "@/components/ui/link-button";
import { Shield, TrendingUp, ChevronDown, CircleHelp } from "lucide-react";
import { Persona } from "./old/hero";

interface FAQSectionProps {
  activePersona: Persona;
}

export function FAQSection({ activePersona }: FAQSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(activePersona);
  
  useEffect(() => {
    if (activeTab !== 'all') {
      setActiveTab(activePersona);
    }
  }, [activePersona, activeTab]);
  
  const protectionFAQs = [
    { 
      question: "How much does a Bitcoin insurance policy cost?", 
      answer: "Policy costs vary based on your coverage level, duration, and market conditions. Our transparent pricing shows you the exact premium before you commit. Typical premiums range from 5-15% of the protected amount, depending on the level of protection you choose." 
    },
    { 
      question: "What happens if Bitcoin price falls below my protected value?", 
      answer: "You can exercise your protection at any time before expiration, guaranteeing your ability to sell at your protected price regardless of how low the market has fallen. Our system will notify you when your protection can be activated, making it simple to secure your value." 
    },
    { 
      question: "Can I protect only a portion of my Bitcoin holdings?", 
      answer: "Absolutely. You can create multiple protection policies for different amounts, at different protected values, and with different expiration dates - giving you complete flexibility to create a personalized protection strategy." 
    }
  ];
  
  const incomeFAQs = [
    { 
      question: "How much collateral do I need to provide protection?", 
      answer: "Protection providers must fully collateralize their positions to ensure platform security. For PUT protection, this means having sufficient STX to purchase the covered Bitcoin at the protected price. Our interface clearly shows the required collateral for each strategy before you commit." 
    },
    { 
      question: "What determines the premium income I can earn?", 
      answer: "Premiums are determined by market forces including volatility expectations, protection period length, and the difference between current price and protected price. Our interface suggests optimal parameters to maximize your yield while showing the associated risk metrics for each strategy." 
    },
    { 
      question: "What happens if Bitcoin price crashes while I'm providing protection?", 
      answer: "As a policy provider, you're obligated to fulfill claims if Bitcoin falls below the levels you've agreed to cover. This means purchasing the protected Bitcoin at the strike price, regardless of how low the market has dropped. This obligation is factored into your displayed risk metrics and requires sufficient collateral." 
    }
  ];
  
  const technicalFAQs = [
    { 
      question: "How is The Bitcoin Insurance Company different from centralized options?", 
      answer: "Our platform utilizes smart contracts on Stacks, allowing income providers to lock collateral in non-custodial contracts while policy buyers maintain control of their assets. Unlike centralized platforms, we require no KYC, operate entirely on-chain with full transparency, and are secured by Bitcoin's unmatched security model." 
    },
    { 
      question: "How do the smart contracts work?", 
      answer: "Our contracts are built on the Stacks blockchain, which inherits security from Bitcoin. They implement a fully-collateralized options protocol where premiums are paid upfront and collateral is locked until expiration or exercise. The contracts handle price verification, settlement, and automated execution when policies are exercised." 
    },
    { 
      question: "Is there a risk of smart contract vulnerabilities?", 
      answer: "All our smart contracts undergo rigorous security auditing before deployment. However, as with any blockchain protocol, we recommend users start with smaller amounts while familiarizing themselves with the system. We also maintain a bug bounty program to incentivize responsible disclosure of any potential vulnerabilities." 
    }
  ];
  
  const commonFAQs = [
    { 
      question: "Is BitHedge fully non-custodial?", 
      answer: "Yes. BitHedge never takes custody of your assets. All transactions occur directly through Stacks smart contracts, with assets remaining in your control at all times. This means you maintain full ownership and control of your Bitcoin and STX throughout the entire process." 
    },
    { 
      question: "How do I get started with BitHedge?", 
      answer: "Getting started is easy! Connect your Stacks wallet (like Hiro Wallet) to the platform, then choose whether you want to seek protection for your Bitcoin or provide protection to earn income. Our guided interface will walk you through the rest of the process with step-by-step instructions." 
    },
    { 
      question: "What happens if no one wants to take the other side of my transaction?", 
      answer: "BitHedge uses a matching engine to connect protection buyers with providers. If your exact parameters don't have an immediate match, you can place a pending order that will execute automatically once a match is found, or modify your parameters for immediate execution based on available liquidity." 
    }
  ];
  
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Commonly Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to the most common questions about Bitcoin protection and income
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
                value="all"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-1.5"
              >
                <CircleHelp size={16} />
                ALL
              </TabsTrigger>
              <TabsTrigger 
                value="protection"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm gap-1.5"
              >
                <Shield size={16} />
                POLICY
              </TabsTrigger>
              <TabsTrigger 
                value="income"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-sm gap-1.5"
              >
                <TrendingUp size={16} />
                INCOME
              </TabsTrigger>
            </TabsList>
          </div>
        
          <TabsContent key="all" value="all" className="mt-0">
            <div> 
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[...protectionFAQs.slice(0, 1), ...incomeFAQs.slice(0, 1), ...technicalFAQs, ...commonFAQs.slice(0, 1)].map((faq, idx) => (
                   <AccordionItem key={`all-${idx}`} value={`all-${idx}`} className="border rounded-lg px-6 bg-card shadow-sm">
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
        </Tabs>
        
        <div className="mt-10 text-center">
          <LinkButton 
            href="/faqs" 
            variant="outline"
            className="mx-auto group"
          >
            View All Questions
            <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
          </LinkButton>
        </div>
      </div>
    </section>
  );
} 