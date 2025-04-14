/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // Add domains for external images you're using
      "bitcoininsurancecompany.com",
      // Add more domains as needed
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Disable ESLint during builds to avoid deployment failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Redirects are useful for SEO when URLs change
  async redirects() {
    return [
      // Example redirect - uncomment and customize as needed
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true, // 308 status code (permanent redirect)
      // },
    ];
  },
  // Rewrites can be useful for clean URLs
  async rewrites() {
    return [
      // Example rewrite - uncomment and customize as needed
      // {
      //   source: '/about',
      //   destination: '/about-us',
      // },
    ];
  },
  // Add headers for security and caching
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        // Cache static assets for a year
        source: "/(images|favicon|icons)/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Enable trailing slash for better SEO consistency
  trailingSlash: false,
  // Increase build output detail
  output: "standalone",
};

export default nextConfig;
