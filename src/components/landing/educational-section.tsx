"use client";

import Link from "next/link";

interface EducationCardProps {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

function EducationCard({ title, description, linkText, linkHref }: EducationCardProps) {
  return (
    <div className="bg-card rounded-lg p-5 md:p-6 lg:p-8 text-card-foreground shadow-sm h-full">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <Link 
        href={linkHref}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 py-2"
      >
        {linkText}
      </Link>
    </div>
  );
}

export function EducationalSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <EducationCard
            title="New to Options?"
            description="Options give you the right to buy or sell Bitcoin at a set price. They're perfect for protecting your portfolio from price drops or capitalizing on price increases."
            linkText="Learn the Basics"
            linkHref="#" // Will be implemented in future
          />
          <EducationCard
            title="Experienced Trader?"
            description="Access advanced data visualizations, option chains, and detailed market analytics to make informed trading decisions based on volatility and market conditions."
            linkText="Explore Analytics"
            linkHref="/option-data"
          />
        </div>
      </div>
    </section>
  );
} 