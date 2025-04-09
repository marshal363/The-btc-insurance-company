"use client";

import { Shield, TrendingUp, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  persona: 'protection' | 'income';
}

function Testimonial({ quote, name, title, persona }: TestimonialProps) {
  const colorScheme = persona === 'protection'
    ? {
        bg: 'bg-blue-50/60 dark:bg-blue-900/10',
        border: 'border-blue-200 dark:border-blue-800/50',
        accent: 'text-primary'
      }
    : {
        bg: 'bg-amber-50/60 dark:bg-amber-900/10',
        border: 'border-amber-200 dark:border-amber-800/50',
        accent: 'text-amber-500'
      };
      
  return (
    <div className={`relative ${colorScheme.bg} ${colorScheme.border} border rounded-xl p-6 shadow-sm`}>
      <div className={`text-lg leading-relaxed mb-4 italic relative`}>
        <span className={`absolute -top-3 -left-2 text-4xl ${colorScheme.accent} opacity-30`}>&ldquo;</span>
        {quote}
        <span className={`absolute -bottom-4 -right-1 text-4xl ${colorScheme.accent} opacity-30`}>&rdquo;</span>
      </div>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 mr-3 overflow-hidden">
          {persona === 'protection' ? (
            <img src="/avatars/alex.jpg" alt="User avatar" className="w-full h-full object-cover" />
          ) : (
            <img src="/avatars/maya.jpg" alt="User avatar" className="w-full h-full object-cover" />
          )}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </div>
  );
}

export function ValueProposition() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
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
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Missing Piece in Bitcoin Risk Management
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Protection Value Prop */}
          <motion.div variants={itemVariants}>
            <div className="relative rounded-2xl overflow-hidden">
              {/* Card Content */}
              <div className="relative z-10 p-8 md:p-10 bg-blue-50/90 dark:bg-blue-950/90 border border-blue-200 dark:border-blue-800/60">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 dark:bg-blue-900/20 rounded-full -mr-12 -mt-12 z-0"></div>
                
                <div className="relative flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Sleep Well During Bitcoin Volatility</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 relative z-10">
                  When Bitcoin crashed 53% in May 2021, unprotected holders lost thousands overnight. 
                  BitHedge users maintained their guaranteed selling price, preserving their wealth
                  during the downturn.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span>Protection kicks in automatically when prices drop</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span>Peace of mind regardless of market conditions</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span>Maintain upside potential if Bitcoin price increases</span>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-blue-100/50 dark:bg-blue-900/20 mb-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    <span className="font-medium text-foreground">Bitcoin Price Drop Simulation</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-red-500 font-medium">-$12,400</div>
                      <div className="text-xs text-muted-foreground">Without Protection</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-green-500 font-medium">+$320</div>
                      <div className="text-xs text-muted-foreground">With BitHedge</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Testimonial
              quote="It's like insurance for my Bitcoin - I finally feel comfortable holding through market turbulence."
              name="Alex K."
              title="BitHedge User"
              persona="protection"
            />
          </motion.div>

          {/* Income Value Prop */}
          <motion.div variants={itemVariants}>
            <div className="relative rounded-2xl overflow-hidden">
              {/* Card Content */}
              <div className="relative z-10 p-8 md:p-10 bg-amber-50/90 dark:bg-amber-950/90 border border-amber-200 dark:border-amber-800/60">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 dark:bg-amber-900/20 rounded-full -mr-12 -mt-12 z-0"></div>
                
                <div className="relative flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Unlock New Yield Streams From Your STX</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 relative z-10">
                  While regular stacking offers 8-10% APY, BitHedge protection providers earned 
                  an average of 23% APY in premium income during recent market volatility.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                    <span>Premium collection upfront, before providing protection</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                    <span>Multiple protection strategies to maximize earnings</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                    <span>Complete control over risk and protection terms</span>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-amber-100/50 dark:bg-amber-900/20 mb-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    <span className="font-medium text-foreground">Yield Comparison</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-amber-500 font-medium">8-10%</div>
                      <div className="text-xs text-muted-foreground">Stacking</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-amber-500 font-medium">5-12%</div>
                      <div className="text-xs text-muted-foreground">DeFi Lending</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-amber-500 font-medium">15-25%</div>
                      <div className="text-xs text-muted-foreground">BitHedge</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Testimonial
              quote="I've been looking for ways to generate yield in the Bitcoin ecosystem - BitHedge opened a completely new opportunity."
              name="Maya R."
              title="BitHedge Provider"
              persona="income"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 