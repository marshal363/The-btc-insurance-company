import type { Metadata, Viewport } from "next";

// Default metadata configuration 
export const defaultMetadata: Metadata = {
  title: {
    template: '%s | The Bitcoin Insurance Company',
    default: 'The Bitcoin Insurance Company - Bitcoin Protection Through Options'
  },
  description: "Protect your Bitcoin holdings against market volatility with options contracts backed by Bitcoin's own security. Our platform provides customizable protection strategies for Bitcoin investors.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bithedge.com'),
  keywords: [
    'Bitcoin protection', 'Bitcoin insurance', 'Bitcoin options', 
    'Bitcoin volatility', 'Crypto protection', 'Bitcoin hedging',
    'Bitcoin risk management', 'Bitcoin price protection'
  ],
  authors: [{ name: 'The Bitcoin Insurance Company' }],
  creator: 'The Bitcoin Insurance Company',
  publisher: 'The Bitcoin Insurance Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bithedge.com',
    siteName: 'The Bitcoin Insurance Company',
    title: 'The Bitcoin Insurance Company - Bitcoin Protection Through Options',
    description: "Protect your Bitcoin holdings against market volatility with options contracts backed by Bitcoin's own security",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Bitcoin Insurance Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Bitcoin Insurance Company - Bitcoin Protection Through Options',
    description: "Protect your Bitcoin holdings against market volatility with options contracts backed by Bitcoin's own security",
    images: ['/twitter-image.png'],
    creator: '@BitHedge',
    site: '@BitHedge',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    // google: 'your-google-site-verification-code',
  },
  category: 'finance',
};

export const defaultViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

// Helper function to generate page-specific metadata
export function createMetadata({
  title,
  description,
  path = '',
  ogImage = '/og-image.png',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bithedge.com'}${path}`;
  
  return {
    ...defaultMetadata,
    title: title,
    description: description || defaultMetadata.description,
    robots: noIndex ? { index: false, follow: false } : defaultMetadata.robots,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title || defaultMetadata.openGraph?.title,
      description: description || defaultMetadata.openGraph?.description as string,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || defaultMetadata.openGraph?.title as string,
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title || defaultMetadata.twitter?.title,
      description: description || defaultMetadata.twitter?.description as string,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
} 