"use client";

import React from "react";
import Link from "next/link";
import { Shield, Wallet, Settings, Play, Bell, User, RefreshCw, DollarSign, BarChart, ArrowDown, ArrowUp, Info, ChevronRight, Scale, FileCode, Bitcoin, DollarSignIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Persona } from "./old/hero";
import { motion } from "framer-motion";

interface JourneyStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  persona: 'protection' | 'income';
}

function JourneyStep({ number, title, description, icon, persona }: JourneyStepProps) {
  // Define colors based on persona
  const colors = persona === 'protection' 
    ? {
        gradient: "from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/30",
        border: "border border-blue-100 dark:border-blue-800",
        accent: "bg-primary",
        iconBg: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-primary",
        iconBorder: "border-blue-200 dark:border-blue-700"
      }
    : {
        gradient: "from-white to-amber-50 dark:from-gray-800 dark:to-amber-900/30",
        border: "border border-amber-100 dark:border-amber-800",
        accent: "bg-amber-500",
        iconBg: "bg-amber-100 dark:bg-amber-900/40",
        iconColor: "text-amber-500",
        iconBorder: "border-amber-200 dark:border-amber-700"
      };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`relative bg-gradient-to-br ${colors.gradient} rounded-xl p-6 shadow-md ${colors.border} w-full transition-all duration-200 hover:shadow-lg h-full`}
    >
      {/* Colored accent bar at top */}
      <div className={`absolute top-0 left-0 w-full h-1 ${colors.accent} rounded-t-xl`}></div>
      
      {/* Step number (keep in original position) */}
      <div className="absolute top-6 left-6">
        <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-gray-800 text-white flex items-center justify-center text-sm font-semibold">
          {number}
        </div>
      </div>
      
      {/* Central icon with pulsing border effect */}
      <div className={`w-20 h-20 rounded-full ${colors.iconBg} flex items-center justify-center mx-auto mb-4 shadow-inner relative mt-6`}>
        <div className={`${colors.iconColor} relative`}>
          {icon}
          <motion.div 
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [1.3, 1.4, 1.3] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5,
              repeatType: "loop" 
            }}
            className={`absolute inset-0 rounded-full border-2 ${colors.iconBorder}`}
          ></motion.div>
        </div>
      </div>
      
      {/* Title and description - centered like reference cards */}
      <div className="text-center">
        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
}

function ConnectorLine({ direction = "horizontal" }: { direction?: "horizontal" | "vertical" }) {
  if (direction === "horizontal") {
    return (
      <div className="hidden md:flex items-center justify-center w-full h-6 px-8">
        <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-700 w-full"></div>
      </div>
    );
  } else {
    return (
      <div className="hidden md:flex justify-center h-12">
        <div className="border-l-2 border-dashed border-gray-200 dark:border-gray-700 h-full"></div>
      </div>
    );
  }
}

interface HowItWorksProps {
  activePersona: Persona;
}

