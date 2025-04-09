"use client";

export function Footer() {
  return (
    <footer className="border-t py-4 bg-background">
      <div className="container flex flex-col md:flex-row justify-between items-center">
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