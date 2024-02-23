/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_KEY: "1ab2c3d4e5f61ab2c3d4e5",
    PUBLIC_URL: "http://192.82.92.170:8080/",
    IMG_PATH: "http://192.82.92.170:8080/images/",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "192.82.92.170"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.82.92.170",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  experimental: { serverActions: true },
};

module.exports = nextConfig;
