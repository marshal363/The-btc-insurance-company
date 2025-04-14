"use client";

import { useEffect, useState } from 'react';

interface OrganizationStructuredDataProps {
  name?: string;
  logo?: string;
  url?: string;
}

interface ProductStructuredDataProps {
  name: string;
  description: string;
  image: string;
  url: string;
}

interface FAQStructuredDataProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function OrganizationStructuredData({
  name = "The Bitcoin Insurance Company",
  logo = "https://bithedge.com/logo.png",
  url = "https://bithedge.com"
}: OrganizationStructuredDataProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "logo": logo,
    "url": url,
    "sameAs": [
      "https://twitter.com/BitHedge",
      "https://github.com/BitHedge",
      // Add other social profiles
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ProductStructuredData({
  name,
  description,
  image,
  url
}: ProductStructuredDataProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "url": url,
    "brand": {
      "@type": "Brand",
      "name": "The Bitcoin Insurance Company"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function FAQStructuredData({ questions }: FAQStructuredDataProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(({ question, answer }) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 