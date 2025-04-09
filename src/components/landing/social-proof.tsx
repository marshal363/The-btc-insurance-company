"use client";

import React from 'react';
import { Shield, TrendingUp, BarChart, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface MetricProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

function Metric({ value, label, icon }: MetricProps) {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="mb-3 text-gray-500 dark:text-gray-400">
        {icon}
      </div>
      <div className="text-2xl md:text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground text-center">{label}</div>
    </motion.div>
  );
}

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  persona: 'protection' | 'income';
}

function Testimonial({ quote, author, role, persona }: TestimonialProps) {
  const colorScheme = persona === 'protection'
    ? {
        bg: 'bg-blue-50/70 dark:bg-blue-950/20',
        border: 'border-blue-200 dark:border-blue-800/60',
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        accent: 'text-primary'
      }
    : {
        bg: 'bg-amber-50/70 dark:bg-amber-950/20',
        border: 'border-amber-200 dark:border-amber-800/60',
        iconBg: 'bg-amber-100 dark:bg-amber-900/30',
        accent: 'text-amber-500'
      };
  
  return (
    <motion.div 
      className={`relative p-6 rounded-xl ${colorScheme.bg} ${colorScheme.border} border shadow-sm group hover:shadow-md transition-all duration-300`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-blue-500/5 dark:to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
      
      <div className="relative z-10">
        <div className={`text-lg md:text-xl leading-relaxed mb-6 italic`}>
          <span className={`inline-block -ml-2 mr-1 ${colorScheme.accent} opacity-50 text-3xl font-serif`}>&ldquo;</span>
          {quote}
          <span className={`inline-block ml-1 ${colorScheme.accent} opacity-50 text-3xl font-serif`}>&rdquo;</span>
        </div>
        
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full ${colorScheme.iconBg} flex items-center justify-center mr-3`}>
            {persona === 'protection' ? (
              <Shield className="h-5 w-5 text-primary" />
            ) : (
              <TrendingUp className="h-5 w-5 text-amber-500" />
            )}
          </div>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SocialProof() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50/80 dark:bg-gray-900/20 w-full">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Users, Real Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of Bitcoin holders and providers already using BitHedge
          </p>
        </motion.div>
        
        {/* Testimonials */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <Testimonial
              quote="During May's 30% Bitcoin crash, my protected position saved me over $12,000 in potential losses. The premium was the best investment I made that month."
              author="Michael T."
              role="Bitcoin Investor"
              persona="protection"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Testimonial
              quote="I've provided protection on BitHedge for 3 months and generated 18.7% APY on my STX - significantly outperforming my previous DeFi strategies."
              author="David K."
              role="Yield Strategist"
              persona="income"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Testimonial
              quote="I was ready to sell my Bitcoin out of fear, but with BitHedge I found a better way - protect and hold through the volatility."
              author="Sarah L."
              role="Business Owner"
              persona="protection"
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Testimonial
              quote="The platform automatically suggests optimal protection parameters based on current market conditions. This saves me hours of analysis while maximizing my premium income."
              author="Jennifer R."
              role="DeFi Investor"
              persona="income"
            />
          </motion.div>
        </motion.div>
        
        {/* Platform Metrics */}
        <div className="mb-4 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-8">Platform Impact</h3>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <Metric 
              value="$24.7M+"
              label="in Bitcoin Protected"
              icon={<Shield className="h-6 w-6" />}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Metric 
              value="$1.2M+"
              label="in Premiums Distributed"
              icon={<DollarSign className="h-6 w-6" />}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Metric 
              value="97%"
              label="Automatic Renewal Rate" 
              icon={<BarChart className="h-6 w-6" />}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Metric 
              value="3,200+"
              label="Active Protection Policies"
              icon={<Shield className="h-6 w-6" />}
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mr-2">
                <span className="text-sm font-medium">S</span>
              </div>
              <span>Powered by Stacks</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mr-2">
                <span className="text-sm font-medium">₿</span>
              </div>
              <span>Bitcoin-secured</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mr-2">
                <span className="text-sm font-medium">NC</span>
              </div>
              <span>100% Non-custodial</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 