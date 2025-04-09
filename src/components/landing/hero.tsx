"use client";

import Link from "next/link";
import { Shield, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background subtle patterns */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="hidden md:block absolute top-40 right-1/4 w-24 h-24 border border-gray-200 dark:border-gray-800 rounded-full" />
        <div className="hidden md:block absolute bottom-32 left-1/3 w-16 h-16 border border-gray-200 dark:border-gray-800 rounded-full" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Bitcoin </span>
            <span className="text-primary">Protection</span>
            <span> or Bitcoin </span>
            <span className="text-amber-500">Income</span>
            <span className="text-amber-500">?</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl max-w-3xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            The first decentralized platform where Bitcoin holders secure their value and STX 
            holders earn premium income - all without surrendering custody
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12">
          {/* Protection Option */}
          <motion.div 
            className="relative group rounded-2xl p-8 bg-blue-50/80 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 shadow-sm transition-all duration-300 hover:shadow-md dark:hover:shadow-blue-900/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-500/5 dark:to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              Protect Your Bitcoin<br />From Market Volatility
            </h2>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Lock in a selling price regardless of market crashes</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Pay once, stay protected for weeks</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Never lose more than your premium</span>
              </li>
            </ul>
            
            <Button asChild size="lg" className="w-full group">
              <Link href="/home">
                <span>Secure Your Bitcoin Now</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Income Option */}
          <motion.div 
            className="relative group rounded-2xl p-8 bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 shadow-sm transition-all duration-300 hover:shadow-md dark:hover:shadow-amber-900/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-amber-500/5 dark:to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-amber-500" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              Earn Premium Income<br />Providing Bitcoin Protection
            </h2>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Generate up to 25% APY by providing coverage</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Collect premiums upfront immediately</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Set your own terms and risk parameters</span>
              </li>
            </ul>
            
            <Button asChild size="lg" variant="outline" className="w-full border-amber-200 dark:border-amber-800/60 hover:bg-amber-100/50 dark:hover:bg-amber-900/20 text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 group">
              <Link href="/home">
                <span>Start Earning Premiums Today</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground tracking-wide">
              100% Non-custodial · Built on Stacks · Secured by Bitcoin
            </p>
          </div>

          <Button
            asChild
            variant="secondary"
            size="lg"
            className="font-medium rounded-full relative overflow-hidden group"
          >
            <Link href="/home">
              <span className="relative z-10">Secure Your Position</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 