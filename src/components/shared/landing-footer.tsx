"use client";

import { cn } from "@/lib/utils";

interface LandingFooterProps {
  className?: string;
}

export function LandingFooter({ className }: LandingFooterProps) {
  return (
    <footer className={cn("border-t border-slate-200 pt-8 pb-10 mt-10 bg-slate-50 rounded-lg", className)}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <svg className="h-7 w-7 text-blue-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span className="font-bold text-slate-800 text-xl">BitHedge</span>
            </div>
            <p className="text-sm text-slate-600 mb-3">Protecting your Bitcoin with options</p>
            <div className="flex space-x-3 justify-center md:justify-start">
              <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.12 7.48h-1.892c-.14 0-.3.107-.3.253v1.372h2.14v1.96h-2.14v5.86H10.95v-5.86H9v-1.96h1.95V7.75c0-1.67 1.04-3.02 3.02-3.02h1.15v2.75z"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="font-medium text-slate-800 mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/home" className="text-slate-600 hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="/option-data" className="text-slate-600 hover:text-blue-600 transition-colors">Option Data</a></li>
              <li><a href="/easy-option" className="text-slate-600 hover:text-blue-600 transition-colors">Easy Trade</a></li>
              <li><a href="#hedging-calculator" className="text-slate-600 hover:text-blue-600 transition-colors">Hedging Calculator</a></li>
            </ul>
          </div>
          
          <div className="text-center md:text-right">
            <h3 className="font-medium text-slate-800 mb-4 text-lg">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Risk Disclaimer</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-600 mb-2">© 2025 BitHedge - Bitcoin Vegas Hackathon Project</p>
          <p className="text-xs text-slate-500">Running on Stacks Testnet - No real funds required</p>
        </div>
      </div>
    </footer>
  );
} 