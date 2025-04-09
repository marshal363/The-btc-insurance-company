"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LinkButton } from "@/components/ui/link-button";

export function FAQSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container max-w-4xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Need Help?</h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light mb-6">
              We&apos;re here to assist.
            </p>
            <p className="text-muted-foreground mb-6">
              Still have questions? Feel free to contact our friendly <Link href="/support" className="text-primary underline underline-offset-4 hover:text-primary/80">support team</Link> specialists.
            </p>
            <LinkButton 
              href="/faqs" 
              variant="outline"
            >
              View all FAQs
            </LinkButton>
          </div>
          
          <div className="md:col-span-2">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6 bg-card shadow-sm">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  What is a FAQ and why is it important?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  A Frequently Asked Questions (FAQ) section addresses common inquiries about BitHedge. It helps users quickly find answers about our platform, options trading, and how to get started, enhancing your experience by reducing the need for additional support.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border rounded-lg px-6 bg-card shadow-sm">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  Why should I use a FAQ on my website or app?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  BitHedge provides a FAQ section to streamline your experience with our platform. By answering common questions about Bitcoin options, our security model, and trading processes, we empower you to make informed decisions while reducing the time needed to find essential information.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border rounded-lg px-6 bg-card shadow-sm">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  How do I effectively create a FAQ section?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We&apos;ve created this FAQ by analyzing common questions from users like you. We focus on clear, concise answers about BitHedge&apos;s options trading platform, addressing concerns about security, pricing, and platform functionality to help you navigate our service with confidence.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border rounded-lg px-6 bg-card shadow-sm">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  What are the benefits of having a well-maintained FAQ section?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  A comprehensive FAQ section provides immediate answers to your questions about BitHedge, reducing waiting time for support responses. It builds trust by transparently addressing concerns about our options trading platform, security measures, and trading processes, helping both beginners and experienced traders.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="border rounded-lg px-6 bg-card shadow-sm">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  What are sBTC options and why should I use them?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  sBTC options are financial instruments that give you the right to buy or sell sBTC (a 1:1 Bitcoin-backed asset) at a predetermined price within a specific timeframe. They&apos;re useful for protecting your Bitcoin portfolio against price drops or for capitalizing on price increases without risking your entire investment.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6" className="border rounded-lg px-6 bg-card shadow-sm">
                <AccordionTrigger className="text-base md:text-lg font-medium">
                  How do I get started with BitHedge?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Getting started is easy! First, install the Hiro Wallet and fund it with Testnet STX/sBTC. Then, connect your wallet to BitHedge with a single click. From there, you can navigate to the Easy Option View for a guided purchase experience or explore our advanced features if you&apos;re a more experienced trader.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
} 