export function HowItWorks({ activePersona }: HowItWorksProps) {
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
      transition: { duration: 0.5 }
    }
  };

  const protectionSteps = [
    {
      number: 1,
      title: "Connect Your Wallet",
      description: "Connect with Hiro Wallet or other compatible wallets",
      icon: <Wallet className="h-10 w-10" />
    },
    {
      number: 2,
      title: "Select Policy",
      description: "Choose the amount of Bitcoin to protect",
      icon: <Shield className="h-10 w-10" />
    },
    {
      number: 3,
      title: "Configure Parameters",
      description: "Set your protection level and duration",
      icon: <Settings className="h-10 w-10" />
    },
    {
      number: 4,
      title: "Activate Policy",
      description: "Confirm and activate your policy with one click",
      icon: <Play className="h-10 w-10" />
    },
    {
      number: 5,
      title: "Monitor Policy",
      description: "Track your policy status in your dashboard",
      icon: <BarChart className="h-10 w-10" />
    },
    {
      number: 6,
      title: "Receive Notifications",
      description: "Get alerts when prices approach your protection level",
      icon: <Bell className="h-10 w-10" />
    },
    {
      number: 7,
      title: "Claim If Needed",
      description: "If prices fall below your level, claim your value",
      icon: <DollarSign className="h-10 w-10" />
    },
    {
      number: 8,
      title: "Renew or Let Expire",
      description: "Choose to extend your policy or let it expire",
      icon: <RefreshCw className="h-10 w-10" />
    }
  ];

  const incomeSteps = [
    {
      number: 1,
      title: "Connect Your Wallet",
      description: "Connect with Hiro Wallet or other compatible wallets",
      icon: <Wallet className="h-10 w-10" />
    },
    {
      number: 2,
      title: "Allocate Capital",
      description: "Decide how much STX you want to commit",
      icon: <DollarSign className="h-10 w-10" />
    },
    {
      number: 3,
      title: "Set Parameters",
      description: "Choose your premium rate and policy parameters",
      icon: <Settings className="h-10 w-10" />
    },
    {
      number: 4,
      title: "Activate Strategy",
      description: "Confirm and activate your income strategy",
      icon: <Play className="h-10 w-10" />
    },
    {
      number: 5,
      title: "Receive Premiums",
      description: "Collect premium payments immediately",
      icon: <DollarSign className="h-10 w-10" />
    },
    {
      number: 6,
      title: "Monitor Activity",
      description: "Track your active strategies and exposure",
      icon: <BarChart className="h-10 w-10" />
    },
    {
      number: 7,
      title: "Fulfill If Needed",
      description: "If policy is claimed, fulfill your obligation",
      icon: <User className="h-10 w-10" />
    },
    {
      number: 8,
      title: "Renew or Adjust",
      description: "Extend your strategy or adjust your parameters",
      icon: <RefreshCw className="h-10 w-10" />
    }
  ];

  return (
    <section className="py-16 md:py-24 w-full bg-muted/30" id="how-it-works">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete {activePersona === "protection" ? "Policy" : "Income"} Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {activePersona === "protection"
              ? "From setup to protection, a guided experience through every step of your Bitcoin insurance policy"
              : "From capital allocation to premium collection, the complete path to maximizing your STX yield"}
          </p>
        </div>
        
        {/* Mobile journey steps - visible only on small screens */}
        <div className="md:hidden">
          <div className="space-y-4">
            {activePersona === "protection" ? (
              protectionSteps.map((step, index) => (
                <div key={`protection-step-mobile-${index}`} className="flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <JourneyStep 
                      number={step.number}
                      title={step.title}
                      description={step.description}
                      icon={step.icon}
                      persona="protection"
                    />
                  </motion.div>
                  {index < protectionSteps.length - 1 && (
                    <div className="flex justify-center h-8">
                      <ArrowDown className="text-muted-foreground h-5 w-5 mt-2" />
                    </div>
                  )}
                </div>
              ))
            ) : (
              incomeSteps.map((step, index) => (
                <div key={`income-step-mobile-${index}`} className="flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <JourneyStep 
                      number={step.number}
                      title={step.title}
                      description={step.description}
                      icon={step.icon}
                      persona="income"
                    />
                  </motion.div>
                  {index < incomeSteps.length - 1 && (
                    <div className="flex justify-center h-8">
                      <ArrowDown className="text-muted-foreground h-5 w-5 mt-2" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Desktop journey visualization - hidden on mobile */}
        <div className="hidden md:block">
          {/* First Row (Steps 1-4) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-4 gap-4 mb-4"
          >
            {activePersona === "protection" ? (
              <>
                {protectionSteps.slice(0, 4).map((step, index) => (
                  <div key={`protection-step-${index}`} className="flex flex-col">
                    <motion.div variants={itemVariants}>
                      <JourneyStep 
                        number={step.number}
                        title={step.title}
                        description={step.description}
                        icon={step.icon}
                        persona="protection"
                      />
                    </motion.div>
                    {index < 3 && <ConnectorLine />}
                  </div>
                ))}
              </>
            ) : (
              <>
                {incomeSteps.slice(0, 4).map((step, index) => (
                  <div key={`income-step-${index}`} className="flex flex-col">
                    <motion.div variants={itemVariants}>
                      <JourneyStep 
                        number={step.number}
                        title={step.title}
                        description={step.description}
                        icon={step.icon}
                        persona="income"
                      />
                    </motion.div>
                    {index < 3 && <ConnectorLine />}
                  </div>
                ))}
              </>
            )}
          </motion.div>
          
          {/* Vertical connectors */}
          <div className="grid grid-cols-4 h-12">
            {[0, 1, 2, 3].map(index => (
              <div key={`connector-v-${index}`} className="flex justify-center">
                <div className="border-l-2 border-dashed border-gray-200 dark:border-gray-700 h-full"></div>
              </div>
            ))}
          </div>
          
          {/* Second Row (Steps 5-8) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-4 gap-4 mb-12"
          >
            {activePersona === "protection" ? (
              <>
                {protectionSteps.slice(4, 8).map((step, index) => (
                  <div key={`protection-step-${index+4}`} className="flex flex-col">
                    <motion.div variants={itemVariants}>
                      <JourneyStep 
                        number={step.number}
                        title={step.title}
                        description={step.description}
                        icon={step.icon}
                        persona="protection"
                      />
                    </motion.div>
                    {index < 3 && <ConnectorLine />}
                  </div>
                ))}
              </>
            ) : (
              <>
                {incomeSteps.slice(4, 8).map((step, index) => (
                  <div key={`income-step-${index+4}`} className="flex flex-col">
                    <motion.div variants={itemVariants}>
                      <JourneyStep 
                        number={step.number}
                        title={step.title}
                        description={step.description}
                        icon={step.icon}
                        persona="income"
                      />
                    </motion.div>
                    {index < 3 && <ConnectorLine />}
                  </div>
                ))}
              </>
            )}
          </motion.div>
        </div>
        
        {/* How Policies and Income Connect Section - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-amber-50/50 dark:from-blue-950/20 dark:to-amber-950/20 rounded-2xl z-0"></div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">How Policies and Income Connect</h3>
            
            {/* Dynamic interactive diagram */}
            <div className="mb-10">
              <div className="max-w-4xl mx-auto">
                {/* Participants cards - enhanced for better visualization */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                  {/* Policy Buyer Card */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/30 rounded-xl p-6 shadow-md border border-blue-100 dark:border-blue-800 text-center group"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-xl"></div>
                    <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <div className="relative">
                        <Shield className="h-10 w-10 text-primary" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Bitcoin className="h-5 w-5 text-primary" />
                        </div>
                        <motion.div 
                          animate={{ 
                            opacity: [0.4, 1, 0.4],
                            scale: [1.3, 1.4, 1.3] 
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2.5,
                            repeatType: "loop" 
                          }}
                          className="absolute inset-0 rounded-full border-2 border-blue-200 dark:border-blue-700"
                        ></motion.div>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">Policy Buyer</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Protects Bitcoin value</p>
                    
                    <div className="mt-4 pt-4 border-t border-blue-100 dark:border-blue-800/50">
                      <motion.div 
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1.05 }}
                        className="bg-primary/10 dark:bg-primary/20 text-primary px-3 py-2 rounded-full text-sm font-medium"
                      >
                        Pays Premium
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Smart Contracts Card */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 text-center"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-500 dark:bg-gray-400 rounded-t-xl"></div>
                    <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <div className="relative">
                        <FileCode className="h-10 w-10 text-gray-600 dark:text-gray-300" />
                        <motion.div 
                          animate={{ 
                            opacity: [0.4, 1, 0.4],
                            scale: [1.3, 1.4, 1.3] 
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2,
                            repeatType: "loop" 
                          }}
                          className="absolute inset-0 rounded-full border-2 border-gray-300 dark:border-gray-600"
                        ></motion.div>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">Smart Contracts</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Non-custodial & secure</p>
                    
                    <div className="flex gap-2 justify-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700/50">
                      <span className="inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Verified & Audited</span>
                    </div>
                  </motion.div>
                  
                  {/* Income Provider Card */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="relative bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-amber-900/30 rounded-xl p-6 shadow-md border border-amber-100 dark:border-amber-800 text-center"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 rounded-t-xl"></div>
                    <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <div className="relative">
                        <DollarSignIcon className="h-10 w-10 text-amber-500" />
                        <motion.div 
                          animate={{ 
                            opacity: [0.4, 1, 0.4],
                            scale: [1.3, 1.4, 1.3] 
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2.2,
                            repeatType: "loop" 
                          }}
                          className="absolute inset-0 rounded-full border-2 border-amber-200 dark:border-amber-700"
                        ></motion.div>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">Income Provider</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Earns premium income</p>
                    
                    <div className="mt-4 pt-4 border-t border-amber-100 dark:border-amber-800/50">
                      <motion.div 
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1.05 }}
                        className="bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 px-3 py-2 rounded-full text-sm font-medium"
                      >
                        Provides Collateral
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Policy outcomes - Enhanced visual with interactive cards */}
                <div className="mt-12 relative">
                  <div className="absolute -inset-4 bg-gray-50 dark:bg-gray-800 rounded-3xl opacity-50 z-0"></div>
                  <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-800 z-10">
                    <h4 className="flex items-center justify-center text-base font-bold text-gray-800 dark:text-gray-100 mb-6">
                      <Scale className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-300" />
                      Policy Outcomes
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Price falls scenario */}
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-red-900/10 rounded-lg p-5 shadow-sm border border-red-100 dark:border-red-900/30"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shadow-inner">
                              <ArrowDown className="h-4 w-4 text-red-500" />
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">If price falls below protection level</h5>
                            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                              <span className="text-sm">Provider transfers protected value to Buyer</span>
                            </div>
                            <div className="text-xs mt-3 text-gray-500 dark:text-gray-400 rounded-lg bg-gray-50 dark:bg-gray-800 p-2">
                              Protection activates, preserving the value guaranteed in the policy
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Price stays above scenario */}
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/10 rounded-lg p-5 shadow-sm border border-green-100 dark:border-green-900/30"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shadow-inner">
                              <ArrowUp className="h-4 w-4 text-green-500" />
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">If price stays above protection level</h5>
                            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                              <span className="text-sm">Provider keeps collateral + premium</span>
                            </div>
                            <div className="text-xs mt-3 text-gray-500 dark:text-gray-400 rounded-lg bg-gray-50 dark:bg-gray-800 p-2">
                              Protection expires, provider earns income for the service
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Value proposition - Enhanced with subtle animation */}
            <motion.div 
              initial={{ opacity: 0.7 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative max-w-2xl mx-auto text-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="absolute w-24 h-px left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <p className="text-gray-700 dark:text-gray-300">
                Our platform connects those seeking Bitcoin insurance with those willing to provide it for premium income. 
                This creates a balanced ecosystem where both parties benefit from each other&apos;s needs.
              </p>
              <motion.div 
                className="mt-6 flex justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <Link 
                  href="/explanation" 
                  className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                >
                  <Info className="mr-1.5 h-4 w-4" />
                  Learn more about our protection mechanism
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="flex justify-center mt-10">
          <Button variant="secondary" size="lg" asChild className="group rounded-full">
            <Link href="/demo">
              <Play className="mr-2 h-4 w-4" />
              <span>Watch Demo Video</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 