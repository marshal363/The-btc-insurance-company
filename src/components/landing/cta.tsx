"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Start Your Bitcoin Journey Today
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Protection CTA */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl border border-blue-200 dark:border-blue-800/60 bg-blue-50/80 dark:bg-blue-950/20 p-8 shadow-sm hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 right-0 p-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Shield className="h-7 w-7 text-primary" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 mt-10 md:mt-0">Secure Your Bitcoin Value Now</h3>
            
            <p className="text-muted-foreground mb-8 max-w-md">
              Bitcoin&apos;s historical volatility means the next price movement could happen any day. 
              Don&apos;t wait until prices start falling to seek protection.
            </p>
            
            <Button asChild size="lg" className="w-full group">
              <Link href="/home">
                <span>Create Your Protection Policy</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Income CTA */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/80 dark:bg-amber-950/20 p-8 shadow-sm hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 right-0 p-4">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-amber-500" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 mt-10 md:mt-0">Begin Earning Premium Income Today</h3>
            
            <p className="text-muted-foreground mb-8 max-w-md">
              Every day without your capital generating yield is a missed opportunity. 
              Start collecting premiums within minutes.
            </p>
            
            <Button asChild size="lg" variant="outline" className="w-full border-amber-200 dark:border-amber-800/60 hover:bg-amber-100/50 dark:hover:bg-amber-900/20 text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 group">
              <Link href="/home">
                <span>Start Providing Protection</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-lg mb-8 text-muted-foreground">
            Join the thousands of Bitcoin holders who sleep better at night, knowing 
            their positions are protected by BitHedge&apos;s decentralized options platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-full">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm font-medium">100% Non-custodial</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-full">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm font-medium">Built on Stacks</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-full">
              <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-sm font-medium">Bitcoin-secured</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Currently on Testnet - No Real Funds Required
          </div>
        </motion.div>
      </div>
    </section>
  );
} 