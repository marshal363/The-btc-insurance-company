"use client";

import React from "react";
import { 
  Receipt, 
  Bell, 
  CoinsIcon, 
  Sliders, 
  Key,
  Wallet
} from "lucide-react";
import { motion } from "framer-motion";
import { Persona } from "./old/hero";
import Link from "next/link";

interface ValuePropositionProps {
  activePersona: Persona;
}

interface FeatureCardProps {
  title: string;
  subtitle?: string;
  description: string;
  icon: React.ReactNode;
  persona: Persona;
  isEven: boolean;
}

function FeatureCard({ title, subtitle, description, icon, persona, isEven }: FeatureCardProps) {
  // Define colors based on persona
  const colors = persona === 'protection' 
    ? {
        gradient: "from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/30",
        border: "border border-blue-100 dark:border-blue-800",
        accent: "bg-primary",
        iconBg: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-primary",
        iconBorder: "border-blue-200 dark:border-blue-700",
        separator: "border-blue-100 dark:border-blue-800/50"
      }
    : {
        gradient: "from-white to-amber-50 dark:from-gray-800 dark:to-amber-900/30",
        border: "border border-amber-100 dark:border-amber-800",
        accent: "bg-amber-500",
        iconBg: "bg-amber-100 dark:bg-amber-900/40",
        iconColor: "text-amber-500",
        iconBorder: "border-amber-200 dark:border-amber-700",
        separator: "border-amber-100 dark:border-amber-800/50"
      };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`relative bg-gradient-to-br ${colors.gradient} rounded-xl p-6 shadow-md ${colors.border} transition-all duration-200 hover:shadow-lg w-full md:w-[60%] ${isEven ? 'md:ml-auto' : ''}`}
    >
      {/* Colored accent bar at top */}
      <div className={`absolute top-0 left-0 w-full h-1 ${colors.accent} rounded-t-xl`}></div>
      
      {/* Content layout - Top section: icon left, title right */}
      <div className="flex flex-col">
        {/* Top section with icon left, titles right */}
        <div className="flex items-center mb-4">
          {/* Icon with pulsing effect */}
          <div className="flex-shrink-0 mr-6">
            <div className={`w-20 h-20 rounded-full ${colors.iconBg} flex items-center justify-center shadow-inner relative`}>
              <div className={`${colors.iconColor} relative`}>
                <div className="h-10 w-10">
                  {icon}
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
                  className={`absolute inset-0 rounded-full border-2 ${colors.iconBorder}`}
                ></motion.div>
              </div>
            </div>
          </div>
          
          {/* Title and subtitle */}
          <div>
            <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-100">{title}</h3>
            {subtitle && <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>}
          </div>
        </div>
        
        {/* Separator line - more visible */}
        <div className="w-full border-t border-gray-200 dark:border-gray-700 my-4"></div>
        
        {/* Description section */}
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{description}</p>
      </div>
    </motion.div>
  );
}

export function ValueProposition({ activePersona }: ValuePropositionProps) {
  console.log(`[ValueProposition] Rendering with activePersona: ${activePersona}`);

  // Shared animation variants for consistent animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Different animation for left/right items
  const leftItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  // Protection features with better icons and descriptions
  const protectionFeatures = [
    {
      title: "Full ownership maintained",
      subtitle: "→ You always keep control of your Bitcoin",
      description: "Your Bitcoin never leaves your wallet. Our non-custodial smart contracts ensure you maintain full ownership while still getting the protection you need.",
      icon: <Wallet className="h-10 w-10" />
    },
    {
      title: "One-time policy premium",
      subtitle: "→ No recurring fees or hidden costs",
      description: "Pay once and stay protected until your policy expiration date. All costs are shown upfront with complete transparency before you commit.",
      icon: <Receipt className="h-10 w-10" />
    },
    {
      title: "Activate only when needed",
      subtitle: "→ Your policy stays dormant until prices fall",
      description: "No action required unless Bitcoin drops below your protected price. Your policy automatically becomes active exactly when you need it most.",
      icon: <Bell className="h-10 w-10" />
    }
  ];

  // Income features with better icons and descriptions
  const incomeFeatures = [
    {
      title: "Earn income immediately",
      subtitle: "→ Receive premiums upfront with no waiting periods",
      description: "Receive premiums upfront as soon as your protection offering is matched with a buyer. No waiting periods or delayed payments.",
      icon: <CoinsIcon className="h-10 w-10" />
    },
    {
      title: "Set your own risk parameters",
      subtitle: "→ Complete control over exposure and income potential",
      description: "Choose exactly which price levels you're willing to protect and for how long. Maintain complete control over your risk exposure and income potential.",
      icon: <Sliders className="h-10 w-10" />
    },
    {
      title: "Always retain full custody",
      subtitle: "→ Your collateral remains securely locked in smart contracts",
      description: "Your collateral remains securely locked in non-custodial smart contracts, never controlled by centralized entities. Maintain ownership while earning.",
      icon: <Key className="h-10 w-10" />
    }
  ];

  return (
    <section className="py-16 md:py-24 w-full bg-gradient-to-b from-background to-background/70">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          >
            {activePersona === "protection" ? (
              <span>Insurance Policies That Work For You</span>
            ) : (
              <span>Why Bitcoiners Choose Our Income Platform</span>
            )}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            {activePersona === "protection" 
              ? "Get the protection you need with full control and transparent terms." 
              : "Generate consistent premium income while maintaining security and control."}
          </motion.p>
        </motion.div>

        {activePersona === "protection" ? (
          <motion.div 
            className="space-y-20 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {protectionFeatures.map((feature, index) => (
              <motion.div 
                key={`protection-feature-${index}`}
                variants={index % 2 === 0 ? leftItemVariants : rightItemVariants}
                className="relative"
              >
                {/* Add a connecting line between elements (except last) */}
                {index < protectionFeatures.length - 1 && (
                  <div className="hidden md:block absolute w-0.5 bg-gradient-to-b from-blue-200 to-blue-50 dark:from-blue-800 dark:to-blue-900/50 h-20 bottom-0 left-[30%] -mb-20 transform translate-x-8 opacity-70"></div>
                )}
                <FeatureCard
                  title={feature.title}
                  subtitle={feature.subtitle}
                  description={feature.description}
                  icon={feature.icon}
                  persona="protection"
                  isEven={index % 2 !== 0}
                />
            </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-20 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {incomeFeatures.map((feature, index) => (
              <motion.div 
                key={`income-feature-${index}`}
                variants={index % 2 === 0 ? leftItemVariants : rightItemVariants}
                className="relative"
              >
                {/* Add a connecting line between elements (except last) */}
                {index < incomeFeatures.length - 1 && (
                  <div className="hidden md:block absolute w-0.5 bg-gradient-to-b from-amber-200 to-amber-50 dark:from-amber-800 dark:to-amber-900/50 h-20 bottom-0 left-[30%] -mb-20 transform translate-x-8 opacity-70"></div>
                )}
                <FeatureCard
                  title={feature.title}
                  subtitle={feature.subtitle}
                  description={feature.description}
                  icon={feature.icon}
                  persona="income"
                  isEven={index % 2 !== 0}
                />
            </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href={activePersona === "protection" ? "/easy-option" : "/income-center"}
              className={`inline-block px-8 py-3 rounded-full font-medium ${
                activePersona === "protection" 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "bg-amber-500 text-white hover:bg-amber-500/90"
              } transition-colors shadow-md hover:shadow-lg`}
            >
              {activePersona === "protection" ? "Secure Your Bitcoin Now" : "Start Earning Premium Income"}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 