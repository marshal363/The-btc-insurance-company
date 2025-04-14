import { MetadataRoute } from 'next';

// List all static routes that should be indexed by search engines
const routes = [
  '/',
  '/income-center',
  '/option-data',
  '/easy-option',
  // Add more routes as they are created
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bithedge.com';
  
  // Generate entries for static routes
  const staticRoutes = routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));
  
  // You can add dynamic routes here in the future
  // const dynamicRoutes = await fetchDynamicRoutes();
  
  return [
    ...staticRoutes,
    // ...dynamicRoutes,
  ];
} 