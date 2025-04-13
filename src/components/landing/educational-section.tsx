"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Persona } from "./old/hero";
import { CTABanner } from './cta-banner';

interface EducationalSectionProps {
  activePersona?: Persona;
}

export function EducationalSection({ activePersona }: EducationalSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(activePersona || "protection");
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  // Update activeTab when activePersona changes
  useEffect(() => {
    if (activePersona) {
      setActiveTab(activePersona);
    }
  }, [activePersona]);
  
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
    <section className="py-16 md:py-24 w-full bg-muted/30">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {activePersona === "protection" 
              ? "Learn How to Protect Your Bitcoin"
              : activePersona === "income"
              ? "Master STX Premium Income Strategies" 
              : "Educational Resources"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {activePersona === "protection"
              ? "Discover powerful hedging strategies to safeguard your Bitcoin holdings during market volatility."
              : activePersona === "income"
              ? "Unlock advanced strategies to maximize your yield from STX by providing downside protection."
              : "Explore our comprehensive resources to understand Bitcoin hedging and income strategies."}
          </p>
        </motion.div>
        
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab}
          className="w-full" 
          onValueChange={setActiveTab}
        >
          {!activePersona && (
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="protection">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mr-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <span>For BTC Holders</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="income">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center mr-2">
                      <BookOpen className="h-4 w-4 text-amber-500" />
                    </div>
                    <span>For STX Holders</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>
          )}
          
          {/* Protection Content */}
          <TabsContent value="protection" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex flex-col items-center mb-8">
                <div className="inline-flex items-center p-1 bg-background rounded-full border border-gray-200 dark:border-gray-800 shadow-sm mb-10">
                  <button
                    onClick={() => setLevel('beginner')}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      level === 'beginner' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    Beginner
                  </button>
                  <button
                    onClick={() => setLevel('intermediate')}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      level === 'intermediate' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    Intermediate
                  </button>
                  <button
                    onClick={() => setLevel('advanced')}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      level === 'advanced' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    Advanced
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {level === 'beginner' && (
                  <>
                    <EducationalCard
                      icon={<Lightbulb className="w-6 h-6" />}
                      title="What is Bitcoin Insurance?"
                      description="Learn the fundamentals of price protection policies and how they can secure your bitcoin holdings against market volatility."
                      badge="5 min read"
                      persona="protection"
                    />
                    <EducationalCard
                      icon={<BookOpen className="w-6 h-6" />}
                      title="Types of Protection Policies"
                      description="Understand the different types of policies available and how to choose the right one for your risk tolerance and portfolio."
                      badge="7 min read"
                      persona="protection"
                    />
                    <EducationalCard
                      icon={<GraduationCap className="w-6 h-6" />}
                      title="Getting Started Guide"
                      description="A step-by-step walkthrough of how to purchase your first insurance policy, activation, and what happens in case of a claim."
                      badge="Interactive guide"
                      persona="protection"
                    />
                  </>
                )}

                {level === 'intermediate' && (
                  <>
                    <EducationalCard
                      icon={<Lightbulb className="w-6 h-6" />}
                      title="Optimizing Protection Costs"
                      description="Strategies for minimizing premiums while maintaining adequate protection levels for your bitcoin holdings."
                      badge="8 min read"
                      persona="protection"
                    />
                    <EducationalCard
                      icon={<BookOpen className="w-6 h-6" />}
                      title="Protection During Market Volatility"
                      description="How to adjust your policies during different market cycles and strategies for optimizing coverage."
                      badge="Video + Article"
                      persona="protection"
                    />
                    <EducationalCard
                      icon={<GraduationCap className="w-6 h-6" />}
                      title="Understanding Premium Mechanics"
                      description="Learn how premiums are calculated, market factors that affect them, and how to time your policy purchases."
                      badge="Interactive calculator"
                      persona="protection"
                    />
                  </>
                )}

                {level === 'advanced' && (
                  <>
                    <EducationalCard
                      icon={<Lightbulb className="w-6 h-6" />}
                      title="Technical Mechanics of Claims"
                      description="Deep dive into the smart contract execution, verification process, and settlement mechanisms for policy claims."
                      badge="Technical guide"
                      persona="protection"
                    />
                    <EducationalCard
                      icon={<BookOpen className="w-6 h-6" />}
                      title="Multi-level Protection Strategies"
                      description="Advanced portfolio protection strategies combining different policy types, strike prices, and expiration periods."
                      badge="Case study"
                      persona="protection"
                    />
                    <EducationalCard
                      icon={<GraduationCap className="w-6 h-6" />}
                      title="Tax Implications of Insurance"
                      description="Understand potential tax considerations when purchasing policies and receiving claim payouts in different jurisdictions."
                      badge="Expert analysis"
                      persona="protection"
                    />
                  </>
                )}
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="flex justify-center mt-12"
              >
                <Button className="group rounded-full" variant="outline">
                  <span>Browse All Protection Guides</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          {/* Income Content */}
          <TabsContent value="income" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex flex-col items-center mb-8">
                <div className="inline-flex items-center p-1 bg-background rounded-full border border-gray-200 dark:border-gray-800 shadow-sm mb-10">
                  <button
                    onClick={() => setLevel('beginner')}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      level === 'beginner' 
                        ? 'bg-amber-500 text-white' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    Beginner
                  </button>
                  <button
                    onClick={() => setLevel('intermediate')}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      level === 'intermediate' 
                        ? 'bg-amber-500 text-white' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    Intermediate
                  </button>
                  <button
                    onClick={() => setLevel('advanced')}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      level === 'advanced' 
                        ? 'bg-amber-500 text-white' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    Advanced
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {level === 'beginner' && (
                  <>
                    <EducationalCard
                      icon={<Lightbulb className="w-6 h-6" />}
                      title="Earning With Your Bitcoin"
                      description="Learn the fundamentals of generating premium income by providing insurance coverage to other Bitcoin holders."
                      badge="5 min read"
                      persona="income"
                    />
                    <EducationalCard
                      icon={<BookOpen className="w-6 h-6" />}
                      title="Setting Up Your First Offer"
                      description="Step-by-step guide to creating your first income offer, setting parameters, and understanding potential returns."
                      badge="Interactive demo"
                      persona="income"
                    />
                    <EducationalCard
                      icon={<GraduationCap className="w-6 h-6" />}
                      title="Risk Management Basics"
                      description="Understanding your exposure when providing coverage and how to manage potential risks effectively."
                      badge="7 min read"
                      persona="income"
                    />
                  </>
                )}

                {level === 'intermediate' && (
                  <>
                    <EducationalCard
                      icon={<Lightbulb className="w-6 h-6" />}
                      title="Optimizing Your Income Strategy"
                      description="Techniques for balancing risk and reward when setting your coverage parameters and pricing your offers."
                      badge="Case studies"
                      persona="income"
                    />
                    <EducationalCard
                      icon={<BookOpen className="w-6 h-6" />}
                      title="Market Analysis for Providers"
                      description="How to read market signals to time your offers and adjust parameters for maximum premium income."
                      badge="Video tutorial"
                      persona="income"
                    />
                    <EducationalCard
                      icon={<GraduationCap className="w-6 h-6" />}
                      title="Understanding Buyer Behavior"
                      description="Insights into what protection buyers look for and how to make your offers more attractive to the market."
                      badge="Data analysis"
                      persona="income"
                    />
                  </>
                )}

                {level === 'advanced' && (
                  <>
                    <EducationalCard
                      icon={<Lightbulb className="w-6 h-6" />}
                      title="Advanced Liquidity Management"
                      description="Sophisticated strategies for managing your capital across multiple offers and optimizing for changing market conditions."
                      badge="Expert guide"
                      persona="income"
                    />
                    <EducationalCard
                      icon={<BookOpen className="w-6 h-6" />}
                      title="Dynamic Parameter Adjustments"
                      description="Automated approaches to adjusting your coverage parameters based on market volatility and demand shifts."
                      badge="Technical walkthrough"
                      persona="income"
                    />
                    <EducationalCard
                      icon={<GraduationCap className="w-6 h-6" />}
                      title="Premium Income Portfolio Theory"
                      description="Mathematical models for maximizing returns while minimizing risk across your entire insurance offering portfolio."
                      badge="Mathematical models"
                      persona="income"
                    />
                  </>
                )}
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="flex justify-center mt-12"
              >
                <Button className="group rounded-full" variant="outline">
                  <span>Browse All Income Guides</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
        
        {/* Added CTA Banner based on active tab */}
        <div className="mt-20">
          {activeTab === "protection" ? (
            <CTABanner
              title="Ready to protect your Bitcoin?"
              description="Create your first protection policy in minutes. No prior experience needed."
              buttonText="Get Started"
              buttonHref="/protection"
              persona="protection"
            />
          ) : (
            <CTABanner
              title="Start earning passive income today"
              description="Put your STX to work by providing Bitcoin protection and earning premiums."
              buttonText="Start Earning"
              buttonHref="/income"
              persona="income"
            />
          )}
        </div>
      </div>
    </section>
  );
}

