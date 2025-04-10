"use client";

import { FileText, PlayCircle, BookOpen, BookOpenCheck, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Persona } from "./hero";
import { CTABanner } from './cta-banner';

interface EducationalSectionProps {
  activePersona?: Persona;
}

export function EducationalSection({ activePersona }: EducationalSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(activePersona || "protection");
  
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
                      <BookOpenCheck className="h-4 w-4 text-amber-500" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <motion.div variants={itemVariants}>
                  <Card className="p-6 h-full border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/10">
                    <h3 className="text-xl font-bold mb-2">Beginner Strategies</h3>
                    <CardDescription className="mb-4">Perfect for first-time Bitcoin hedgers</CardDescription>
                    <ul className="space-y-4 mb-6">
                      <li className="flex">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Understanding Price Protection</p>
                          <p className="text-sm text-muted-foreground">Learn the basics of protecting your Bitcoin value</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Setting Your First Protection Level</p>
                          <p className="text-sm text-muted-foreground">How to choose the right protection price</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Calculating Premium Costs</p>
                          <p className="text-sm text-muted-foreground">Understanding the price of protection</p>
                        </div>
                      </li>
                    </ul>
                    <div className="flex space-x-3">
                      <Button variant="outline" className="group">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Download Guide</span>
                      </Button>
                      <Button variant="ghost" className="text-primary group">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        <span>Watch Video</span>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Card className="p-6 h-full border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/10">
                    <h3 className="text-xl font-bold mb-2">Advanced Strategies</h3>
                    <CardDescription className="mb-4">For experienced Bitcoin holders</CardDescription>
                    <ul className="space-y-4 mb-6">
                      <li className="flex">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Laddered Protection Strategy</p>
                          <p className="text-sm text-muted-foreground">Protect at multiple price levels</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Rolling Protection</p>
                          <p className="text-sm text-muted-foreground">Maintaining protection over longer periods</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Tax-Efficient Protection</p>
                          <p className="text-sm text-muted-foreground">Optimizing taxes when using protection</p>
                        </div>
                      </li>
                    </ul>
                    <div className="flex space-x-3">
                      <Button variant="outline" className="group">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Download Guide</span>
                      </Button>
                      <Button variant="ghost" className="text-primary group">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        <span>Watch Video</span>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="flex justify-center"
              >
                <Button className="group">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <motion.div variants={itemVariants}>
                  <Card className="p-6 h-full border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10">
                    <h3 className="text-xl font-bold mb-2">Beginner Strategies</h3>
                    <CardDescription className="mb-4">Start earning premium income with your STX</CardDescription>
                    <ul className="space-y-4 mb-6">
                      <li className="flex">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-amber-500">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Understanding Protection Provision</p>
                          <p className="text-sm text-muted-foreground">Learn how providing protection generates income</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-amber-500">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Your First Premium Collection</p>
                          <p className="text-sm text-muted-foreground">Step-by-step guide to offering protection</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-amber-500">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Risk Management Basics</p>
                          <p className="text-sm text-muted-foreground">Managing downside when providing protection</p>
                        </div>
                      </li>
                    </ul>
                    <div className="flex space-x-3">
                      <Button variant="outline" className="group">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Download Guide</span>
                      </Button>
                      <Button variant="ghost" className="text-amber-500 group">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        <span>Watch Video</span>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Card className="p-6 h-full border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10">
                    <h3 className="text-xl font-bold mb-2">Advanced Strategies</h3>
                    <CardDescription className="mb-4">Maximize your STX yield potential</CardDescription>
                    <ul className="space-y-4 mb-6">
                      <li className="flex">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-amber-500">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Delta-Neutral Strategies</p>
                          <p className="text-sm text-muted-foreground">Reduce exposure while collecting premium</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-amber-500">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Premium Optimization</p>
                          <p className="text-sm text-muted-foreground">Finding the best risk/reward balance</p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-amber-500">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Stacking + Premium Strategy</p>
                          <p className="text-sm text-muted-foreground">Combining STX yields for maximum returns</p>
                        </div>
                      </li>
                    </ul>
                    <div className="flex space-x-3">
                      <Button variant="outline" className="group">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Download Guide</span>
                      </Button>
                      <Button variant="ghost" className="text-amber-500 group">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        <span>Watch Video</span>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="flex justify-center"
              >
                <Button className="group">
                  <span>Browse All Income Guides</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
        
        {/* Added CTA Banner based on active tab */}
        <div className="mt-12">
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