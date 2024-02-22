/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_KEY: "1ab2c3d4e5f61ab2c3d4e5",
    PUBLIC_URL: "http://192.82.92.170:8080/",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  experimental: { serverActions: true },
};

module.exports = nextConfig;
