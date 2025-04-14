import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bithedge.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',        // Protect API routes
        '/_next/',      // Protect Next.js internal routes
        '/admin/',      // Protect any admin areas
        '/private/',    // Protect any private areas
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 