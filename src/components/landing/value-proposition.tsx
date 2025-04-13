"use client";

import { Shield, CheckCircle2, Gauge, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { Persona } from "./old/hero";

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
            className="space-y-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="flex gap-8 rounded-xl p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Full ownership maintained</h3>
                <p className="text-muted-foreground mb-2">→ You always keep control of your Bitcoin</p>
                <p className="text-sm">Your Bitcoin never leaves your wallet. Our non-custodial smart contracts ensure you maintain full ownership while still getting the protection you need.</p>
              </div>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="flex gap-8 rounded-xl p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Percent className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">One-time policy premium</h3>
                <p className="text-muted-foreground mb-2">→ No recurring fees or hidden costs</p>
                <p className="text-sm">Pay once and stay protected until your policy expiration date. All costs are shown upfront with complete transparency before you commit.</p>
              </div>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="flex gap-8 rounded-xl p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Gauge className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Activate only when needed</h3>
                <p className="text-muted-foreground mb-2">→ Your policy stays dormant until prices fall</p>
                <p className="text-sm">No action required unless Bitcoin drops below your protected price. Your policy automatically becomes active exactly when you need it most.</p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="flex gap-8 rounded-xl p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-amber-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Earn income immediately</h3>
                <p className="text-muted-foreground">Receive premiums upfront as soon as your protection offering is matched with a buyer. No waiting periods or delayed payments.</p>
              </div>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="flex gap-8 rounded-xl p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-amber-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Set your own risk parameters</h3>
                <p className="text-muted-foreground">Choose exactly which price levels you&apos;re willing to protect and for how long. Maintain complete control over your risk exposure and income potential.</p>
              </div>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="flex gap-8 rounded-xl p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-amber-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Always retain full custody</h3>
                <p className="text-muted-foreground">Your collateral remains securely locked in non-custodial smart contracts, never controlled by centralized entities. Maintain ownership while earning.</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div 
          className="mt-16 text-center"
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