"use client";

import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t py-4 bg-background", className)}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} BitHedge - Bitcoin Vegas Hackathon Project
        </div>
        <div className="text-xs text-muted-foreground mt-2 md:mt-0">
          Running on Stacks Testnet - No real funds required
        </div>
      </div>
    </footer>
  );
} 