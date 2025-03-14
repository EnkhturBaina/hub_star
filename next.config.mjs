/** @type {import('next').NextConfig} */
import process from 'process';

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  i18n: {
    locales: ['mn', 'en', 'zh'],
    defaultLocale: 'mn',
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,
    domains: ['localhost', 'www.hubstar.mn'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.hubstar.mn',
        pathname: '/api/local-files/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: false,
  productionBrowserSourceMaps: true,
  env: {
    BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
    X_API_KEY: process.env.NEXT_PUBLIC_X_API_KEY,
  },
  async headers() {
    return [
      {
        // This works, and returns appropriate Response headers:
        source: '/:all*(svg|jpg|png|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=31536000, must-revalidate',
          },
        ],
      },
      {
        // This doesn't work for 'Cache-Control' key (works for others though):
        source: '/_next/image(.*)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=31536000, must-revalidate',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
