"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Shield, TrendingUp, ArrowDown } from "lucide-react";
import { Persona } from './hero';

interface JourneyStepProps {
  number: number;
  title: string;
  description: string;
  persona: 'protection' | 'income';
}

function JourneyStep({ number, title, description, persona }: JourneyStepProps) {
  const colorScheme = persona === 'protection'
    ? {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-100 dark:border-blue-800/60',
        numBg: 'bg-gray-900 dark:bg-gray-900',
        numText: 'text-white',
        iconColor: 'text-primary',
        shadowHover: 'hover:shadow-blue-100 dark:hover:shadow-blue-900/20'
      }
    : {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-100 dark:border-amber-800/60',
        numBg: 'bg-amber-500 dark:bg-amber-500',
        numText: 'text-white',
        iconColor: 'text-amber-500',
        shadowHover: 'hover:shadow-amber-100 dark:hover:shadow-amber-900/20'
      };
      
  return (
    <div 
      className={`group relative rounded-xl p-6 border ${colorScheme.border} ${colorScheme.bg} shadow-sm transition-all duration-300 hover:shadow-md ${colorScheme.shadowHover}`}
    >
      <div className="flex flex-row items-start gap-4">
        <div className={`flex-shrink-0 w-11 h-11 rounded-full ${colorScheme.numBg} flex items-center justify-center`}>
          <span className={`text-xl font-bold ${colorScheme.numText}`}>{number}</span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ConnectingArrow({ persona }: { persona: 'protection' | 'income' }) {
  const arrowColor = persona === 'protection' 
    ? 'text-gray-400 dark:text-gray-600' 
    : 'text-amber-500/60 dark:text-amber-500/40';
  
  return (
    <div className="flex justify-center py-2 md:py-4">
      <ArrowDown className={`h-6 w-6 ${arrowColor}`} />
    </div>
  );
}

interface JourneyTabProps {
  active: boolean;
  persona: 'protection' | 'income';
  onClick: () => void;
}

function JourneyTab({ active, persona, onClick }: JourneyTabProps) {
  const icon = persona === 'protection' 
    ? <Shield className="h-6 w-6 text-primary" /> 
    : <TrendingUp className="h-6 w-6 text-amber-500" />;
  
  const bgColor = active
    ? persona === 'protection'
      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/50'
      : 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/50'
    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800';
    
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl p-4 border ${bgColor} transition-all duration-300 flex items-center justify-center gap-3 md:gap-4`}
    >
      <div className={`w-12 h-12 rounded-full ${persona === 'protection' ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-amber-100 dark:bg-amber-900/40'} flex items-center justify-center`}>
        {icon}
      </div>
      <span className="text-xl font-bold">
        {persona === 'protection' ? 'Protection Journey' : 'Income Journey'}
      </span>
    </button>
  );
}

interface PathsProps {
  activePersona: Persona;
}

export function Paths({ activePersona }: PathsProps) {
  const [selectedJourney, setSelectedJourney] = React.useState<'protection' | 'income'>(activePersona as 'protection' | 'income');
  
  // Update selected journey when activePersona changes
  React.useEffect(() => {
    setSelectedJourney(activePersona as 'protection' | 'income');
  }, [activePersona]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <section className="py-16 md:py-24 w-full">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Two Sides, One Seamless Platform
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch how protection needs and income generation perfectly balance in our ecosystem
          </p>
        </motion.div>

        {/* Journey Selection Tabs - Show on mobile only */}
        <div className="md:hidden space-y-3 mb-6">
          <JourneyTab 
            active={selectedJourney === 'protection'} 
            persona="protection" 
            onClick={() => setSelectedJourney('protection')}
          />
          <JourneyTab 
            active={selectedJourney === 'income'} 
            persona="income" 
            onClick={() => setSelectedJourney('income')}
          />
        </div>

        {/* Journey Steps */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Hidden on mobile when income is selected */}
          <div className={`space-y-6 md:block ${selectedJourney === 'income' ? 'hidden' : 'block'}`}>
            {/* Protection Journey Tab - Desktop only */}
            <div className="hidden md:block">
              <JourneyTab 
                active={true} 
                persona="protection" 
                onClick={() => {}}
              />
            </div>
            
            {/* Protection Steps */}
            <motion.div variants={itemVariants}>
              <JourneyStep
                number={1}
                title="Select Protection Amount"
                description="Choose how much of your Bitcoin you want to protect and at what value."
                persona="protection"
              />
            </motion.div>
            
            <ConnectingArrow persona="protection" />
            
            <motion.div variants={itemVariants}>
              <JourneyStep
                number={2}
                title="Customize Your Coverage"
                description="Select your protection period and coverage level based on your risk tolerance."
                persona="protection"
              />
            </motion.div>
            
            <ConnectingArrow persona="protection" />
            
            <motion.div variants={itemVariants}>
              <JourneyStep
                number={3}
                title="Secure Instant Protection"
                description="Pay a one-time premium and immediately activate your Bitcoin protection policy."
                persona="protection"
              />
            </motion.div>
            
            <ConnectingArrow persona="protection" />
            
            <motion.div variants={itemVariants}>
              <JourneyStep
                number={4}
                title="Claim If Needed, Or Let Expire"
                description="If prices fall below your protected value, exercise your protection. If not, simply let it expire."
                persona="protection"
              />
            </motion.div>
          </div>
          
          {/* Hidden on mobile when protection is selected */}
          <div className={`space-y-6 md:block ${selectedJourney === 'protection' ? 'hidden' : 'block'}`}>
            {/* Income Journey Tab - Desktop only */}
            <div className="hidden md:block">
              <JourneyTab 
                active={true} 
                persona="income" 
                onClick={() => {}}
              />
            </div>
            
            {/* Income Steps */}
            <motion.div variants={itemVariants}>
              <JourneyStep
                number={1}
                title="Offer Protection Capacity"
                description="Decide how much protection you're willing to provide and at what rates."
                persona="income"
              />
            </motion.div>
            
            <ConnectingArrow persona="income" />
            
            <motion.div variants={itemVariants}>
              <JourneyStep
                number={2}
                title="Set Your Terms"
                description="Specify your premium requirements and protection periods to match your strategy."
                persona="income"
              />
            </motion.div>
            
            <ConnectingArrow persona="income" />
            
            <motion.div variants={itemVariants}>
              <JourneyStep
                number={3}
                title="Collect Premiums Instantly"
                description="Receive premium payments immediately when protection buyers select your offerings."
                persona="income"
              />
            </motion.div>
            
            <ConnectingArrow persona="income" />
            
            <motion.div variants={itemVariants}>
              <JourneyStep
                number={4}
                title="Fulfill Or Release"
                description="If protection is claimed, fulfill your obligation. Otherwise, release your collateral automatically."
                persona="income"
              />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Platform Diagram for Desktop */}
        <motion.div 
          className="hidden md:block mt-16 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center border border-blue-100 dark:border-blue-800/60">
              <div className="w-16 h-16 rounded-full mx-auto bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-3">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-1">Protection Buyer</h3>
              <p className="text-muted-foreground">Secures value against downside</p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 text-center border border-amber-100 dark:border-amber-800/60">
              <div className="w-16 h-16 rounded-full mx-auto bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-3">
                <TrendingUp className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-1">Protection Provider</h3>
              <p className="text-muted-foreground">Collects premiums for income</p>
            </div>
            
            <div className="md:col-span-2 mt-4 text-center">
              <div className="inline-block py-2 px-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-2">
                Premium Payment
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-full font-medium bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
          >
            Experience The Platform
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 