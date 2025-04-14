"use client";

import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type CTABannerPersona = 'protection' | 'income' | 'neutral';

interface CTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  persona?: CTABannerPersona;
  className?: string;
}

export function CTABanner({
  title,
  description,
  buttonText,
  buttonHref,
  persona = 'neutral',
  className,
}: CTABannerProps) {
  // Determine the actual button href based on persona
  const getActualButtonHref = () => {
    if (persona === 'protection') return "/easy-option";
    if (persona === 'income') return "/income-center";
    return buttonHref; // Use the provided href for neutral persona
  };

  const colorScheme = {
    protection: {
      gradientBg: "from-blue-50/70 to-blue-100/70 dark:from-blue-950/20 dark:to-blue-900/20",
      border: "border-blue-200 dark:border-blue-800/60",
      iconBg: "bg-blue-100 dark:bg-blue-900/40",
      textAccent: "text-primary",
      buttonClass: "",
      icon: <Shield className="h-6 w-6" />
    },
    income: {
      gradientBg: "from-amber-50/70 to-amber-100/70 dark:from-amber-950/20 dark:to-amber-900/20",
      border: "border-amber-200 dark:border-amber-800/60",
      iconBg: "bg-amber-100 dark:bg-amber-900/40",
      textAccent: "text-amber-500",
      buttonClass: "bg-amber-500 text-white hover:bg-amber-600",
      icon: <TrendingUp className="h-6 w-6" />
    },
    neutral: {
      gradientBg: "from-gray-50/70 to-gray-100/70 dark:from-gray-900/20 dark:to-gray-800/20",
      border: "border-gray-200 dark:border-gray-800/60",
      iconBg: "bg-gray-100 dark:bg-gray-800/40",
      textAccent: "text-foreground",
      buttonClass: "",
      icon: <ArrowRight className="h-6 w-6" />
    }
  };

  const scheme = colorScheme[persona];
  const actualHref = getActualButtonHref();
  
  return (
    <motion.div 
      className={cn(
        `bg-gradient-to-br ${scheme.gradientBg} border ${scheme.border} rounded-xl p-6 md:p-8 shadow-sm`,
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start md:items-center gap-4">
          {persona !== 'neutral' && (
            <div className={`w-12 h-12 rounded-full ${scheme.iconBg} flex items-center justify-center shrink-0`}>
              <div className={scheme.textAccent}>{scheme.icon}</div>
            </div>
          )}
          
          <div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-xl">{description}</p>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <Button 
            asChild
            variant={persona === 'income' ? 'secondary' : 'default'}
            size="lg"
            className={cn("w-full md:w-auto rounded-full", persona === 'income' && scheme.buttonClass)}
          >
            <Link href={actualHref}>
              <span>{buttonText}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 