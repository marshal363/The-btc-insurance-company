"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Persona } from "./old/hero"; // Import Persona type
import { useState } from "react";
import { Loader2 } from "lucide-react";

// Add Props interface
interface CTAProps {
  activePersona: Persona;
}

export function CTA({ activePersona }: CTAProps) { // Add activePersona prop
  const isProtection = activePersona === "protection";
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Start Exploring Bitcoin Insurance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The Bitcoin Insurance Company is currently in public testing phase. Join us to explore how Bitcoin insurance works without using real funds.
          </p>
        </motion.div>

        {/* Enhanced Main CTA card */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div 
            key="cta-card"
            className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${isProtection ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-amber-100 dark:bg-amber-900/40'} flex items-center justify-center`}>
                    {isProtection 
                      ? <Shield className={`h-5 w-5 text-primary`} /> 
                      : <TrendingUp className={`h-5 w-5 text-amber-500`} />
                    }
                  </div>
                  <h3 className="text-2xl font-bold">
                    {isProtection 
                      ? "Experience Protection Without Risk" 
                      : "Simulate Income Strategies Safely"}
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {isProtection
                    ? "Test how Bitcoin protection works in our sandbox environment with simulated funds. Explore the full insurance experience without financial commitment." 
                    : "Experiment with different income strategies and risk parameters without committing real capital. Perfect your approach before going live."}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className={`h-5 w-5 mt-0.5 ${isProtection ? 'text-primary' : 'text-amber-500'}`} />
                    <div>
                      <span className="text-sm font-medium">Full Platform Access</span>
                      <p className="text-xs text-muted-foreground">Test every feature with no limitations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className={`h-5 w-5 mt-0.5 ${isProtection ? 'text-primary' : 'text-amber-500'}`} />
                    <div>
                      <span className="text-sm font-medium">Simulated Funds</span>
                      <p className="text-xs text-muted-foreground">Realistic experience with no financial risk</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className={`h-5 w-5 mt-0.5 ${isProtection ? 'text-primary' : 'text-amber-500'}`} />
                    <div>
                      <span className="text-sm font-medium">Interactive Tutorials</span>
                      <p className="text-xs text-muted-foreground">Guided walkthroughs for new users</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className={`h-5 w-5 mt-0.5 ${isProtection ? 'text-primary' : 'text-amber-500'}`} />
                    <div>
                      <span className="text-sm font-medium">Market Simulation</span>
                      <p className="text-xs text-muted-foreground">Test against realistic market conditions</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-center items-center lg:items-start gap-4 min-w-[220px]">
                <Button 
                  asChild 
                  size="lg" 
                  className={`rounded-full w-full ${isProtection ? '' : 'bg-amber-500 hover:bg-amber-600'}`}
                >
                  <Link href={isProtection ? "/easy-option" : "/income-center"}>
                    <span>Launch Testing Environment</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="w-full rounded-full"
                >
                  <Link href="/docs">
                    <span>View Documentation</span>
                  </Link>
                </Button>
                
                {/* Visual element for sandbox */}
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg w-full text-center">
                  <div className="text-xs text-muted-foreground">Current Testing Users</div>
                  <div className="text-2xl font-bold">1,428</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">User-controlled assets</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Bitcoin-secured</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Built on Stacks</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">No real funds needed</span>
          </div>
        </motion.div>
        
        {/* Enhanced waitlist component */}
        <motion.div 
          className="max-w-3xl mx-auto mt-16 border-t pt-12 border-dashed border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-muted/50 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">
                  Want to be notified when we launch for real funds?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Be the first to know when our Bitcoin insurance products go live.
                </p>
              </div>
              
              {isSubscribed ? (
                <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>You&apos;re on the waitlist! We&apos;ll notify you soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email" 
                      required
                      className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-w-[250px]" 
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className={`rounded-full ${isProtection ? "" : "bg-amber-500 hover:bg-amber-600"}`}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Joining...</span>
                      </>
                    ) : (
                      <span>Join Waitlist</span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 