"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  
  // Don't render our own footer on the landing page, as it uses LandingFooter
  if (isLandingPage) {
    return null;
  }
  
  return (
    <footer className={cn("border-t border-slate-200 py-4 bg-background hidden md:block", className)}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Logo variant="icon-only" className="h-6 w-6" />
            <span>© {new Date().getFullYear()} The Bitcoin Insurance Company - Bitcoin Vegas Hackathon Project</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 