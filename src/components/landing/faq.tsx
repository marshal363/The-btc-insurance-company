"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, TrendingUp, ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <AccordionItem value={question}>
      <AccordionTrigger className="text-left hover:no-underline py-4">
        <span>{question}</span>
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground pt-2 pb-4">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}

export function FAQ() {
  const [activeTab, setActiveTab] = useState("protection");

  const protectionFAQs = [
    {
      question: "How much does Bitcoin protection cost?",
      answer: "Protection premiums typically range from 5-15% of the protected amount, depending on your selected protection level, current market conditions, and coverage period. Our platform dynamically displays the best available rates in real-time."
    },
    {
      question: "What happens if Bitcoin price falls below my protected value?",
      answer: "You can exercise your protection at any time before expiration, guaranteeing your ability to sell at your protected price regardless of how low the market has fallen."
    },
    {
      question: "Can I protect only a portion of my Bitcoin holdings?",
      answer: "Absolutely. You can create multiple protection policies for different amounts, at different protected values, and with different expiration dates - giving you complete flexibility."
    },
    {
      question: "Do I need to send my Bitcoin to BitHedge to get protection?",
      answer: "No. BitHedge is completely non-custodial. Your Bitcoin remains in your wallet at all times, even when protected."
    }
  ];

  const incomeFAQs = [
    {
      question: "How much collateral do I need to provide protection?",
      answer: "Protection providers must fully collateralize their positions to ensure platform security. For PUT protection, this means having sufficient STX to purchase the covered Bitcoin at the protected price."
    },
    {
      question: "What determines the premium income I can earn?",
      answer: "Premiums are determined by market forces including volatility expectations, protection period length, and the difference between current price and protected price. Our interface suggests optimal parameters to maximize your yield."
    },
    {
      question: "What happens if Bitcoin price crashes while I&apos;m providing protection?",
      answer: "If a protection buyer exercises their policy, you&apos;ll be obligated to fulfill the contract terms by purchasing their Bitcoin at the protected price. This is factored into your displayed risk metrics."
    },
    {
      question: "How do I withdraw my premium income?",
      answer: "Premium income is sent directly to your wallet as soon as someone purchases the protection you're offering. It's immediately available for you to use or withdraw."
    }
  ];

  const commonFAQs = [
    {
      question: "Is BitHedge fully non-custodial?",
      answer: "Yes. BitHedge never takes custody of your assets. All transactions occur directly through Stacks smart contracts, with assets remaining in your control at all times."
    },
    {
      question: "How is BitHedge different from centralized options platforms?",
      answer: "Unlike centralized alternatives, BitHedge requires no KYC, operates entirely on-chain, provides full transparency, and is secured by Bitcoin's unmatched security model."
    },
    {
      question: "Which wallets are supported?",
      answer: "BitHedge currently supports Hiro Wallet and Xverse, with more wallet integrations coming soon."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Our web application is fully responsive and works great on mobile devices. Native mobile apps for iOS and Android are on our roadmap."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50/70 dark:bg-gray-900/20 w-full">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions About Bitcoin Protection & Income?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to the most common questions about BitHedge
          </p>
        </motion.div>
        
        <Tabs 
          defaultValue="protection" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-8"
        >
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger 
                value="protection"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Protection</span>
                <span className="sm:hidden">Protect</span>
              </TabsTrigger>
              <TabsTrigger 
                value="income"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-amber-500 data-[state=active]:text-white"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Income</span>
              </TabsTrigger>
              <TabsTrigger 
                value="common"
                className="flex items-center gap-2 py-3"
              >
                <span>Common</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <TabsContent value="protection" className="mt-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <Accordion type="single" collapsible className="w-full">
                    {protectionFAQs.map((faq, idx) => (
                      <FAQItem 
                        key={idx} 
                        question={faq.question} 
                        answer={faq.answer} 
                      />
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="income" className="mt-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <Accordion type="single" collapsible className="w-full">
                    {incomeFAQs.map((faq, idx) => (
                      <FAQItem 
                        key={idx} 
                        question={faq.question} 
                        answer={faq.answer} 
                      />
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="common" className="mt-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <Accordion type="single" collapsible className="w-full">
                    {commonFAQs.map((faq, idx) => (
                      <FAQItem 
                        key={idx} 
                        question={faq.question} 
                        answer={faq.answer} 
                      />
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
        
        <div className="text-center">
          <motion.div 
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <a 
              href="#" 
              className="inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-medium text-primary hover:text-primary/90 border border-primary/20 hover:border-primary/30 transition-colors"
            >
              View all FAQs
              <ChevronDown className="ml-2 h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 