"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Shield, TrendingUp, ArrowRight, BookOpen, Lock, Settings } from "lucide-react";
import { Persona } from './hero'; // Import Persona type

interface PathCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  persona: 'protection' | 'income';
}

function PathCard({ icon, title, description, persona }: PathCardProps) {
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
      className={`group relative rounded-xl p-6 border ${colorScheme.border} ${colorScheme.bg} shadow-sm transition-all duration-300 hover:shadow-md`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-500/5 dark:to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-full ${colorScheme.iconBg} flex items-center justify-center mb-4`}>
          <div className={colorScheme.accent}>{icon}</div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

// Add Props interface
interface PathsProps {
  activePersona: Persona;
}

export function Paths({ activePersona }: PathsProps) { // Add activePersona prop
  // Animation variants
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
  
  const pathVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section className="py-16 md:py-24 w-full">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Path To Bitcoin Confidence
          </h2>
        </motion.div>

        {/* Use activePersona for conditional rendering */}
        <div className="grid grid-cols-1 lg:grid-cols-1 max-w-2xl mx-auto gap-12 mb-16">
          {activePersona === 'protection' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div variants={pathVariants} className="mb-8 flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">For Bitcoin Holders</h3>
              </motion.div>
              
              <motion.p 
                variants={pathVariants}
                className="text-muted-foreground mb-8"
              >
                Whether you&apos;re protecting your long-term holdings or managing short-term 
                volatility, BitHedge adapts to your protection needs.
              </motion.p>
              
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <PathCard
                    icon={<BookOpen className="h-5 w-5" />}
                    title="Entry Protection"
                    description="Perfect for new Bitcoin buyers wanting to limit initial downside"
                    persona="protection"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <PathCard
                    icon={<Lock className="h-5 w-5" />}
                    title="HODL Protection"
                    description="Ideal for long-term holders seeking peace of mind during volatility"
                    persona="protection"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <PathCard
                    icon={<Settings className="h-5 w-5" />}
                    title="Strategic Protection"
                    description="For active traders managing position risk"
                    persona="protection"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
          
          {activePersona === 'income' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.div variants={pathVariants} className="mb-8 flex items-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mr-4">
                  <TrendingUp className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold">For Yield Seekers</h3>
              </motion.div>
              
              <motion.p 
                variants={pathVariants}
                className="text-muted-foreground mb-8"
              >
                BitHedge offers multiple strategies for generating income based on your risk 
                preference and market outlook.
              </motion.p>
              
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <PathCard
                    icon={<Shield className="h-5 w-5" />}
                    title="Conservative Income"
                    description="Lower premiums but minimal risk exposure"
                    persona="income"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <PathCard
                    icon={<TrendingUp className="h-5 w-5" />}
                    title="Balanced Returns"
                    description="Moderate premiums with calculated risk parameters"
                    persona="income"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <PathCard
                    icon={<ArrowRight className="h-5 w-5" />}
                    title="Yield Maximizer"
                    description="Higher premiums with greater potential obligations"
                    persona="income"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
        
        <motion.div 
          className="relative w-full h-16 md:h-24 bg-gradient-to-r from-blue-50 via-gray-50 to-amber-50 dark:from-blue-950/30 dark:via-gray-900/30 dark:to-amber-950/30 rounded-xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <div className="text-lg font-medium">Ready to get started?</div>
              <div className="text-sm text-muted-foreground">Choose your path and begin your Bitcoin journey</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 