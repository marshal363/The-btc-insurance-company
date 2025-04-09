"use client";

import Link from "next/link";
import { Shield, BarChart } from "lucide-react";

interface PathCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkText: string;
  linkHref: string;
}

function PathCard({ title, description, icon, linkText, linkHref }: PathCardProps) {
  return (
    <div className="bg-card rounded-lg p-5 md:p-6 lg:p-8 text-card-foreground shadow-sm flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="mr-3 text-primary">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="mb-6 text-muted-foreground flex-grow">{description}</p>
      <Link
        href={linkHref}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary/10 text-primary hover:bg-primary/20 h-10 px-4 py-2 w-full"
      >
        {linkText} →
      </Link>
    </div>
  );
}

export function UserPaths() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container max-w-6xl mx-auto px-4 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">Choose Your Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <PathCard
            title="Protecting Your Bitcoin"
            description="For those seeking to hedge against volatility and secure their BTC holdings with limited downside risk and predictable outcomes."
            icon={<Shield size={24} />}
            linkText="Start with Easy View"
            linkHref="/easy-option"
          />
          <PathCard
            title="Trading the Market"
            description="For active traders seeking market opportunities, detailed analytics, and insights to capitalize on Bitcoin price movements and volatility."
            icon={<BarChart size={24} />}
            linkText="Go to Data View"
            linkHref="/option-data"
          />
        </div>
      </div>
    </section>
  );
} 