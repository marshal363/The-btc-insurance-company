import React from 'react';
import { Shield, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Persona } from "./hero";

interface PersonaSelectorProps {
  onPersonaSelect: (persona: Persona) => void;
  activePersona?: Persona;
}

export function PersonaSelector({ onPersonaSelect, activePersona }: PersonaSelectorProps) {
  return (
    <section className="py-10 md:py-16">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Choose Your Path</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            BitHedge serves two types of users. Select the option that best describes your goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Protection Persona */}
          <motion.div 
            className={`relative cursor-pointer group rounded-xl p-6 border transition-all duration-300 
              ${activePersona === 'protection' 
                ? 'border-blue-400 bg-blue-50/80 dark:bg-blue-950/30 ring-2 ring-blue-200 dark:ring-blue-800/60 shadow-md' 
                : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-950/20'}`}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onClick={() => onPersonaSelect('protection')}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Bitcoin Holder</h3>
            </div>
            
            <p className="mb-5 text-muted-foreground">
              I want to protect my Bitcoin from market volatility and secure its value against potential drops.
            </p>
            
            <div className="mt-auto flex items-center text-primary font-medium">
              <span>Explore protection options</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
          
          {/* Income Persona */}
          <motion.div 
            className={`relative cursor-pointer group rounded-xl p-6 border transition-all duration-300 
              ${activePersona === 'income' 
                ? 'border-amber-400 bg-amber-50/80 dark:bg-amber-950/30 ring-2 ring-amber-200 dark:ring-amber-800/60 shadow-md' 
                : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/50 dark:hover:bg-amber-950/20'}`}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onClick={() => onPersonaSelect('income')}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold">STX Provider</h3>
            </div>
            
            <p className="mb-5 text-muted-foreground">
              I want to earn premium income by providing Bitcoin protection to others using my STX holdings.
            </p>
            
            <div className="mt-auto flex items-center text-amber-500 font-medium">
              <span>Explore income opportunities</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
        </div>
        
        <div className="text-center mt-8">
          <Button 
            variant="ghost" 
            onClick={() => onPersonaSelect(activePersona === 'protection' ? 'income' : 'protection')}
            className="text-muted-foreground hover:text-foreground"
          >
            I&apos;m interested in both
          </Button>
        </div>
      </div>
    </section>
  );
} 