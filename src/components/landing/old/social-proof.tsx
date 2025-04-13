"use client";

import React from 'react';
import { Shield, TrendingUp, Users, Bitcoin, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Persona } from "./hero";

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

interface SocialProofProps {
  activePersona: Persona;
}

export function SocialProof({ activePersona }: SocialProofProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {activePersona === "protection" 
              ? "Hear From Bitcoin Holders Like You"
              : "What STX Providers Are Saying" 
            }
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {activePersona === "protection"
              ? "Bitcoin investors protecting their holdings with The Bitcoin Insurance Company"
              : "STX providers earning consistent returns on The Bitcoin Insurance Company" 
            }
          </p>
        </motion.div>
        
        {/* Platform Metrics - Show metrics relevant to the selected persona */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {activePersona === "protection" ? (
            <>
              <Metric 
                value="$12M+"
                label="Total Bitcoin Value Protected" 
                icon={<Bitcoin className="h-8 w-8" />}
              />
              <Metric 
                value="3,800+"
                label="Protection Policies Created"
                icon={<Shield className="h-8 w-8" />}
              />
              <Metric 
                value="97%"
                label="Renewal Rate"
                icon={<Users className="h-8 w-8" />}
              />
            </>
          ) : (
            <>
              <Metric 
                value="320k STX"
                label="Premium Income Generated"
                icon={<Wallet className="h-8 w-8" />}
              />
              <Metric 
                value="18.5%"
                label="Average APY for Providers"
                icon={<TrendingUp className="h-8 w-8" />}
              />
              <Metric 
                value="5,400+"
                label="Active Protection Providers"
                icon={<Users className="h-8 w-8" />}
              />
            </>
          )}
        </div>
        
        {/* Featured Testimonials - specific to the active persona */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {activePersona === "protection" && (
            <>
              <Testimonial
                quote="The Bitcoin Insurance Company completely changed how I manage downside risk. No more sleepless nights during market corrections."
                author="Alex Johnson"
                role="Bitcoin investor"
                persona="protection"
              />
              <Testimonial
                quote="During May's 30% Bitcoin crash, my protected position saved me over $12,000 in potential losses."
                author="Michael T."
                role="Bitcoin investor since 2017"
                persona="protection"
              />
            </>
          )}
          
          {activePersona === "income" && (
            <>
              <Testimonial
                quote="The consistent yield from providing Bitcoin protection has outperformed every other investment strategy I've tried."
                author="Maya Rodriguez"
                role="STX holder & yield farmer"
                persona="income"
              />
              <Testimonial
                quote="The platform automatically suggests optimal protection parameters based on current market conditions."
                author="Jennifer R."
                role="DeFi Investor"
                persona="income"
              />
            </>
          )}
        </div>
        
        {/* User Testimonial Cards - only show what's relevant to the persona */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {activePersona === "protection" && (
            <>
              <Card className="p-6 border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/10">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3 bg-blue-100 dark:bg-blue-800 text-primary">
                    <AvatarImage src="/avatars/michael.jpg" alt="Michael" />
                    <AvatarFallback>MB</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Michael B.</p>
                    <p className="text-sm text-muted-foreground">Bitcoin investor since 2017</p>
                  </div>
                </div>
                <div className="flex mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="text-amber-400">★</div>
                  ))}
                </div>
                <p className="mb-4">
                  I was looking for a way to protect my Bitcoin during market drops without selling. The Bitcoin Insurance Company let me set protection at exactly the price I wanted, giving me peace of mind.
                </p>
                <p className="text-sm text-muted-foreground">Protected 0.65 BTC during the 2023 market correction</p>
              </Card>
              
              <Card className="p-6 border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/10">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3 bg-blue-100 dark:bg-blue-800 text-primary">
                    <AvatarImage src="/avatars/sarah.jpg" alt="Sarah" />
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Sarah L.</p>
                    <p className="text-sm text-muted-foreground">Long-term HODLer</p>
                  </div>
                </div>
                <div className="flex mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="text-amber-400">★</div>
                  ))}
                </div>
                <p className="mb-4">
                  The Bitcoin Insurance Company changed how I manage my portfolio. Now I can hold Bitcoin long-term with confidence knowing I have downside protection in place whenever I need it.
                </p>
                <p className="text-sm text-muted-foreground">Uses The Bitcoin Insurance Company during high volatility periods</p>
              </Card>
            </>
          )}
          
          {activePersona === "income" && (
            <>
              <Card className="p-6 border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3 bg-amber-100 dark:bg-amber-800 text-amber-500">
                    <AvatarImage src="/avatars/david.jpg" alt="David" />
                    <AvatarFallback>DK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">David K.</p>
                    <p className="text-sm text-muted-foreground">Yield Strategist</p>
                  </div>
                </div>
                <div className="flex mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="text-amber-400">★</div>
                  ))}
                </div>
                <p className="mb-4">
                  I&apos;ve provided protection on The Bitcoin Insurance Company for 3 months and generated 18.7% APY on my STX - significantly outperforming my previous DeFi strategies.
                </p>
                <p className="text-sm text-muted-foreground">Active provider since January 2023</p>
              </Card>
              
              <Card className="p-6 border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3 bg-amber-100 dark:bg-amber-800 text-amber-500">
                    <AvatarImage src="/avatars/jennifer.jpg" alt="Jennifer" />
                    <AvatarFallback>JR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jennifer R.</p>
                    <p className="text-sm text-muted-foreground">DeFi Investor</p>
                  </div>
                </div>
                <div className="flex mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="text-amber-400">★</div>
                  ))}
                </div>
                <p className="mb-4">
                  The analytics on The Bitcoin Insurance Company are unmatched. I can see exactly what my risk profile is and adjust my protection parameters to maximize returns while keeping risk in check.
                </p>
                <p className="text-sm text-muted-foreground">Manages a multi-strategy yield portfolio</p>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  );
} 