interface EducationalCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
  persona: 'protection' | 'income';
}

function EducationalCard({ icon, title, description, badge, persona }: EducationalCardProps) {
  // Define colors based on persona like in value-proposition.tsx
  const colors = persona === 'protection' 
    ? {
        gradient: "from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/30",
        border: "border-blue-100 dark:border-blue-800",
        accent: "bg-primary",
        iconBg: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-primary",
        iconBorder: "border-blue-200 dark:border-blue-700",
        badgeBg: "bg-primary/10 dark:bg-primary/20",
        badgeText: "text-primary"
      }
    : {
        gradient: "from-white to-amber-50 dark:from-gray-800 dark:to-amber-900/30",
        border: "border-amber-100 dark:border-amber-800",
        accent: "bg-amber-500",
        iconBg: "bg-amber-100 dark:bg-amber-900/40",
        iconColor: "text-amber-500",
        iconBorder: "border-amber-500/50",
        badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
        badgeText: "text-amber-500 dark:text-amber-400"
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className={`bg-gradient-to-br ${colors.gradient} rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-all duration-200 h-full flex flex-col relative`}
    >
      {/* Colored accent bar at top */}
      <div className={`absolute top-0 left-0 w-full h-1 ${colors.accent} rounded-t-xl`}></div>
      
      {/* Icon with pulsing effect - similar to Policy Buyer card */}
      <div className="mb-4">
        <div className={`w-20 h-20 rounded-full ${colors.iconBg} flex items-center justify-center shadow-inner relative`}>
          <div className={`${colors.iconColor} relative`}>
            <div className="h-10 w-10 flex items-center justify-center">
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
      
      {/* Content - maintaining existing structure but with enhanced styling */}
      <div className="flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
        {/* Improved separator that matches the Policy Buyer card */}
        <div className="w-full border-t border-gray-200 dark:border-gray-700 my-4"></div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      </div>
      
      {/* Improved badge styling to match the Policy Buyer/Income Provider cards */}
      <div className="mt-4 pt-4">
        <div className={`${colors.badgeBg} ${colors.badgeText} px-3 py-2 rounded-full text-sm font-medium inline-block`}>
          {badge}
        </div>
      </div>
    </motion.div>
  );
} 