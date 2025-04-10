"use client";

import { Shield, TrendingUp, CheckCircle2, LayoutDashboard, Gauge, Lightbulb, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { Persona } from "./hero";

interface ValuePropositionProps {
  activePersona: Persona;
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 md:py-24 w-full bg-gradient-to-b from-background to-background/70">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          >
            {activePersona === "protection" ? (
              <span>The missing piece in <span className="text-primary">Bitcoin</span> <span className="text-primary">risk management</span></span>
            ) : (
              <span>Unlock premium <span className="text-amber-500">yield streams</span></span>
            )}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {activePersona === "protection" 
              ? "Secure your Bitcoin with guaranteed protection levels while maintaining upside potential." 
              : "Generate consistent premium income by providing protection to Bitcoin holders."}
          </motion.p>
        </motion.div>

        {activePersona === "protection" ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Main feature card - Sleep Well */}
            <motion.div 
              className="col-span-1 md:col-span-6 lg:col-span-6"
              variants={itemVariants}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden h-full border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 group hover:shadow-md">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Sleep Well During Bitcoin Volatility</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    When Bitcoin crashed 53% in May 2021, unprotected holders lost thousands overnight. 
                    BitHedge users maintained their guaranteed selling price, preserving their wealth
                    during the downturn.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span>Protection kicks in automatically when prices drop</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span>Peace of mind regardless of market conditions</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span>Maintain upside potential if Bitcoin price increases</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="text-sm mb-3 font-medium">
                      Bitcoin Price Drop Simulation
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-red-500 font-medium text-lg flex items-center">
                            <span className="mr-1">↘</span> -$12,400
                          </div>
                          <div className="text-xs text-muted-foreground">Without Protection</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <div className="text-green-500 font-medium text-lg flex items-center">
                            <span className="mr-1">↗</span> +$320
                          </div>
                          <div className="text-xs text-muted-foreground">With BitHedge</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Feature card - Protection Without Complexity */}
            <motion.div 
              className="col-span-1 md:col-span-6 lg:col-span-6"
              variants={itemVariants}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden h-full border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 group hover:shadow-md">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
                      <LayoutDashboard className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Protection Without Complexity</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    Traditional options platforms require advanced financial knowledge. BitHedge&apos;s 
                    protection policies use familiar insurance concepts you already understand.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span>Customizable coverage amounts</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span>Flexible protection periods</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <span>Transparent maximum costs</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="text-sm mb-3 font-medium">
                      Simple vs. Complex
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                          <div className="text-red-500 font-medium mb-1">Traditional Options</div>
                          <div className="text-xs text-muted-foreground">Greeks, IV, premium decay...</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                          <div className="text-green-500 font-medium mb-1">BitHedge</div>
                          <div className="text-xs text-muted-foreground">Pay once, stay protected</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Stats cards - 3 small cards in a row */}
            <motion.div 
              className="col-span-1 md:col-span-4 lg:col-span-4"
              variants={itemVariants}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden h-full border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">$24.7M+</h3>
                <p className="text-muted-foreground text-sm">Bitcoin Protected</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="col-span-1 md:col-span-4 lg:col-span-4"
              variants={itemVariants}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden h-full border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                  <Percent className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">97%</h3>
                <p className="text-muted-foreground text-sm">Automatic Renewal Rate</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="col-span-1 md:col-span-4 lg:col-span-4"
              variants={itemVariants}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden h-full border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">3,200+</h3>
                <p className="text-muted-foreground text-sm">Active Protection Policies</p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Main feature card - Unlock Yield Streams */}
            <motion.div 
              className="col-span-1 md:col-span-6 lg:col-span-6"
              variants={itemVariants}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden h-full border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 group hover:shadow-md">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
                      <TrendingUp className="h-5 w-5 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold">Unlock New Yield Streams From Your STX</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    While regular stacking offers 8-10% APY, BitHedge protection providers earned 
                    an average of 23% APY in premium income during recent market volatility.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-amber-500" />
                      </div>
                      <span>Premium collection upfront, before providing protection</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-amber-500" />
                      </div>
                      <span>Multiple protection strategies to maximize earnings</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-amber-500" />
                      </div>
                      <span>Complete control over risk and protection terms</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="text-sm mb-3 font-medium">
                      Yield Comparison
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                          <div className="text-amber-500 font-medium text-lg">8-10%</div>
                          <div className="text-xs text-muted-foreground">Stacking</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                          <div className="text-amber-500 font-medium text-lg">5-12%</div>
                          <div className="text-xs text-muted-foreground">DeFi Lending</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                          <div className="text-amber-500 font-medium text-lg">15-25%</div>
                          <div className="text-xs text-muted-foreground">BitHedge</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Feature card - Risk Visualization */}
            <motion.div 
              className="col-span-1 md:col-span-6 lg:col-span-6"
              variants={itemVariants}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden h-full border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 group hover:shadow-md">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
                      <Gauge className="h-5 w-5 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold">Complete Risk Visualization</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    BitHedge gives protection providers unprecedented visibility into their position 
                    with real-time metrics and projections.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-amber-500" />
                      </div>
                      <span>Premium yield calculator</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-amber-500" />
                      </div>
                      <span>Auto-suggested protection parameters</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-amber-500" />
                      </div>
                      <span>Comprehensive risk dashboard</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="text-sm mb-3 font-medium">
                      Risk Management Tools
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center mb-2">
                            <TrendingUp className="h-4 w-4 text-amber-500" />
                          </div>
                          <div className="text-xs text-center">Real-time metrics</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center mb-2">
                            <Shield className="h-4 w-4 text-amber-500" />
                          </div>
                          <div className="text-xs text-center">Smart risk controls</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Stats cards - 3 small cards in a row */}
            <motion.div 
              className="col-span-1 md:col-span-4 lg:col-span-4"
              variants={itemVariants}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden h-full border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold mb-1">$1.2M+</h3>
                <p className="text-muted-foreground text-sm">Premiums Distributed</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="col-span-1 md:col-span-4 lg:col-span-4"
              variants={itemVariants}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden h-full border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-4">
                  <Percent className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold mb-1">23%</h3>
                <p className="text-muted-foreground text-sm">Average APY</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="col-span-1 md:col-span-4 lg:col-span-4"
              variants={itemVariants}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden h-full border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold mb-1">200+</h3>
                <p className="text-muted-foreground text-sm">Active Providers</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`px-8 py-3 rounded-full font-medium ${
              activePersona === "protection" 
                ? "bg-primary text-white hover:bg-primary/90" 
                : "bg-amber-500 text-white hover:bg-amber-500/90"
            } transition-colors shadow-md hover:shadow-lg`}
          >
            {activePersona === "protection" ? "Secure Your Bitcoin Now" : "Start Earning Premium Income"}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 