/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Configure image domains for next/image
  images: {
    domains: [
      'i.ytimg.com',        // YouTube thumbnails
      'img.youtube.com',    // YouTube images
      'i.vimeocdn.com',     // Vimeo thumbnails
      'vimeo.com',          // Vimeo images
      'localhost',          // Local development
    ],
  },

  // Configure redirects
  async redirects() {
    return [
      {
        source: '/sync',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Configure rewrites for API proxy
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  },

  // Configure headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Configure webpack for optimizations
  webpack: (config) => {
    // Add optimizations here if needed
    return config;
  },

  // Configure environment variables
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
  },

  // Configure build output
  output: 'standalone',

  // Configure TypeScript
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },

  // Configure ESLint
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },

  // Configure source maps
  productionBrowserSourceMaps: true,

  // Configure compression
  compress: true,

  // Configure powered by header
  poweredByHeader: false,

  // Configure trailing slash
  trailingSlash: false,

  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Configure experimental features
  experimental: {
    // Enable server actions with proper configuration
    serverActions: {
      allowedOrigins: ['localhost:3000'],
      bodySizeLimit: '2mb'
    }
  },
}

module.exports = nextConfig; 