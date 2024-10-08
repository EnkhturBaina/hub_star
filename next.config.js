const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');
module.exports = phase => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';
  // next.config.js object
  const { i18n } = require('./next-i18next.config');

  return {
    i18n,
    reactStrictMode: false,
    compress: true,
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
    future: {
      strictPostcssConfiguration: true,
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
};
