"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, TrendingUp, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PersonaSwitcherProps {
  activePersona: 'protection' | 'income';
  onChange: (persona: 'protection' | 'income') => void;
  className?: string;
}

export function PersonaSwitcher({ activePersona, onChange, className = "" }: PersonaSwitcherProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={() => onChange('protection')}
        className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          activePersona === 'protection'
            ? 'bg-primary text-primary-foreground'
            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
        }`}
      >
        <Shield className="h-4 w-4" />
        <span>Protection</span>
        {activePersona === 'protection' && (
          <motion.div
            layoutId="activePill"
            className="absolute inset-0 rounded-full bg-primary"
            style={{ zIndex: -1 }}
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </button>
      
      <button
        onClick={() => onChange('income')}
        className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          activePersona === 'income'
            ? 'bg-amber-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
        }`}
      >
        <TrendingUp className="h-4 w-4" />
        <span>Income</span>
        {activePersona === 'income' && (
          <motion.div
            layoutId="activePill"
            className="absolute inset-0 rounded-full bg-amber-500"
            style={{ zIndex: -1 }}
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
      </button>
    </div>
  );
}

export function PersonaBanner({ activePersona, onChange }: PersonaSwitcherProps) {
  return (
    <motion.div 
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 rounded-full shadow-lg ${
        activePersona === 'protection' 
          ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
          : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
      }`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
    >
      <div className="px-3 py-2 flex items-center">
        <div className="flex items-center mr-3">
          <div className="mr-2">
            {activePersona === 'protection' ? (
              <Shield className="h-5 w-5 text-primary" />
            ) : (
              <TrendingUp className="h-5 w-5 text-amber-500" />
            )}
          </div>
          <span className="text-sm font-medium">
            {activePersona === 'protection' 
              ? 'Viewing protection content' 
              : 'Viewing income content'}
          </span>
        </div>
        <button 
          onClick={() => onChange(activePersona === 'protection' ? 'income' : 'protection')}
          className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>Switch to {activePersona === 'protection' ? 'income' : 'protection'}</span>
          <ChevronRight className="h-3 w-3 ml-1" />
        </button>
      </div>
    </motion.div>
  );
}

export function usePersonaState() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  // Default to protection, but check URL for persona parameter
  const paramPersona = searchParams.get('persona');
  const initialPersona = paramPersona === 'income' ? 'income' : 'protection';
  
  const [activePersona, setActivePersona] = useState<'protection' | 'income'>(initialPersona);
  
  // Update the URL when persona changes
  const handlePersonaChange = (persona: 'protection' | 'income') => {
    setActivePersona(persona);
    
    // Update URL with the new persona
    const params = new URLSearchParams(searchParams.toString());
    params.set('persona', persona);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  
  return { activePersona, handlePersonaChange };
} 