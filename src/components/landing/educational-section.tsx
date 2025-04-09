"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, Shield, TrendingUp, BookOpen, Play } from "lucide-react";

export function EducationalSection() {
  const [activeTab, setActiveTab] = useState("protection");

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn How BitHedge Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive into our educational resources tailored to your specific needs
          </p>
        </div>

        <Tabs
          defaultValue="protection"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger
                value="protection"
                className={cn(
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                  "h-11 text-sm md:text-base"
                )}
              >
                <Shield className="mr-2 h-4 w-4" />
                Protection
              </TabsTrigger>
              <TabsTrigger
                value="income"
                className={cn(
                  "data-[state=active]:bg-amber-500 data-[state=active]:text-white",
                  "h-11 text-sm md:text-base"
                )}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Income
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Protection Content */}
          <TabsContent value="protection" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Learn the basics */}
              <div className="bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 rounded-xl p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">For Beginners</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  New to Bitcoin protection? Our beginner resources explain how 
                  to safeguard your Bitcoin value without selling.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    <span className="text-sm md:text-base">Understanding Bitcoin price volatility</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    <span className="text-sm md:text-base">Why traditional hedging fails for Bitcoin holders</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    <span className="text-sm md:text-base">How BitHedge protection works</span>
                  </li>
                </ul>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full h-10 justify-between group border-blue-200 dark:border-blue-800/60 hover:bg-blue-100/50 dark:hover:bg-blue-900/20">
                    <span>Protection 101 Guide</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="w-full h-10 justify-between group border-blue-200 dark:border-blue-800/60 hover:bg-blue-100/50 dark:hover:bg-blue-900/20">
                    <div className="flex items-center">
                      <Play className="h-4 w-4 mr-2" />
                      <span>Getting Started Video</span>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Advanced strategies */}
              <div className="bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 rounded-xl p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Advanced Strategies</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Already familiar with Bitcoin hedging? Learn advanced protection 
                  strategies to optimize your risk management.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    <span className="text-sm md:text-base">Layered protection strategies</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    <span className="text-sm md:text-base">When to adjust protection parameters</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    <span className="text-sm md:text-base">Hedging during bull vs. bear markets</span>
                  </li>
                </ul>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full h-10 justify-between group border-blue-200 dark:border-blue-800/60 hover:bg-blue-100/50 dark:hover:bg-blue-900/20">
                    <span>Technical Strategy Guide</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="default" className="w-full h-10 justify-between group">
                    <span>Protection Simulator</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Income Content */}
          <TabsContent value="income" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Income basics */}
              <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-xl p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mr-4">
                    <BookOpen className="h-5 w-5 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-semibold">For Beginners</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Learn how to earn consistent income by providing Bitcoin protection 
                  to other users on the platform.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                    <span className="text-sm md:text-base">How providing protection generates income</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                    <span className="text-sm md:text-base">Understanding premium rates and yields</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                    <span className="text-sm md:text-base">Managing risk when providing protection</span>
                  </li>
                </ul>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full h-10 justify-between group border-amber-200 dark:border-amber-800/60 hover:bg-amber-100/50 dark:hover:bg-amber-900/20">
                    <span>Income Generation Guide</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="w-full h-10 justify-between group border-amber-200 dark:border-amber-800/60 hover:bg-amber-100/50 dark:hover:bg-amber-900/20">
                    <div className="flex items-center">
                      <Play className="h-4 w-4 mr-2" />
                      <span>Income Basics Video</span>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Advanced income strategies */}
              <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 rounded-xl p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mr-4">
                    <TrendingUp className="h-5 w-5 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Advanced Strategies</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                  Take your income generation to the next level with advanced 
                  strategies optimized for market conditions.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                    <span className="text-sm md:text-base">Dynamic premium pricing strategies</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                    <span className="text-sm md:text-base">Liquidity provision optimization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                    <span className="text-sm md:text-base">Compounding strategies for maximum yield</span>
                  </li>
                </ul>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full h-10 justify-between group border-amber-200 dark:border-amber-800/60 hover:bg-amber-100/50 dark:hover:bg-amber-900/20">
                    <span>Advanced Income Guide</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="default" className="w-full h-10 justify-between bg-amber-500 hover:bg-amber-600 group">
                    <span>Yield Calculator</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-lg mb-6 text-muted-foreground">
            Looking for more in-depth resources?
          </p>
          <Button variant="outline" size="lg" className="h-10">
            <BookOpen className="mr-2 h-4 w-4" />
            Visit Knowledge Center
          </Button>
        </div>
      </div>
    </section>
  );
} 